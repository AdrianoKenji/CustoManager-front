<template>
  <div
    class="modal fade"
    :id="'modalMessage' + reference"
    tabindex="-1"
    :aria-labelledby="'modalMessageLabel' + reference"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5
            class="modal-title text-danger"
            :id="'modalMessageLabel' + reference"
            v-if="isError"
          >
            {{ title }}
          </h5>
          <h5 class="modal-title text-success" id="modalMessageLabel" v-else>
            {{ title }}
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
              <div class="text-center">
                <span>{{ message }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer text-end">
          <button
            type="button"
            class="btn btn-secondary btn-sm h-75"
            data-bs-dismiss="modal"
            @click="closeAction()"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from "@vue/reactivity";
import { useRouter } from "vue-router";
export default {
  name: "ModalMessage",
  props: {
    title: {
      type: String,
      required: true,
      default: "",
    },
    isError: {
      type: Boolean,
      required: true,
      default: false,
    },
    message: {
      type: String,
      required: true,
      default: "",
    },
    reference: {
      type: String,
      required: true,
      default: "",
    },
    redirect: {
      type: String,
      required: false,
      default: "",
    },
    needsRefresh: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  setup(props, { emit }) {
    const router = useRouter();

    const methods = reactive({
      closeAction() {
        if (props.redirect) {
          router.push(props.redirect);
        } else if (props.needsRefresh) {
          emit("closeAction");
        }
      },
    });

    return {
      router,
      ...toRefs(methods),
    };
  },
};
</script>