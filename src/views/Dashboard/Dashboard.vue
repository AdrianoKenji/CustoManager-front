<template>
  <div class="row">
    <div class="d-flex justify-content-center">
      <div class="row">
        <h3>Dashboard</h3>
        <hr class="col-12" style="height: 3px; margin-top: -5px" />
      </div>
    </div>
    <div class="d-flex justify-content-between">
      <div class="">
        <span class="fs-4">Bem vindo, {{ token.nome }}!</span>
      </div>
      <div class="">
        <span class="fs-4 me-5">{{ messageDate }}</span>
      </div>
    </div>

    <div class="d-flex justify-content-center">
      <div class="col-12 row mt-3">
        <div class="card">
          <div class="text-start">
            <h4 class="mt-2">Minhas empresas</h4>
            <hr style="margin-top: -5px" />
          </div>

          <div
            class="d-flex justify-content-center"
            v-if="companies.length > 0"
          >
            <div class="col-11 row">
              <template v-for="(company, index) in companies" :key="index">
                <div class="accordion" id="accordionExample">
                  <div class="accordion-item">
                    <h2 class="accordion-header" id="headingOne">
                      <button
                        class="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseOne"
                        aria-expanded="true"
                        aria-controls="collapseOne"
                      >
                        {{ company.nome }}
                      </button>
                    </h2>
                    <div
                      id="collapseOne"
                      class="accordion-collapse collapse show"
                      aria-labelledby="headingOne"
                      data-bs-parent="#accordionExample"
                    >
                      <div class="accordion-body">
                        <div class="col-12 row">
                          <div class="col-3">
                            <div class="card">
                              <h6 class="mt-2">Lista de Produtos</h6>
                              <div v-if="company.produtos.length > 0">
                                <template
                                  v-for="(produto, index) in company.produtos"
                                  :key="index"
                                >
                                  <span> {{ produto.nome }} </span><br />
                                </template>
                              </div>
                              <div v-else>
                                <span> Nenhum produto cadastrado. </span>
                              </div>
                            </div>
                          </div>
                          <div class="col-3">
                            <div class="card">
                              <h6 class="mt-2">Total movimentações</h6>
                              <span>
                                Compra: {{ company.movimentacao.qt_compra }}
                              </span>
                              <span>
                                Venda: {{ company.movimentacao.qt_venda }}
                              </span>
                            </div>
                          </div>
                          <div class="col-3">
                            <div class="card">
                              <h6 class="mt-2">Lista de Funcionários</h6>
                              <div v-if="company.vinculos.length > 0">
                                <template
                                  v-for="(
                                    funcionario, index
                                  ) in company.vinculos"
                                  :key="index"
                                >
                                  <span>
                                    {{
                                      funcionario.usuarioFuncionario.nome
                                    }} </span
                                  ><br />
                                </template>
                              </div>
                              <div v-else>
                                <span> Nenhum funcionário cadastrado. </span>
                              </div>
                            </div>
                          </div>
                          <div class="col-3">
                            <div class="card">
                              <h6 class="mt-2">Lista de Associados</h6>
                              <div v-if="company.associado.length > 0">
                                <template
                                  v-for="(
                                    associado, index
                                  ) in company.associado"
                                  :key="index"
                                >
                                  <span> {{ associado.nome }} </span><br />
                                </template>
                              </div>
                              <div v-else>
                                <span> Nenhum associado cadastrado. </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </div>
          <div class="col-12 mb-2" v-else>
            <h4>Você não possui empresas cadastradas.</h4>
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
</template>

<script>
import { reactive, ref, toRefs } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";

import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";

import ModalMessage from "@/components/Modal/ModalMessage.vue";

import TokenUtils from "@/utils/TokenUtils";
import CompanyService from "@/services/CompanyService";
import ProductService from "@/services/ProductService";
import MovementService from "@/services/MovementService";

export default {
  name: "Dashboard",
  components: {
    ModalMessage,
  },
  setup() {
    const nome = ref("");

    const companies = ref([]);

    const token = ref({});

    const days = ref([
      "Domingo",
      "Segunda",
      "Terça",
      "Quarta",
      "Quinta",
      "Sexta",
      "Sábado",
    ]);

    const messageDate = ref("");

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

      getDateAndHour() {
        let date = new Date();

        var dia = date.getDate();
        var mes = date.getMonth();
        var ano4 = date.getFullYear();
        var hora = date.getHours();
        var min = date.getMinutes();

        var str_data = dia + "/" + (mes + 1) + "/" + ano4;
        var str_hora = hora + ":" + min;

        messageDate.value =
          days.value[date.getDay()] + ", " + str_data + " às " + str_hora;
      },

      getCompanyByUserId() {
        CompanyService.getCompaniesByUserId(token.value.id)
          .then((response) => {
            companies.value = response.data;

            companies.value.map((x) => {
              x.produtos = [];
              x.movimentacao = {
                qt_venda: 0,
                qt_compra: 0,
              };

              methods.getProductsByCompanyId(x.id);
              methods.getMovementQuantityByCompanyId(x.id);
            });
          })
          .catch((e) => {
            let mensagem = "";
            if (e.response.status == 400) {
              mensagem = e.response.data.errors[0];
            } else {
              mensagem = "Ocorreu um erro ao obter as Empresas do usuário.";
            }

            methods.openModalMessage("Erro", true, mensagem, false);
          });
      },

      getProductsByCompanyId(companyId) {
        ProductService.getProductsByCompanyId(companyId, "id", false, 0, 10)
          .then((response) => {
            let indexCompany = companies.value.findIndex(
              (x) => x.id == companyId
            );

            companies.value[indexCompany].produtos = response.data.content;
          })
          .catch((e) => {
            let mensagem = "";
            if (e.response.status == 400) {
              mensagem = e.response.data.errors[0];
            } else {
              mensagem =
                "Ocorreu um erro ao obter os Produtos da empresa do usuário";
            }

            methods.openModalMessage("Erro", true, mensagem, false);
          });
      },

      getMovementQuantityByCompanyId(companyId) {
        MovementService.getMovementQuantityByCompanyId(companyId)
          .then((response) => {
            let indexCompany = companies.value.findIndex(
              (x) => x.id == companyId
            );

            console.log(response.data);

            companies.value[indexCompany].movimentacao.qt_compra =
              response.data.qt_compra;
            companies.value[indexCompany].movimentacao.qt_venda =
              response.data.qt_venda;
          })
          .catch((e) => {
            let mensagem = "";
            if (e.response.status == 400) {
              mensagem = e.response.data.errors[0];
            } else {
              mensagem =
                "Ocorreu um erro ao obter o total das Movimentações da empresa do usuário";
            }

            methods.openModalMessage("Erro", true, mensagem, false);
          });
      },
    });

    onMounted(() => {
      token.value = TokenUtils.getTokenAndDecodeToJson(
        localStorage.getItem("token")
      );

      methods.getDateAndHour();
      methods.getCompanyByUserId();
    });

    return {
      nome,
      companies,
      token,
      days,
      messageDate,
      modalMessage,
      ...toRefs(methods),
    };
  },
};
</script>