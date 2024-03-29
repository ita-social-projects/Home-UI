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
    <div class="tariffs-calculator">
      <div class="tariffs-calculator--left-col">
        <form>
          <div class="input_field tariff_name">
            <label for="tariff_name" :class="{ 'p-error': v$.title.$invalid && submitted }">Назва тарифу*</label>
            <InputText
              name="tariff_name"
              v-model="v$.title.$model"
              :class="{ 'p-invalid': v$.title.$invalid && submitted }"
            ></InputText>
            <p v-if="v$.title.$invalid && submitted" class="p-error">
              {{ v$.title.$silentErrors[0].$message }}
            </p>
          </div>
          <div class="input_field tariff_comment">
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
          <div class="tariffs-calculator--area-block">
            <div class="input_field house_picker">
              <Dropdown
                style="margin-top: 4em"
                name="house"
                v-model="tariffData.house"
                :options="houses"
                optionLabel="address"
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
      <div class="tariffs-calculator--right-col">
        <service-form :isFormHeader="true" @add-new-service="addService">
          <template #form-header="{ addNewService }">
            <Button class="p-button-success add-btn" @click="addNewService">
              Додати &nbsp;
              <i class="pi pi-plus-circle"></i>
            </Button>
          </template>
        </service-form>
        <div class="service-list">
          <Transition name="fade">
            <div class="service-list__wrapper" v-show="tariffData.services.length">
              <h3>{{ tariffData.title }}</h3>
              <blockquote>{{ tariffData.comment }}</blockquote>
              <ul>
                <TransitionGroup name="slide-fade">
                  <service-form
                    v-for="(service, idx) in tariffData.services"
                    :key="idx"
                    :original-service="{ service, idx }"
                    :isFormHeader="false"
                    @handle-service-actions="handleServiceActions"
                  >
                  </service-form>
                </TransitionGroup>
              </ul>
              <h4>Сума статей витрат: <Chip :label="servicesTotalPrice()" /> грн.</h4>
            </div>
          </Transition>
        </div>
      </div>
      <div class="calculation_controls">
        <Transition name="fade">
          <h4 v-show="!Object.keys(tariffData.house).length || !tariffData.services.length">
            Для розрахунку потрібно: обрати будинок <br />
            та принаймні одна стаття витрат!
          </h4>
        </Transition>
        <h4>
          Тариф дорівнює:
          <Chip :label="finalCalculation()" style="font-size: 1.2rem" />грн/м²
        </h4>
        <Button
          label="Згенерувати"
          icon="pi pi-check"
          class="p-button-info"
          :disabled="!tariffData.services.length || !Object.keys(tariffData.house).length"
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
import { useToast } from 'primevue/usetoast';

import { useStore } from 'vuex';
import { useVuelidate } from '@vuelidate/core';
import { tariffCalculatorValidations } from '@/finance/utils/validators/financeCalculationValidators';
import { RoutesEnum } from '@/router/types';
import ServiceForm from '@/finance/components/ServiceForm.vue';

import { TariffService, TariffActionEnum, SelectedHouse } from '@/finance/store/types';
import { StoreModuleEnum } from '@/store/types';
import { HousesActionsEnum, HousesGettersEnum } from '@/houses/store/types';
import { CooperationGettersEnum } from '@/cooperation/store/types';
import { HouseModel } from '@/houses/models/house.model';

export default defineComponent({
  name: 'tariffs-calculation',
  components: {
    InputText,
    Textarea,
    Dropdown,
    Chip,
    Button,
    Breadcrumb,
    ServiceForm,
  },
  setup() {
    const home = ref({
      to: RoutesEnum.StartPage,
    });
    const items = ref([{ to: RoutesEnum.FinanceSection }, { to: RoutesEnum.TariffsCalculation }]);
    const tariffData = reactive({
      house: {} as SelectedHouse,
      title: '',
      comment: '',
      services: [] as Array<TariffService>,
      tariffPrice: '0.00',
    });
    const v$ = useVuelidate(tariffCalculatorValidations, tariffData);
    const submitted = ref(false);

    const houses = ref();
    const area = computed(() => {
      return tariffData.house?.houseArea ?? 0;
    });
    const store = useStore();
    const toast = useToast();

    const currentTariff = JSON.parse(localStorage.getItem('current-tariff') as string);
    if (currentTariff) {
      tariffData.services = currentTariff.services;
      tariffData.title = currentTariff.tariff_title;
      tariffData.comment = currentTariff.tariff_comment;
      tariffData.house = currentTariff.house;
      // TODO add dispatch action for update currentTariff in store (when needed)
    }

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
            address: `${house.address.city}, ${house.address.street}, ${house.address.houseNumber},
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
      const total = tariffData.services.reduce((acc, service) => (acc += Number(service.servicePrice)), 0);
      return total.toString();
    };

    const resetForm = (): void => {
      submitted.value = false;
      tariffData.house = {} as SelectedHouse;
      tariffData.title = '';
      tariffData.comment = '';
      tariffData.services = [];
      localStorage.removeItem('current-tariff');
    };

    const addService = (newService: TariffService): void => {
      tariffData.services.push(newService);
    };

    const updateLocalStorage = (): void => {
      const currentTariff = {
        house_id: tariffData.house?.houseId,
        house: tariffData.house,
        tariff_title: tariffData.title,
        tariff_comment: tariffData.comment,
        services: tariffData.services,
        tariff_price: tariffData.tariffPrice,
      };
      localStorage.setItem('current-tariff', JSON.stringify(currentTariff));
      // TODO add action dispatch for update currentTariff in store (when needed)
    };

    const handleSubmit = (isFormValid: boolean): void => {
      submitted.value = true;
      if (!isFormValid) {
        return;
      }
      toast.add({
        severity: 'success',
        summary: 'Тариф додано!',
        detail: `'${tariffData.title}' успішно згенеровано`,
        life: 3000,
      });
      const currentTariff = {
        house_id: tariffData.house?.houseId,
        house: tariffData.house,
        tariff_title: tariffData.title,
        tariff_comment: tariffData.comment,
        services: tariffData.services,
        tariff_price: tariffData.tariffPrice,
      };
      store.dispatch(`${StoreModuleEnum.tariffStore}/${TariffActionEnum.CREATE_TARIFF}`, currentTariff);
      resetForm();
    };

    const roundupTariffTotal = (tariffTotal: number): string => {
      return tariffTotal > 1 ? tariffTotal.toFixed(2) : tariffTotal.toPrecision(3);
    };

    const finalCalculation = () => {
      if (!servicesTotalPrice() || !area.value) {
        tariffData.tariffPrice = '0.00';
        return '0.00';
      }
      const finalTariff = Number(servicesTotalPrice()) / area.value;
      tariffData.tariffPrice = roundupTariffTotal(finalTariff);
      return roundupTariffTotal(finalTariff);
    };

    const handleServiceActions = (payload: { index: number; updatedService: TariffService | null }): void => {
      if (!payload.updatedService) {
        tariffData.services = tariffData.services.filter((service, index) => index !== payload.index);
      } else {
        tariffData.services[payload.index] = payload.updatedService;
        updateLocalStorage();
      }
    };

    watch(
      () => ({ ...tariffData }),
      () => updateLocalStorage()
    );

    return {
      tariffData,
      area,
      houses,
      finalCalculation,
      handleServiceActions,
      addService,
      updateLocalStorage,
      servicesTotalPrice,
      roundupTariffTotal,
      submitted,
      handleSubmit,
      resetForm,
      v$,
      home,
      items,
    };
  },
});
</script>

<style lang="scss" scoped>
.tariffs-calculator {
  display: grid;
  grid-template-columns: 40% 55%;
  grid-template-rows: auto;
  grid-template-areas:
    'left-col right-col'
    'left-col right-col'
    'controls right-col';
  gap: 3em;
  padding-block-end: 2em;

  &--left-col {
    grid-area: left-col;
  }

  &--right-col {
    grid-area: right-col;
  }

  .calculation_controls {
    grid-area: controls;
  }

  .input_field {
    display: flex;
    flex-direction: column;
    padding-block-end: 1em;

    label {
      margin-block-end: 1em;
    }
  }

  &--area-block {
    display: flex;
    justify-content: space-between;
  }

  .service-list__wrapper {
    display: flex;
    flex-direction: column;

    h3 {
      text-align: center;
    }

    h4 {
      align-self: flex-end;
    }

    ul {
      max-height: 300px;
      overflow-y: auto;
      overflow-x: hidden;
      padding: 0;
    }

    li {
      display: flex;
      align-items: center;
    }
  }

  .service-list--item {
    padding: 0.3em 1em;
    margin-bottom: 0.5em;
    border: 1px solid rgb(214, 214, 214);
    border-radius: 7px;
    gap: 2em;

    &-text {
      width: 90%;
      display: flex;
      justify-content: space-between;
    }

    .service-list--actions {
      display: flex;
      align-items: center;
    }

    &-text,
    &--actions {
      align-items: center;
    }
  }

  .service-list--item,
  .service-list--item-edit {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  .service-list--item-edit {
    padding-block: 1em;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}

@media screen and (max-width: 1400px) {
  .tariffs-calculator--area-block {
    flex-direction: column;
  }
}

@media screen and (max-width: 1150px) {
  .tariffs-calculator {
    grid-template-columns: 1fr;
    padding-block-end: 4em;
    grid-template-areas:
      'left-col'
      'right-col'
      'controls';
  }
}
</style>
