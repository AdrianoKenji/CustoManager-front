<template v-if="row != {}">
  <template v-for="(info, index) in Object.values(row)" :key="index">
    <td v-if="items[index].hidden == false || items[index].hidden == undefined">
      <template v-if="info === true">
        <i class="bx bx-check fs-3 text-success"></i>
      </template>
      <template v-else-if="info === false">
        <i class="bx bx-x fs-3 text-danger"></i>
      </template>

      <template v-else class="text-start">{{ info }}</template>
    </td>
  </template>

  <div class="col-12">
    <td class="mx-auto" v-if="editButton">
      <button
        type="button"
        class="btn btn-warning btn-sm h-75 me-1"
        @click="edit(row)"
      >
        <img src="@/assets/icons/edit-2.svg" alt="Editar" />
      </button>
    </td>
    <td class="mx-auto" v-if="removeButton">
      <button
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
      default() {
        return {};
      },
    },
    attribute: {
      type: String,
      required: false,
      default: "",
    },
    items: {
      type: Array,
      required: true,
      default() {
        return [];
      },
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