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
  <section class="card-section">
    <FinanceCard v-for="card in cardsInfo" :key="card.id" :card="card" />
  </section>
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
      label: 'Початкова',
      to: RoutesEnum.StartPage,
    });
    const items = ref([{ label: 'Фінанси', to: RoutesEnum.FinanceSection }]);
    const cardsInfo = [
      {
        id: 1,
        title: 'Тарифи',
        description: 'Розрахунки тарифів та збереження даних в архів',
        items: [
          {
            icon: 'pi pi-percentage',
            label: 'Калькулятор тарифу',
            to: RoutesEnum.TariffsCalculation,
          },
          {
            icon: 'pi pi-inbox',
            label: 'Управління тарифами',
            to: RoutesEnum.TariffsManagement,
          },
        ],
      },
      {
        id: 2,
        title: 'Нарахування',
        description: 'Нарахування тарифів по квартирам',
        items: [
          {
            icon: 'pi pi-table',
            label: 'Розрахунки',
            to: RoutesEnum.CalculationsPage,
          },
        ],
      },
    ];

    return {
      home,
      items,
      cardsInfo,
    };
  },
});
</script>

<style scoped>
.card-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(325px, 1fr));
}
</style>
