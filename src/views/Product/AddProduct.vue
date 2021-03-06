<template>
  <div class="text-start">
    <div class="col-12">
      <h3>Criar produto</h3>
      <hr class="col-4" style="height: 3px; margin-top: -5px" />
    </div>
  </div>

  <div class="row d-flex justify-content-center mt-4">
    <div class="row col-10">
      <div class="form-floating col-4 mb-4 float-start">
        <select
          name="companies"
          class="form-select"
          v-model="selectedCompany"
          :disabled="!isCompanySelected"
        >
          <option value="" selected disabled>Selecione:</option>
          <template v-for="company in companies" :key="company.id">
            <option :value="company.id">
              {{ company.nome }}
            </option>
          </template>
        </select>
        <label for="floatingInputCompanyName" class="ps-3 ms-1">Empresa</label>
      </div>

      <div class="col-4 float-end">
        <button
          class="btn btn-dark btn-lg rounded-circle"
          @click="getMarcaByCompanyId(), getTipoByCompanyId()"
        >
          <i class="bx bx-search fs-4 mt-2"></i>
        </button>
      </div>
    </div>

    <div class="row col-10">
      <div class="form-floating col-6 mb-4">
        <select
          class="form-select"
          v-model="selectedType"
          :disabled="isCompanySelected"
        >
          <option value="" selected disabled>Selecione:</option>
          <template v-for="type in types" :key="type.id">
            <option :value="type">
              {{ type.nome }}
            </option>
          </template>
        </select>
        <label for="floatingInputCompanyName" class="ps-3 ms-1">Tipo</label>
      </div>

      <div class="form-floating col-6 mb-4">
        <select
          class="form-select"
          v-model="selectedBrand"
          :disabled="isCompanySelected"
        >
          <option value="" selected disabled>Selecione:</option>
          <template v-for="brand in brands" :key="brand.id">
            <option :value="brand">
              {{ brand.nome }}
            </option>
          </template>
        </select>
        <label for="floatingInputCompanyName" class="ps-3 ms-1">Marca</label>
      </div>

      <div class="form-floating col-6 mb-4">
        <input
          type="text"
          class="form-control"
          id="floatingInputTelephone"
          placeholder="Nome"
          v-model="product.name"
          required
          :disabled="isCompanySelected"
        />
        <label for="floatingInputTelephone" class="ps-3 ms-1">Nome</label>
      </div>

      <div class="form-floating col-6 mb-4">
        <input
          type="number"
          min="0"
          class="form-control"
          id="floatingInputTelephone"
          placeholder="Valor"
          v-model="product.value"
          required
          :disabled="isCompanySelected"
        />
        <label for="floatingInputTelephone" class="ps-3 ms-1">Valor</label>
      </div>
    </div>
  </div>

  <div class="text-end col-11">
    <button
      class="btn btn-success me-2"
      :disabled="allFilled"
      @click="insertProduto()"
    >
      Criar
    </button>
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
import { computed, onMounted, provide } from "@vue/runtime-core";

import ModalMessage from "@/components/Modal/ModalMessage.vue";

import CompanyService from "@/services/CompanyService";

import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";
import TokenUtils from "@/utils/TokenUtils";
import ProductService from "@/services/ProductService";
import MarcaProdutoService from "@/services/MarcaProdutoService";
import ProductTypeService from "@/services/ProductTypeService";

export default {
  name: "AddProduct",
  components: {
    ModalMessage,
  },
  setup() {
    const product = ref({
      company: "",
      brand: "",
      type: "",
      name: "",
      value: "",
    });

    const companies = ref([]);

    const company = ref([]);

    const brands = ref([]);
    const types = ref([]);

    const token = ref({});

    const loading = ref(false);

    const isCompanySelected = computed(() => {
      let notSelected = false;

      if (brands.value.length == 0 && types.value.length == 0) {
        notSelected = true;
      }
      return notSelected;
    });

    const selectedCompany = ref(0);
    const selectedBrand = ref(0);
    const selectedType = ref(0);

    const offsetCompany = ref(0);
    const limitCompany = ref(9999);
    const total = ref(0);
    const orderByCompany = ref("id");
    const orderAscCompany = ref(false);

    const modalMessage = ref({
      title: "",
      isError: false,
      message: "",
      reference: "AddProduct",
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

      getMarcaByCompanyId() {
        MarcaProdutoService.getMarcaByCompanyId(selectedCompany.value)
          .then((response) => {
            brands.value = response.data.content;
          })
          .catch((e) => {
            console.log(e);
            let mensagem = "";
            if (e.response.status == 400) {
              mensagem = e.response.data.errors[0];
            } else {
              mensagem = "Ocorreu um erro.";
            }

            methods.openModalMessage("Erro", true, mensagem, true);
          });
      },

      getTipoByCompanyId() {
        ProductTypeService.getTipoByCompanyId(selectedCompany.value)
          .then((response) => {
            types.value = response.data.content;
          })
          .catch((e) => {
            let mensagem = "";
            if (e.response.status == 400) {
              mensagem = e.response.data.errors[0];
            } else {
              mensagem = "Ocorreu um erro.";
            }

            methods.openModalMessage("Erro", true, mensagem, true);
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

      closeAction() {
        window.location.reload();
      },

      insertProduto() {
        let obj = {
          idEmpresa: selectedCompany.value,
          idMarca: selectedBrand.value.id,
          idTipo: selectedType.value.id,
          nome: product.value.name,
          valorUnitario: product.value.value,
        };

        console.log(obj);

        ProductService.registerProduct(obj)
          .then(() => {
            methods.openModalMessage(
              "Sucesso",
              false,
              "Produto cadastrado com sucesso.",
              true
            );
          })
          .catch((e) => {
            let mensagem = "";
            if (e.response.status == 400) {
              mensagem = e.response.data.errors[0];
            } else {
              mensagem = "Ocorreu um erro ao cadastrar produto.";
            }

            methods.openModalMessage("Erro", true, mensagem);
          });
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

    const allFilled = computed(() => {
      let bloquear = true;
      let cont = 0;

      if (selectedCompany.value != null && selectedCompany.value != "") {
        cont++;
      }
      if (selectedBrand.value.id != null && selectedBrand.value.id != "") {
        cont++;
      }
      if (selectedType.value.id != null && selectedType.value.id != "") {
        cont++;
      }
      if (product.value.name != null && product.value.name != "") {
        cont++;
      }
      if (
        product.value.value != null &&
        product.value.value != "" &&
        product.value.value > 0
      ) {
        cont++;
      }

      if (cont == 5) {
        bloquear = false;
      }

      return bloquear;
    });

    return {
      product,
      token,
      company,
      companies,
      brands,
      types,
      modalMessage,
      selectedCompany,
      selectedType,
      selectedBrand,
      orderByCompany,
      orderAscCompany,
      offsetCompany,
      limitCompany,
      loading,
      isCompanySelected,
      ...toRefs(methods),
      allFilled,
    };
  },
};
</script>
