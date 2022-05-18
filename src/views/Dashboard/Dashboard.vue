<template>
  <div class="row">
    <div class="d-flex justify-content-center">
      <div class="row">
        <h3>Dashboard</h3>
        <hr class="col-12" style="height: 3px; margin-top: -5px" />
      </div>
    </div>
    <div class="d-flex justify-content-between">
      <div class="">
        <span class="fs-4">Bem vindo, {{ token.nome }}!</span>
      </div>
      <div class="">
        <span class="fs-4 me-5">{{ messageDate }}</span>
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

export default {
  name: "Dashboard",
  components: {
    ModalMessage,
  },
  setup() {
    const nome = ref("");

    const token = ref({});

    const days = ref([
      "Domingo",
      "Segunda",
      "Terça",
      "Quarta",
      "Quinta",
      "Sexta",
      "Sábado",
    ]);

    const messageDate = ref("");

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

      getDateAndHour() {
        let date = new Date();

        var dia = date.getDate();
        var mes = date.getMonth();
        var ano4 = date.getFullYear();
        var hora = date.getHours();
        var min = date.getMinutes();

        var str_data = dia + "/" + (mes + 1) + "/" + ano4;
        var str_hora = hora + ":" + min;

        messageDate.value =
          days.value[date.getDay()] + ", " + str_data + " às " + str_hora;
      },
    });

    onMounted(() => {
      token.value = TokenUtils.getTokenAndDecodeToJson(
        localStorage.getItem("token")
      );

      methods.getDateAndHour();
    });

    return {
      nome,
      token,
      days,
      messageDate,
      modalMessage,
      ...toRefs(methods),
    };
  },
};
</script>