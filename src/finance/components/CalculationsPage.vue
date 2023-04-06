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
      <Column field="personal_account" style="min-width: 18rem" header="Особовий рахунок" />
      <Column field="owner" style="min-width: 25rem" header="ПІП" />
      <Column field="apartment_number" style="min-width: 15rem" header="Приміщення" />
      <Column field="apartment_area" style="min-width: 10rem" header="Площа" />
      <Column field="house_tariff" style="min-width: 15rem" header="Тариф" />
      <Column field="accrued" style="min-width: 15rem" header="Нараховано" />
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
import { HousesActionsEnum } from '@/houses/store/types';
import { CooperationGettersEnum } from '@/cooperation/store/types';
import { RoutesEnum } from '@/router/types';
import { TariffModel } from '../models/tariff.model';

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

    const apartmentDataMocked = [
      {
        id: 3,
        apartmentNumber: '5',
        apartmentArea: 32,
        ownerships: [{ id: 1, owner: ['AAA', 'CCC'], ownershipPart: '' }],
      },
      {
        id: 2,
        apartmentNumber: '12',
        apartmentArea: 45,
        ownerships: [{ id: 1, owner: ['BBB'], ownershipPart: '' }],
      },
      {
        id: 2,
        apartmentNumber: '12',
        apartmentArea: 15,
        ownerships: [{ id: 1, owner: ['AAA'], ownershipPart: '' }],
      },
      {
        id: 3,
        apartmentNumber: '12',
        apartmentArea: 5,
        ownerships: [{ id: 2, owner: ['AAA'], ownershipPart: '' }],
      },
      {
        id: 4,
        apartmentNumber: '12',
        apartmentArea: 45,
        ownerships: [{ id: 3, owner: ['AAA'], ownershipPart: '' }],
      },
    ];
    const tariffData = ref({
      tariffList: [
        {
          tariffId: 1,
          houseId: 2,
          house: selectedHouse,
          tariffTitle: 'hhhh',
          tariffComment: 'hhh',
          services: [{ editState: false, serviceTitle: 'hhh', servicePrice: null }],
          tariffPrice: '12',
        },
        {
          tariffId: 1,
          houseId: 3,
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
          houseId: 4,
          house: selectedHouse,
          tariffTitle: 'hhhh',
          tariffComment: 'hhh',
          services: [{ editState: false, serviceTitle: 'hhh', servicePrice: null }],
          tariffPrice: '30',
        },
      ],
    });

    const cooperationId = computed(() => {
      return store.getters[`${StoreModuleEnum.cooperationStore}/${CooperationGettersEnum.getSelectedCooperationId}`];
    });

    const setHouses = async () => {
      houses.value = [
        { adress: 'Dnipro, Robocha str. 31', houseArea: 420, houseId: 2 },
        { adress: 'Dnipro, Bohdana Hmelnitskogo str. 12', houseArea: 350, houseId: 3 },
        { adress: 'Dnipro, Peremogi str. 23', houseArea: 270, houseId: 4 },
      ];

      await store.dispatch(`${StoreModuleEnum.housesStore}/${HousesActionsEnum.SET_HOUSES}`, cooperationId.value);
      // await store.getters[`${StoreModuleEnum.housesStore}/${HousesGettersEnum.getHousesData}`];
      // houses.value = housesList.reduce((acc: any, house: HouseModel) => {
      //   return (acc = [
      //     ...acc,
      //     {
      //       adress: `${house.address.city}, ${house.address.street}, ${house.address.houseNumber},
      //         ${house.address.houseBlock}, ${house.address.district}`,
      //       houseArea: house.houseArea,
      //       houseId: house.id,
      //     },
      //   ]);
      // }, []);
    };
    const getApartmentsByHouseId = computed(() => {
      //TODO when backend appears, uncomment the code below and remove code under it
      // return store.getters[`${StoreModuleEnum.apartmentsStore}/${ApartmentsGettersEnum.getApartmentsData}`];
      return apartmentDataMocked.filter((el) => el.id === selectedHouse.value);
    });

    //TODO when backend appears, uncomment the code below and remove the same variable in this component
    // const tariffData = reactive({
    //   tariffList: [] as TariffModel[],
    // });

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
    const spreadArray = (arr: (string | undefined)[]) => {
      for (const value of arr.values()) {
        return value;
      }
    };

    const updatedApartmentData = () => {
      const updatedApartment = getApartmentsByHouseId.value.map((apartment) => {
        const getOwnershipsByApartment = apartment.ownerships.map((el) => {
          return spreadArray(el.owner);
        });

        return {
          personal_account: apartment.id,
          apartment_number: apartment.apartmentNumber,
          apartment_area: apartment.apartmentArea,
          owner: spreadArray(getOwnershipsByApartment),
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
      () => setTariffList()
    );

    watch(
      () => selectedHouse.value,
      () => averageTariffHouse(filteredList.value)
    );

    watch(
      () => selectedHouse.value,
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
      apartmentDataMocked,
      selectedHouse,
      getApartmentsByHouseId,
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

.house-warning {
  display: flex;
  justify-content: center;
  font-size: x-large;
  font-weight: 800;
  color: #3b82f6;
  align-self: center;
}
</style>
