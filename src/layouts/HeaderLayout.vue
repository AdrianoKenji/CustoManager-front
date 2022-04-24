<template>
  <div>
    <HeaderSite v-if="mode == 'site'" />

    <HeaderDash v-if="mode == 'dash'" />
  </div>
</template>
<script>
import { inject } from "@vue/runtime-core";
import HeaderSite from "../components/HeaderSite.vue";
import HeaderDash from "../components/HeaderDash.vue";

export default {
  components: { HeaderSite, HeaderDash },

  name: "HeaderLayout",
  setup() {
    const mode = inject("mode", null);

    return {
      mode,
    };
  },
};
</script>
