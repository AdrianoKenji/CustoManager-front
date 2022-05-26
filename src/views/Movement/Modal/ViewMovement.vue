<template>

 <div
    class="modal fade"
    id="modalViewMovement"
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
            Visualizar Movimentação - {{ movement.id }}
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
                  disabled
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
                <input
                  v-if="movement.associado"
                  type="text"
                  class="form-control"
                  id="floatingInputAssociado"
                  placeholder="Associado"
                  v-model="movement.associado.nome"
                  required
                  disabled
                />
                <label for="floatingInputData" class="ps-3 ms-1"
                  >Associado</label
                >
              </div>

              <div class="form-floating col-4">
                <select
                  name="companies"
                  class="form-select"
                  v-model="movement.tipoMovimentacao"
                  disabled
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
                  disabled
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
                  disabled
                  placeholder="Descrição"
                ></textarea>
                <label for="floatingInput" class="ms-1">Descrição</label>
              </div>

              <hr class="mt-3" />

              <div class="col-12 mt-3">
                <div class="card p-2">
                  <div class="row">
                    <template
                      v-for="(movimento, index) in movement.movimentacaoProdutos"
                      :key="index"
                    >
                      <div class="col-4 mt-2 mb-2">
                        <div class="card p-2">
                        <span v-if="!movimento.produto.oculto">{{
                          movimento.id
                        }}</span>
                        <span>Nome: {{ movimento.produto.nome + ", " }}</span>
                        <br>
                        <span>Qtd: {{ movimento.quantidade + ", " }}</span>
                        <br>
                        <span>Valor: {{ movimento.valorUnitario }}</span>
                      </div>
                      </div>
                    </template>
                  </div>
                </div>
              </div>
            </div>
          </div>
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

import { routerViewLocationKey, useRoute } from "vue-router";

import PartnerService from "@/services/PartnerService";
import MovementService from "@/services/MovementService";
import ProductService from "@/services/ProductService";

export default {
  name: "EditMovement",
  components: {
    ModalMessage,
  },
  emits: ["closeAction"],
  setup() {
    const companies = inject("companies", []);
    const partners = ref([]);
    const products = ref([]);

    const movement = inject("selectedMovement", {});

    const router = useRoute();

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

      getMovementById(newValue) {
        MovementService.getMovementById(newValue)
          .then((response) => {
            movement.value = response.data; 
            console.log(response.data)    

          })
          .catch((e) => {
            if(e.response && e.response.data.errors.length > 0) {
                let mensagem = "";
                if (e.response.status == 401) {
                mensagem = e.response.data.errors[0];
                } else {
                mensagem = "Ocorreu um erro ao buscar a movimentação.";
                }

                methods.openModalMessage("Erro", true, mensagem);
            }
            else {
                console.log(e);
            }
            
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
      () => movement.value.Id,
      (newValue, oldValue) => {
        console.log(newValue)
        if (newValue != oldValue && newValue != undefined) {
          methods.getMovementById(newValue);  
        }
      }
    );

    return {
      companies,
      partners,
      products,
      movement,
      product,
      router,
      modalMessage,
      ...toRefs(methods),
      canAdd,
    };
  },
};
</script>