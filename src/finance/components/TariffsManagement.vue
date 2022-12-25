<template>
  <div class="container">
    <h1 class="page-title">{{ title }}</h1>
    <div class="container-management-of-tariffs">
      <DataTable
        class="p-datatable-sm"
        :value="tariffList"
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
            <Menu :model="tariffActions()" id="overlay_menu" ref="menu" :popup="true" />
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Menu from 'primevue/menu';
import { StoreModuleEnum } from '@/store/types';
import { mapGetters } from 'vuex';
import { TariffActionsEnum, TariffGettersEnum } from '@/finance/store/types';

export default defineComponent({
  name: 'tariffs-management',
  components: {
    Button,
    DataTable,
    Column,
    Menu,
  },
  data() {
    return {
      title: 'Управління тарифами',
      tariffList: [
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
      tariffActions: () => {
        return [
          {
            label: 'Видалити тариф',
            icon: 'pi pi-times',
            command: () => {
              this.deleteTariff();
            },
          },
          {
            label: 'Використати як шаблон',
            icon: 'pi pi-user-edit',
          },
        ];
      },
    };
  },

  methods: {
    async deleteTariff() {
      await this.$store.dispatch(`${StoreModuleEnum.tariffStore}/${TariffActionsEnum.DEL_TARIFF}`);
    },
  },
  computed: {
    ...mapGetters({
      tariffList: `${StoreModuleEnum.tariffStore}/${TariffGettersEnum.getTariffsList}`,
    }),
  },
});
</script>

<style scoped>
.page-title {
  text-align: center;
}
</style>
