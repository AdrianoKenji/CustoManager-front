<template>
  <div>
    <HeaderSite v-if="mode == 'site'" />

    <AsideDashboard v-if="mode == 'dash'" />
  </div>
</template>
<script>
import { inject } from "@vue/runtime-core";
import HeaderSite from "../components/HeaderSite.vue";
import AsideDashboard from "../components/AsideDashboard.vue";

export default {
  components: { HeaderSite, AsideDashboard },

  name: "HeaderLayout",
  setup() {
    const mode = inject("mode", null);

    return {
      mode,
    };
  },
};
</script>
