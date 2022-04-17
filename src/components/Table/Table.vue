<template>
  <div class="col-12 mt-3">
    <h4 class="text-start ms-3">{{ title }}</h4>
    <hr class="col-3 ms-3 text-primary" style="margin-top: -6px; height: 2px" />
  </div>

  <div class="d-flex justify-content-center">
    <div class="col-10" v-if="isList">
      <List
        :datas="ArrayData"
        :columns="Header"
        :loading="loading"
        @edit="edit($event)"
        @remove="remove($event)"
      />
    </div>
  </div>

  <div class="d-flex justify-content-center">
    <div class="col-10" v-if="isBlock">
      <template v-for="(block, index) in data" :key="index">
        <Block
          :block="block"
          :profileImage="profileImage"
          @edit="edit($event)"
          @remove="remove($event)"
        />
      </template>
    </div>
  </div>
</template>

<script>
import List from "@/components/Table/Types/List.vue";
import Block from "@/components/Table/Types/Block.vue";

import { reactive, toRefs } from "@vue/reactivity";

export default {
  name: "Table",
  components: {
    List,
    Block,
  },
  props: {
    ArrayData: {
      type: Array,
      required: true,
    },
    isList: {
      type: Boolean,
      required: false,
    },
    isBlock: {
      type: Boolean,
      required: false,
    },
    title: {
      type: String,
      required: true,
    },
    loading: {
      type: Boolean,
      required: false,
      default: false,
    },
    profileImage: {
      type: Boolean,
      required: false,
      default: false,
    },
    Header: {
      type: Array,
      required: false,
      default: [],
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

    return {
      ...toRefs(methods),
    };
  },
};
</script>