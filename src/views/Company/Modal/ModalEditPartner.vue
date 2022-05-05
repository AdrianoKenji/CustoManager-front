<template>
  <div
    class="modal fade"
    id="modalEditPartner"
    tabindex="-1"
    aria-labelledby="modalEditPartnerLabel"
    aria-hidden="true"
  >
    <div
      class="
        modal-dialog modal-lg modal-dialog-scrollable modal-dialog-centered
      "
    >
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title" id="modalEditPartnerLabel">
            Editar associado - {{ selectedPartner.nome }}
          </h4>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="text-start">
            <h5>Dados da {{ selectedPartner.tipoAssociado }}</h5>
            <hr class="col-4" style="height: 3px; margin-top: -5px" />
          </div>
          <div class="row mt-2 mb-2">
            <div class="row col-12">
              <div class="form-floating col-4 mb-3">
                <input
                  type="text"
                  class="form-control"
                  id="floatingInputNome"
                  placeholder="Nome"
                  v-model="selectedPartner.nome"
                  required
                />
                <label for="floatingInputNome" class="ps-3 ms-1">Nome</label>
              </div>

              <div class="form-floating col-3 mb-3">
                <select
                  class="form-select"
                  v-model="selectedPartner.tipoPessoa"
                  @change="partner.documento = ''"
                >
                  <option value="" selected disabled>Selecione:</option>
                  <!--  <option v-for="(partner, index) in partners" :key="index" :value="partner">
                    {{ partner}}
                  </option> -->
                  <option value="PESSOA_FISICA">Física</option>
                  <option value="PESSOA_JURIDICA">Jurídica</option>
                </select>
                <label class="ps-3 ms-1">Tipo de pessoa</label>
              </div>

              <div class="form-floating col-5 mb-3">
                <input
                  v-if="selectedPartner.tipoPessoa == 'PESSOA_FISICA'"
                  type="text"
                  class="form-control"
                  id="floatingInputCPFAndCNPJ"
                  v-mask="'###.###.###-##'"
                  placeholder="CPF/CNPJ"
                  v-model="selectedPartner.documento"
                  required
                />
                <input
                  v-else-if="selectedPartner.tipoPessoa == 'PESSOA_JURIDICA'"
                  type="text"
                  class="form-control"
                  id="floatingInputCPFAndCNPJ"
                  v-mask="'##.###.###/####-##'"
                  placeholder="CPF/CNPJ"
                  v-model="selectedPartner.documento"
                  required
                />
                <label for="floatingInputCPFAndCNPJ" class="ps-3 ms-1">
                  {{
                    selectedPartner.tipoPessoa == "PESSOA_FISICA"
                      ? "CPF"
                      : "CNPJ"
                  }}
                </label>
              </div>

              <div class="form-floating col-4 mb-3">
                <input
                  type="text"
                  class="form-control"
                  id="floatingInputTelefone"
                  placeholder="Telefone"
                  v-mask="'(##) #####-####'"
                  v-model="selectedPartner.telefone"
                  required
                />
                <label for="floatingInputTelefone" class="ps-3 ms-1"
                  >Telefone</label
                >
              </div>

              <div class="form-floating col-8 mb-3">
                <input
                  type="text"
                  class="form-control"
                  id="floatingInputEndereco"
                  placeholder="Endereço"
                  v-model="selectedPartner.endereco"
                  required
                />
                <label for="floatingInputEndereco" class="ps-3 ms-1"
                  >Endereço</label
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
            class="btn btn-success btn-sm h-75"
            @click="updatePartner()"
          >
            Salvar
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
  />
</template>

<script>
import { inject, reactive, ref, toRefs, watch } from "@vue/runtime-core";

import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";

import ModalMessage from "@/components/Modal/ModalMessage.vue";

import PartnerService from "@/services/PartnerService";

export default {
  name: "ModalEditPartner",
  components: {
    ModalMessage,
  },
  setup() {
    const idCompany = inject("idCompany");

    const selectedPartner = inject("selectedPartner", {});

    const partner = ref({});

    const modalMessage = ref({
      title: "",
      isError: false,
      message: "",
      reference: "ModalEditPartner",
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

      getPartnerById() {
        console.log(selectedPartner.value);
        PartnerService.getPartnerById(selectedPartner.value.id)
          .then((response) => {
            console.log(response.data);
            partner.value = response.data;
          })
          .catch((e) => {
            let mensagem = "";
            if (e.response.status == 401) {
              mensagem = e.response.data.errors[0];
            } else {
              mensagem = "Ocorreu um erro ao buscar o associado.";
            }

            methods.openModalMessage("Erro", true, mensagem, true);
          });
      },

      updatePartner() {
        partner.value.idEmpresa = idCompany.value;
        console.log(partner.value);
        PartnerService.updatePartner(partner.value)
          .then(() => {
            methods.openModalMessage(
              "Sucesso",
              false,
              "O associado " +
                selectedPartner.value.nome +
                " foi atualizado com sucesso."
            );
          })
          .catch((e) => {
            let mensagem = "";
            if (e.response.status == 401) {
              mensagem = e.response.data.errors[0];
            } else {
              mensagem =
                "Ocorreu um erro ao atualizar o associado " +
                selectedPartner.value.nome +
                ".";
            }

            methods.openModalMessage("Erro", true, mensagem);
          });
      },
    });

    watch(
      () => selectedPartner.value.id,
      (newValue, oldValue) => {
        if (newValue != oldValue) {
          methods.getPartnerById();
        }
      }
    );

    return {
      idCompany,
      selectedPartner,
      partner,
      modalMessage,
      ...toRefs(methods),
    };
  },
};
</script>