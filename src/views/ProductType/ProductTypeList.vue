<template>
  <div class="row">
    <div class="col-12 text-start">
      <h3>Listagem de Tipos de produtos</h3>
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
            @click="getProductTypeByCompanyId()"
          >
            <i class="bx bx-search fs-4 mt-2"></i>
          </button>
        </div>

        <div class="col-4 mt-1">
          <button class="btn btn-dark" @click="openModalAddProductType()">
            <i class="bx bx-plus fs-5"></i>
            <span class="ms-1">Cadastrar Tipo de produto</span>
          </button>
        </div>
      </div>
    </div>
  </div>

  <div class="row mt-4">
    <Table
      :isList="true"
      :Header="header"
      :loading="loading"
      :ArrayData="productsType"
      :offset="offset"
      :limit="limit"
      :total="total"
      :hasFilter="true"
      :hasPagination="true"
      :editButton="true"
      :isAdmin="token.admin"
      @search="search($event)"
      @clean="resetTable()"
      @ordenation="ordenation($event)"
      @edit="edit($event)"
      @remove="remove($event)"
      @changePage="changePage($event)"
    />
  </div>

  <ModalAddProductType @closeAction="closeAction()" />

  <ModalEditProductType @closeAction="closeAction()" />

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
import { useRouter } from "vue-router";

import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";

import Table from "@/components/Table/Table.vue";

import BrandService from "@/services/BrandService";
import CompanyService from "@/services/CompanyService";

import ModalMessage from "@/components/Modal/ModalMessage.vue";
import ModalAddProductType from "./Modal/AddProductType.vue";
import ModalEditProductType from "./Modal/EditProductType.vue";

import TokenUtils from "@/utils/TokenUtils";
import ProductTypeService from "@/services/ProductTypeService";

export default {
  name: "ProductTypeList",
  components: {
    Table,
    ModalMessage,
    ModalAddProductType,
    ModalEditProductType,
  },
  setup() {
    const router = useRouter();

    const token = ref({});

    const productsType = ref([]);

    const companies = ref([]);
    const company = ref([]);
    const selectedCompany = ref(0);

    const selectedProductType = ref(0);

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
        id: 5,
        name: "Descrição",
        key: "descricao",
        value: true,
        order: true,
        type: "text",
        filter: "filterDescription",
      },
      {
        id: 4,
        name: "Ativo",
        key: "ativo",
        value: true,
        order: true,
        type: "text",
        filter: "filterAtivo",
      },
      {
        name: "Ações",
        value: false,
        order: false,
      },
    ]);

    const offset = ref(0);
    const offsetCompany = ref(0);

    const limit = ref(10);
    const limitCompany = ref(9999);

    const total = ref(0);

    const orderBy = ref("id");
    const orderAsc = ref(false);

    const orderByCompany = ref("id");
    const orderAscCompany = ref(false);

    const loading = ref(false);

    const modalMessage = ref({
      title: "",
      isError: false,
      message: "",
      reference: "ProductTypeList",
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

      openModalAddProductType() {
        var modal = new bootstrap.Modal(
          document.getElementById("modalAddProductType"),
          {
            keyboard: false,
            backdrop: "static",
          }
        );
        var modalToggle = document.getElementById("modalAddProductType");
        modal.show(modalToggle);
      },

      getCompaniesByUserId() {
        CompanyService.getCompaniesByUserId(token.value.id)
          .then((response) => {
            console.log(response.data);
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

      getProductTypeByCompanyId() {
        ProductTypeService.getTipoByCompanyId(
          selectedCompany.value,
          orderBy.value,
          orderAsc.value,
          offset.value,
          limit.value
        )
          .then((response) => {
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

        methods.getProductTypeByCompanyId();
      },

      search(event) {
        let arrayFilters = {
          filters: [],
        };

        let obj = methods.formatFilter(event);

        arrayFilters.filters.push(obj);

        ProductTypeService.search(
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

      getAllCompanies() {
        loading.value = true;
        CompanyService.getAllCompanies(
          orderByCompany.value,
          orderAscCompany.value,
          offsetCompany.value,
          limitCompany.value
        )
          .then((response) => {
            console.log(response.data.content);
            companies.value = response.data.content;
          })
          .catch((e) => {
            console.log(e);
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
        productsType.value = [];
        response.map((x) => {
          productsType.value.push({
            Id: x.id,
            Nome: x.nome,
            Descricao: x.descricao,
            Ativo: x.ativo,
          });
        });
      },

      edit(event) {
        selectedProductType.value = {
          Id: event.Id,
          IdEmpresa: selectedCompany.value,
          Nome: event.Nome,
          Ativo: event.Ativo,
          Descricao: event.Descricao
        };
        var modal = new bootstrap.Modal(
          document.getElementById("modalEditProductType"),
          {
            keyboard: false,
            backdrop: "static",
          }
        );
        var modalToggle = document.getElementById("modalEditProductType");
        modal.show(modalToggle);
      },

      changePage(event) {
        console.log(event);
        offset.value = event;
        methods.getProductTypeByCompanyId();
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
        methods.getProductTypeByCompanyId();
      },

      resetTable() {
        methods.getProductTypeByCompanyId();
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
    provide("selectedProductType", selectedProductType);

    return {
      router,
      token,
      productsType,
      company,
      companies,
      selectedCompany,
      selectedProductType,
      header,
      offset,
      limit,
      total,
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