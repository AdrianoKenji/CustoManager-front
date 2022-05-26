<template>
  <div class="row">
    <div class="col-12 text-start">
      <h3>Listagem de Movimentações</h3>
      <hr class="col-10" style="height: 3px; margin-top: -5px" />
    </div>

    <div class="row">
      <div class="d-flex justify-content-center">
        <div class="form-floating col-3">
          <select
            name="companies"
            class="form-select"
            v-model="selectedCompany"
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

        <div class="col-1">
          <button
            class="btn btn-dark btn-lg rounded-circle"
            @click="getMovementByCompanyId()"
          >
            <i class="bx bx-search fs-4 mt-2"></i>
          </button>
        </div>

        <div class="col-4 mt-1">
          <button class="btn btn-dark" @click="openModalAddMovement()">
            <i class="bx bx-plus fs-5"></i>
            <span class="ms-1">Cadastrar Movimentação</span>
          </button>
        </div>
      </div>
    </div>

    <div class="row mt-4">
      <Table
        :isList="true"
        :Header="header"
        :loading="loading"
        :ArrayData="movements"
        :offset="offset"
        :limit="limit"
        :total="total"
        :hasFilter="true"
        :hasPagination="true"
        :editButton="true"
        @search="search($event)"
        @clean="resetTable()"
        @ordenation="ordenation($event)"
        @edit="edit($event)"
        @changePage="changePage($event)"
      />
    </div>
  </div>

  <ModalAddMovement />

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
import { onMounted, provide, watch } from "@vue/runtime-core";

import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";

import Table from "@/components/Table/Table.vue";

import CompanyService from "@/services/CompanyService";
import MovementService from "@/services/MovementService";

import ModalMessage from "@/components/Modal/ModalMessage.vue";
import ModalAddMovement from "./Modal/AddMovement.vue";

import TokenUtils from "@/utils/TokenUtils";
import PartnerService from "@/services/PartnerService";

export default {
  name: "MovementList",
  components: {
    Table,
    ModalMessage,
    ModalAddMovement,
  },
  setup() {
    const token = ref({});

    const movements = ref([]);

    const companies = ref([]);
    const company = ref([]);
    const selectedCompany = ref(0);

    const partners = ref([]);

    const selectedMovement = ref(0);

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
        name: "Tipo de Movimentação",
        key: "tipoMovimentacao",
        value: true,
        order: true,
        type: "text",
        filter: "filterTipoMovimentacao",
      },
      {
        id: 3,
        name: "Associado",
        key: "associado",
        value: true,
        order: true,
        type: "text",
        filter: "filterAssociado",
      },
      {
        id: 4,
        name: "Descrição",
        key: "descricao",
        value: true,
        order: true,
        type: "text",
        filter: "filterDescricao",
      },
      {
        id: 5,
        name: "Data da Movimentação",
        key: "dataMovimentacao",
        value: true,
        order: true,
        type: "text",
        filter: "filterDataMovimentacao",
      },
      {
        id: 6,
        name: "Valor Total",
        key: "valorTotal",
        value: true,
        order: true,
        type: "text",
        filter: "filterValorTotal",
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

    const offsetCompany = ref(0);
    const limitCompany = ref(9999);
    const totalCompany = ref(0);

    const orderBy = ref("id");
    const orderAsc = ref(false);

    const orderByCompany = ref("id");
    const orderAscCompany = ref(false);

    const loading = ref(false);

    const modalMessage = ref({
      title: "",
      isError: false,
      message: "",
      reference: "MovementList",
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

      openModalAddMovement() {
        var modal = new bootstrap.Modal(
          document.getElementById("modalAddMovement"),
          {
            keyboard: false,
            backdrop: "static",
          }
        );
        var modalToggle = document.getElementById("modalAddMovement");
        modal.show(modalToggle);
      },

      getCompaniesByUserId() {
        CompanyService.getCompaniesByUserId(token.value.id)
          .then((response) => {
            totalCompany.value = response.data.totalElements;
            companies.value = response.data;
          })
          .catch((e) => {
            let mensagem = "";
            if (e.response.status == 400) {
              mensagem = e.response.data.errors[0];
            } else {
              mensagem = "Ocorreu um erro ao obter as empresas.";
            }

            methods.openModalMessage("Erro", true, mensagem, false);
          });
      },

      getMovementByCompanyId() {
        MovementService.getMovementByCompanyId(
          selectedCompany.value,
          orderBy.value,
          orderAsc.value,
          offset.value,
          limit.value
        )
          .then((response) => {
            console.log(response.data.content);
            total.value = response.data.totalElements;
            methods.responseTable(response.data.content);
          })
          .catch((e) => {
            let mensagem = "";
            if (e.response.status == 400) {
              mensagem = e.response.data.errors[0];
            } else {
              mensagem = "Ocorreu um erro ao fazer as listagens.";
            }

            methods.openModalMessage("Erro", true, mensagem, false);
          });
      },

      ordenation(event) {
        orderBy.value = event.orderBy;
        orderAsc.value = event.orderAsc;

        methods.getMovementByCompanyId();
      },

      search(event) {
        let arrayFilters = {
          filters: [],
        };

        let obj = methods.formatFilter(event);

        arrayFilters.filters.push(obj);

        MovementService.search(
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
              mensagem = e.response.data.errors[0];
            } else {
              mensagem = "Ocorreu um erro ao fazer a filtragem.";
            }

            methods.openModalMessage("Erro", true, mensagem, false);
          });
      },

      getAllCompanies() {
        loading.value = true;
        CompanyService.getAllCompanies(
          orderByCompany.value,
          orderAscCompany.value,
          offsetCompany.value,
          limitCompany.value
        )
          .then((response) => {
            companies.value = response.data.content;
          })
          .catch((e) => {
            let mensagem = "";
            if (e.response.status == 401) {
              mensagem = e.response.data.errors[0];
            } else {
              mensagem = "Ocorreu um erro ao fazer as Listagens";
            }

            methods.openModalMessage("Erro", true, mensagem, false);
          })
          .finally(() => {
            loading.value = false;
          });
      },

      /* getPartnersByCompanyId() {
        PartnerService.getPartnerByCompanyId(selectedCompany.value)
          .then((response) => {
            partners.value = response.data;
          })
          .catch((e) => {
            let mensagem = "";
            if (e.response.status == 401) {
              mensagem = e.response.data.errors[0];
            } else {
              mensagem = "Ocorreu um erro ao buscar os associados.";
            }

            methods.openModalMessage("Erro", true, mensagem, false);
          });
      }, */

      responseTable(response) {
        movements.value = [];
        response.map((x) => {
          movements.value.push({
            Id: x.id,
            TipoMovimentacao: x.tipoMovimentacao,
            Associado: x.associado.nome,
            Descricao: x.descricao,
            DataMovimentacao: x.dataMovimentacao,
            ValorTotal: x.valorTotal,
          });
        });
      },

      edit(event) {
        router.push("/editar-produto/" + event.Id);
      },

      changePage(event) {
        offset.value = event;
        methods.getMovementByCompanyId();
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
        methods.getMovementByCompanyId();
      },

      resetTable() {
        methods.getMovementByCompanyId();
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

    provide("companies", companies);
    provide("selectedMovement", selectedMovement);

    return {
      token,
      movements,
      companies,
      company,
      selectedCompany,
      partners,
      header,
      offset,
      limit,
      selectedMovement,
      total,
      totalCompany,
      orderBy,
      orderAsc,
      orderByCompany,
      orderAscCompany,
      offsetCompany,
      limitCompany,
      loading,
      modalMessage,
      ...toRefs(methods),
    };
  },
};
</script>