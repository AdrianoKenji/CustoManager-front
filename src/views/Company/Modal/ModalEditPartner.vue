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
            Editar associado - {{ selectedPartner.Nome }}
          </h4>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <!-- <div class="text-start">
            <h5>Dados pessoais</h5>
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
                  v-model="user.nome"
                  required
                />
                <label for="floatingInputNome" class="ps-3 ms-1">Nome</label>
              </div>

              <div class="form-floating col-8 mb-3">
                <input
                  type="text"
                  class="form-control"
                  id="floatingInputEmail"
                  placeholder="Email"
                  v-model="user.login"
                  required
                />
                <label for="floatingInputEmail" class="ps-3 ms-1">Email</label>
              </div>

              <div class="form-floating col-4 mb-3">
                <input
                  type="text"
                  class="form-control"
                  id="floatingInputCPF"
                  v-mask="'###.###.###-##'"
                  placeholder="CPF"
                  v-model="user.cpf"
                  required
                />
                <label for="floatingInputCPF" class="ps-3 ms-1">CPF</label>
              </div>

              <div class="form-floating col-4 mb-3">
                <input
                  type="date"
                  class="form-control"
                  id="floatingInputDataNascimento"
                  placeholder="Data de Nascimento"
                  v-model="user.dataNascimento"
                  required
                />
                <label for="floatingInputDataNascimento" class="ps-3 ms-1"
                  >Data de Nascimento</label
                >
              </div>

              <div class="form-floating col-4 mb-3">
                <input
                  type="text"
                  class="form-control"
                  id="floatingInputTelefone"
                  placeholder="Telefone"
                  v-model="user.telefone"
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
                  v-model="user.endereco"
                  required
                />
                <label for="floatingInputEndereco" class="ps-3 ms-1"
                  >Endereço</label
                >
              </div>
              <div class="col-4">
                <div class="form-check form-switch col-12">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="flexSwitchCheckAcessoAoSistema"
                    v-model="user.acessoAoSistema"
                  />
                  <label
                    class="form-check-label"
                    for="flexSwitchCheckAcessoAoSistema"
                    >Acesso ao sistema</label
                  >
                </div>

                <div class="form-check form-switch col-12">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="flexSwitchCheckAcessoAoSistema"
                    v-model="user.admin"
                  />
                  <label
                    class="form-check-label"
                    for="flexSwitchCheckAcessoAoSistema"
                    >Administrador</label
                  >
                </div>
              </div>
            </div>
          </div> -->
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
            @click="updateUser()"
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
import UserService from "@/services/UserService";

export default {
  name: "ModalEditPartner",
  components: {
    ModalMessage,
  },
  setup() {
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

      getPartnerBy() {
        UserService.getUserById(selectedPartner.value.Id)
          .then((response) => {
            user.value = response.data;
          })
          .catch((e) => {
            let mensagem = "";
            if (e.response.status == 401) {
              mensagem = e.response.data.errors[0];
            } else {
              mensagem = "Ocorreu um erro ao buscar o usuário.";
            }

            methods.openModalMessage("Erro", true, mensagem, true);
          });
      },

      updateUser() {
        UserService.updateUser(user.value)
          .then(() => {
            methods.openModalMessage(
              "Sucesso",
              false,
              "O usuário " +
                selectedPartner.value.Nome +
                " foi atualizado com sucesso."
            );
          })
          .catch((e) => {
            let mensagem = "";
            if (e.response.status == 401) {
              mensagem = e.response.data.errors[0];
            } else {
              mensagem =
                "Ocorreu um erro ao atualizar o usuário " +
                selectedPartner.value.Nome +
                ".";
            }

            methods.openModalMessage("Erro", true, mensagem);
          });
      },
    });

    watch(
      () => selectedPartner.value.Id,
      (newValue, oldValue) => {
        if (newValue != oldValue) {
          methods.getUserById();
        }
      }
    );

    return {
      selectedPartner,
      partner,
      modalMessage,
      ...toRefs(methods),
    };
  },
};
</script>