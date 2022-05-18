<template>
  <div class="text-start">
    <div class="col-12">
      <h3>Criar empresa</h3>
      <hr class="col-4" style="height: 3px; margin-top: -5px" />
    </div>
  </div>

  <div class="row d-flex justify-content-center mt-4">
    <div class="row col-10">
      <div class="form-floating col-6 mb-4">
        <input
          type="text"
          class="form-control"
          id="floatingInputCompanyName"
          placeholder="Razão social"
          v-model="company.nome"
          required
        />
        <label for="floatingInputCompanyName" class="ps-3 ms-1"
          >Razão social</label
        >
      </div>

      <div class="form-floating col-6 mb-4">
        <input
          type="text"
          class="form-control"
          id="floatingInputCNPJ"
          v-mask="'##.###.###/####-##'"
          placeholder="CNPJ"
          v-model="company.cnpj"
          required
        />
        <label for="floatingInputCNPJ" class="ps-3 ms-1">CNPJ</label>
      </div>
    </div>

    <div class="row col-10">
      <div class="form-floating col-6 mb-4">
        <input
          type="text"
          class="form-control"
          id="floatingInputAddress"
          placeholder="Endereço"
          v-model="company.endereco"
          required
        />
        <label for="floatingInputAddress" class="ps-3 ms-1">Endereço</label>
      </div>

      <div class="form-floating col-6 mb-4">
        <input
          type="text"
          class="form-control"
          id="floatingInputTelephone"
          v-mask="'## #####-####'"
          placeholder="Telefone"
          v-model="company.telefone"
          required
        />
        <label for="floatingInputTelephone" class="ps-3 ms-1">Telefone</label>
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
    :redirect="'/empresas'"
  />
</template>

<script>
import { reactive, ref, toRefs } from "@vue/reactivity";

import ModalMessage from "@/components/Modal/ModalMessage.vue";

import CompanyService from "@/services/CompanyService";

import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";
import TokenUtils from "@/utils/TokenUtils";
import UserService from "@/services/UserService";

export default {
  name: "AddCompany",
  components: {
    ModalMessage,
  },
  setup() {
    const company = ref({
      nome: "",
      cnpj: "",
      endereco: "",
      telefone: "",
      usuario: {},
    });

    const modalMessage = ref({
      title: "",
      isError: false,
      message: "",
      reference: "AddCompany",
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
      company,
      modalMessage,
      ...toRefs(methods),
    };
  },
};
</script>