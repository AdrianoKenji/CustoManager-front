<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Em breve, CustoManager" />

    <button @click="getOlaMundo()">Exibir mensagem</button>

    <div>
      {{ message }}
    </div>
  </div>
</template>

<script>
const axios = require("axios");

import HelloWorld from "@/components/HelloWorld.vue";
import { reactive, ref, toRefs } from "vue";

export default {
  name: "HomeView",
  components: {
    HelloWorld,
  },
  setup() {
    const message = ref("");

    const methods = reactive({
      getOlaMundo() {
        axios
          .get("https://api-customanager.herokuapp.com/api/hello")
          .then((response) => {
            message.value = response.data;
          })
          .catch((e) => {
            console.log(e);
            message.value = "Ocorreu um erro ao conectar com a API"
          });
      },
    });

    return {
      message,
      ...toRefs(methods),
    };
  },
};
</script>
