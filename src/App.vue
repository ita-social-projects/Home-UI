<template>
  <LoaderSpinner :is-loading="isLoading" />
  <Header />
  <Toast />
  <router-view />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Header from '@/components/Header.vue';
import Toast from 'primevue/toast';
import { setSpinnerInterceptors } from '@/core/interceptors/index';

export default defineComponent({
  name: 'app',
  components: {
    Header,
    Toast,
  },
  setup() {
    const isLoading = ref(false);

    setSpinnerInterceptors(isLoading);
    return { isLoading };
  },
});
</script>