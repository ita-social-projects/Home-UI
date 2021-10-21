<template>
  <div class="ApartmentsInfoMock">
    <Breadcrumb />
    <h1>Apartments Info</h1>
  </div>
</template>

<script lang="ts">
import Breadcrumb from '@/components/Breadcrumb.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ApartmentsInfoMock',
  components: {
    Breadcrumb,
  },
});
</script>

<style lang="scss" scoped></style>
