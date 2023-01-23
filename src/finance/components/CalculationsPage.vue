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
import { OwnershipsInterface } from '@/apartment/store/ownerships/types';

export default defineComponent({
  components: { DataTable, Dropdown, Column },
  name: 'calculations-page',
  setup() {
    const selectedHouse = ref();
    const houses = [
      { adress: 'New York', code: 'NY' },
      { adress: 'Rome', code: 'RM' },
      { adress: 'London', code: 'LDN' },
      { adress: 'Istanbul', code: 'IST' },
      { adress: 'Paris', code: 'PRS' },
    ];
    const items = [
      {
        'personal-account': '12345',
        name: 'Сергій Сидоренко',
        room: 1,
        square: 28,
        tariff: '1.25',
        calculated: 103,
      },
      {
        'personal-account': '5526',
        name: 'Борис Джонсонюк',
        room: 1,
        square: 75,
        tariff: '1.45',
        calculated: 810,
      },
      {
        'personal-account': '12345',
        name: 'Борис Джонсонюк',
        room: 1,
        square: 28,
        tariff: '1.25',
        calculated: 1036,
      },
      {
        'personal-account': '12345',
        name: 'Борис Джонсонюк',
        room: 1,
        square: 28,
        tariff: '1.25',
        calculated: 1036,
      },
    ];
    const store = useStore();
    const apartments = computed(() =>
      store.dispatch(
        `${StoreModuleEnum.apartmentsStore}/${ApartmentsGettersEnum.getApartmentsData}`
        // tariffData.value.houseId
      )
    );
    // const tariffData = computed(
    //   () => store.getters[`${StoreModuleEnum.tariffStore}/${TariffGettersEnum.getCurrentTariff}`]
    // );

    onMounted(() => {
      accrued();
      // return { tariffData, apartments };
    });
    const apartmentData = reactive({
      apartmentId: 0,
      apartmentOwner: [] as OwnershipsInterface[],
      apartmentNumber: '',
      apartmentArea: 0,
    });
    const getApartmentsData = () => {
      apartments.value.then((data) =>
        data.map((apartment: ApartmentInterface) => {
          apartmentData.apartmentId = apartment.id;
          apartmentData.apartmentOwner = apartment.ownerships;
          apartmentData.apartmentNumber = apartment.apartmentNumber;
          apartmentData.apartmentArea = apartment.apartmentArea;
        })
      );
    };

    function accrued() {
      // return tariffData.value.servicePrice * apartmentData.apartmentArea;
    }
    return { items, selectedHouse, houses, apartments, accrued, getApartmentsData };
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
}
</style>