<template>
  <div class="d-flex justify-content-center mb-3">
    <div class="row col-8">
      <div class="col-5 form-floating-sm mt-3">
        <select class="form-select" v-model="selectedColumn">
          <option value="" selected disabled>Filtrar por:</option>
          <template v-for="column in columns" :key="column.id">
            <option v-if="column.value === true" :value="column">
              {{ column.name }}
            </option>
          </template>
        </select>
      </div>

      <div class="col-5 form-floating-sm mt-3" v-if="selectedColumn != ''">
        <input
          v-if="selectedColumn.type != 'select'"
          :type="selectedColumn.type"
          class="form-control"
          id="floatingInputFilter"
          :placeholder="selectedColumn.name"
          v-model="filteredItem"
        />

        <select v-else class="form-select" v-model="filteredItem">
          <option selected disabled>Selecione um perfil</option>
          <option
            v-for="(option, index) in selectedColumn.options"
            :key="index"
            :value="option"
          >
            {{ option }}
          </option>
        </select>
      </div>
      <div class="col-5 form-floating-sm mt-3" v-else></div>

      <div class="col-2 mt-2">
        <button
          type="button"
          class="btn btn-dark rounded-circle"
          style="width: 50px; height: 50px"
          @click="search(selectedColumn, filteredItem)"
        >
          <i class="bx bx-search fs-4 mt-2" style="margin-left: 1px"></i>
        </button>

        <button
          v-if="searched"
          type="button"
          class="btn btn-danger rounded-circle ms-2"
          style="width: 50px; height: 50px"
          @click="cleanFilter()"
        >
          <i class="bx bx-x fs-4 mt-2" style="margin-left: 1px"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref, toRefs } from "@vue/reactivity";
import { watch } from "@vue/runtime-core";
export default {
  name: "Filter",
  props: {
    columns: {
      type: Array,
      required: true,
      default: [],
    },
  },
  emits: ["search", "clean"],
  setup(props, { emit }) {
    const selectedColumn = ref("");
    const filteredItem = ref("");

    const searched = ref(false);

    const methods = reactive({
      search(obj, filteredItem) {
        searched.value = true;
        emit("search", { selectedColumn: obj, filteredItem: filteredItem });
      },

      cleanFilter() {
        selectedColumn.value = "";
        filteredItem.value = "";
        searched.value = false;

        emit("clean");
      },
    });

    watch(
      () => selectedColumn.value,
      (newValue, oldValue) => {
        if (newValue != oldValue) {
          filteredItem.value = "";
        }
      }
    );

    return {
      selectedColumn,
      filteredItem,
      searched,
      ...toRefs(methods),
    };
  },
};
</script>