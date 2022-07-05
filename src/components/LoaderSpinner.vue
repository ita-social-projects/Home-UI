<template>
  <div class="loader-outer" v-if="isLoading">
    <ProgressSpinner />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import ProgressSpinner from 'primevue/progressspinner';

export default defineComponent({
  name: 'LoaderSpinner',
  components: {
    ProgressSpinner,
  },
  setup() {
    const isLoading = ref(false);

    computed(() => {
      return isLoading.value;
    });

    const toggleLoader = () => {
      isLoading.value = !isLoading.value;
    };

    return { isLoading, toggleLoader };
  },
});
</script>

<style lang="scss" scoped>
.loader-outer {
  display: grid;
  z-index: 1;
  background: hsla(182, 48%, 64%, 0.7);
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
