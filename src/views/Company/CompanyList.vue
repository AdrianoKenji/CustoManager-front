<template>
  <div class="row">
    <div class="col-6 text-start">
      <h3>Listagem de Empresas</h3>
      <hr class="col-6" style="height: 3px; margin-top: -5px" />
    </div>
    <div class="col-5 text-end">
      <router-link to="/criar-empresa">
        <button class="btn btn-dark">
          <i class="bx bx-plus fs-4"></i>
          <i class="bx bx-buildings fs-3 mt-1"></i>
        </button>
      </router-link>
    </div>
  </div>

  <div class="row mt-4">
    <Table
      :isList="true"
      :Header="header"
      :loading="loading"
      :ArrayData="companies"
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

import CompanyService from "@/services/CompanyService";

import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useRouter } from "vue-router";
import TokenUtils from "@/utils/TokenUtils";

export default {
  name: "CompanyList",
  components: {
    Table,
    ModalMessage,
  },
  setup() {
    const router = useRouter();

    const token = ref({});

    const companies = ref([]);

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
        name: "Razão Social",
        key: "nome",
        value: true,
        order: true,
        type: "text",
        filter: "filterName",
      },
      {
        id: 3,
        name: "CNPJ",
        key: "cnpj",
        value: true,
        order: true,
        type: "text",
        filter: "filterCNPJ",
      },
      {
        id: 4,
        name: "Telefone",
        key: "telefone",
        value: true,
        order: true,
        type: "text",
        filter: "filterCpf",
      },
      {
        id: 5,
        name: "Endereço",
        key: "endereco",
        value: true,
        order: true,
        type: "text",
        filter: "filterTelephone",
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
      reference: "CompanyList",
      needsRefresh: false,
    });

    const methods = reactive({
      getTokenAndDecode() {
        token.value = TokenUtils.getTokenAndDecodeToJson(
          localStorage.getItem("token")
        );
      },

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

      getCompaniesByUserId() {
        CompanyService.getCompaniesByUserId(token.value.id)
          .then(() => {
            companies.value = response.data;
          })
          .catch((e) => {
            let mensagem = "";
            if (e.response.status == 400) {
              mensagem = e.response.data.message;
            } else {
              mensagem = "Ocorreu um erro ao fazer as Listagens.";
            }

            methods.openModalMessage("Erro", true, mensagem, false);
          });
      },

      search(event) {
        let arrayFilters = {
          filters: [],
        };

        console.log(event);
        let obj = methods.formatFilter(event);

        arrayFilters.filters.push(obj);

        console.log(arrayFilters);

        CompanyService.search(
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

        methods.getAllCompanies();
      },

      getAllCompanies() {
        loading.value = true;
        CompanyService.getAllCompanies(
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
        companies.value = [];
        response.map((x) => {
          companies.value.push({
            Id: x.id,
            Nome: x.nome,
            CNPJ: x.cnpj,
            Endereco: x.endereco,
            Telefone: x.telefone,
          });
        });
      },

      edit(event) {
        router.push("/editar-empresa/" + event.Id);
      },

      remove(event) {
        CompanyService.deleteCompany(event.Id)
          .then(() => {
            methods.openModalMessage(
              "Sucesso",
              false,
              "A empresa " + event.Nome + " foi deletada.",
              true
            );
          })
          .catch((e) => {
            let mensagem = "";
            if (e.response.status == 401) {
              mensagem = e.response.data.message;
            } else {
              mensagem =
                "Ocorreu um erro ao deletar a empresa " + event.Nome + ".";
            }

            methods.openModalMessage("Erro", true, mensagem, false);
          });
      },

      changePage(event) {
        console.log(event)
        offset.value = event;
        methods.getAllCompanies();
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
        methods.getAllCompanies();
      },

      resetTable() {
        methods.getAllCompanies();
      },
    });

    onMounted(() => {
      methods.getTokenAndDecode();

      if (token.value.admin) {
        methods.getAllCompanies();
      } else {
        methods.getCompaniesByUserId();
      }
    });

    return {
      router,
      token,
      companies,
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