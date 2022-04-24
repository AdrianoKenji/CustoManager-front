<template>
  <div
    class="modal fade"
    id="modalResetPassword"
    tabindex="-1"
    aria-labelledby="modalResetPasswordLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="modalResetPasswordLabel">
            Esqueceu sua senha?
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row mt-2 mb-2">
            <div class="col-12">
              <div class="text-start">
                <label>Insira seu email:</label>
                <input type="email" class="form-control" placeholder="Email" />
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer text-end">
          <button
            type="button"
            class="btn btn-secondary btn-sm h-75"
            data-bs-dismiss="modal"
          >
            Cancelar
          </button>
          <button type="button" class="btn btn-primary btn-sm h-75">
            Enviar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModalResetPassword",
  setup() {},
};
</script>