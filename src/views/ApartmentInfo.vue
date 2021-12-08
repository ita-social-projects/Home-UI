<template>
  <div class="apartment-info">
    <div class="wrapper">
      <div class="breadcrumb">
        <Breadcrumb />
      </div>
      <div class="wrapper-container">
        <div class="container">
          <div class="apartment_info"></div>
          <div class="edit_btn">
            <Button label="Редагувати" icon="pi pi-pencil" class="p-button-outlined p-button-info" />
          </div>
        </div>

        <div class="container">
          <DataTable
            :value="ownershipsMock"
            responsiveLayout="scroll"
            scrollHeight="400px"
            :loading="loading"
            v-model:selection="selectedOwner"
            selectionMode="single"
            dataKey="id"
          >
            <template #header>
              <h4>Інформація про власників та мешканців квартири</h4>
            </template>
            <Column field="fullName" header="Прізвище та ім'я" style="width: 25em" showGridlines></Column>
            <Column field="contact" header="Email" style="width: 20em" showGridlines></Column>
            <Column field="ownershipPart" header="Частка власності" style="width: 20em" showGridlines></Column>
            <Column
              field="voutsPart"
              header="Кількість голосів свіввласника"
              style="width: 25em"
              showGridlines
            ></Column>
            <Column style="width: 10em">
              <template #body="">
                <Button
                  icon="pi pi-pencil"
                  class="p-button p-button-info p-button-text"
                  type="button"
                  @click="toggle"
                  aria-haspopup="true"
                  aria-controls="overlay_menu"
                />
                <Menu id="overlay_menu" ref="menu" :model="menuActions()" :popup="true" />
              </template>
            </Column>
          </DataTable>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Menu from 'primevue/menu';
import Breadcrumb from '@/components/Breadcrumb.vue';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'ApartmentInfo',
  components: {
    Breadcrumb,
    Button,
    Menu,
    Column,
    DataTable,
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
    apartment: {
      type: Number,
      required: true,
    },
  },
  setup() {
    const ownershipsMock = ref([
      {
        id: 1,
        fullName: 'Petrov Petro Petrovich',
        contact: 'string@ddf.com',
        ownershipPart: 0.8,
        voutsPart: 0.675,
      },
      {
        id: 2,
        fullName: 'Stasyuk Mukola Petrovich',
        contact: 'string@ddf.com',
        ownershipPart: 0.2,
        voutsPart: 0.24,
      },
    ]);
    const selectedOwner = ref();
    const loading = ref(false);
    const menu = ref();
    const menuActions = () => {
      return [
        {
          label: 'Видалити',
          icon: 'pi pi-times',
        },
        {
          label: 'Редагувати',
          icon: 'pi pi-refresh',
        },
      ];
    };

    const toggle = (event: any) => {
      menu.value.toggle(event);
    };

    return {
      ownershipsMock,
      menu,
      menuActions,
      toggle,
      selectedOwner,
      loading,
    };
  },
});
</script>

<style lang="scss" scoped>
.apartment-info {
  height: 100%;
}
.wrapper {
  height: 100%;

  .breadcrumb {
    margin: 0 0 1em 0;
  }
}

.wrapper-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.container {
  padding: 10px;
  border-radius: 10px;
  display: flex;
  background-color: #fafafa;
  justify-content: space-between;
  &.container-houses {
    padding: 1px;
    margin-bottom: 150px;
  }
  box-shadow: rgba(0, 0, 0, 0.1) -1px 4px 5px 1px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
  margin-bottom: 50px;
}

.apartment_info {
  min-height: 150px;
  height: 100%;
  margin: 10px;
}

.apartment_info div {
  padding: 8px;
  & :nth-child(1) {
    font-weight: bold;
  }
}

.edit_btn {
  margin: 15px;
}

label {
  display: inline-block;
}
</style>
