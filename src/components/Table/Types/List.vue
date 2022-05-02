<template>
  <div style="max-width: 80%; overflow-y: hidden; overflow-x: visible">
    <table class="table table-hover" id="tabela">
      <thead class="bg bg-primary mt-1">
        <tr>
          <th
            v-for="(column, index) in columns"
            :key="index"
            class="text-center"
          >
            {{ column.name }}
          </th>
        </tr>
      </thead>
      <tbody v-if="datas.length > 0">
        <tr v-for="(data, index) in datas" :key="index">
          <Row
            :row="data"
            :editButton="true"
            :removeButton="true"
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
</template>

<script>
import Row from "@/components/Table/Types/ListComponents/Row.vue";

import { reactive, toRefs } from "@vue/reactivity";
import { watch } from "@vue/runtime-core";

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
  },
  emits: ["remove", "edit"],
  setup(props, { emit }) {
    const methods = reactive({
      edit(event) {
        emit("edit", event);
      },

      remove(event) {
        emit("remove", event);
      },
    });

    watch(
      () => props.datas,
      (newV, oldV) => {
        if (newV != oldV && newV.length > 0) {
          $(document).ready(function () {
            $("#tabela").DataTable({
              language: {
                lengthMenu: "Apresentando _MENU_ linhas por página",
                zeroRecords: "Sem resultados :(",
                info: "Apresentando página _PAGE_ de _PAGES_",
                infoEmpty: "Sem resultados :(",
                infoFiltered: "(Filtrando de _MAX_ resultados)",
                search: "Buscar:",
                paginate: {
                  first: "Primeira",
                  last: "Última",
                  next: "Próximo",
                  previous: "Anterior",
                },
              },
            });
          });
        }
      }
    );

    return {
      ...toRefs(methods),
    };
  },
};
</script>

<style scoped>
</style>