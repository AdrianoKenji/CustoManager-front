<template>
  <div class="row">
    <div class="col-6 text-start">
      <h3>Listagem de Empresas</h3>
      <hr class="col-6" style="height: 3px; margin-top: -5px" />
    </div>
    <div class="col-5 text-end">
      <router-link to="/criar-empresa">
        <button class="btn btn-dark">
          <i class="bx bx-plus fs-4"></i>
          <i class="bx bx-buildings fs-3 mt-1"></i>
        </button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "CompanyList",
  components: {},
  setup() {},
};
</script>