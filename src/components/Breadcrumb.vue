<template>
  <div class="breadcrumb">
    <Breadcrumb :home="home" :model="items">
      <template #item="{ item }">
        <router-link :to="item.to" custom v-slot="{ href, navigate, isActive, isExactActive }">
          <a :href="href" @click="navigate" :class="{ 'active-link': isActive, 'active-link-exact': isExactActive }">{{
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
        { label: 'Квартири', to: RoutesEnum.ApartmentsMock },
        { label: 'Інформація про квартиру', to: RoutesEnum.ApartmentsInfoMock },
      ],
    };
  },
});
</script>

<style lang="scss" scoped></style>
