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
        <template #empty> No records found </template>
        <Column field="tariffTitle" header="Назва тарифу" :sortable="true" />
        <Column
          field="tariffPrice"
          header="Вартість членського внеска на 1 м. кв. (грн)"
          :sortable="true"
          style="max-width: 7rem"
        >
        </Column>
        <Column field="tariffComment" header="Коментар" :sortable="true" />
        <Column field="tariffDate" header="Дата" :sortable="true" />
        <Column header="Опції" style="width: 3rem">
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
      list: [],
    });

    const setTariffsList = async () => {
      await store.dispatch(`${StoreModuleEnum.tariffStore}/${TariffActionEnum.SET_TARIFF_LIST}`);
      tariffs.list = store.state.tariffStore.tariffList;
    };

    onMounted(() => {
      // TODO when endpoints will exist for finance section, delete setTimeout
      setTimeout(() => {
        setTariffsList();
      }, 3000);
    });

    return {
      tariffs,
      title,
      home,
      items,
      setTariffsList,
    };
  },
});
</script>

<style scoped>
.container-management-of-tariffs {
  padding-bottom: 4em;
}
</style>
