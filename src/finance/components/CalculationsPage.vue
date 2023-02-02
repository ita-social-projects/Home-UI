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
import { HousesActionsEnum, HousesGettersEnum } from '@/houses/store/types';
import { TariffActionEnum } from '@/finance/store/types';
import { HouseModel } from '@/houses/models/house.model';
import { TariffModel } from '@/finance/models/tariff.model';
import { CooperationGettersEnum } from '@/cooperation/store/types';

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
    const items = reactive({
      'personal-account': 0,
      name: '',
      room: 0,
      square: 0,
      tariff: 0,
      calculated: 0,
    });
    // const apartmentData = reactive({
    //   apartmentId: 0,
    //   apartmentOwner: [] as OwnershipsInterface[],
    //   apartmentNumber: '',
    //   apartmentArea: 0,
    // });
    //TODO? is apartmentData needed?

    const tariffData = reactive({
      tariffList: [] as TariffModel[],
    });
    const averageTariff = () => {
      items.tariff =
        tariffData.tariffList.reduce((acc: number, el) => acc + Number(el.tariffPrice), 0) /
        tariffData.tariffList.length;
    };

    const cooperationId = computed(() => {
      return store.getters[`${StoreModuleEnum.cooperationStore}/${CooperationGettersEnum.getSelectedCooperationId}`];
    });
    const setHouses = async () => {
      await store.dispatch(`${StoreModuleEnum.housesStore}/${HousesActionsEnum.SET_HOUSES}`, cooperationId.value);
      const housesList = await store.getters[`${StoreModuleEnum.housesStore}/${HousesGettersEnum.getHousesData}`];
      houses.value = housesList.reduce((acc: any, house: HouseModel) => {
        return (acc = [
          ...acc,
          {
            adress: `${house.address.city}, ${house.address.street}, ${house.address.houseNumber},
              ${house.address.houseBlock}, ${house.address.district}`,
            houseArea: house.houseArea,
            houseId: house.id,
          },
        ]);
      }, []);
    };

    const apartments = async () =>
      tariffData.tariffList.map((data) => {
        store.dispatch(`${StoreModuleEnum.apartmentsStore}/${ApartmentsGettersEnum.getApartmentsData}`, data.houseId);
      });
    const setTariffsList = async () => {
      await store.dispatch(`${StoreModuleEnum.tariffStore}/${TariffActionEnum.SET_CURRENT_TARIFF}`);
      tariffData.tariffList = store.state.tariffStore.tariffList;
    };

    const calculated = computed(() => {
      return items.tariff * items.square;
    });
    const setCalculatedValue = () => {
      items.calculated = calculated.value;
    };

    onMounted(() => {
      setHouses();
      setTariffsList();
      setCalculatedValue();
    });

    const getApartmentsData = async () => {
      await apartments.map(({ ownerships, apartmentNumber, apartmentArea }) => {
        items.name = ownerships;
        items.room = apartmentNumber;
        items.square = apartmentArea;
      });
    };

    return { items, houses, apartments, getApartmentsData, averageTariff };
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