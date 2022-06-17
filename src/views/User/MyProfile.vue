<template>
  <div class="col-12 row">
    <div class="d-flex justify-content-start">
      <div class="col-1"></div>
      <div class="card col-3">
        <div class="mt-3">
          <img
            src="@/assets/img/undraw_male_avatar.svg"
            alt="Imagem do Perfil"
            style="width: 200px; height: 200px"
          />
          <hr />
        </div>

        <div class="mb-2">
          <h4>{{ token.nome }}</h4>
          <span>{{ token.sub }}</span>
        </div>
      </div>
      <div class="ms-3 card col-7">
        <div class="text-start mt-2 ms-2">
          <div class="col-12 row">
            <div class="col-10">
              <h4>Dados</h4>
            </div>
            <div class="col-1">
              <button
                class="btn btn-warning btn-sm h-75 mb-1"
                @click="canEdit()"
              >
                <i class="bx bx-edit fs-4"></i>
              </button>
            </div>
            <div class="col-1">
              <button
                class="btn btn-primary btn-sm h-75 mb-1"
                @click="openModalResetPassword()"
              >
                <i class="bx bx-lock-alt text-dark fs-4"></i>
              </button>
            </div>
          </div>
          <hr style="margin-top: -5px" />

          <div class="col-12 row">
            <div class="form-floating col-6 mb-3">
              <input
                type="text"
                class="form-control"
                max-length="50"
                id="floatingInputNome"
                placeholder="Nome"
                v-model="user.nome"
                :disabled="canEditData ? false : true"
              />
              <label for="floatingInputNome" class="ps-3 ms-1">Nome</label>
            </div>

            <div class="form-floating col-6 mb-3">
              <input
                type="text"
                class="form-control"
                id="floatingInputCPF"
                placeholder="CPF"
                v-mask="'###.###.###-##'"
                v-model="user.cpf"
                disabled
              />
              <label for="floatingInputCPF" class="ps-3 ms-1">CPF</label>
            </div>

            <div class="form-floating col-6 mb-3">
              <input
                type="email"
                class="form-control"
                max-length="50"
                id="floatingInputEmail"
                placeholder="E-mail"
                v-model="user.login"
                :disabled="canEditData ? false : true"
              />
              <label for="floatingInputEmail" class="ps-3 ms-1">E-mail</label>
            </div>

            <div class="form-floating col-6 mb-3">
              <input
                type="text"
                class="form-control"
                id="floatingInputTelefone"
                placeholder="Telefone"
                v-mask="'(##) #####-####'"
                v-model="user.telefone"
                :disabled="canEditData ? false : true"
              />
              <label for="floatingInputTelefone" class="ps-3 ms-1"
                >Telefone</label
              >
            </div>

            <div class="form-floating col-6 mb-3">
              <input
                type="date"
                class="form-control"
                id="floatingInputNascimento"
                placeholder="Data de Nascimento"
                v-model="user.dataNascimento"
                :disabled="canEditData ? false : true"
              />
              <label for="floatingInputNascimento" class="ps-3 ms-1"
                >Data de Nascimento</label
              >
            </div>

            <div class="form-floating col-6 mb-3">
              <input
                type="text"
                class="form-control"
                max-length="50"
                id="floatingInputEndereco"
                placeholder="Endereço"
                v-model="user.endereco"
                :disabled="canEditData ? false : true"
              />
              <label for="floatingInputEndereco" class="ps-3 ms-1"
                >Endereço</label
              >
            </div>

            <div class="text-end mb-2" v-if="canEditData">
              <button
                class="btn btn-success btn-sm h-100"
                @click="updateUser()"
              >
                <span class="fs-6">Salvar</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <ModalResetPassword />

  <ModalMessage
    :title="modalMessage.title"
    :isError="modalMessage.isError"
    :message="modalMessage.message"
    :reference="modalMessage.reference"
  />
</template>

<script>
import { reactive, ref, toRefs } from "@vue/reactivity";

import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";

import ModalMessage from "@/components/Modal/ModalMessage.vue";
import ModalResetPassword from "./Modal/ModalResetPassword.vue";

import UserService from "@/services/UserService";

import TokenUtils from "@/utils/TokenUtils";
import { onMounted, provide } from "@vue/runtime-core";

export default {
  name: "MyProfile",
  components: {
    ModalMessage,
    ModalResetPassword,
  },
  setup() {
    const user = ref({
      nome: "",
      cpf: "",
      login: "",
      telefone: "",
      dataNascimento: "",
      endereco: "",
      senha: "",
    });

    const token = ref({});

    const canEditData = ref(false);

    const modalMessage = ref({
      title: "",
      isError: false,
      message: "",
      reference: "Dashboard",
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

      openModalResetPassword() {
        var modal = new bootstrap.Modal(
          document.getElementById("modalResetPassword"),
          {
            keyboard: false,
            backdrop: "static",
          }
        );
        var modalToggle = document.getElementById("modalResetPassword");
        modal.show(modalToggle);
      },

      getUserById() {
        UserService.getUserById(token.value.id)
          .then((response) => {
            user.value = response.data;
          })
          .catch((e) => {
            let mensagem = "";
            if (e.response.status == 400) {
              mensagem = e.response.data.errors[0];
            } else {
              mensagem = "Ocorreu um erro ao obter o usuário.";
            }

            methods.openModalMessage("Erro", true, mensagem, false);
          });
      },

      canEdit() {
        canEditData.value = !canEditData.value;
      },

      updateUser() {
        UserService.updateUser(user.value)
          .then(() => {
            methods.openModalMessage(
              "Sucesso",
              false,
              "Dados alterados com sucesso.",
              false
            );

            methods.getUserById();
          })
          .catch((e) => {
            let mensagem = "";
            if (e.response.status == 400) {
              mensagem = e.response.data.errors[0];
            } else {
              mensagem = "Ocorreu um erro ao atualizar o usuário.";
            }

            methods.openModalMessage("Erro", true, mensagem, false);
          });
      },
    });

    onMounted(() => {
      token.value = TokenUtils.getTokenAndDecodeToJson(
        localStorage.getItem("token")
      );

      methods.getUserById();
    });

    provide("user", user);

    return {
      user,
      token,
      canEditData,
      modalMessage,
      ...toRefs(methods),
    };
  },
};
</script>