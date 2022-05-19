<template>
  <div class="text-start">
    <div class="col-12">
      <h3>Criar produto</h3>
      <hr class="col-4" style="height: 3px; margin-top: -5px" />
    </div>
  </div>

  <div class="row d-flex justify-content-center mt-4">
    <div class="row col-10">
      <div class="form-floating col-6 mb-4">
        <select class="form-select" v-model="product.company">
          <option value="" selected disabled>Selecione:</option>
          <template v-for="company in companies" :key="company.id">
            <option v-if="company.id === true" :value="company">
              {{ company.name }}
            </option>
          </template>
        </select>
        <label for="floatingInputCompanyName" class="ps-3 ms-1">Empresa</label>
      </div>

      <div class="form-floating col-6 mb-4">
        <select class="form-select" v-model="product.brand">
          <option value="" selected disabled>Selecione:</option>
          <template v-for="brand in brands" :key="brand.id">
            <option v-if="brand.id === true" :value="brand">
              {{ brand.name }}
            </option>
          </template>
        </select>
        <label for="floatingInputCompanyName" class="ps-3 ms-1">Marca</label>
      </div>
    </div>

    <div class="row col-10">
      <div class="form-floating col-6 mb-4">
        <select class="form-select" v-model="product.type">
          <option value="" selected disabled>Selecione:</option>
          <template v-for="type in types" :key="type.id">
            <option v-if="type.id === true" :value="type">
              {{ type.name }}
            </option>
          </template>
        </select>
        <label for="floatingInputCompanyName" class="ps-3 ms-1">Tipo</label>
      </div>

      <div class="form-floating col-6 mb-4">
        <input
          type="text"
          class="form-control"
          id="floatingInputTelephone"
          placeholder="Nome"
          v-model="product.name"
          required
        />
        <label for="floatingInputTelephone" class="ps-3 ms-1">Nome</label>
      </div>

      <div class="form-floating col-6 mb-4">
        <input
          type="text"
          class="form-control"
          id="floatingInputTelephone"
          placeholder="Valor"
          v-model="product.value"
          required
        />
        <label for="floatingInputTelephone" class="ps-3 ms-1">Valor</label>
      </div>
    </div>
  </div>

  <div class="text-end col-11">
    <button class="btn btn-success me-2" @click="getUserById()">Criar</button>
  </div>

  <ModalMessage
    :title="modalMessage.title"
    :isError="modalMessage.isError"
    :message="modalMessage.message"
    :reference="modalMessage.reference"
    :redirect="'/produtos'"
  />
</template>

<script>
import { reactive, ref, toRefs } from "@vue/reactivity";

import ModalMessage from "@/components/Modal/ModalMessage.vue";

import CompanyService from "@/services/CompanyService";

import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";
import TokenUtils from "@/utils/TokenUtils";

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
    const brands = ref([]);
    const types = ref([]);

    const modalMessage = ref({
      title: "",
      isError: false,
      message: "",
      reference: "AddProduct",
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

      insertCompany(idUsuario) {
        let obj = {
          associado: [],
          cnpj: company.value.cnpj,
          endereco: company.value.endereco,
          idUsuarioCriador: idUsuario,
          nome: company.value.nome,
          telefone: company.value.telefone,
          vinculos: [],
        };

        console.log(obj);

        CompanyService.registerCompany(obj)
          .then(() => {
            methods.openModalMessage(
              "Sucesso",
              false,
              "Empresa criada com sucesso."
            );
          })
          .catch((e) => {
            let mensagem = "";
            if (e.response.status == 400) {
              mensagem = e.response.data.message;
            } else {
              mensagem = "Ocorreu um erro ao cadastrar Empresa.";
            }

            methods.openModalMessage("Erro", true, mensagem);
          });
      },

      getUserById() {
        let token = TokenUtils.getTokenAndDecodeToJson(
          localStorage.getItem("token")
        );

        methods.insertCompany(token.id);
      },
    });

    return {
      product,
      companies,
      brands,
      types,
      modalMessage,
      ...toRefs(methods),
    };
  },
};
</script>