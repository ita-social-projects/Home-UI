<template>
  <LoaderSpinner :isLoading="isLoading" />
  <Header />
  <Toast />
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Header from '@/components/Header.vue';
import Toast from 'primevue/toast';

export default defineComponent({
  name: 'app',
  components: {
    Header,
    Toast,
  },
  data() {
    return {
      isLoading: this.$isLoading,
    };
  },
  setup() {
    return {};
  },
});
</script>
