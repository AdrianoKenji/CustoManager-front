<template>
  <div class="row featurette">
    <div class="col-4 mt-5">
      <div class="col-12">
        <h2 class="featurette-heading">Faça seu cadastro!</h2>
      </div>
      <div class="col-12">
        <svg
          class="
            bd-placeholder-img bd-placeholder-img
            featurette-image
            img-fluid
            mx-auto
          "
          width="300"
          height="400"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Placeholder: 500x500"
          focusable="false"
        >
          <title>Placeholder</title>
          <rect width="100%" height="100%" fill="#eee" />
        </svg>
      </div>
    </div>
    <div class="col-8 mt-5">
      <div class="row card me-5">
        <div class="col-12">
          <h4 class="text-start mt-2">Dados pessoais</h4>
          <hr class="col-4" style="margin-top: -6px" />
        </div>
        <div class="row mt-2 mb-3">
          <div class="form-floating col-6 mb-3">
            <input
              type="text"
              class="form-control"
              id="floatingInputNome"
              placeholder="Nome"
              v-model="user.name"
              required
            />
            <label for="floatingInputNome" class="ps-3 ms-1">Nome</label>
          </div>

          <div class="form-floating col-6 mb-3">
            <input
              type="text"
              class="form-control"
              id="floatingInputSobrenome"
              placeholder="Sobrenome"
              v-model="sobrenome"
              required
            />
            <label for="floatingInputSobrenome" class="ps-3 ms-1"
              >Sobrenome</label
            >
          </div>

          <div class="form-floating col-6 mb-3">
            <input
              class="form-control"
              id="floatingInputCpf"
              placeholder="CPF"
              v-mask="'###.###.###-##'"
              v-model="user.cpf"
              required
            />
            <label for="floatingInputCpf" class="ps-3 ms-1">CPF</label>
          </div>

          <div class="form-floating col-6 mb-3">
            <input
              type="email"
              class="form-control"
              id="floatingInputEmail"
              placeholder="Email"
              v-model="user.email"
              required
            />
            <label for="floatingInputEmail" class="ps-3 ms-1">Email</label>
          </div>

          <div class="form-floating col-6 mb-3">
            <input
              type="text"
              class="form-control"
              id="floatingInputTelephone"
              placeholder="Telefone"
              v-model="user.telephone"
              required
            />
            <label for="floatingInputTelephone" class="ps-3 ms-1"
              >Telefone</label
            >
          </div>

          <div class="form-floating col-6 mb-3">
            <input
              type="password"
              class="form-control"
              id="floatingInputPassword"
              placeholder="Senha"
              v-model="user.password"
              required
            />
            <label for="floatingInputPassword" class="ps-3 ms-1">Senha</label>
          </div>

          <div class="form-floating col-6 mb-3">
            <input
              type="password"
              class="form-control"
              id="floatingInputConfirmPassword"
              placeholder="Confirmar senha"
              v-model="confirmPassword"
              required
            />
            <label for="floatingInputConfirmPassword" class="ps-3 ms-1"
              >Confirmar senha</label
            >
          </div>

          <div class="col-6"></div>

          <div class="col-6 text-start" v-if="message != ''">
            <span>{{ message }}</span>
          </div>
          <div class="col-6" v-else></div>

          <div class="col-6 text-end">
            <button
              class="btn-primary btn-sm"
              @click="userRegister(user, sobrenome, confirmPassword)"
            >
              Cadastrar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const axios = require("axios");

import { reactive, ref, toRefs } from "@vue/reactivity";

export default {
  name: "Register",
  setup() {
    const user = ref({
      name: "",
      cpf: "",
      email: "",
      telephone: "",
      password: "",
    });

    const sobrenome = ref("");
    const confirmPassword = ref("");

    const message = ref("");

    const methods = reactive({
      userRegister(objectUser, sobrenome, confirmPassword) {
        // Nome + Sobrenome = Nome Completo
        objectUser.name = objectUser.name + " " + sobrenome;

        console.log(objectUser);

        if (objectUser.password === confirmPassword) {
          axios
            .post(
              "https://api-customanager.herokuapp.com/api/users/register",
              objectUser
            )
            .then(() => {
              message.value = "Cadastro feito com sucesso.";
            })
            .catch((e) => {
              message.value =
                "Ocorreu um erro durante o cadastro " +
                e.response.data.message +
                ".";
            });
        } else {
          message.value = "As senhas não coincidem.";
        }
      },
    });

    return {
      user,
      sobrenome,
      confirmPassword,
      message,
      ...toRefs(methods),
    };
  },
};
</script>

<style scoped>
</style>