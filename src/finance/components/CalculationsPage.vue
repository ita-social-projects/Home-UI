<template>
  <div>
    <Breadcrumb :home="home" :model="items">
      <template #item="{ item }">
        <router-link :to="item.to" custom v-slot="{ navigate, isActive, isExactActive }">
          <a @click="navigate" :class="{ 'active-link': isActive, 'active-link-exact': isExactActive }">{{
            item.label
          }}</a>
        </router-link>
      </template>
    </Breadcrumb>
    <h1>Розрахунок</h1>
    <Dropdown
      class="drop-menu"
      v-model="selectedHouse"
      :options="houses"
      optionLabel="adress"
      optionValue="code"
      placeholder="Обрати будинок"
    />
    <DataTable :value="items">
      <Column field="personal-account" style="min-width: 18rem" header="Особовий рахунок" />
      <Column field="name" style="min-width: 25rem" header="ПІП" />
      <Column field="room" style="min-width: 15rem" header="Приміщення" />
      <Column field="square" style="min-width: 10rem" header="Площа" />
      <Column field="tariff" style="min-width: 15rem" header="Тариф" />
      <Column field="calculated" style="min-width: 15rem" header="Нараховано" />
    </DataTable>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed, reactive } from 'vue';
import { useStore } from 'vuex';
import DataTable from 'primevue/datatable';
import Dropdown from 'primevue/dropdown';
import Column from 'primevue/column';
import { StoreModuleEnum } from '@/store/types';
import { ApartmentInterface, ApartmentsGettersEnum } from '@/apartment/store/apartments/types';
import { OwnershipsInterface, OwnerInterface } from '@/apartment/store/ownerships/types';
// import { TariffActionEnum } from '@/finance/store/types';
import { HouseModel } from '@/houses/models/house.model';
import { TarrifModel } from '../models/tarrif.model';

export default defineComponent({
  components: { DataTable, Dropdown, Column },
  name: 'calculations-page',
  setup() {
    const store = useStore();
    const houses = ref();
    // const houses = [
    //     { adress: 'New York', code: 'NY' },
    //     { adress: 'Rome', code: 'RM' },
    //     { adress: 'London', code: 'LDN' },
    //     { adress: 'Istanbul', code: 'IST' },
    //     { adress: 'Paris', code: 'PRS' },
    // ];
    // const items = [
    //   {
    //     'personal-account': '12345',
    //     name: 'Сергій Сидоренко',
    //     room: 1,
    //     square: 28,
    //     tariff: '1.25',
    //     calculated: 103,
    //   },
    //   {
    //     'personal-account': '5526',
    //     name: 'Борис Джонсонюк',
    //     room: 1,
    //     square: 75,
    //     tariff: '1.45',
    //     calculated: 810,
    //   },
    //   {
    //     'personal-account': '12345',
    //     name: 'Борис Джонсонюк',
    //     room: 1,
    //     square: 28,
    //     tariff: '1.25',
    //     calculated: 1036,
    //   },
    //   {
    //     'personal-account': '12345',
    //     name: 'Борис Джонсонюк',
    //     room: 1,
    //     square: 28,
    //     tariff: '1.25',
    //     calculated: 1036,
    //   },
    // ];
    const items=reactive(
      {
        'personal-account': apartmentData.apartmentOwner.id,
        name: apartmentData.apartmentOwner.owner,
        room: apartmentData.apartmentNumber,
        square: null,
        tariff: null,
        calculated: null,
        }
    ),
    const apartmentData = reactive({
      apartmentId: 0,
      apartmentOwner: [] as OwnershipsInterface[],
      apartmentNumber: '',
      apartmentArea: 0,
    });
    //TODO? is apartmentData needed?

    const tariffData = reactive({
      tariffList: [] as TarrifModel[],
    });
    const averageTariff=()=>{
      items.tariff=tariffData.tariffList.tariffPrice.reduce((acc, el)=>acc+el,0)/tariffData.tariffList.length;
    }
    //  const setHouses = async () => {
    //     await store.dispatch(`${StoreModuleEnum.housesStore}/${HousesActionsEnum.SET_HOUSES}`, cooperationId.value);
    //     const housesList = await store.getters[`${StoreModuleEnum.housesStore}/${HousesGettersEnum.getHousesData}`];
    //     houses.value = housesList.reduce((acc: any, house: HouseModel) => {
    //       return (acc = [
    //         ...acc,
    //         {
    //           adress: `${house.address.city}, ${house.address.street}, ${house.address.houseNumber},
    //           ${house.address.houseBlock}, ${house.address.district}`,
    //           houseArea: house.houseArea,
    //           houseId: house.id,
    //         },
    //       ]);
    //     }, []);
    //   };

    const apartments = computed(() =>
      store.dispatch(
        `${StoreModuleEnum.apartmentsStore}/${ApartmentsGettersEnum.getApartmentsData}`
        tariffData.tariffList.houseId
      )
    );
    const setTariffsList = async () => {
      // await store.dispatch(`${StoreModuleEnum.tariffStore}/${TariffActionEnum.SET_TARIFF_LIST}`);
      // tariffData.tariffList = store.state.tariffStore.tariffList;
    };

    const calculated = () => {
      items.calculated=items.tariff * apartmentData.apartmentArea);
    };
    onMounted(() => {
      // setHouses();     
      setTariffsList();
    });
    const getApartmentsData = async () => {
     await apartments.value((data) =>
        data.map((apartment: ApartmentInterface) => {
          items.apartmentId = apartment.id;
          items.apartmentOwner = apartment.ownerships;
          items.apartmentNumber = apartment.apartmentNumber;
          items.apartmentArea = apartment.apartmentArea;
        })
      );
    };

    return { items, houses, apartments, getApartmentsData, averageTariff, calculated };
  },
});
</script>

<style scoped>
::v-deep(.drop-menu) {
  margin-bottom: 22px;
  background: #ebf2ff;
}

::v-deep(.pi-chevron-down:before) {
  background: #0a65ff;
  border-radius: 3px;
  color: #ffff;
  padding: 4px 5px;
}

::v-deep(thbody) {
  font-family: 'Open Sans';
  font-style: normal;
}
</style>