<template>
  <div>
    <Breadcrumb :home="home" :model="items">
      <template #item="{ item }">
        <router-link :to="item.to" custom v-slot="{ route, navigate, isActive, isExactActive }">
          <a @click="navigate" :class="{ 'active-link': isActive, 'active-link-exact': isExactActive }">{{
            route.meta.title
          }}</a>
        </router-link>
      </template>
    </Breadcrumb>
    <h1>Калькулятор тарифу</h1>
    <div class="tarrifs-calculator">
      <div class="tarrifs-calculator--left-col">
        <form>
          <div class="input_field tarrif_name">
            <label for="tarrif_name" :class="{ 'p-error': v$.title.$invalid && submitted }">Назва тарифу*</label>
            <InputText
              name="tarrif_name"
              v-model="v$.title.$model"
              :class="{ 'p-invalid': v$.title.$invalid && submitted }"
            ></InputText>
            <p v-if="v$.title.$invalid && submitted" class="p-error">
              {{ v$.title.$silentErrors[0].$message }}
            </p>
          </div>
          <div class="input_field tarrif_comment">
            <label for="comment">Коментар до тарифу:</label>
            <Textarea
              v-model="v$.comment.$model"
              name="comment"
              rows="5"
              cols="30"
              :class="{ 'p-invalid': v$.comment.$invalid && submitted }"
            />
            <p v-if="v$.comment.$invalid && submitted" class="p-error">{{ v$.comment.$silentErrors[0].$message }}</p>
          </div>
          <div class="tarrifs-calculator--area-block">
            <div class="input_field house_picker">
              <Dropdown
                style="margin-top: 4em"
                name="house"
                v-model="tarrifData.house"
                :options="houses"
                optionLabel="adress"
                placeholder="Оберіть будинок"
              />
            </div>
            <div class="input_field area-label">
              <h4>Загальна площа:</h4>
              <Chip :label="`${area}, м²`" icon="pi pi-pencil" style="max-width: 120px" />
            </div>
          </div>
        </form>
      </div>
      <div class="tarrifs-calculator--right-col">
        <form class="tarrifs-calculator--service-form">
          <div class="input_field service_name">
            <label for="service_name" :class="{ 'p-error': v$.serviceTitle.$invalid && isServiceAdded }"
              >Назва статті витрат*</label
            >
            <InputText
              name="service_name"
              v-model="v$.serviceTitle.$model"
              :class="{ 'p-invalid': v$.serviceTitle.$invalid && isServiceAdded }"
            ></InputText>
            <p v-if="v$.serviceTitle.$invalid && isServiceAdded" class="p-error">
              {{ v$.serviceTitle.$silentErrors[0].$message }}
            </p>
          </div>
          <div class="input_field service_price">
            <label for="service_price" :class="{ 'p-error': v$.servicePrice.$invalid && isServiceAdded }"
              >Вартість статті витрат*</label
            >
            <InputText
              class="servise_price_input"
              v-model="v$.servicePrice.$model"
              name="service_price"
              placeholder="0.00 грн"
              :class="{ 'p-invalid': v$.servicePrice.$invalid && isServiceAdded }"
            ></InputText>
            <p v-if="v$.servicePrice.$invalid && isServiceAdded" class="p-error">
              {{ v$.servicePrice.$silentErrors[0].$message }}
            </p>
          </div>
          <div class="input_field service_actions">
            <Button
              class="p-button-success add-btn"
              @click="addService(!v$.serviceTitle.$invalid && !v$.servicePrice.$invalid)"
            >
              Додати &nbsp;
              <i class="pi pi-plus-circle"></i>
            </Button>
          </div>
        </form>
        <div class="service-list">
          <div class="service-list__wrapper" v-show="tarrifData.services.length">
            <h3>{{ tarrifData.title }}</h3>
            <blockquote>{{ tarrifData.comment }}</blockquote>
            <ul>
              <service-item
                v-for="(service, idx) in tarrifData.services"
                :key="idx"
                :service="service"
                @toggle-service-edit="toggleServiceEdit(service)"
                @handle-service-delete="handleServiceDelete(service)"
              />
            </ul>
            <h4>Сума статей витрат: <Chip :label="servicesTotalPrice()" /> грн.</h4>
          </div>
        </div>
      </div>
      <div class="calculation_controls">
        <h4 v-show="!Object.keys(tarrifData.house) || !tarrifData.services.length">
          Для розрахунку потрібно: обрати будинок та принаймні одна стаття витрат!
        </h4>
        <h4>
          Тариф дорівнює:
          <Chip :label="finalCalculation()" style="font-size: 1.2rem" />грн/м²
        </h4>
        <Button
          label="Згенерувати"
          icon="pi pi-check"
          class="p-button-info"
          :disabled="!tarrifData.services.length || !Object.keys(tarrifData.house)"
          @click="handleSubmit(!v$.title.$invalid && !v$.comment.$invalid)"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, ref, watch } from 'vue';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import Dropdown from 'primevue/dropdown';
import Chip from 'primevue/chip';
import Button from 'primevue/button';
import Breadcrumb from 'primevue/breadcrumb';

import { useStore } from 'vuex';
import { useVuelidate } from '@vuelidate/core';
import { tarrifCalculatorValidations } from '@/finance/utils/validators/financeCalculationValidators';
import { RoutesEnum } from '@/router/types';
import ServiceItem from '@/finance/components/ServiceItem.vue';

import { TarrifService, TarrifActionEnum, SelectedHouse } from '@/finance/store/types';
import { StoreModuleEnum } from '@/store/types';
import { HousesActionsEnum, HousesGettersEnum } from '@/houses/store/types';
import { CooperationGettersEnum } from '@/cooperation/store/types';
import { HouseModel } from '@/houses/models/house.model';

export default defineComponent({
  name: 'tarrifs-calculation',
  components: {
    InputText,
    Textarea,
    Dropdown,
    Chip,
    Button,
    Breadcrumb,
    ServiceItem,
  },
  setup() {
    const home = ref({
      to: RoutesEnum.StartPage,
    });
    const items = ref([{ to: RoutesEnum.FinanceSection }, { to: RoutesEnum.TarrifsCalculation }]);
    const tarrifData = reactive({
      house: {} as SelectedHouse,
      title: '',
      comment: '',
      serviceTitle: '',
      servicePrice: null,
      services: [] as Array<TarrifService>,
    });
    const v$ = useVuelidate(tarrifCalculatorValidations, tarrifData);
    const submitted = ref(false);
    const isServiceAdded = ref(false);

    const houses = ref();
    const area = computed(() => {
      return tarrifData.house?.houseArea ?? 0;
    });
    const store = useStore();

    const currentTarrif = JSON.parse(localStorage.getItem('current-tarrif') as string);
    if (currentTarrif) {
      tarrifData.services = currentTarrif.services;
      tarrifData.title = currentTarrif.title;
      tarrifData.comment = currentTarrif.comment;
      tarrifData.house = currentTarrif.house;
      // TODO dispatch set current tarrif action
    }

    const cooperationId = computed(() => {
      return store.getters[`${StoreModuleEnum.cooperationStore}/${CooperationGettersEnum.getSelectedCooperationId}`];
    });

    const setHouses = async () => {
      houses.value = [
        { adress: 'Dnipro, Kirova str. 102', houseArea: 250, houseId: 1 },
        { adress: 'Dnipro, Robocha str. 31', houseArea: 420, houseId: 2 },
        { adress: 'Dnipro, Bohdana Hmelnitskogo str. 12', houseArea: 350, houseId: 3 },
        { adress: 'Dnipro, Peremogi str. 23', houseArea: 270, houseId: 4 },
      ];
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

    onMounted(() => {
      setHouses();
    });

    const servicesTotalPrice = (): string => {
      const total = tarrifData.services.reduce((acc, service) => (acc += Number(service.servicePrice)), 0);
      return total.toString();
    };

    const resetServiceForm = () => {
      isServiceAdded.value = false;
      tarrifData.serviceTitle = '';
      tarrifData.servicePrice = null;
    };

    const resetForm = (): void => {
      submitted.value = false;
      tarrifData.title = '';
      tarrifData.comment = '';
      tarrifData.serviceTitle = '';
      tarrifData.servicePrice = null;
      tarrifData.services = [];
      tarrifData.house = {} as SelectedHouse;
      localStorage.removeItem('current-tarrif');
    };

    const addService = (isServiceValid: boolean): void => {
      isServiceAdded.value = true;
      if (!isServiceValid) {
        return;
      }
      const newService: TarrifService = {
        editState: false,
        serviceTitle: tarrifData.serviceTitle,
        servicePrice: tarrifData.servicePrice,
      };
      tarrifData.services.push(newService);
      resetServiceForm();
    };

    const updateLocalStorage = (): void => {
      // TODO refactor current tarrif to match model / check action + mutation set the current tarrif to a store
      const currentTarrif = {
        houseId: tarrifData.house?.houseId,
        house: tarrifData.house,
        title: tarrifData.title,
        comment: tarrifData.comment,
        services: tarrifData.services,
      };
      localStorage.setItem('current-tarrif', JSON.stringify(currentTarrif));
      // store.dispatch(`${StoreModuleEnum.tarrifStore}/${TarrifActionEnum.SET_CURRENT_TARRIF}`, currentTarrif);
    };

    const handleSubmit = (isFormValid: boolean): void => {
      submitted.value = true;
      if (!isFormValid) {
        return;
      }
      store.dispatch(`${StoreModuleEnum.tarrifStore}/${TarrifActionEnum.CLEAR_CURRENT_TARRIF}`);
      resetForm();
    };

    const finalCalculation = () => {
      if (!servicesTotalPrice() || !area.value) {
        return '0.00';
      }
      const finalTarrif = Number(servicesTotalPrice()) / area.value;
      return finalTarrif > 1 ? finalTarrif.toFixed(2) : finalTarrif.toPrecision(3);
    };

    const handleServiceDelete = (serviceToDelete: TarrifService): void => {
      tarrifData.services = tarrifData.services.filter((service: TarrifService) => service !== serviceToDelete);
    };
    const toggleServiceEdit = (service: TarrifService): void => {
      service.editState = !service.editState;
    };

    watch(
      () => ({ ...tarrifData }),
      () => updateLocalStorage()
    );

    return {
      tarrifData,
      area,
      houses,
      finalCalculation,
      handleServiceDelete,
      toggleServiceEdit,
      addService,
      updateLocalStorage,
      servicesTotalPrice,
      submitted,
      isServiceAdded,
      handleSubmit,
      resetForm,
      resetServiceForm,
      v$,
      home,
      items,
    };
  },
});
</script>

<style lang="scss" scoped>
.p-breadcrumb a:hover {
  cursor: pointer;
  text-shadow: 1px 1px 1px rgba(150, 150, 150, 0.5);
}
.active-link {
  text-shadow: 1px 1px 1px rgba(150, 150, 150, 1);
}

.tarrifs-calculator {
  display: flex;
  flex-wrap: wrap;
  padding-block-end: 4em;
  gap: 3.5em;
  &--left-col,
  &--right-col {
    display: flex;
    width: 35%;
    flex-direction: column;
  }
  &--right-col {
    width: 61%;
  }
  &--service-form {
    display: flex;
    gap: 1em;
    flex-wrap: wrap;
    .service_name,
    .service_price {
      flex-grow: 1;
      width: 48%;
    }
  }
  &--area-block {
    display: flex;
    justify-content: space-between;
  }
  .input_field {
    display: flex;
    flex-direction: column;
    padding-block-end: 2em;
    label {
      margin-block-end: 1em;
    }
  }
  .service-list {
    max-height: 250px;
    display: flex;
    flex-direction: column;
    &__wrapper {
      display: flex;
      flex-direction: column;
    }
    h4 {
      align-self: flex-end;
    }
    h3 {
      align-self: center;
    }
    ul {
      max-height: 250px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      list-style: none;
      padding: 0 0 2em 0;
      margin: 0;
      margin-block-end: 1em;
      li {
        line-height: 1;
        padding: 0.5em 0;
        p {
          margin: 0;
        }
      }
    }
  }
}
</style>
