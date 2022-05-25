<template>
  <div
    class="modal fade"
    id="modalAddBrand"
    tabindex="-1"
    aria-labelledby="modalAddBrandLabel"
    aria-hidden="true"
  >
    <div
      class="
        modal-dialog modal-lg modal-dialog-scrollable modal-dialog-centered
      "
    >
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="modalAddBrandLabel">Cadastrar Marca</h5>
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
                  v-model="brand.idEmpresa"
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
                  placeholder="Nome da Marca"
                  v-model="brand.nome"
                  required
                />
                <label for="floatingInputNome" class="ps-3 ms-1"
                  >Nome da Marca</label
                >
              </div>

              <div class="form-check form-switch col-4 mt-3">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="flexSwitchCheckAcessoAoSistema"
                  v-model="brand.ativo"
                />
                <label
                  class="form-check-label"
                  for="flexSwitchCheckAcessoAoSistema"
                  style="margin-left: -150px"
                  >Ativo</label
                >
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
            @click="registerBrand()"
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

import BrandService from "@/services/BrandService";

export default {
  name: "ModalAddBrand",
  components: {
    ModalMessage,
  },
  emits: ["closeAction"],
  setup() {
    const companies = inject("companies", []);

    const brand = ref({
      idEmpresa: "",
      nome: "",
      ativo: false,
    });

    const modalMessage = ref({
      title: "",
      isError: false,
      message: "",
      reference: "AddBrand",
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

      registerBrand() {
        console.log(brand.value);
        BrandService.registerBrand(brand.value)
          .then(() => {
            methods.openModalMessage(
              "Sucesso",
              false,
              "Marca cadastrada com sucesso.",
              false
            );
            methods.closeAction();
          })
          .catch((e) => {
            let mensagem = "";
            if (e.response.status == 400) {
              mensagem = e.response.data.errors[0];
            } else {
              mensagem = "Ocorreu um erro ao cadastrar marca.";
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
      brand,
      modalMessage,
      ...toRefs(methods),
    };
  },
};
</script>