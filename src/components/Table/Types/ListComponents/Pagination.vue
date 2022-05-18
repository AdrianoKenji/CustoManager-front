<template>
  <div>
    <!-- <button v-if="showPrevious" @click="changePage(currentPage - 1)">
      &laquo;
    </button> -->

    <button
      v-for="(page, index) in pages"
      :key="page"
      class="btn btn-sm btn-dark ms-1 me-1 mt-2"
      :class="{ currentPage: page === currentPage }"
      @click="changePage(index)"
    >
      {{ page }}
    </button>

    <!--  <button v-if="showNext" @click="changePage(currentPage + 1)">
      &raquo;
    </button> -->
  </div>
</template>

<script>
import { computed, reactive, toRefs } from "@vue/runtime-core";
export default {
  name: "Pagination",
  props: {
    offset: {
      type: Number,
      required: true,
      default: 0,
    },
    limit: {
      type: Number,
      required: true,
      default: 5,
    },
    total: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  emits: ["changePage"],
  setup(props, { emit }) {
    const showPrevious = computed(() => {
      return currentPage.value > 1;
    });

    const showNext = computed(() => {
      return props.total > props.limit * currentPage.value;
    });

    const currentPage = computed(() => {
      return props.offset ? props.offset + 1 : 1;
    });

    const pages = computed(() => {
      let quantity = Math.ceil(props.total / props.limit);

      if (quantity <= 1) {
        return [1];
      }

      return Array.from(Array(quantity).keys(), (i) => i + 1);
    });

    const methods = reactive({
      changePage(offset) {
        emit("changePage", offset);
      },
    });

    return {
      showPrevious,
      showNext,
      currentPage,
      pages,
      ...toRefs(methods),
    };
  },
};
</script>