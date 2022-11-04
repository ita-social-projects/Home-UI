<template>
  <div class="container">
    <h1 class="page-title">{{ title }}</h1>
    <div class="container-management-of-tariffs">
      <DataTable class="p-datatable-sm" responsiveLayout="stack" breakpoint="570px" stripedRows showGridlines>
        <Column field="name" header="Назва тарифу" :sortable="true" />
        <Column field="cost" header="Вартість членського внеска на 1 м. кв. (грн)" :sortable="true"> </Column>
        <Column field="comment" header="Коментар" :sortable="true" />
        <Column field="date" header="Дата" :sortable="true" />
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
  methods: {},
});
</script>

<style scoped>
.page-title {
  text-align: center;
}
</style>
