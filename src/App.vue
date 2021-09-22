<template>
  <BaseHeader />
  <Toast />
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BaseHeader from '@/components/base/BaseHeader.vue';
import Toast from 'primevue/toast';

export default defineComponent({
  name: 'app',
  components: {
    BaseHeader,
    Toast,
  },
});
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
</style>
