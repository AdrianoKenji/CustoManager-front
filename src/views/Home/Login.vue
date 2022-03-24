<template>
  <!-- <div class="col-12">
    <div class="form-floating">
      <input
        class="form-control"
        id="floatingInput"
        placeholder="Email"
        required
      />
      <label for="floatingInput" class="ps-3 ms-1">Email</label>
    </div>
    <div class="form-floating">
      <input
        class="form-control"
        id="floatingInput"
        placeholder="Senha"
        required
      />
      <label for="floatingInput" class="ps-3 ms-1">Senha</label>
    </div>
  </div> -->

  <div class="row">
    <div class="text-center">
      <div class="mt-3 mb-3"><h4>Insira suas credenciais</h4></div>

      <div class="col-12 mb-3">
        <input type="text" placeholder="Email" />
      </div>
      <div class="col-12 mb-3">
        <input type="text" placeholder="Senha" />
      </div>
      <div class="col-12 mb-3">
          <button class="btn-primary btn-sm">
              Entrar
          </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
};
</script>

<style scoped>
</style>