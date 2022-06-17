<template>
  <div class="mt-4">
    <div class="row d-flex justify-content-evenly">
      <div class="col-lg-4 col-md-5 ms-2 me-2 col-sm-10">
        <div class="text-start">
          <div class="row mt-4">
            <div class="col-6">
              <span class="fw-bold">Gerenciamento</span>
              <br />
              <span
                >Capacidade de operacionar um sistema, com controle dos
                estoques, financeiro e funcionários.</span
              >
            </div>
            <div class="col-6">
              <img
                src="@/assets/img/undraw_operating_system.svg"
                alt="Operação de sistemas"
                style="height: 200; width: 250px"
              />
            </div>

            <div class="col-6 mt-4">
              <img
                src="@/assets/img/undraw_advanced_customization.svg"
                alt="Customização avançada"
                style="height: 200px; width: 200px"
              />
            </div>
            <div class="col-6 mt-4">
              <span class="fw-bold">Customização</span>
              <br />
              <span
                >Personalização com o intuito de cada usuário se sentir único em
                relação ao seu sistema.</span
              >
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-4 col-md-5 col-sm-10 mt-2 ms-2 me-2 mb-3">
        <div class="card bg-dark">
          <div class="">
            <h4 class="text-white mt-4">Faça seu Login</h4>

            <form @submit.prevent="login" class="form-signin" method="post">
                <div class="row d-flex justify-content-center mt-4">
                  <div class="col-10 mb-4">
                    <div class="input-group input-group-lg">
                      <input
                        type="email"
                        class="form-control fs-5"
                        placeholder="Email"
                        maxlength="50"
                        v-model="email"
                        required
                        @change="validateEmail"
                        
                      />
                    </div>
                    <span 
                    style="color:white; font-size:70%" 
                    class="floating-placeholder">{{ msg }}</span>
                  </div>
                  <div class="col-10 mb-4">
                    <div class="input-group input-group-lg">
                      <input
                        type="password"
                        class="form-control fs-5"
                        placeholder="Senha"
                        maxlength="50"
                        required
                        v-model="password"
                      />
                    </div>
                  </div>
                </div>

                <div class="row mb-4">
                  <div class="col-12">
                    <button 
                    type="submit" 
                    class="col-10 btn btn-lg btn-primary" 
                    :disabled="validated ? false : true"
                    @click.prevent="login">
                      <span class="fs-6 text-white">Login</span>
                    </button>
                  </div>
                </div>
            </form>           

            <div class="row mb-4">
              <div class="col-12">
                <button class="btn btn-link" @click="openModalResetPassword()">
                  Esqueci minha senha >
                </button>
              </div>

              <div class="col-12">
                <router-link to="/cadastrar">
                  <button class="btn btn-link">Me cadastrar ></button>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <ModalMessage
    :title="modalMessage.title"
    :isError="modalMessage.isError"
    :message="modalMessage.message"
    :reference="modalMessage.reference"
  />

  <ModalResetPassword />
</template>

<script>
import ModalResetPassword from "./Modal/ModalResetPassword.vue";
import ModalMessage from "@/components/Modal/ModalMessage.vue";

import { reactive, ref, toRefs } from "@vue/reactivity";

import AuthService from "@/services/AuthService";

import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";

import { useRouter } from "vue-router";

export default {
  name: "Home",
  components: {
    ModalResetPassword,
    ModalMessage,
  },
  setup() {
    const route = useRouter();

    const email = ref("");
    const password = ref("");
    const msg = ref("");
    const validated = ref(0);

    const modalMessage = ref({
      title: "",
      isError: false,
      message: "",
      reference: "Home",
    });

    const methods = reactive({
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

      validateEmail() {        
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value)) {
            msg.value = '';
            validated.value = true;
           
        } else {
            msg.value = 'Digite um e-mail válido';
            validated.value = false;
        }
      },

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

      login() {
        let obj = {
          login: email.value,
          senha: password.value,
        };
        AuthService.login(obj)
          .then((response) => {
            console.log(response.data);
            localStorage.setItem("token", response.data.token);
            route.push("/dashboard");
          })
          .catch((e) => {
            let mensagem = "";
            if (e.response.status == 401) {
              mensagem = e.response.data.errors[0];
            } else {
              mensagem = "Ocorreu um erro ao logar.";
            }

            methods.openModalMessage("Erro", true, mensagem);
          });
      },
    });

    return {
      route,
      email,
      password,
      modalMessage,
      msg,
      validated,
      ...toRefs(methods),
    };
  },
};
</script>

<style scoped>
div {
  overflow-x: hidden;
}
</style>
