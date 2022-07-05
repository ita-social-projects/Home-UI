<template>
  <div class="loader-outer">
    <ProgressSpinner />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ProgressSpinner from 'primevue/progressspinner';

export default defineComponent({
  name: 'LoaderSpinner',
  components: {
    ProgressSpinner,
  },
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.loader-outer {
  display: grid;
  z-index: 1;
  background: hsla(0, 0%, 25%, 0.7);
  position: fixed;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  justify-content: center;
  align-items: center;
  pointer-events: none;
  transition: opacity 0.2s;
}
</style>
