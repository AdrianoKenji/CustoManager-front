<template>
  <div style="margin-top: 50px">
    <div class="row d-flex justify-content-center">
      <div class="col-4">
        <span style="font-size: 200px"> 403 </span>
      </div>
      <div class="col-3">
        <img
          src="../../assets/img/undraw_access_denied.svg"
          alt="Acesso negado"
          style="width: 300px; height: 250px"
        />
      </div>
    </div>
    <div class="col-12 text-center mt-3">
      <h4>Nós pedimos desculpa...</h4>
      <div class="col-12">
        <span>A página que está tentando acessar é de acesso restrito.</span>
      </div>
      <div class="col-12">
        <span>Entre em contato com um dos nossos administradores</span>
      </div>

      <div class="col-12 mt-4">
        <router-link to="/dashboard">
          <button class="btn btn-lg btn-primary">Voltar ao Dashboard</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Forbidden",
};
</script>