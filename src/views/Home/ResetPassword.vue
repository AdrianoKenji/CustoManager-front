<template>
  <div class="mt-4">
    <div class="d-flex justify-content-evenly">
      <div class="col-4">
        <div class="card bg-dark">
          <div class="">
            <h4 class="text-white mt-4">Nova senha</h4>

            <div class="row d-flex justify-content-center mt-4">
              <div class="col-10 mb-4">
                <div class="input-group input-group-lg">
                  <input
                    type="password"
                    class="form-control"
                    v-model="password"
                    placeholder="Senha"
                  />
                </div>
              </div>
              <div class="col-10 mb-4">
                <div class="input-group input-group-lg">
                  <input
                    type="password"
                    class="form-control"
                    v-model="confirmPassword"
                    placeholder="Confirmar senha"
                  />
                </div>
              </div>
            </div>

            <div class="row mb-4">
              <div class="col-11 text-end">
                <button class="btn btn-primary">
                  <span class="fs-6 text-white">Trocar senha</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref, toRefs } from "@vue/reactivity";

export default {
  name: "ResetPassword",
  setup() {
    const password = ref("");
    const confirmPassword = ref("");

    const methods = reactive({});

    return {
      password,
      confirmPassword,
      ...toRefs(methods),
    };
  },
};
</script>