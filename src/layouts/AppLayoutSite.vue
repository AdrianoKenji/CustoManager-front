<template>
  <div>
    <HeaderLayout />
  </div>

  <div style="min-height: 60vh">
    <slot />
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { provide } from "@vue/runtime-core";

import HeaderLayout from "./HeaderLayout.vue";

export default {
  components: { HeaderLayout },
  name: "AppLayoutSite",
  setup() {
    const mode = ref("site");

    provide("mode", mode);

    return {
      mode,
    };
  },
};
</script>