<template>
  <div class="text-start">
    <div class="col-12">
      <h3>Listagem de Usuários</h3>
      <hr class="col-4" style="height: 3px; margin-top: -5px" />
    </div>
    <div class="mt-4 text-center">
      <Table
        :ArrayData="users"
        :isList="true"
        :Header="header"
        :loading="loading"
        @edit="edit($event)"
      />
    </div>
  </div>

  <ModalEditUser />

  <ModalMessage
    :title="modalMessage.title"
    :isError="modalMessage.isError"
    :message="modalMessage.message"
    :reference="modalMessage.reference"
  />
</template>

<script>
import { reactive, ref, toRefs } from "@vue/reactivity";
import { onMounted, provide } from "@vue/runtime-core";

import Table from "@/components/Table/Table.vue";

import ModalMessage from "@/components/Modal/ModalMessage.vue";
import ModalEditUser from "./Modal/ModalEditUser.vue";

import UserService from "@/services/UserService";

import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";

export default {
  name: "UserList",
  components: {
    Table,
    ModalMessage,
    ModalEditUser,
  },
  setup() {
    const users = ref([]);
    const selectedUser = ref({});

    const header = ref([
      {
        name: "Id",
      },
      {
        name: "Nome",
      },
      {
        name: "Email",
      },
      {
        name: "CPF",
      },
      {
        name: "Telefone",
      },
      {
        name: "Administrador?",
      },
      {
        name: "Ações",
      },
    ]);

    const loading = ref(false);

    const modalMessage = ref({
      title: "",
      isError: false,
      message: "",
      reference: "UserList"
    });

    const methods = reactive({
      openModalMessage(title, isError, message) {
        modalMessage.value.title = title;
        modalMessage.value.isError = isError;
        modalMessage.value.message = message;

        var modal = new bootstrap.Modal(
          document.getElementById("modalMessage" + modalMessage.value.reference),
          {
            keyboard: false,
            backdrop: "static",
          }
        );
        var modalToggle = document.getElementById("modalMessage" + modalMessage.value.reference);
        modal.show(modalToggle);
      },

      openModalEditUser() {
        var modal = new bootstrap.Modal(
          document.getElementById("modalEditUser"),
          {
            keyboard: false,
            backdrop: "static",
          }
        );
        var modalToggle = document.getElementById("modalEditUser");
        modal.show(modalToggle);
      },

      edit(event) {
        selectedUser.value = event;
        methods.openModalEditUser();
      },

      getAllUsers() {
        loading.value = true;
        UserService.getAllUser()
          .then((response) => {
            methods.responseTable(response.data);
          })
          .catch((e) => {
            let mensagem = "";
            if (e.response.status == 401) {
              mensagem = e.response.data.message;
            } else {
              mensagem = "Ocorreu um erro ao fazer as Listagens";
            }

            methods.openModalMessage("Erro", true, mensagem);
          })
          .finally(() => {
            loading.value = false;
          });
      },

      responseTable(response) {
        response.map((x) => {
          users.value.push({
            Id: x.id,
            Nome: x.nome,
            Email: x.login,
            Cpf: x.cpf,
            Telefone: x.telefone,
            Administrador: x.admin,
          });
        });
      },
    });

    onMounted(() => {
      methods.getAllUsers();
    });

    provide("selectedUser", selectedUser);

    return {
      users,
      selectedUser,
      header,
      loading,
      modalMessage,
      ...toRefs(methods),
    };
  },
};
</script>