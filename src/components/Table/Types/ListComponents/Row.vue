<template v-if="row != {}">
  <template v-for="(info, index) in Object.values(row)" :key="index">
    
    <td v-if="info === true">
      <span class="badge bg-success">Ativo</span>
    </td>
    <td v-else-if="info === false">
      <span class="badge bg-secondary">Inativo</span>
    </td>

    <td v-else>{{ info }}</td>
  </template>

  <td>
    <button
      v-if="editButton"
      type="button"
      class="btn btn-warning btn-sm h-75 mt-2 me-2"
      @click="edit(row.id)"
    >
      <img src="@/assets/icons/edit-2.svg" alt="Editar" />
    </button>

    <button
      v-if="removeButton"
      type="button"
      class="btn btn-danger btn-sm h-75 mt-2 me-2"
      @click="edit(row.id)"
    >
      <img src="@/assets/icons/trash-2.svg" alt="Excluir" />
    </button>
  </td>
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