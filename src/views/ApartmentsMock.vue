<template>
  <div class="ApartmentsMock">
    <Breadcrumb />
    <h1>Apartments list</h1>
  </div>
</template>

<script lang="ts">
import Breadcrumb from '@/components/Breadcrumb.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ApartmentsMock',
  components: {
    Breadcrumb,
  },
});
</script>

<style lang="scss" scoped></style>
