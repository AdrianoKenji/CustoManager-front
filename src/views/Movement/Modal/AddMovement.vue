<template>
  <div
    class="modal fade"
    id="modalAddMovement"
    tabindex="-1"
    aria-labelledby="modalAddMovementLabel"
    aria-hidden="true"
  >
    <div
      class="
        modal-dialog modal-lg modal-dialog-scrollable modal-dialog-centered
      "
    >
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="modalAddMovementLabel">
            Cadastrar Movimentação
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row mt-2 mb-2">
            <div class="row col-12 mb-3">
              <div class="form-floating col-4">
                <select
                  name="companies"
                  class="form-select"
                  v-model="movement.idEmpresa"
                >
                  <option value="" selected disabled>Selecione:</option>
                  <template v-for="company in companies" :key="company.id">
                    <option :value="company.id">
                      {{ company.nome }}
                    </option>
                  </template>
                </select>
                <label for="floatingInputCompanyName" class="ps-3 ms-1"
                  >Empresa</label
                >
              </div>

              <div class="form-floating col-4">
                <select
                  name="companies"
                  class="form-select"
                  v-model="movement.idAssociado"
                >
                  <option value="" selected disabled>Selecione:</option>
                  <template v-for="partner in partners" :key="partner.id">
                    <option :value="partner.id">
                      {{ partner.nome }}
                    </option>
                  </template>
                </select>
                <label for="floatingInputCompanyName" class="ps-3 ms-1"
                  >Associado</label
                >
              </div>

              <div class="form-floating col-4">
                <select
                  name="companies"
                  class="form-select"
                  v-model="movement.tipoMovimentacao"
                >
                  <option value="" selected disabled>Selecione:</option>
                  <option value="COMPRA">Compra</option>
                  <option value="VENDA">Venda</option>
                </select>
                <label for="floatingInputCompanyName" class="ps-3 ms-1"
                  >Tipo de Movimentação</label
                >
              </div>

              <div class="form-floating col-4 mt-3">
                <input
                  type="datetime-local"
                  class="form-control"
                  id="floatingInputData"
                  placeholder="Data da movimentação"
                  v-model="movement.dataMovimentacao"
                  required
                />
                <label for="floatingInputData" class="ps-3 ms-1"
                  >Data da movimentação</label
                >
              </div>

              <div class="form-floating col-8 mt-3">
                <textarea
                  class="form-control"
                  id="floatingInput"
                  :rows="10"
                  style="height: 58px"
                  v-model="movement.descricao"
                  placeholder="Descrição"
                ></textarea>
                <label for="floatingInput" class="ms-1">Descrição</label>
              </div>

              <hr class="mt-3" />

              <div class="form-floating col-4">
                <select
                  name="companies"
                  class="form-select"
                  v-model="product.id"
                >
                  <option value="" selected disabled>Selecione:</option>
                  <template v-for="prod in products" :key="prod.id">
                    <option :value="prod.id">
                      {{ prod.nome }}
                    </option>
                  </template>
                </select>
                <label for="floatingInputCompanyName" class="ps-3 ms-1"
                  >Produto</label
                >
              </div>

              <div class="form-floating col-3">
                <input
                  type="number"
                  class="form-control"
                  id="floatingInputQuantidade"
                  placeholder="Quantidade"
                  v-model="product.quantidade"
                  required
                />
                <label for="floatingInputQuantidade" class="ps-3 ms-1"
                  >Quantidade</label
                >
              </div>

              <div class="form-floating col-3">
                <input
                  type="number"
                  class="form-control"
                  id="floatingInputValor"
                  placeholder="Valor unitário"
                  v-model="product.valorUnitario"
                  required
                />
                <label for="floatingInputValor" class="ps-3 ms-1"
                  >Valor unitário</label
                >
              </div>

              <div class="col-2">
                <button
                  class="btn btn-dark btn-lg rounded-circle"
                  @click="addProduct()"
                  :disabled="!canAdd"
                >
                  <i class="bx bx-plus fs-4 mt-2"></i>
                </button>
              </div>

              <div class="col-12 mt-3">
                <div class="card">
                  <div class="row">
                    <template
                      v-for="(movement, index) in movement.movimentacaoProdutos"
                      :key="index"
                    >
                      <div class="col-4 mt-2 mb-2">
                        <span v-if="!movement.produto.oculto">{{
                          movement.id
                        }}</span>
                        <span>{{ movement.nome + ", " }}</span>
                        <span>{{ movement.quantidade + ", " }}</span>
                        <span>{{ movement.valorUnitario }}</span>
                      </div>
                    </template>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer text-end">
          <button
            type="button"
            class="btn btn-secondary btn-sm h-75"
            data-bs-dismiss="modal"
          >
            Cancelar
          </button>
          <button
            type="button"
            class="btn btn-primary btn-sm h-75"
            @click="registerMovement()"
          >
            Cadastrar
          </button>
        </div>
      </div>
    </div>
  </div>

  <ModalMessage
    :title="modalMessage.title"
    :isError="modalMessage.isError"
    :message="modalMessage.message"
    :reference="modalMessage.reference"
    :needsRefresh="modalMessage.needsRefresh"
    @closeAction="closeAction()"
  />
</template>

<script>
import {
  computed,
  inject,
  onMounted,
  reactive,
  ref,
  toRefs,
  watch,
} from "@vue/runtime-core";

import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";

import ModalMessage from "@/components/Modal/ModalMessage.vue";

import PartnerService from "@/services/PartnerService";
import MovementService from "@/services/MovementService";
import ProductService from "@/services/ProductService";

export default {
  name: "ModalAddBrand",
  components: {
    ModalMessage,
  },
  emits: ["closeAction"],
  setup() {
    const companies = inject("companies", []);
    const partners = ref([]);
    const products = ref([]);

    const movement = ref({
      idEmpresa: "",
      idAssociado: "",
      tipoMovimentacao: "",
      dataMovimentacao: "",
      descricao: "",
      movimentacaoProdutos: [],
      valorTotal: 0,
    });

    const product = ref({
      id: 0,
      quantidade: 0,
      valorUnitario: 0,
    });

    const modalMessage = ref({
      title: "",
      isError: false,
      message: "",
      reference: "AddMovement",
      needsRefresh: false,
    });

    const methods = reactive({
      openModalMessage(title, isError, message, needsRefresh) {
        modalMessage.value.title = title;
        modalMessage.value.isError = isError;
        modalMessage.value.message = message;
        modalMessage.value.needsRefresh = needsRefresh;

        var modal = new bootstrap.Modal(
          document.getElementById(
            "modalMessage" + modalMessage.value.reference
          ),
          {
            keyboard: false,
            backdrop: "static",
          }
        );
        var modalToggle = document.getElementById(
          "modalMessage" + modalMessage.value.reference
        );
        modal.show(modalToggle);
      },

      getPartnersByCompanyId() {
        PartnerService.getPartnerByCompanyId(movement.value.idEmpresa)
          .then((response) => {
            partners.value = response.data;
          })
          .catch((e) => {
            let mensagem = "";
            if (e.response.status == 401) {
              mensagem = e.response.data.errors[0];
            } else {
              mensagem = "Ocorreu um erro ao buscar os associados.";
            }

            methods.openModalMessage("Erro", true, mensagem, false);
          });
      },

      getProductsByCompanyId() {
        ProductService.getProductsByCompanyId(
          movement.value.idEmpresa,
          "id",
          false,
          0,
          999999
        )
          .then((response) => {
            products.value = response.data.content;
          })
          .catch((e) => {
            let mensagem = "";
            if (e.response.status == 401) {
              mensagem = e.response.data.errors[0];
            } else {
              mensagem = "Ocorreu um erro ao buscar os produtos.";
            }

            methods.openModalMessage("Erro", true, mensagem, false);
          });
      },

      addProduct() {
        let indexProduct = products.value.findIndex(
          (x) => x.id == product.value.id
        );

        movement.value.movimentacaoProdutos.push({
          produto: {
            id: product.value.id,
            oculto: true,
          },
          nome: products.value[indexProduct].nome,
          quantidade: product.value.quantidade,
          valorUnitario: product.value.valorUnitario,
        });

        methods.cleanObject();
      },

      cleanObject() {
        product.value = {
          id: 0,
          quantidade: 0,
          valorUnitario: 0,
        };
      },

      registerMovement() {
        console.log(movement.value);
        MovementService.registerMovement(movement.value)
          .then(() => {
            methods.openModalMessage(
              "Sucesso",
              false,
              "Movimentação cadastrada com sucesso.",
              false
            );
            methods.closeAction();
          })
          .catch((e) => {
            let mensagem = "";
            if (e.response.status == 400) {
              mensagem = e.response.data.errors[0];
            } else {
              mensagem = "Ocorreu um erro ao cadastrar movimentação.";
            }

            methods.openModalMessage("Erro", true, mensagem, false);
          });
      },

      closeAction() {
        emit("closeAction");
      },
    });

    const canAdd = computed(() => {
      let canAdd = false;
      let cont = 0;

      if (
        product.value.id != null &&
        product.value.id != undefined &&
        product.value.id != 0
      ) {
        cont++;
      }
      if (
        product.value.quantidade != null &&
        product.value.quantidade != undefined &&
        product.value.quantidade != 0
      ) {
        cont++;
      }
      if (
        product.value.valorUnitario != null &&
        product.value.valorUnitario != undefined &&
        product.value.valorUnitario != 0
      ) {
        cont++;
      }

      if (cont == 3) {
        canAdd = true;
      }

      return canAdd;
    });

    watch(
      () => movement.value.idEmpresa,
      (newValue, oldValue) => {
        if (newValue != oldValue && newValue) {
          methods.getPartnersByCompanyId();
          methods.getProductsByCompanyId();
        }
      }
    );

    return {
      companies,
      partners,
      products,
      movement,
      product,
      modalMessage,
      ...toRefs(methods),
      canAdd,
    };
  },
};
</script>