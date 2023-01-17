<template>
  <Breadcrumb :home="home" :model="items">
    <template #item="{ item }">
      <router-link :to="item.to" custom v-slot="{ route, navigate, isActive, isExactActive }">
        <a @click="navigate" :class="{ 'active-link': isActive, 'active-link-exact': isExactActive }">{{
          route.meta.title
        }}</a>
      </router-link>
    </template>
  </Breadcrumb>
  <div class="container">
    <h1 class="page-title">{{ title }}</h1>
    <div class="container-management-of-tariffs">
      <DataTable
        class="p-datatable-sm"
        :value="tariffs.list"
        responsiveLayout="stack"
        breakpoint="570px"
        stripedRows
        showGridlines
      >
        <Column field="tariffName" header="Назва тарифу" :sortable="true" />
        <Column field="tariffCost" header="Вартість членського внеска на 1 м. кв. (грн)" :sortable="true"> </Column>
        <Column field="tariffComment" header="Коментар" :sortable="true" />
        <Column field="tariffDate" header="Дата" :sortable="true" />
        <Column header="Опції">
          <template #body="slotProps">
            <Button
              icon="pi pi-cog"
              class="p-button p-button-info p-button-text"
              type="button"
              @click="toggle($event, slotProps.data)"
              aria-haspopup="true"
              aria-controls="overlay_menu"
            />
            <Menu id="overlay_menu" ref="menu" :popup="true" />
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue';
import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Menu from 'primevue/menu';
import { StoreModuleEnum } from '@/store/types';
import { RoutesEnum } from '@/router/types';
import { TariffGettersEnum, TariffActionEnum } from '@/finance/store/types';
import Breadcrumb from 'primevue/breadcrumb';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'tariffs-management',
  components: {
    Button,
    DataTable,
    Column,
    Menu,
    Breadcrumb,
  },

  setup() {
    const store = useStore();
    const home = ref({
      to: RoutesEnum.StartPage,
    });
    const items = ref([{ to: RoutesEnum.FinanceSection }, { to: RoutesEnum.TariffsManagement }]);
    const title = 'Управління тарифами';
    const tariffs = reactive({
      list: [
        {
          tariffName: 'Тариф 1',
          tariffCost: 100,
          tariffComment: '1-й коментар',
          tariffDate: new Date().toLocaleDateString('ek-UA'),
        },
        {
          tariffName: 'Тариф 2',
          tariffCost: 200,
          tariffComment: '2-й коментар',
          tariffDate: new Date().toLocaleDateString('ek-UA'),
        },
        {
          tariffName: 'Тариф 3',
          tariffCost: 300,
          tariffComment: '3-й коментар',
          tariffDate: new Date().toLocaleDateString('ek-UA'),
        },
      ],
    });

    onMounted(() => {
      store.dispatch(`${StoreModuleEnum.tariffStore}/${TariffActionEnum.SET_TARIFF_LIST}`);
    });

    return {
      tariffs,
      title,
      home,
      items,
    };
  },
});
</script>

<style scoped>
/* .page-title {
  text-align: center;
} */
</style>
