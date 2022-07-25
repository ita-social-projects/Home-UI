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
  data() {
    return {
      home: { label: 'ОСББ', to: RoutesEnum.Cooperation },
      items: [
        { label: 'Квартири', to: RoutesEnum.ManageApartments },
        { label: 'Інформація про квартиру', to: RoutesEnum.ApartmentInfo },
      ],
    };
  },
});
</script>

<style lang="scss" scoped>
.p-breadcrumb a:hover {
  cursor: pointer;
  text-shadow: 1px 1px 1px rgba(150, 150, 150, 0.5);
}
.active-link {
  text-shadow: 1px 1px 1px rgba(150, 150, 150, 1);
}
</style>
