<template>
  <div class="col-6 text-start">
      <h3>Editar produto - {{ product.nome }}</h3>
      <hr class="col-10" style="height: 3px; margin-top: -5px" />
  </div>


  <div class="text-start ms-3 mt-4">
    <h5>Dados cadastrados</h5>
    <hr
      class="col-2 bg-secondary"
      style="height: 3px; margin-top: -5px; opacity: 1"
    />
  </div>

  <div class="row d-flex justify-content-center mt-4">


    <div class="row col-10">

      <div class="form-floating col-6 mb-4 float-start">
       <input
          type="text"
          class="form-control"
          id="floatingInputEmpresa"
          disabled
          placeholder="Valor"
          v-model="product.nomeEmpresa"
          required
        />
        <label for="floatingInputCompanyName" class="ps-3 ms-1">Empresa</label>
      </div>

      <div class="form-check-lg form-switch col-2 mt-3">
        <input
          class="form-check-input"
          type="checkbox"
          id="flexSwitchCheck"
          v-model="product.ativo"
        />
        <label
          class="form-check-label ms-2"
          for="flexSwitchCheck"
          >Ativo</label
        >
      </div>
       
      <div class="col-4 float-end">
          <button class="btn btn-success" @click="updateProduct()">
          <i class="bx bx-save fs-5 mt-1"></i>
          <span class="ms-2">Salvar</span>
        </button>
      </div>

    </div>

    <div class="row col-10">
      <div class="form-floating col-6 mb-4">
        <select class="form-select" 
        @change="verifyType()"
        v-model="product.tipoProduto">
          <option value="" selected disabled>Selecione:</option>
          <template v-for="type in types" :key="type.id">
            <option :value="type">
              {{ type.nome }}
            </option>
          </template>
        </select>
        <label for="floatingInputTipo" class="ps-3 ms-1">Tipo</label>
      </div>      

      <div class="form-floating col-6 mb-4">
        <select class="form-select" 
        @change="verifyBrand()"
        v-model="product.marcaProduto">
          <option value="" selected disabled>Selecione:</option>
          <template v-for="brand in brands" :key="brand.id">
            <option :value="brand">
              {{ brand.nome }}
            </option>
          </template>
        </select>
        <label for="floatingInputMarca" class="ps-3 ms-1">Marca</label>
      </div>

      <div class="form-floating col-6 mb-4">
        <input
          type="text"
          class="form-control"
          id="floatingInputTelephone"
          placeholder="Nome"
          v-model="product.nome"
          required
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
          v-model="product.valorUnitario"
          required
        />
        <label for="floatingInputTelephone" class="ps-3 ms-1">Valor</label>
      </div>
    </div>
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
import { onMounted, provide } from "@vue/runtime-core";

import { routerViewLocationKey, useRoute } from "vue-router";

import ModalMessage from "@/components/Modal/ModalMessage.vue";

import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";
import TokenUtils from "@/utils/TokenUtils";
import ProductService from '@/services/ProductService';
import MarcaProdutoService from '@/services/MarcaProdutoService';
import TipoProdutoService from '@/services/ProductTypeService';

export default {
  name: "EditProduct",
  components: {
    ModalMessage,
  },
  setup() {

    const router = useRoute();
    
    const product = ref({});
    const token = ref({});

    const loading = ref(false);

    const brands = ref([]);
    const types = ref([]);

    const empresaId = ref(0);

    const productBrand = ref(0);
    const productType = ref(0);
    

    const modalMessage = ref({
      title: "",
      isError: false,
      message: "",
      reference: "EditProduct",
    });

    const methods = reactive({

      getTokenAndDecode() {
        token.value = TokenUtils.getTokenAndDecodeToJson(
          localStorage.getItem("token")
        );
      },

      verifyType(event) {
        productType.value = product.value.tipoProduto.id;
      },

      verifyBrand(event) {
        productBrand.value = product.value.marcaProduto.id;
      },

      getProductById() {
        ProductService.getProductById(router.params.id)
          .then((response) => {
            product.value = response.data; 
            console.log(product.value.tipoProduto.nome)

            methods.getMarcaByCompanyId(product.value.idEmpresa);
            methods.getTipoByCompanyId(product.value.idEmpresa);      

          })
          .catch((e) => {
            let mensagem = "";
            if (e.response.status == 401) {
              mensagem = e.response.data.errors[0];
            } else {
              mensagem = "Ocorreu um erro ao buscar o produto.";
            }

            methods.openModalMessage("Erro", true, mensagem);
          });
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

      getMarcaByCompanyId(idEmpresa) {         
         MarcaProdutoService.getMarcaByCompanyId(idEmpresa)
          .then((response) => {
            brands.value = response.data.content;
            console.log(brands.value)
          })
          .catch((e) => {
            console.log(e);
            let mensagem = "";
            if (e.response.status == 400) {
              mensagem = e.response.data.message;
            } else {
              mensagem = "Ocorreu um erro.";
            }

            methods.openModalMessage("Erro", true, mensagem, false);
          });
      },

      getTipoByCompanyId(idEmpresa) {         
         TipoProdutoService.getTipoByCompanyId(idEmpresa)
          .then((response) => {
            types.value = response.data.content;
            console.log(types.value)
          })
          .catch((e) => {      
            let mensagem = "";
            if (e.response.status == 400) {
              mensagem = e.response.data.message;
            } else {
              mensagem = "Ocorreu um erro.";
            }

            methods.openModalMessage("Erro", true, mensagem, false);
          });
      },

     updateProduct() {

       let newBrand = (productBrand.value == "") ? product.value.marcaProduto.id : productBrand.value;
       let newType =  (productType.value == "") ? product.value.tipoProduto.id : productType.value;

        let obj = {
          id: product.value.id,
          idEmpresa: product.value.idEmpresa,
          idMarca: newBrand,
          idTipo: newType,
          nome: product.value.nome,
          ativo: product.value.ativo,
          valorUnitario: product.value.valorUnitario,
        };

        console.log(obj);
        ProductService.updateProduct(obj)
          .then(() => {
            methods.openModalMessage(
              "Sucesso",
              false,
              "O produto " +
                product.value.nome +
                " foi atualizado com sucesso.",
              true
            );
          })
          .catch((e) => {
             let mensagem = "";
            console.log(e)
             if (e.response.status == 400) {
              mensagem = e.response.data.errors[0];
            } else {
              mensagem =
                "Ocorreu um erro ao atualizar o produto " +
                product.value.nome +
                ".";
            } 

            methods.openModalMessage("Erro", true, mensagem, false); 
          });
      },
      });




    onMounted(() => {
    
    methods.getTokenAndDecode();

    methods.getProductById();    

    });

    return {
      product,
      token,
      brands,
      types,
      modalMessage,
      loading,
      empresaId,
      router,
      productBrand,
      productType,
      ...toRefs(methods),
    };
  },
};
</script>
