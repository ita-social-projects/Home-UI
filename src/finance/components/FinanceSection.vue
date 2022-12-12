<template>
  <div class="breadcrumb">
    <Breadcrumb :home="home" :model="finance">
      <template #finance="{ finance }">
        <router-link :to="finance.to" custom v-slot="{ navigate, isActive, isExactActive }">
          <a @click="navigate" :class="{ 'active-link': isActive, 'active-link-exact': isExactActive }">{{
            finance.label
          }}</a>
        </router-link>
      </template>
    </Breadcrumb>
  </div>
  <FinanceCard v-for="card in cardsInfo" :key="card.id" :card="card" />
</template>

<script lang="ts">
import Breadcrumb from 'primevue/breadcrumb';
import { defineComponent, ref } from 'vue';
import { RoutesEnum } from '@/router/types';
import FinanceCard from '@/finance/components/FinanceCard.vue';

export default defineComponent({
  components: {
    Breadcrumb,
    FinanceCard,
  },
  name: 'finance-section',
  setup() {
    const home = ref({
      icon: 'pi pi-home',
      to: RoutesEnum.StartPage,
    });
    const finance = ref([{ label: 'Фінанси', to: RoutesEnum.FinanceSection }]);
    const cardsInfo = [
      {
        id: 1,
        title: 'Тарифи',
        items: [
          {
            icon: 'pi pi-percentage',
            label: 'Калькулятор',
            to: RoutesEnum.TarrifsCalculation,
          },
          {
            icon: 'pi pi-folder-open',
            label: 'Архів',
            to: RoutesEnum.TarrifsCalculation,
          },
        ],
      },
      {
        id: 2,
        title: 'other',
        label: 'food',
      },
    ];

    return {
      home,
      finance,
      cardsInfo,
    };
  },
});
</script>

<style scoped></style>
