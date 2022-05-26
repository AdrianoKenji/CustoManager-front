<template>
  <div class="row">
    <div class="col-12 text-start">
      <h3>Listagem de Produtos</h3>
      <hr class="col-10" style="height: 3px; margin-top: -5px" />
    </div>

    <div class="form-floating col-3">
      <select name="companies" class="form-select" v-model="selectedCompany">
        <option value="" selected disabled>Selecione:</option>
        <template v-for="company in companies" :key="company.id">
          <option :value="company.id">
            {{ company.nome }}
          </option>
        </template>
      </select>
      <label for="floatingInputCompanyName" class="ps-3 ms-1">Empresa</label>
    </div>

    <div class="col-2">
      <button
        class="btn btn-dark btn-lg rounded-circle"
        @click="getProductsByCompanyId()"
      >
        <i class="bx bx-search fs-4 mt-2"></i>
      </button>
    </div>

    <div class="col-2">
      <router-link to="/criar-produto">
        <button class="btn btn-dark">
          <i class="bx bx-plus fs-5"></i>
          <span class="ms-1">Cadastrar Produto</span>
        </button>
      </router-link>
    </div>

    <div class="col-2">
      <router-link to="/marcas">
        <button class="btn btn-dark">
          <i class="bx bx-plus fs-5"></i>
          <span class="ms-1">Marcas</span>
        </button>
      </router-link>
    </div>

    <div class="col-2">
      <router-link to="/tipos-produto">
        <button class="btn btn-dark">
          <i class="bx bx-plus fs-5"></i>
          <span class="ms-1">Tipos de produto</span>
        </button>
      </router-link>
    </div>
  </div>

  <div class="row mt-4">
    <Table
      :isList="true"
      :Header="header"
      :loading="loading"
      :ArrayData="products"
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
import { onMounted } from "@vue/runtime-core";
import { useRouter } from "vue-router";

import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";

import Table from "@/components/Table/Table.vue";

import ProductService from "@/services/ProductService";
import CompanyService from "@/services/CompanyService";

import ModalMessage from "@/components/Modal/ModalMessage.vue";

import TokenUtils from "@/utils/TokenUtils";

export default {
  name: "ProductList",
  components: {
    Table,
    ModalMessage,
  },
  setup() {
    const router = useRouter();

    const token = ref({});

    const products = ref([]);

    const companies = ref([]);

    const company = ref([]);

    const selectedCompany = ref(0);

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
        name: "Valor",
        key: "valorUnitario",
        value: true,
        order: true,
        type: "number",
        filter: "filterValor",
      },
      {
        id: 4,
        name: "Ativo",
        key: "ativo",
        value: true,
        order: true,
        type: "select",
        options: ["true", "false"],
        filter: "filterAtivo",
      },
      {
        id: 5,
        name: "Tipo",
        key: "tipoProduto",
        value: true,
        order: true,
        type: "text",
        filter: "filterTipo",
      },
      {
        id: 6,
        name: "Marca",
        key: "marcaProduto",
        value: true,
        order: true,
        type: "text",
        filter: "filterMarca",
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
      reference: "ProductList",
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
          .then((response) => {
            totalCompany.value = response.data.totalElements;
            companies.value = response.data;
          })
          .catch((e) => {
            let mensagem = "";
            if (e.response.status == 400) {
              mensagem = e.response.data.message;
            } else {
              mensagem = "Ocorreu um erro ao obter as empresas.";
            }

            methods.openModalMessage("Erro", true, mensagem, false);
          });
      },

      getProductsByCompanyId() {
        ProductService.getProductsByCompanyId(
          selectedCompany.value,
          orderBy.value,
          orderAsc.value,
          offset.value,
          limit.value
        )
          .then((response) => {
            total.value = response.data.totalElements;
            console.log(response.data);
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

        methods.getProductsByCompanyId();
      },

      search(event) {

        let obj = methods.formatFilter(event);

        ProductService.search(
          obj.value,
          obj.key,
          selectedCompany.value,
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
        products.value = [];
        response.map((x) => {
          products.value.push({
            Id: x.id,
            Nome: x.nome,
            Valor: x.valorUnitario,
            Ativo: x.ativo,
            Tipo: x.tipoProduto.nome,
            Marca: x.marcaProduto.nome,
          });
        });
      },

      edit(event) {
        router.push("/editar-produto/" + event.Id);
      },

      changePage(event) {
        console.log(event);
        offset.value = event;
        methods.getProductsByCompanyId();
      },

      formatFilter(event) {
        let obj = {
          field_type: null,
          key: null,
          operator: null,
          value: null,
        };

        obj.key = event.selectedColumn.key;
        obj.value = event.filteredItem;
        

        return obj;
      },

      closeAction() {
        methods.getProductsByCompanyId();
      },

      resetTable() {
        methods.getProductsByCompanyId();
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
      products,
      company,
      companies,
      header,
      offset,
      limit,
      selectedCompany,
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
