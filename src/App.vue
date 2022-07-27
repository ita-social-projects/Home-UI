<template>
  <Header />
  <MessagePlaceholder />
  <Toast />
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Header from '@/components/Header.vue';
import Toast from 'primevue/toast';
import MessagePlaceholder from '@/core/errors/MessagePlaceholder.vue';

export default defineComponent({
  name: 'app',
  components: {
    Header,
    Toast,
    MessagePlaceholder,
  },
});
</script>
