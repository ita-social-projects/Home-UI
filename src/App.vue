<template>
  <LoaderSpinner :is-loading="isLoading" />
  <Header @showMobSidebar="showMobSidebar" />
  <MessagePlaceholder />
  <Toast />
  <router-view />
</template>

<script lang="ts">
import { defineComponent, ref, provide } from 'vue';
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
    const mobileSidebar = ref(false);

    const showMobSidebar = () => {
      mobileSidebar.value = true;
    };

    provide('mobileSidebar', mobileSidebar);

    setSpinnerInterceptors(isLoading);
    return { isLoading, showMobSidebar };
  },
});
</script>
