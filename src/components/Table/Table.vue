<template>
  <div v-if="isList" class="row">
    <Filter
      v-if="hasFilter"
      :columns="Header"
      @search="search($event)"
      @clean="clean()"
    />
    <List
      :datas="ArrayData"
      :columns="Header"
      :loading="loading"
      :editButton="editButton"
      :viewButton="viewButton"
      :removeButton="removeButton"
      @view="view($event)"
      @edit="edit($event)"
      @remove="remove($event)"
      @ordenation="ordenation($event)"
    />
    <Pagination
      v-if="ArrayData.length && hasPagination"
      :offset="offset"
      :limit="limit"
      :total="total"
      @changePage="changePage($event)"
    />
  </div>
</template>

<script>
import Filter from "@/components/Table/Types/ListComponents/Filter.vue";
import List from "@/components/Table/Types/List.vue";
import Pagination from "@/components/Table/Types/ListComponents/Pagination.vue";

import { reactive, toRefs } from "@vue/reactivity";

export default {
  name: "Table",
  components: {
    Filter,
    List,
    Pagination,
  },
  props: {
    isList: {
      type: Boolean,
      required: false,
    },
    Header: {
      type: Array,
      required: true,
      default: [],
    },
    ArrayData: {
      type: Array,
      required: true,
    },
    loading: {
      type: Boolean,
      required: false,
      default: false,
    },
    offset: {
      type: Number,
      required: false,
      default: 0,
    },
    limit: {
      type: Number,
      required: false,
      default: 5,
    },
    total: {
      type: Number,
      required: false,
      default: 0,
    },
    hasFilter: {
      type: Boolean,
      required: true,
      default: false,
    },
    hasPagination: {
      type: Boolean,
      required: true,
      default: false,
    },
    editButton: {
      type: Boolean,
      required: false,
      default: false,
    },
    viewButton: {
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
  emits: ["search", "clean", "ordenation", "edit", "view", "remove", "changePage"],
  setup(props, { emit }) {
    const methods = reactive({
      search(event) {
        emit("search", event);
      },

      clean() {
        emit("clean");
      },

      edit(event) {
        emit("edit", event);
      },
      view(event) {
        emit("view", event);
      },
      remove(event) {
        emit("remove", event);
      },

      ordenation(event) {
        emit("ordenation", event);
      },

      changePage(event) {
        console.log(event);
        emit("changePage", event);
      },
    });

    return {
      ...toRefs(methods),
    };
  },
};
</script>