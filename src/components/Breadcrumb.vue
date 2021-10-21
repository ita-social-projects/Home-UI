<template>
  <div class="breadcrumb">
    <Breadcrumb :home="home" :model="items">
      <template #item="{ item }">
        <a :href="item.to">{{ item.label }}</a>
      </template>
    </Breadcrumb>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Breadcrumb from 'primevue/breadcrumb';

export default defineComponent({
  components: {
    Breadcrumb,
  },
  data() {
    return {
      home: { label: 'Будинки', to: '/main/cooperation' },
      items: [
        { label: 'Квартири', to: '/apartments-mock' },
        { label: 'Інформація про квартиру', to: '/apartments-info-mock' },
      ],
    };
  },
});
</script>

<style lang="scss" scoped></style>
