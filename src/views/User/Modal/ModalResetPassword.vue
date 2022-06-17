<template>
  <div
    class="modal fade"
    id="modalResetPassword"
    tabindex="-1"
    aria-labelledby="modalResetPasswordLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="modalResetPasswordLabel">
            Redefinir senha
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
            <div class="col-12">
              <div class="text-start">
                <div class="mb-3">
                  <input
                    type="password"
                    class="form-control"
                    placeholder="Senha antiga"
                    v-model="oldPassword"
                  />
                </div>

                <div class="mb-3">
                  <input
                    type="password"
                    class="form-control"
                    placeholder="Nova senha"
                    v-model="newPassword"
                  />
                </div>

                <div>
                  <input
                    type="password"
                    class="form-control"
                    placeholder="Confirmar senha"
                    v-model="confirmPassword"
                  />
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
            @click="changePassword()"
          >
            Redefinir
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
import { reactive, ref, toRefs } from "@vue/reactivity";

import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";

import ModalMessage from "@/components/Modal/ModalMessage.vue";

import UserService from "@/services/UserService";
import { inject } from '@vue/runtime-core';

export default {
  name: "ModalResetPassword",
  components: {
    ModalMessage,
  },
  setup() {
    const user = inject("user", {});

    const oldPassword = ref("");
    const newPassword = ref("");
    const confirmPassword = ref("");

    const modalMessage = ref({
      title: "",
      isError: false,
      message: "",
      reference: "ModalResetPassword",
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

      changePassword() {
        console.log(oldPassword.value);
        console.log(newPassword.value);
        console.log(confirmPassword.value);
      },

      /*  sendMailToUser() {
        UserService.sendMailToUser(email.value, localStorage.getItem("token"))
          .then(() => {
            methods.openModalMessage(
              "Sucesso",
              false,
              "Email enviado com sucesso.",
              false
            );
          })
          .catch((e) => {
            let mensagem = "";
            if (e.response.status == 401) {
              mensagem = e.response.data.errors[0];
            } else {
              mensagem = "Ocorreu um erro ao enviar o email";
            }

            methods.openModalMessage("Erro", true, mensagem, false);
          });
      }, */
    });

    return {
      user,
      oldPassword,
      newPassword,
      confirmPassword,
      modalMessage,
      ...toRefs(methods),
    };
  },
};
</script>