<template>
  <Header />
  <ErrorsNotify />
  <Toast />
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Header from '@/components/Header.vue';
import Toast from 'primevue/toast';
import ErrorsNotify from '@/components/ErrorsNotify.vue';

export default defineComponent({
  name: 'app',
  components: {
    Header,
    Toast,
    ErrorsNotify,
  },
});
</script>
