<template>
  <div class="row">
    <div class="col-6 text-start">
      <h3>Editar empresa - {{ company.nome }}</h3>
      <hr class="col-10" style="height: 3px; margin-top: -5px" />
    </div>
    <div class="ms-5 row col-5 text-end">
      <div class="col-9">
        <button class="btn btn-success" @click="updateCompany()">
          <i class="bx bx-save fs-5 mt-1"></i>
          <span class="ms-2">Salvar</span>
        </button>
      </div>

      <div class="col-3">
        <router-link :to="'/empresa/produtos/' + router.params.id">
          <button class="btn btn-dark">
            <i class="bx bx-plus fs-5 mt-1"></i>
            <span>Produto</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>

  <div class="text-start ms-3 mt-4">
    <h5>Dados cadastrados</h5>
    <hr
      class="col-2 bg-secondary"
      style="height: 3px; margin-top: -5px; opacity: 1"
    />
  </div>

  <div class="row mt-2 mb-2 d-flex justify-content-center">
    <div class="row col-11">
      <div class="form-floating col-6 mb-3">
        <input
          type="text"
          class="form-control"
          id="floatingInputRazaoSocial"
          placeholder="RazaoSocial"
          v-model="company.nome"
          required
        />
        <label for="floatingInputRazaoSocial" class="ps-3 ms-1"
          >Razão Social</label
        >
      </div>

      <div class="form-floating col-6 mb-3">
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

      <div class="form-floating col-4 mb-3">
        <input
          type="text"
          class="form-control"
          id="floatingInputTelefone"
          placeholder="Telefone"
          v-model="company.telefone"
          required
        />
        <label for="floatingInputTelefone" class="ps-3 ms-1">Telefone</label>
      </div>

      <div class="form-floating col-8 mb-3">
        <input
          type="text"
          class="form-control"
          id="floatingInputEndereco"
          placeholder="Endereço"
          v-model="company.endereco"
          required
        />
        <label for="floatingInputEndereco" class="ps-3 ms-1">Endereço</label>
      </div>
    </div>
  </div>

  <div class="text-start ms-3 mt-4 mb-4">
    <div class="row">
      <div class="col-1 me-5">
        <h5>Funcionários</h5>
      </div>
      <div class="col-1 ms-4">
        <button
          v-if="!showEmployers"
          class="btn btn-white"
          style="margin-top: -5px"
          @click="showEmployers = true"
        >
          <i class="bx bxs-down-arrow"></i>
        </button>
        <button
          v-else-if="showEmployers"
          class="btn btn-white"
          style="margin-top: -5px"
          @click="showEmployers = false"
        >
          <i class="bx bxs-up-arrow"></i>
        </button>
      </div>
    </div>
    <hr
      class="col-2 bg-secondary"
      style="height: 3px; margin-top: -5px; opacity: 1"
    />
  </div>

  <div class="row mt-2 mb-4 d-flex justify-content-center" v-if="showEmployers">
    <div class="row col-11">
      <div class="form-floating col-4 mb-3">
        <input
          type="text"
          class="form-control"
          id="floatingInputCPF"
          v-mask="'###.###.###-##'"
          placeholder="CPF do Funcionário"
          v-model="employerCPF"
          required
        />
        <label for="floatingInputCPF" class="ps-3 ms-1"
          >CPF do Funcionário</label
        >
      </div>

      <div class="col-1 mb-3">
        <button
          class="btn btn-success btn-lg rounded-circle"
          @click="getUserByCPF()"
        >
          <i class="bx bx-search fs-4 mt-2"></i>
        </button>
      </div>

      <div class="form-check-lg form-switch col-2 mt-3">
        <input
          class="form-check-input"
          type="checkbox"
          id="flexSwitchCheckAcessoAoSistema"
          v-model="employer.adminEmpresarial"
        />
        <label
          class="form-check-label ms-2"
          for="flexSwitchCheckAcessoAoSistema"
          >Administrador</label
        >
      </div>

      <div class="col-1 mb-3">
        <button
          class="btn btn-dark btn-lg rounded-circle"
          :disabled="!user"
          @click="addEmployer()"
        >
          <i class="bx bx-plus fs-4 mt-2"></i>
        </button>
      </div>
    </div>

    <Table
      :isList="true"
      :Header="headerEmployees"
      :ArrayData="company.vinculos"
      :hasFilter="false"
      :hasPagination="false"
      :removeButton="true"
      @remove="removeEmployee($event)"
    />
  </div>

  <div class="text-start ms-3 mt-5 mb-3">
    <div class="row">
      <div class="col-1 me-5">
        <h5>Associados</h5>
      </div>
      <div class="col-1 ms-4">
        <button
          v-if="!showPartners"
          class="btn btn-white"
          style="margin-top: -5px"
          @click="showPartners = true"
        >
          <i class="bx bxs-down-arrow"></i>
        </button>
        <button
          v-else-if="showPartners"
          class="btn btn-white"
          style="margin-top: -5px"
          @click="showPartners = false"
        >
          <i class="bx bxs-up-arrow"></i>
        </button>
      </div>
    </div>
    <hr
      class="col-2 bg-secondary"
      style="height: 3px; margin-top: -5px; opacity: 1"
    />
  </div>

  <div class="row mt-2 mb-2 d-flex justify-content-center" v-if="showPartners">
    <div class="row col-11">
      <div class="form-floating col-2 mb-3">
        <select class="form-select" v-model="partner.tipo">
          <option class="text-truncate" value="" selected disabled>
            Selecione:
          </option>
          <!--  <option v-for="(partner, index) in partners" :key="index" :value="partner">
            {{ partner}}
          </option> -->
          <option value="CLIENTE">Cliente</option>
          <option value="FORNECEDOR">Fornecedor</option>
        </select>
        <label class="ps-3 ms-1">Tipo de associado</label>
      </div>

      <div class="form-floating col-2 mb-3">
        <select
          class="form-select"
          v-model="partner.pessoa"
          @change="partner.documento = ''"
        >
          <option value="" selected disabled>Selecione:</option>
          <!--  <option v-for="(partner, index) in partners" :key="index" :value="partner">
            {{ partner}}
          </option> -->
          <option value="PESSOA_FISICA">Física</option>
          <option value="PESSOA_JURIDICA">Jurídica</option>
        </select>
        <label class="ps-3 ms-1">Tipo de pessoa</label>
      </div>

      <div class="form-floating col-4 mb-3">
        <input
          v-if="partner.pessoa == 'PESSOA_FISICA' || !partner.pessoa"
          type="text"
          class="form-control"
          id="floatingInputCPFAndCNPJ"
          v-mask="'###.###.###-##'"
          placeholder="CPF/CNPJ"
          v-model="partner.documento"
          required
        />
        <input
          v-else-if="partner.pessoa == 'PESSOA_JURIDICA'"
          type="text"
          class="form-control"
          id="floatingInputCPFAndCNPJ"
          v-mask="'##.###.###/####-##'"
          placeholder="CPF/CNPJ"
          v-model="partner.documento"
          required
        />
        <label for="floatingInputCPFAndCNPJ" class="ps-3 ms-1">
          {{
            partner.pessoa == "PESSOA_FISICA" || !partner.pessoa
              ? "CPF"
              : "CNPJ"
          }}
        </label>
      </div>

      <div class="form-floating col-4 mb-3">
        <input
          type="text"
          class="form-control"
          id="floatingInputNome"
          :placeholder="
            partner.pessoa == 'PESSOA_FISICA' || !partner.pessoa
              ? 'Nome'
              : 'Razão Social'
          "
          v-model="partner.nome"
          required
        />
        <label for="floatingInputNome" class="ps-3 ms-1">{{
          partner.pessoa == "PESSOA_FISICA" || !partner.pessoa
            ? "Nome"
            : "Razão Social"
        }}</label>
      </div>
    </div>
    <div class="form-floating col-4 mb-4">
      <input
        type="text"
        class="form-control"
        id="floatingInputTelefone"
        placeholder="Telefone"
        v-mask="'(##) #####-####'"
        v-model="partner.telefone"
        required
      />
      <label for="floatingInputTelefone" class="ps-3 ms-1">Telefone</label>
    </div>

    <div class="form-floating col-4 mb-4">
      <input
        type="text"
        class="form-control"
        id="floatingInputEndereco"
        placeholder="Endereço"
        v-model="partner.endereco"
        required
      />
      <label for="floatingInputEndereco" class="ps-3 ms-1">Endereço</label>
    </div>

    <div class="col-1 mb-4">
      <button
        class="btn btn-dark btn-lg rounded-circle"
        :disabled="!allOkPartner"
        @click="addPartner()"
      >
        <i class="bx bx-plus fs-4 mt-2"></i>
      </button>
    </div>

    <Table
      :isList="true"
      :Header="headerPartners"
      :ArrayData="company.associado"
      :hasFilter="false"
      :hasPagination="false"
      :removeButton="true"
      :editButton="true"
      @edit="editPartner($event)"
      @remove="removePartner($event)"
    />
  </div>

  <ModalEditPartner />

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
import { useRoute } from "vue-router";

import Table from "@/components/Table/Table.vue";

import ModalMessage from "@/components/Modal/ModalMessage.vue";
import ModalEditPartner from "./Modal/ModalEditPartner.vue";

import CompanyService from "@/services/CompanyService";
import EmployeeService from "@/services/EmployeeService";
import PartnerService from "@/services/PartnerService";
import UserService from "@/services/UserService";

import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";
import TokenUtils from "@/utils/TokenUtils";

export default {
  name: "CompanyEdit",
  components: {
    Table,
    ModalMessage,
    ModalEditPartner,
  },
  setup() {
    const router = useRoute();
    const idCompany = ref("");

    const token = ref({});

    const company = ref({});

    const employerCPF = ref("");

    const employer = ref({
      adminEmpresarial: false,
    });

    const user = ref("");

    const showEmployers = ref(false);

    const headerEmployees = ref([
      {
        name: "Id",
        key: "id",
        value: false,
        order: false,
        hidden: true,
      },
      {
        id: 1,
        name: "Nome",
        key: "nome",
        value: false,
        order: false,
      },
      {
        name: "IdEmpresaVinculo",
        key: "idEmpresaVinculo",
        value: false,
        order: false,
        hidden: true,
      },
      {
        name: "usuarioCriador",
        key: "usuarioCriador",
        value: false,
        order: false,
        hidden: true,
      },
      {
        name: "usuarioFuncionario",
        key: "usuarioFuncionario",
        value: false,
        order: false,
        hidden: true,
      },
      {
        id: 2,
        name: "CPF",
        key: "cpf",
        value: false,
        order: false,
      },
      {
        id: 3,
        name: "Email",
        key: "login",
        value: false,
        order: false,
      },
      {
        id: 4,
        name: "Telefone",
        key: "telefone",
        value: false,
        order: false,
      },
      {
        id: 5,
        name: "Endereço",
        key: "endereco",
        value: false,
        order: false,
      },
      {
        id: 6,
        name: "Administrador da Empresa",
        key: "adminEmpresarial",
        value: false,
        order: false,
      },
      {
        id: 7,
        name: "Status",
        key: "status",
        value: false,
        order: false,
      },
      {
        name: "Ações",
        value: false,
        order: false,
      },
    ]);

    const showPartners = ref(false);

    const partner = ref({
      tipo: "",
      pessoa: "",
      documento: "",
      nome: "",
      telefone: "",
      endereco: "",
    });

    const headerPartners = ref([
      {
        id: 1,
        name: "Id",
        key: "id",
        value: false,
        order: false,
        hidden: true,
      },
      {
        id: 2,
        name: "Nome",
        key: "nome",
        value: false,
        order: false,
      },
      {
        id: 3,
        name: "Tipo associado",
        key: "tipoAssociado",
        value: false,
        order: false,
      },
      {
        id: 4,
        name: "Tipo pessoa",
        key: "tipoPessoa",
        value: false,
        order: false,
      },
      {
        id: 5,
        name: "Documento",
        key: "documento",
        value: false,
        order: false,
      },
      {
        id: 6,
        name: "Telefone",
        key: "telefone",
        value: false,
        order: false,
      },
      {
        id: 7,
        name: "Endereço",
        key: "endereco",
        value: false,
        order: false,
      },
      {
        name: "Ações",
        value: false,
        order: false,
      },
    ]);

    const selectedPartner = ref({});

    const modalMessage = ref({
      title: "",
      isError: false,
      message: "",
      reference: "CompanyEdit",
      needsRefresh: false,
    });

    const methods = reactive({
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

      openModalEditPartner() {
        var modal = new bootstrap.Modal(
          document.getElementById("modalEditPartner"),
          {
            keyboard: false,
            backdrop: "static",
          }
        );
        var modalToggle = document.getElementById("modalEditPartner");
        modal.show(modalToggle);
      },

      getCompanyById() {
        CompanyService.getCompanyById(router.params.id)
          .then((response) => {
            company.value = response.data;

            methods.responseTableEmployer(company.value.vinculos);
            methods.responseTablePartner(company.value.associado);
          })
          .catch((e) => {
            let mensagem = "";
            if (e.response.status == 401) {
              mensagem = e.response.data.errors[0];
            } else {
              mensagem = "Ocorreu um erro ao buscar a empresa.";
            }

            methods.openModalMessage("Erro", true, mensagem);
          });
      },

      responseTableEmployer(response) {
        company.value.vinculos = [];
        response.map((x) => {
          company.value.vinculos.push({
            id: x.id,
            Nome: x.usuarioFuncionario.nome,
            idEmpresaVinculo: router.params.id,
            usuarioCriador: {
              id: x.usuarioCriador.id,
            },
            usuarioFuncionario: {
              id: x.usuarioFuncionario.id,
            },
            CPF: x.usuarioFuncionario.cpf,
            Email: x.usuarioFuncionario.login,
            Telefone: x.usuarioFuncionario.telefone,
            Endereco: x.usuarioFuncionario.endereco,
            adminEmpresarial: x.adminEmpresarial,
            status: x.status,
          });
        });
      },

      responseTablePartner(response) {
        company.value.associado = [];
        response.map((x) => {
          company.value.associado.push({
            id: x.id,
            nome: x.nome,
            tipoAssociado: x.tipoAssociado,
            tipoPessoa: x.tipoPessoa,
            documento: x.documento,
            telefone: x.telefone,
            endereco: x.endereco,
          });
        });
      },

      getUserByCPF() {
        UserService.getUserByCPF(employerCPF.value)
          .then((response) => {
            user.value = response.data;
          })
          .catch((e) => {
            let mensagem = "";
            if (e.response.status == 404) {
              mensagem = e.response.data.errors[0];
            } else {
              mensagem = "Ocorreu um erro ao buscar usuário.";
            }

            methods.openModalMessage("Erro", true, mensagem);
          });
      },

      addEmployer() {
        let obj = {
          adminEmpresarial: employer.value.adminEmpresarial,
          idEmpresaVinculo: router.params.id,
          status: false,
          usuarioCriador: {
            id: token.value.id,
          },
          usuarioFuncionario: {
            id: user.value.id,
            login: user.value.login,
          },
        };

        EmployeeService.insertEmployerInCompany(obj)
          .then(() => {
            methods.openModalMessage(
              "Sucesso",
              false,
              "Funcionário inserido com sucesso.",
              true
            );
          })
          .catch((e) => {
            let mensagem = "";
            if (e.response.status == 401) {
              mensagem = e.response.data.errors[0];
            } else {
              mensagem = "Ocorreu um erro ao inserir Funcionário.";
            }

            methods.openModalMessage("Erro", true, mensagem);
          });
      },

      addPartner() {
        let obj = {
          documento: partner.value.documento,
          endereco: partner.value.endereco,
          idEmpresa: router.params.id,
          nome: partner.value.nome,
          telefone: partner.value.telefone,
          tipoAssociado: partner.value.tipo,
          tipoPessoa: partner.value.pessoa,
        };
        PartnerService.insertPartnerInCompany(obj)
          .then(() => {
            methods.openModalMessage(
              "Sucesso",
              false,
              "Associado cadastrado com sucesso.",
              true
            );

            partner.value.tipo = "";
            partner.value.pessoa = "";
            partner.value.documento = "";
            partner.value.nome = "";
            partner.value.telefone = "";
            partner.value.endereco = "";
          })
          .catch((e) => {
            let mensagem = "";
            if (e.response.status == 400) {
              mensagem = e.response.data.errors[0];
            } else {
              mensagem = "Ocorreu um erro ao inserir Associado.";
            }

            methods.openModalMessage("Erro", true, mensagem);
          });
      },

      updateCompany() {
        let obj = {
          associado: [],
          cnpj: company.value.cnpj,
          endereco: company.value.endereco,
          id: company.value.id,
          idUsuarioCriador: company.value.idUsuarioCriador,
          nome: company.value.nome,
          telefone: company.value.telefone,
          vinculos: [],
        };

        console.log(company.value);
        CompanyService.updateCompany(obj)
          .then(() => {
            methods.openModalMessage(
              "Sucesso",
              false,
              "A empresa " +
                company.value.nome +
                " foi atualizada com sucesso.",
              true
            );
          })
          .catch((e) => {
            let mensagem = "";
            if (e.response.status == 401) {
              mensagem = e.response.data.errors[0];
            } else {
              mensagem =
                "Ocorreu um erro ao atualizar a empresa " +
                company.value.nome +
                ".";
            }

            methods.openModalMessage("Erro", true, mensagem);
          });
      },

      closeAction() {
        methods.getCompanyById();
      },

      getTokenToJson() {
        let tokenCoded = localStorage.getItem("token");
        token.value = TokenUtils.getTokenAndDecodeToJson(tokenCoded);
      },

      removeEmployee(event) {
        console.log(event);
        EmployeeService.deleteEmployee(event.id)
          .then(() => {
            methods.openModalMessage(
              "Sucesso",
              false,
              "O funcionário " + event.Nome + " foi deletado.",
              true
            );
          })
          .catch((e) => {
            let mensagem = "";
            if (e.response.status == 401) {
              mensagem = e.response.data.message;
            } else {
              mensagem =
                "Ocorreu um erro ao deletar o funcionário " + event.Nome + ".";
            }

            methods.openModalMessage("Erro", true, mensagem, false);
          });
      },

      editPartner(event) {
        selectedPartner.value = event;
        methods.openModalEditPartner();
      },

      removePartner(event) {
        console.log(event);
        PartnerService.deletePartner(event.id)
          .then(() => {
            methods.openModalMessage(
              "Sucesso",
              false,
              "O associado foi deletado.",
              true
            );
          })
          .catch((e) => {
            let mensagem = "";
            if (e.response.status == 401) {
              mensagem = e.response.data.message;
            } else {
              mensagem =
                "Ocorreu um erro ao deletar o associado " + event.Nome + ".";
            }

            methods.openModalMessage("Erro", true, mensagem, false);
          });
      },
    });

    const allOkPartner = computed(() => {
      let allOK;
      let cont = 0;

      if (partner.value.tipo != null && partner.value.tipo != "") {
        cont++;
      }
      if (partner.value.pessoa != null && partner.value.pessoa != "") {
        cont++;
      }
      if (partner.value.documento != null && partner.value.documento != "") {
        cont++;
      }
      if (partner.value.nome != null && partner.value.nome != "") {
        cont++;
      }
      if (partner.value.telefone != null && partner.value.telefone != "") {
        cont++;
      }
      if (partner.value.endereco != null && partner.value.pessoa != "") {
        cont++;
      }

      if (cont == 6) {
        allOK = true;
      }

      return allOK;
    });

    provide("selectedPartner", selectedPartner);
    provide("idCompany", idCompany);

    onMounted(() => {
      idCompany.value = router.params.id;
      methods.getCompanyById();
      methods.getTokenToJson();
    });

    return {
      router,
      idCompany,
      token,
      company,
      employerCPF,
      employer,
      user,
      showEmployers,
      headerEmployees,
      showPartners,
      partner,
      headerPartners,
      selectedPartner,
      modalMessage,
      ...toRefs(methods),
      allOkPartner,
    };
  },
};
</script>