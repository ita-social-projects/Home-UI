<template>
  <div>
    <Breadcrumb :home="home" :model="items">
      <template #item="{ item }">
        <router-link :to="item.to" custom v-slot="{ itemigate, isActive, isExactActive }">
          <a @click="itemigate" :class="{ 'active-link': isActive, 'active-link-exact': isExactActive }">{{
            item.label
          }}</a>
        </router-link>
      </template>
    </Breadcrumb>
    <h1 style="text-align: center">Розрахунок</h1>
    <Dropdown
      class="drop-menu"
      v-model="selectedHouse"
      :options="houses"
      optionLabel="adress"
      optionValue="houseId"
      placeholder="Обрати будинок"
    />
    <div v-if="!selectedHouse" class="house-warning">
      <p>Оберіть, будь ласка, будинок</p>
    </div>
    <DataTable :value="apartmentList" v-else>
      <Column field="personal_account" header="Особовий рахунок" />
      <Column field="owner" style="min-width: 17rem" header="ПІП" />
      <Column field="apartment_number" style="min-width: 5rem" header="Приміщення" />
      <Column field="apartment_area" style="min-width: 5rem" header="Площа" />
      <Column field="house_tariff" style="min-width: 5rem" header="Тариф" />
      <Column
        field="accrued"
        style="
           {
            min-width: 5rem;
            word-wrap: break-word;
          }
        "
        header="Нараховано"
      />
    </DataTable>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed, watch } from 'vue';
import { useStore } from 'vuex';
import DataTable from 'primevue/datatable';
import Dropdown from 'primevue/dropdown';
import Column from 'primevue/column';
import Breadcrumb from 'primevue/breadcrumb';

import { StoreModuleEnum } from '@/store/types';
import { HousesActionsEnum, HousesGettersEnum } from '@/houses/store/types';
import { CooperationGettersEnum } from '@/cooperation/store/types';
import { RoutesEnum } from '@/router/types';
import { TariffModel } from '@/finance/models/tariff.model';
import { ApartmentsActionsEnum, ApartmentsGettersEnum } from '@/apartment/store/apartments/types';
import { TariffActionEnum } from '@/finance/store/types';
import { ApartmentModel } from '@/apartment/models/apartment.model';
import { HouseModel } from '@/houses/models/house.model';

export default defineComponent({
  components: { DataTable, Dropdown, Column, Breadcrumb },
  name: 'calculations-page',
  setup() {
    const store = useStore();
    const home = ref({
      label: 'Початкова',
      to: RoutesEnum.StartPage,
    });
    const items = ref([
      { label: 'Фінанси', to: RoutesEnum.FinanceSection },
      { label: 'Розрахунки', to: RoutesEnum.CalculationsPage },
    ]);

    const houses = ref();
    const apartmentList = ref();
    const selectedHouse = ref();
    const averageTariffForSelectedHouse = ref();
    const filteredList = ref();
    const apartmentsInTheHouse = ref([]);

    const tariffData = ref({
      tariffList: [
        {
          tariffId: 1,
          houseId: 1,
          house: selectedHouse,
          tariffTitle: 'hhhh',
          tariffComment: 'hhh',
          services: [{ editState: false, serviceTitle: 'hhh', servicePrice: null }],
          tariffPrice: '12',
        },
        {
          tariffId: 1,
          houseId: 2,
          house: selectedHouse,
          tariffTitle: 'hhhh',
          tariffComment: 'hhh',
          services: [{ editState: false, serviceTitle: 'hhh', servicePrice: null }],
          tariffPrice: '15',
        },
        {
          tariffId: 1,
          houseId: 3,
          house: selectedHouse,
          tariffTitle: 'hhhh',
          tariffComment: 'hhh',
          services: [{ editState: false, serviceTitle: 'hhh', servicePrice: null }],
          tariffPrice: '20',
        },
        {
          tariffId: 1,
          houseId: 3,
          house: selectedHouse,
          tariffTitle: 'hhhh',
          tariffComment: 'hhh',
          services: [{ editState: false, serviceTitle: 'hhh', servicePrice: null }],
          tariffPrice: '30',
        },
      ],
    });

    //TODO when backend appears, uncomment the code below and remove the same variaFble in this component
    // const tariffData = ref({
    //   tariffList: [] as TariffModel[],
    // });

    const cooperationId = computed(() => {
      return store.getters[`${StoreModuleEnum.cooperationStore}/${CooperationGettersEnum.getSelectedCooperationId}`];
    });

    const setHouses = async () => {
      await store.dispatch(`${StoreModuleEnum.housesStore}/${HousesActionsEnum.SET_HOUSES}`, cooperationId.value);
      const housesList = await store.getters[`${StoreModuleEnum.housesStore}/${HousesGettersEnum.getHousesData}`];
      await store.getters[`${StoreModuleEnum.housesStore}/${HousesGettersEnum.getHousesData}`];
      houses.value = housesList.reduce((acc: any, house: HouseModel) => {
        return (acc = [
          ...acc,
          {
            address: `${house.address.city}, ${house.address.street}, ${house.address.houseNumber},
              ${house.address.houseBlock}, ${house.address.district}`,
            houseArea: house.houseArea,
            houseId: house.id,
          },
        ]);
      }, []);
    };

    const setApartmentsByHouseId = async () => {
      await store.dispatch(
        `${StoreModuleEnum.apartmentsStore}/${ApartmentsActionsEnum.SET_APARTMENTS}`,
        selectedHouse.value
      );
    };

    const getApartmentsByHouseId = () => {
      apartmentsInTheHouse.value =
        store.getters[`${StoreModuleEnum.apartmentsStore}/${ApartmentsGettersEnum.getApartmentsData}`];
      return apartmentsInTheHouse.value;
    };

    const averageTariffHouse = (listToAverage: TariffModel[]) => {
      averageTariffForSelectedHouse.value =
        listToAverage.reduce((acc: number, el) => acc + Number(el.tariffPrice), 0) / listToAverage.length;
    };

    const setTariffList = () => {
      //TODO when backend appears, uncomment below code and remove two lines of code after
      // await store.dispatch(`${StoreModuleEnum.tariffStore}/${TariffActionEnum.SET_CURRENT_TARIFF}`);
      // tariffData.value.tariffList = store.state.tariffStore.tariffList;

      filteredList.value = tariffData.value.tariffList.filter((el) => el.houseId === selectedHouse.value);
      averageTariffHouse(filteredList.value);
    };

    const updatedApartmentData = () => {
      const updatedApartment = apartmentsInTheHouse.value.map((apartment: ApartmentModel) => {
        let owner = 'немає даних';
        if (!apartment.ownerships) return;
        apartment?.ownerships.map((el) => {
          owner = el.owner.firstName + ' ' + el.owner.lastName + ' ' + el.owner.middleName;
        });
        return {
          personal_account: apartment.id,
          apartment_number: apartment.apartmentNumber,
          apartment_area: apartment.apartmentArea,
          owner,
          house_tariff: averageTariffForSelectedHouse,
          accrued: accrued(averageTariffForSelectedHouse.value, apartment.apartmentArea),
        };
      });
      apartmentList.value = updatedApartment;
    };

    const accrued = (averageTariffForSelectedHouse: number, apartmentArea: number) => {
      return averageTariffForSelectedHouse * apartmentArea;
    };

    watch(
      () => selectedHouse.value,
      () => {
        setTariffList(), setApartmentsByHouseId(), getApartmentsByHouseId();
      }
    );

    watch(
      () => tariffData.value.tariffList,
      () => averageTariffHouse(filteredList.value)
    );

    watch(
      () => apartmentsInTheHouse.value,
      () => updatedApartmentData()
    );

    onMounted(() => {
      setHouses();
    });

    return {
      home,
      items,
      houses,
      apartmentList,
      tariffData,
      selectedHouse,
    };
  },
});
</script>

<style scoped>
::v-deep(.drop-menu) {
  margin-bottom: 22px;
}
::v-deep(.drop-menu:focus) {
  background: #ffff;
}

::v-deep(.p-dropdown:not(.p-disabled).p-focus) {
  border-color: #ffff;
  box-shadow: 0 0 0 1px #d4d4d8;
}

::v-deep(thbody) {
  font-family: 'Open Sans';
  font-style: normal;
}

::v-deep(.p-datatable .p-column-header-content) {
  display: block;
  text-align: center;
}

::v-deep(.p-datatable .p-datatable-thead > tr > th) {
  padding: 0.75rem;
}

::v-deep(.p-datatable .p-datatable-tbody > tr > td) {
  text-align: center;
}

::v-deep(.p-datatable table) {
  width: 50vh;
}

.house-warning {
  display: flex;
  justify-content: center;
  font-size: x-large;
  font-weight: 800;
  color: #3b82f6;
  align-self: center;
}
</style>
