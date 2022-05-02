<template>
  <div id="wrapper">
    <HeaderLayout />

    <div id="page-content-wrapper" style="min-height: 83vh">
      <div class="container-xxl">
        <div class="row">
          <div>
            <slot />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { provide } from "@vue/runtime-core";

import HeaderLayout from "./HeaderLayout.vue";

export default {
  components: { HeaderLayout },
  name: "AppLayoutDashboard",
  setup() {
    const mode = ref("dash");

    provide("mode", mode);

    return {
      mode,
    };
  },
};
</script>
