<template>
  <div class="manageApartments">
    <div class="wrapper">
      <div class="breadcrumb">
        <Breadcrumb />
      </div>
      <router-view></router-view>
      <div class="container">
        <div class="apartment_info"></div>
        <div class="edit_btn">
          <Button label="Редагувати" icon="pi pi-pencil" class="p-button-outlined p-button-info" />
        </div>
      </div>
      <div class="add_btn">
        <Button label="Додати будинок" icon="pi pi-pencil" class="p-button-outlined p-button-info" />
      </div>

      <div class="container">
        <DataTable
          :value="apartmentsData"
          responsiveLayout="scroll"
          scrollHeight="400px"
          :loading="loading"
          v-model:selection="selectedApartment"
          @click="chousenApartment(selectedApartment)"
          selectionMode="single"
          dataKey="id"
        >
          <template #header>
            <h4>Список квартир в будинку</h4>
          </template>
          <Column
            field="apartment_number"
            header="Номер квартири"
            :sortable="true"
            style="width: 40em"
            showGridlines
          ></Column>
          <Column style="width: 50rem" />
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
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, computed, defineComponent, onMounted } from 'vue';
import { ApartmentInterface } from '@/store/apartments/types';
import { useStore } from 'vuex';
import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Breadcrumb from '@/components/Breadcrumb.vue';

export default defineComponent({
  name: 'ManageApartments',
  components: {
    Breadcrumb,
    Button,
    DataTable,
    Column,
  },
  props: {
    house: {
      type: Number,
      required: true,
    },
  },
  setup() {
    const store = useStore();
    const selectedApartment = ref();
    let houseID: number;
    const loading = ref(false);

    const selectedHouse = () => {
      return store.getters['housesStore/getSelectedHouse'];
    };

    const setApartments = async (id: number) => {
      loading.value = true;
      await store.dispatch('apartmentsStore/SET_APARTMENTS', id);
      setTimeout(() => {
        loading.value = false;
      }, 2000);
    };

    const apartmentsData = computed((): Array<ApartmentInterface> => {
      return store.getters['apartmentsStore/getApartmentsData'];
    });

    function chousenApartment(apartment: any) {
      store.dispatch('apartmentsStore/SET_SELECTED_APARTMENT_ID', apartment.id);
    }

    onMounted(() => {
      loading.value = true;
      houseID = selectedHouse();
      setApartments(houseID);
    });

    return {
      loading,
      apartmentsData,
      selectedApartment,
      chousenApartment,
    };
  },
});
</script>

<style lang="scss" scoped>
.manageApartments {
  height: 100%;
}
.wrapper {
  display: flex;
  flex-direction: column;

  .breadcrumb {
    margin: 0 0 1em 0;
  }
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

.add_btn {
  display: flex;
  margin: 15px;
  justify-content: flex-end;
}

label {
  display: inline-block;
}
</style>
