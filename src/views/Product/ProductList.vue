<template>
  <div class="row">
    <div class="col-6 text-start">
      <h3>Listagem de Produtos</h3>
      <hr class="col-6" style="height: 3px; margin-top: -5px" />
    </div>
    <div class="col-5 text-end">
      <router-link to="/criar-produto">
        <button class="btn btn-dark">
          <i class="bx bx-plus fs-5"></i>
          <span class="ms-1">Produto</span>
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

import Table from "@/components/Table/Table.vue";

import ModalMessage from "@/components/Modal/ModalMessage.vue";
import { useRouter } from "vue-router";

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
    });

    return {
      router,
      token,
      products,
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