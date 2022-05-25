<template>
  <div
    class="modal fade"
    id="modalAddProductType"
    tabindex="-1"
    aria-labelledby="modalAddProductTypeLabel"
    aria-hidden="true"
  >
    <div
      class="
        modal-dialog modal-lg modal-dialog-scrollable modal-dialog-centered
      "
    >
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="modalAddProductTypeLabel">
            Cadastrar Tipo de produto
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
                  v-model="productType.idEmpresa"
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
                  type="text"
                  class="form-control"
                  id="floatingInputNome"
                  placeholder="Nome"
                  v-model="productType.nome"
                  required
                />
                <label for="floatingInputNome" class="ps-3 ms-1"
                  >Nome</label
                >
              </div>

              <div class="form-check form-switch col-4 mt-3">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="flexSwitchCheckAcessoAoSistema"
                  v-model="productType.ativo"
                />
                <label
                  class="form-check-label"
                  for="flexSwitchCheckAcessoAoSistema"
                  style="margin-left: -150px"
                  >Ativo</label
                >
              </div>

              <div class="form-floating col-12 mt-3">
                <textarea
                  class="form-control"
                  id="floatingInput"
                  :rows="10"
                  style="height: 100px"
                  v-model="productType.descricao"
                  placeholder="Descrição"
                ></textarea>
                <label for="floatingInput" class="ms-1">Descrição</label>
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
            @click="registerProductType()"
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
import { inject, reactive, ref, toRefs } from "@vue/runtime-core";

import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";

import ModalMessage from "@/components/Modal/ModalMessage.vue";

import ProductTypeService from "@/services/ProductTypeService";

export default {
  name: "ModalAddBrand",
  components: {
    ModalMessage,
  },
  emits: ["closeAction"],
  setup() {
    const companies = inject("companies", []);

    const productType = ref({
      idEmpresa: "",
      nome: "",
      ativo: false,
      descricao: "",
    });

    const modalMessage = ref({
      title: "",
      isError: false,
      message: "",
      reference: "AddProductType",
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

      registerProductType() {
        ProductTypeService.registerProductType(productType.value)
          .then(() => {
            methods.openModalMessage(
              "Sucesso",
              false,
              "Tipo de produto cadastrada com sucesso.",
              false
            );
            methods.closeAction();
          })
          .catch((e) => {
            let mensagem = "";
            if (e.response.status == 400) {
              mensagem = e.response.data.errors[0];
            } else {
              mensagem = "Ocorreu um erro ao cadastrar tipo de produto.";
            }

            methods.openModalMessage("Erro", true, mensagem, false);
          });
      },

      closeAction() {
        emit("closeAction");
      },
    });

    return {
      companies,
      productType,
      modalMessage,
      ...toRefs(methods),
    };
  },
};
</script>