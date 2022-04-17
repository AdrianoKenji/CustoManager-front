<template>
  <div class="card">
    <div class="row">
      <div
        v-for="(data, index) in block"
        :key="index"
        class="col-4 d-flex justify-content-center mt-3 mb-3"
      >
        <div class="bg-secondary rounded-3 w-75 h-auto">
          <div class="text-white">
            <div class="row">
              <div class="d-flex justify-content-between">
                <button
                  type="button"
                  class="btn btn-danger btn-sm h-75 mt-2 ms-2"
                  @click="remove(data.id)"
                >
                  <img src="@/assets/icons/trash-2.svg" alt="Excluir" />
                </button>
                <h4 class="mt-3 mb-3">{{ data }}</h4>

                <button
                  type="button"
                  class="btn btn-warning btn-sm h-75 mt-2 me-2"
                  @click="edit(data.id)"
                >
                  <img src="@/assets/icons/edit-2.svg" alt="Editar" />
                </button>
              </div>
            </div>

            <div>
              <img
                src="@/assets/eu2.jpg"
                alt="Foto de Perfil"
                :class="profileImage ? 'rounded-circle mt-2' : 'mt-2'"
                style="width: 150px; height: 150px; object-fit: cover"
              />
            </div>

            <hr />

            <div class="mb-3">
              <h6>{{ data }}</h6>
              <h6>{{ data }}</h6>
              <h6>{{ data }}</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from "@vue/reactivity";
export default {
  name: "Block",
  props: {
    block: {
      type: Object,
      required: true,
      default: false,
    },
    profileImage: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  emits: ["remove", "edit"],
  setup(props, { emit }) {
    const methods = reactive({
      remove(id) {
        emit("remove", id);
      },

      edit(id) {
        emit("edit", id);
      },
    });

    return {
      ...toRefs(methods),
    };
  },
};
</script>