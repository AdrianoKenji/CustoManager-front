<template>
  <div class="row">
    <div class="d-flex justify-content-center">
      <div class="row">
        <h3>Dashboard</h3>
        <hr class="col-12" style="height: 3px; margin-top: -5px" />
      </div>
    </div>
    <div class="text-start">
      <div class="">
        <span class="ms-1 fs-4">Bem vindo, {{ nome }}!</span>
      </div>
    </div>
  </div>

  <ModalMessage
    :title="modalMessage.title"
    :isError="modalMessage.isError"
    :message="modalMessage.message"
    :reference="modalMessage.reference"
  />
</template>

<script>
import { reactive, ref, toRefs } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";

import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";

import ModalMessage from "@/components/Modal/ModalMessage.vue";

import TokenUtils from "@/utils/TokenUtils";

import UserService from "@/services/UserService";

export default {
  name: "Dashboard",
  components: {
    ModalMessage,
  },
  setup() {
    const nome = ref("");

    const token = ref({});

    const modalMessage = ref({
      title: "",
      isError: false,
      message: "",
      reference: "Dashboard",
    });

    const methods = reactive({
      openModalMessage(title, isError, message) {
        modalMessage.value.title = title;
        modalMessage.value.isError = isError;
        modalMessage.value.message = message;

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

      getUserById(id) {
        UserService.getUserById(id)
          .then((response) => {
            nome.value = response.data.nome;
          })
          .catch((e) => {
            let mensagem = "";
            if (e.response.status == 401) {
              mensagem = e.response.data.errors[0];
            } else {
              mensagem = "Ocorreu um erro ao buscar o usuário.";
            }

            methods.openModalMessage("Erro", true, mensagem);
          });
      },
    });

    onMounted(() => {
      token.value = TokenUtils.getTokenAndDecodeToJson(
        localStorage.getItem("token")
      );

      methods.getUserById(token.value.id);
    });

    return {
      nome,
      token,
      modalMessage,
      ...toRefs(methods),
    };
  },
};
</script>