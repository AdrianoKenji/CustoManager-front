<template>
  <div class="bg-dark d-flex justify-content-between">
    <div class="col-12">
      <div class="row">
        <div class="col-3">
          <router-link to="/">
            <img
              src="../assets/customanager.png"
              class="float-center ms-3 mt-2 mb-1"
              style="height: 50px"
              alt="Logo da CustoManager"
            />
          </router-link>
        </div>

        <div class="col-6"></div>

        <div class="col-3 row text-end">
          <div class="col-6"></div>
          <div class="col-6 row mt-3">
            <div class="col-6">
              <router-link to="/entrar" style="text-decoration: none">
                <span class="text-white">Entrar</span>
              </router-link>
            </div>
            <div class="col-6">
              <button class="btn-light btn-sm" style="margin-top: -5px">
                <router-link to="/cadastrar" style="text-decoration: none">
                  <span class="text-dark">Cadastrar</span>
                </router-link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="col-6 text-end">
      <div class="btn-group mt-3 me-3">
        <button class="btn btn-primary btn-lg" type="button">Perfil</button>
        <button
          class="btn btn-primary dropdown-toggle dropdown-toggle-split"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <span class="visually-hidden">Toggle Dropdown</span>
        </button>
        <ul class="dropdown-menu dropdown-menu-dark">
          <li><a class="dropdown-item active" href="#">Action</a></li>
          <li><a class="dropdown-item" href="#">Another action</a></li>
          <li><a class="dropdown-item" href="#">Something else here</a></li>
          <li><hr class="dropdown-divider" /></li>
          <li>
            <router-link to="/" class="text-white" style="text-decoration: none"
              ><a class="dropdown-item">Sair</a></router-link
            >
          </li>
        </ul>
      </div>
    </div> -->
  </div>
</template>
<script>
export default {
  name: "HeaderDash",
  setup() {},
};
</script>

<style scoped>
</style>
