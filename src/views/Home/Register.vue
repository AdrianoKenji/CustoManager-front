<template>
  <div class="mt-4">
    <div class="d-flex justify-content-evenly">
      <div class="col-4 mt-5">
        <div class="">
          <img
            src="@/assets/img/undraw_add_information.svg"
            alt="Adicionando Informações"
            style="height: 300px; width: 380px"
          />
        </div>
      </div>
      <div class="col-7 mt-3">
        <div class="card bg-dark">
          <div class="row">
            <div class="col-6 mt-4">
              <div class="text-start">
                <h4 class="text-white ms-3">Faça seu cadastro</h4>
              </div>
            </div>
            <div class="col-6 mt-3">
              <div class="row">
                <div class="col-2">
                  <button
                    @click="step = 0"
                    :class="
                      step == 0
                        ? 'btn btn-success btn-sm'
                        : 'btn btn-secondary btn-sm'
                    "
                  >
                    <i class="bx bxs-user-detail fs-2 mt-1"></i>
                  </button>
                </div>
                <div class="col-2 mt-2">
                  <span class="text-white fs-6">...</span>
                </div>
                <div class="col-2">
                  <button
                    @click="step = 1"
                    :class="
                      step == 1
                        ? 'btn btn-success btn-sm'
                        : 'btn btn-secondary btn-sm'
                    "
                    :disabled="!nextStepPassword"
                  >
                    <i class="bx bxs-lock fs-2 mt-1"></i>
                  </button>
                </div>
                <div class="col-2 mt-2">
                  <span class="text-white">...</span>
                </div>
                <div class="col-2">
                  <button
                    @click="step = 2"
                    :class="
                      step == 2
                        ? 'btn btn-success btn-sm'
                        : 'btn btn-secondary btn-sm'
                    "
                    :disabled="!nextStepConfirmation"
                  >
                    <i class="bx bxs-check-shield fs-2 mt-1"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="row mt-4 ms-1 me-1" v-if="step == 0">
            <div class="form-floating col-12 mb-4">
              <input
                type="text"
                class="form-control"
                id="floatingInputConfirmPassword"
                placeholder="Nome completo"
                v-model="user.nome"
                required
              />
              <label for="floatingInputConfirmPassword" class="ps-3 ms-1"
                >Nome completo</label
              >
            </div>

            <div class="form-floating col-4 mb-4">
              <input
                type="email"
                class="form-control"
                id="floatingInputConfirmPassword"
                placeholder="E-mail"
                v-model="user.login"
                required
              />
              <label for="floatingInputConfirmPassword" class="ps-3 ms-1"
                >E-mail</label
              >
            </div>

            <div class="form-floating col-4 mb-4">
              <input
                type="text"
                class="form-control"
                id="floatingInputConfirmPassword"
                v-mask="'###.###.###-##'"
                placeholder="CPF"
                v-model="user.cpf"
                required
              />
              <label for="floatingInputConfirmPassword" class="ps-3 ms-1"
                >CPF</label
              >
            </div>

            <div class="form-floating col-4 mb-4">
              <input
                type="text"
                class="form-control"
                id="floatingInputConfirmPassword"
                v-mask="'## #####-####'"
                placeholder="Telefone"
                v-model="user.telefone"
                required
              />
              <label for="floatingInputConfirmPassword" class="ps-3 ms-1"
                >Telefone</label
              >
            </div>

            <div class="form-floating col-8 mb-4">
              <input
                type="text"
                class="form-control"
                id="floatingInputConfirmPassword"
                placeholder="Endereço"
                v-model="user.endereco"
                required
              />
              <label for="floatingInputConfirmPassword" class="ps-3 ms-1"
                >Endereço</label
              >
            </div>

            <div class="form-floating col-4 mb-4">
              <input
                type="date"
                class="form-control"
                id="floatingInputConfirmPassword"
                placeholder="Data de nascimento"
                v-model="user.dataNascimento"
                required
              />
              <label for="floatingInputConfirmPassword" class="ps-3 ms-1"
                >Data de nascimento</label
              >
            </div>
          </div>

          <div class="row mt-4 ms-1 me-1" v-if="step == 1">
            <div class="form-floating col-12 mb-4">
              <input
                type="password"
                class="form-control"
                id="floatingInputPassword"
                placeholder="Senha"
                v-model="user.senha"
                required
              />
              <label for="floatingInputPassword" class="ps-3 ms-1">Senha</label>
            </div>

            <div class="form-floating col-12 mb-4">
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
          </div>

          <div class="row mt-4 ms-1 me-1" v-if="step == 2">
            <div class="form-floating col-12 mb-4">
              <input
                type="text"
                class="form-control"
                id="floatingInputConfirmPassword"
                placeholder="Nome completo"
                v-model="user.nome"
                disabled
                required
              />
              <label for="floatingInputConfirmPassword" class="ps-3 ms-1"
                >Nome completo</label
              >
            </div>

            <div class="form-floating col-4 mb-4">
              <input
                type="email"
                class="form-control"
                id="floatingInputConfirmPassword"
                placeholder="E-mail"
                v-model="user.login"
                disabled
                required
              />
              <label for="floatingInputConfirmPassword" class="ps-3 ms-1"
                >E-mail</label
              >
            </div>

            <div class="form-floating col-4 mb-4">
              <input
                type="text"
                class="form-control"
                id="floatingInputConfirmPassword"
                v-mask="'###.###.###-##'"
                placeholder="CPF"
                v-model="user.cpf"
                disabled
                required
              />
              <label for="floatingInputConfirmPassword" class="ps-3 ms-1"
                >CPF</label
              >
            </div>

            <div class="form-floating col-4 mb-4">
              <input
                type="text"
                class="form-control"
                id="floatingInputConfirmPassword"
                v-mask="'## #####-####'"
                placeholder="Telefone"
                v-model="user.telefone"
                disabled
                required
              />
              <label for="floatingInputConfirmPassword" class="ps-3 ms-1"
                >Telefone</label
              >
            </div>

            <div class="form-floating col-8 mb-4">
              <input
                type="text"
                class="form-control"
                id="floatingInputConfirmPassword"
                placeholder="Endereço"
                v-model="user.endereco"
                disabled
                required
              />
              <label for="floatingInputConfirmPassword" class="ps-3 ms-1"
                >Endereço</label
              >
            </div>

            <div class="form-floating col-4 mb-4">
              <input
                type="date"
                class="form-control"
                id="floatingInputConfirmPassword"
                placeholder="Data de nascimento"
                v-model="user.dataNascimento"
                disabled
                required
              />
              <label for="floatingInputConfirmPassword" class="ps-3 ms-1"
                >Data de nascimento</label
              >
            </div>
          </div>

          <div class="text-end me-3 mb-3" v-if="step == 0 || step == 1">
            <button
              class="btn btn-primary"
              :disabled="step == 0 ? !nextStepPassword : !nextStepConfirmation"
              @click="
                step == 0
                  ? nextPage(step)
                  : verifyPassword(user.senha, confirmPassword)
              "
            >
              Continuar
            </button>
          </div>

          <div class="text-end me-3 mb-3" v-if="step == 2">
            <button class="btn btn-success" @click="register()">
              Cadastrar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <ModalMessage
    :title="modalMessage.title"
    :isError="modalMessage.isError"
    :message="modalMessage.message"
  />
</template>

<script>
import { reactive, ref, toRefs } from "@vue/reactivity";
import { computed } from "@vue/runtime-core";

import ModalMessage from "@/components/Modal/ModalMessage.vue";

import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";
import UserService from "@/services/UserService";

export default {
  name: "Register",
  components: {
    ModalMessage,
  },
  setup() {
    const user = ref({
      nome: "",
      login: "",
      cpf: "",
      telefone: "",
      endereco: "",
      dataNascimento: "",
      senha: "",
      admin: true
    });

    const confirmPassword = ref("");

    const step = ref(0);

    const modalMessage = ref({
      title: "",
      isError: false,
      message: "",
    });

    const methods = reactive({
      openModalMessage(title, isError, message) {
        modalMessage.value.title = title;
        modalMessage.value.isError = isError;
        modalMessage.value.message = message;

        var modal = new bootstrap.Modal(
          document.getElementById("modalMessage"),
          {
            keyboard: false,
            backdrop: "static",
          }
        );
        var modalToggle = document.getElementById("modalMessage");
        modal.show(modalToggle);
      },

      nextPage(currentPage) {
        console.log(currentPage);
        if (currentPage == 0) {
          step.value = 1;
        } else if (currentPage == 1) {
          step.value = 2;
        }
      },

      verifyPassword(password, confirmPassword) {
        if (password && confirmPassword) {
          if (password != confirmPassword) {
            methods.openModalMessage("Erro", true, "As senhas não coincidem.");
          } else {
            methods.nextPage(step.value);
          }
        }
      },

      register() {
        UserService.register(user.value)
          .then(() => {
            methods.openModalMessage(
              "Sucesso",
              false,
              "Você foi registrado com sucesso."
            );
          })
          .catch((e) => {
            console.log(e.response);
            let mensagem = "";
            if (e.response.status == 400) {
              mensagem = e.response.data.errors[0];
            } else {
              mensagem = "Ocorreu um erro durante o seu cadastro.";
            }

            methods.openModalMessage("Erro", true, mensagem);
          });
      },
    });

    const nextStepPassword = computed(() => {
      let canNextStep = false;
      let cont = 0;

      if (step.value == 0) {
        if (user.value.nome != null && user.value.nome != "") {
          cont++;
        }
        if (user.value.login != null && user.value.login != "") {
          cont++;
        }
        if (user.value.cpf != null && user.value.cpf != "") {
          cont++;
        }
        if (user.value.telefone != null && user.value.telefone != "") {
          cont++;
        }
        if (user.value.endereco != null && user.value.endereco != "") {
          cont++;
        }
        if (
          user.value.dataNascimento != null &&
          user.value.dataNascimento != ""
        ) {
          cont++;
        }
      }

      if (cont == 6) {
        canNextStep = true;
      }

      return canNextStep;
    });

    const nextStepConfirmation = computed(() => {
      let canNextStep = false;
      let cont = 0;

      if (step.value == 1) {
        if (user.value.senha != null && user.value.senha != "") {
          cont++;
        }
        if (confirmPassword.value != null && confirmPassword.value != "") {
          cont++;
        }
      }

      if (cont == 2) {
        canNextStep = true;
      }

      return canNextStep;
    });

    return {
      user,
      step,
      confirmPassword,
      modalMessage,
      nextStepPassword,
      nextStepConfirmation,
      ...toRefs(methods),
    };
  },
};
</script>

<style scoped>
</style>