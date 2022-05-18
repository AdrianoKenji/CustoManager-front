<template>
  <div class="text-start">
    <div class="col-12">
      <h3>Listagem de Usuários</h3>
      <hr class="col-4" style="height: 3px; margin-top: -5px" />
    </div>
  </div>

  <div class="row mt-4">
    <Table
      :isList="true"
      :Header="header"
      :loading="loading"
      :ArrayData="users"
      :offset="offset"
      :limit="limit"
      :total="total"
      :hasFilter="true"
      :hasPagination="true"
      :editButton="true"
      :removeButton="true"
      @search="search($event)"
      @clean="resetTable()"
      @ordenation="ordenation($event)"
      @edit="edit($event)"
      @remove="remove($event)"
      @changePage="changePage($event)"
    />
  </div>

  <ModalEditUser @closeAction="closeAction()" />

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
        id: 1,
        name: "Id",
        key: "id",
        value: true,
        order: true,
        type: "number",
        filter: "filterId",
      },
      {
        id: 2,
        name: "Nome",
        key: "nome",
        value: true,
        order: true,
        type: "text",
        filter: "filterName",
      },
      {
        id: 3,
        name: "Email",
        key: "login",
        value: true,
        order: true,
        type: "text",
        filter: "filterEmail",
      },
      {
        id: 4,
        name: "CPF",
        key: "cpf",
        value: true,
        order: true,
        type: "text",
        filter: "filterCpf",
      },
      {
        id: 5,
        name: "Telefone",
        key: "telefone",
        value: true,
        order: true,
        type: "text",
        filter: "filterTelephone",
      },
      {
        id: 6,
        name: "Administrador?",
        key: "admin",
        value: true,
        order: true,
        type: "select",
        options: ["true", "false"],
        filter: "filterIsAdmin",
      },
      {
        name: "Ações",
        value: false,
        order: false,
      },
    ]);

    const offset = ref(0);
    const limit = ref(5);
    const total = ref(0);

    const orderBy = ref("Id");
    const orderAsc = ref(false);

    const loading = ref(false);

    const modalMessage = ref({
      title: "",
      isError: false,
      message: "",
      reference: "UserList",
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

      search(event) {
        let arrayFilters = {
          filters: [],
        };

        console.log(event);
        let obj = methods.formatFilter(event);

        arrayFilters.filters.push(obj);

        UserService.search(
          arrayFilters,
          orderBy.value,
          orderAsc.value,
          offset.value,
          limit.value
        )
          .then((response) => {
            total.value = response.data.totalElements;
            methods.responseTable(response.data.content);
          })
          .catch((e) => {
            let mensagem = "";
            if (e.response.status == 401) {
              mensagem = e.response.data.message;
            } else {
              mensagem = "Ocorreu um erro ao fazer a filtragem.";
            }

            methods.openModalMessage("Erro", true, mensagem, false);
          });
      },

      ordenation(event) {
        orderBy.value = event.orderBy;
        orderAsc.value = event.orderAsc;

        methods.getAllUsers();
      },

      getAllUsers() {
        loading.value = true;
        UserService.getAllUser(
          orderBy.value,
          orderAsc.value,
          offset.value,
          limit.value
        )
          .then((response) => {
            total.value = response.data.totalElements;
            methods.responseTable(response.data.content);
          })
          .catch((e) => {
            let mensagem = "";
            if (e.response.status == 401) {
              mensagem = e.response.data.message;
            } else {
              mensagem = "Ocorreu um erro ao fazer as Listagens";
            }

            methods.openModalMessage("Erro", true, mensagem, false);
          })
          .finally(() => {
            loading.value = false;
          });
      },

      responseTable(response) {
        users.value = [];
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

      edit(event) {
        selectedUser.value = event;
        methods.openModalEditUser();
      },

      remove(event) {
        UserService.deleteUser(event.Id)
          .then(() => {
            methods.openModalMessage(
              "Sucesso",
              false,
              "O usuário " + event.Nome + " foi deletado.",
              true
            );
          })
          .catch((e) => {
            let mensagem = "";
            if (e.response.status == 401) {
              mensagem = e.response.data.message;
            } else {
              mensagem =
                "Ocorreu um erro ao deletar o usuário " + event.Nome + ".";
            }

            methods.openModalMessage("Erro", true, mensagem, false);
          });
      },

      changePage(event) {
        offset.value = event;
        methods.getAllUsers();
      },

      formatFilter(event) {
        let obj = {
          field_type: null,
          key: null,
          operator: null,
          value: null,
        };

        if (event.selectedColumn.type == "text") {
          obj.field_type = "STRING";
          obj.key = event.selectedColumn.key;
          obj.operator = "LIKE";
          obj.value = event.filteredItem;
        } else if (event.selectedColumn.type == "number") {
          obj.field_type = "LONG";
          obj.key = event.selectedColumn.key;
          obj.operator = "EQUAL";
          obj.value = event.filteredItem;
        } else if (
          event.filteredItem == "true" ||
          event.filteredItem == "false"
        ) {
          obj.field_type = "BOOLEAN";
          obj.key = event.selectedColumn.key;
          obj.operator = "EQUAL";
          obj.value = event.filteredItem;
        }

        return obj;
      },

      closeAction() {
        methods.getAllUsers();
      },

      resetTable() {
        methods.getAllUsers();
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
      offset,
      limit,
      total,
      orderBy,
      orderAsc,
      loading,
      modalMessage,
      ...toRefs(methods),
    };
  },
};
</script>