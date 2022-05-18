<template>
  <div class="d-flex justify-content-center">
    <div style="max-width: 80%; overflow-y: hidden; overflow-x: visible">
      <table class="table table-hover">
        <thead class="bg bg-dark mt-1">
          <tr>
            <template v-for="(column, index) in columns" :key="index">
              <th class="text-center text-white" v-if="!column.hidden" style="max-width: 150px; min-width: 150px">
                <div class="d-flex justify-content-evenly">
                  <div class="col-10 text-truncate text-start ps-2">
                    {{ column.name }}
                  </div>
                  <div
                    class="col-2 list-group"
                    v-if="column.order"
                    style="margin-left: -10px"
                  >
                    <button
                      class="btn btn-sm bg-dark"
                      style="margin-top: -10px; margin-bottom: -3px"
                    >
                      <i
                        class="bx bxs-up-arrow text-white"
                        style="font-size: 12px"
                        @click="ordenation(column, 'ASC')"
                      ></i>
                    </button>
                    <button
                      class="btn btn-sm bg-dark"
                      style="margin-top: -10px; margin-bottom: -10px"
                    >
                      <i
                        class="bx bxs-down-arrow text-white"
                        style="font-size: 12px"
                        @click="ordenation(column, 'DESC')"
                      ></i>
                    </button>
                  </div>
                </div>
              </th>
            </template>
          </tr>
        </thead>
        <tbody v-if="datas.length > 0">
          <tr v-for="(data, index) in datas" :key="index">
            <Row
              :row="data"
              :items="columns"
              :editButton="editButton"
              :removeButton="removeButton"
              @edit="edit($event)"
              @remove="remove($event)"
            />
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td :colspan="columns.length + 1">
              <div class="row">
                <div class="col-12 mt-2 mb-2" v-if="loading">
                  <div
                    class="spinner-border"
                    style="width: 3rem; height: 3rem"
                    role="status"
                  >
                    <span class="visually-hidden">Loading...</span>
                  </div>
                </div>
                <div v-else class="col-12">
                  <h4 class="fw-bold mt-3 mb-3">Não há dados</h4>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Row from "@/components/Table/Types/ListComponents/Row.vue";

import { reactive, toRefs } from "@vue/reactivity";

export default {
  name: "List",
  components: {
    Row,
  },
  props: {
    datas: {
      type: Array,
      required: true,
    },
    columns: {
      type: Array,
      required: true,
      default: [],
    },
    loading: {
      type: Boolean,
      required: false,
      default: false,
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
  emits: ["remove", "edit", "ordenation"],
  setup(props, { emit }) {
    const methods = reactive({
      edit(event) {
        emit("edit", event);
      },

      remove(event) {
        emit("remove", event);
      },

      ordenation(event, orderType) {
        let orderAsc = orderType == "ASC" ? true : false;

        emit("ordenation", { orderBy: event.key, orderAsc: orderAsc });
      },
    });

    return {
      ...toRefs(methods),
    };
  },
};
</script>

<style scoped>
</style>