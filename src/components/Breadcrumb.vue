<template>
  <div class="breadcrumb">
    <Breadcrumb :home="home" :model="items">
      <template #item="{ item }">
        <router-link :to="item.to" custom v-slot="{ navigate, isActive, isExactActive }">
          <a @click="navigate" :class="{ 'active-link': isActive, 'active-link-exact': isExactActive }">{{
            item.label
          }}</a>
        </router-link>
      </template>
    </Breadcrumb>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { RoutesEnum } from '@/router/types';
import Breadcrumb from 'primevue/breadcrumb';

export default defineComponent({
  components: {
    Breadcrumb,
  },
  props: {
    houseId: {
      type: Number,
      required: true,
    },
    apartmentId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      testid: 2485,
      home: { label: 'ОСББ', to: RoutesEnum.Cooperation },
      items: [
        { label: 'Квартири', to: `/main/cooperation/${this.houseId}` },
        { label: 'Інформація про квартиру', to: `/main/cooperation/${this.houseId}/${this.apartmentId}` },
      ],
    };
  },
});
</script>

<style lang="scss" scoped></style>
