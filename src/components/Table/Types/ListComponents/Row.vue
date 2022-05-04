<template v-if="row != {}">
  <template v-for="(info, index) in Object.values(row)" :key="index">
    <td v-if="info === true">
      <i class="bx bx-check fs-3 text-success"></i>
    </td>
    <td v-else-if="info === false">
      <i class="bx bx-x fs-3 text-danger"></i>
    </td>

    <td v-else class="text-start">{{ info }}</td>
  </template>

  <div>
    <td>
      <button
        v-if="editButton"
        type="button"
        class="btn btn-warning btn-sm h-75 me-1"
        @click="edit(row)"
      >
        <img src="@/assets/icons/edit-2.svg" alt="Editar" />
      </button>
    </td>
    <td>
      <button
        v-if="removeButton"
        type="button"
        class="btn btn-danger btn-sm h-75 me-1"
        @click="remove(row)"
      >
        <img src="@/assets/icons/trash-2.svg" alt="Excluir" />
      </button>
    </td>
  </div>
</template>

<script>
import { reactive, toRefs } from "@vue/reactivity";

export default {
  name: "Row",
  props: {
    row: {
      type: Object,
      required: true,
      default: {},
    },
    attribute: {
      type: String,
      required: false,
      default: "",
    },
    editButton: {
      type: Boolean,
      required: false,
      default: false,
    },
    removeButton: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  emits: ["remove", "edit"],
  setup(props, { emit }) {
    const methods = reactive({
      remove(event) {
        emit("remove", event);
      },

      edit(event) {
        emit("edit", event);
      },
    });

    return {
      ...toRefs(methods),
    };
  },
};
</script>