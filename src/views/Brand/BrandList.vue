<template>
  <div class="row">
    <div class="col-12 text-start">
      <h3>Listagem de Marcas</h3>
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
            @click="getBrandsByCompanyId()"
          >
            <i class="bx bx-search fs-4 mt-2"></i>
          </button>
        </div>

        <div class="col-4 mt-1">
          <button class="btn btn-dark" @click="openModalAddBrand()">
            <i class="bx bx-plus fs-5"></i>
            <span class="ms-1">Cadastrar Marca</span>
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
      :ArrayData="brands"
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

  <ModalAddBrand @closeAction="closeAction()" />

  <ModalEditBrand @closeAction="closeAction()" />

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
import ModalAddBrand from "./Modal/AddBrand.vue";
import ModalEditBrand from "./Modal/EditBrand.vue";

import TokenUtils from "@/utils/TokenUtils";

export default {
  name: "BrandList",
  components: {
    Table,
    ModalMessage,
    ModalAddBrand,
    ModalEditBrand,
  },
  setup() {
    const router = useRouter();

    const token = ref({});

    const brands = ref([]);

    const companies = ref([]);
    const company = ref([]);
    const selectedCompany = ref("");

    const selectedBrand = ref(0);

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
      reference: "BrandList",
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

      openModalAddBrand() {
        var modal = new bootstrap.Modal(
          document.getElementById("modalAddBrand"),
          {
            keyboard: false,
            backdrop: "static",
          }
        );
        var modalToggle = document.getElementById("modalAddBrand");
        modal.show(modalToggle);
      },

      getCompaniesByUserId() {
        CompanyService.getCompaniesByUserId(token.value.id)
          .then((response) => {
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

      getBrandsByCompanyId() {
        BrandService.getBrandsByCompanyId(
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

        methods.getBrandsByCompanyId();
      },

      search(event) {
        let arrayFilters = {
          filters: [],
        };

        let obj = methods.formatFilter(event);

        arrayFilters.filters.push(obj);

        BrandService.search(
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

      responseTable(response) {
        brands.value = [];
        response.map((x) => {
          brands.value.push({
            Id: x.id,
            Nome: x.nome,
            Ativo: x.ativo,
          });
        });
      },

      edit(event) {
        selectedBrand.value = {
          Id: event.Id,
          IdEmpresa: selectedCompany.value,
          Nome: event.Nome,
          Ativo: event.Ativo,
        };
        var modal = new bootstrap.Modal(
          document.getElementById("modalEditBrand"),
          {
            keyboard: false,
            backdrop: "static",
          }
        );
        var modalToggle = document.getElementById("modalEditBrand");
        modal.show(modalToggle);
      },

      changePage(event) {
        offset.value = event;
        methods.getBrandsByCompanyId();
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
        methods.getBrandsByCompanyId();
      },

      resetTable() {
        methods.getBrandsByCompanyId();
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
    provide("selectedBrand", selectedBrand);

    return {
      router,
      token,
      brands,
      companies,
      company,
      selectedCompany,
      header,
      offset,
      limit,
      selectedBrand,
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