<template>
  <BaseHeader />
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BaseHeader from '@/components/base/BaseHeader.vue';

export default defineComponent({
  name: 'app',
  components: {
    BaseHeader,
  },
});
</script>

<style lang="scss"></style>
