<template>
  <LoaderSpinner :is-loading="isLoading" />
  <Header />
  <MessagePlaceholder />
  <Toast />
  <router-view />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Header from '@/components/Header.vue';
import Toast from 'primevue/toast';
import MessagePlaceholder from '@/core/errors/MessagePlaceholder.vue';
import { setSpinnerInterceptors } from '@/core/interceptors/index';

export default defineComponent({
  name: 'app',
  components: {
    Header,
    Toast,
    MessagePlaceholder,
  },
  setup() {
    const isLoading = ref(false);

    setSpinnerInterceptors(isLoading);
    return { isLoading };
  },
});
</script>
