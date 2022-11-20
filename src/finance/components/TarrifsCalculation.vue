<template>
  <div>
    <h1>Калькулятор тарифу</h1>
    <form @submit.prevent="handleSubmit(!v$.$invalid)" class="tarrifs-calculator">
      <div class="input_field tarrif_name">
        <label for="tarrif_name" :class="{ 'p-error': v$.tarrifTitle.$invalid && submitted }">Назва тарифу*</label>
        <InputText
          name="tarrif_name"
          v-model="v$.tarrifTitle.$model"
          :class="{ 'p-invalid': v$.tarrifTitle.$invalid && submitted }"
        ></InputText>
        <p v-if="(v$.tarrifTitle.$invalid && submitted) || v$.tarrifTitle.$pending" class="p-error">
          {{ v$.tarrifTitle.$errors[0].$message }}
        </p>
      </div>
      <div class="expense-list">
        <div class="expense-list__wrapper" v-show="expense.list.length">
          <h3>{{ formState.tarrifTitle }}</h3>
          <p>{{ formState.tarrifComment }}</p>
          <ul>
            <li v-for="(service, idx) in expense.list" :key="idx">
              <div class="expense-list--item" v-if="!service.editState">
                <div class="expense-list--item-text">
                  <p>{{ service.serviceName }}</p>
                  <span>{{ service.servicePrice }} грн.</span>
                </div>
                <div class="expense-list--actions">
                  <Button
                    icon="pi pi-pencil"
                    class="p-button-rounded p-button-warning p-button-text"
                    @click="handleEdit(service)"
                  />
                  <Button
                    icon="pi pi-times"
                    class="p-button-rounded p-button-danger p-button-text"
                    @click="deleteExpense(service)"
                  />
                </div>
              </div>
              <div class="expense-list--item-edit" v-else>
                <InputText name="edit-service-name" v-model="service.serviceName"></InputText>
                <InputNumber name="edit-service-price" v-model="service.servicePrice"></InputNumber>
                <Button icon="pi pi-check" class="p-button-rounded p-button-text" @click="service.editState = false" />
              </div>
            </li>
          </ul>
          <h4>Сума статей витрат: <Chip :label="countServices()" /> грн.</h4>
        </div>
        <h3 v-show="!expense.list.length">Для розрахунку потрібна принаймні одна стаття витрат!</h3>
      </div>
      <div class="input_field tarrif_comment">
        <label for="comment">Коментар до тарифу:</label>
        <Textarea
          v-model="v$.tarrifComment.$model"
          name="comment"
          rows="5"
          cols="30"
          :class="{ 'p-invalid': v$.tarrifComment.$invalid && submitted }"
        />
        <p v-if="v$.tarrifComment.$invalid && submitted" class="p-error">{{ v$.tarrifComment.$error }}</p>
      </div>
      <div class="input_field house_picker">
        <!-- <label for="house">Оберіть будинок під тариф:</label> -->
        <Dropdown
          style="margin-top: 2em"
          name="house"
          v-model="selectedHouse"
          :options="houses"
          optionLabel="adress"
          placeholder="Оберіть будинок"
        />
      </div>
      <div class="input_field area-label">
        <h4>Загальна площа:</h4>
        <Chip :label="`${area}, м²`" icon="pi pi-pencil" />
      </div>
      <div class="input_field service_name">
        <label for="service_name" :class="{ 'p-error': v$.tarrifExpenseTitle.$invalid && submitted }"
          >Назва статті витрат*</label
        >
        <InputText
          name="service_name"
          v-model="v$.tarrifExpenseTitle.$model"
          :class="{ 'p-invalid': v$.tarrifExpenseTitle.$invalid && submitted }"
        ></InputText>
        <p v-if="v$.tarrifExpenseTitle.$error" class="p-error">
          {{ v$.tarrifExpenseTitle.$errors[0].$message }}
        </p>
      </div>
      <div class="input_field service_actions">
        <Button
          class="p-button-success add-btn"
          @click="addExpense(v$.tarrifExpenseTitle.$invalid && v$.tarrifExpenseCost.$invalid)"
          :disabled="v$.tarrifExpenseTitle.$invalid || v$.tarrifExpenseCost.$invalid"
        >
          Додати &nbsp;
          <i class="pi pi-plus-circle"></i>
        </Button>
      </div>
      <div class="input_field service_price">
        <label for="service_price" :class="{ 'p-error': v$.tarrifExpenseCost.$invalid && submitted }"
          >Вартість статті витрат*</label
        >
        <InputNumber
          class="servise_price_input"
          v-model="v$.tarrifExpenseCost.$model"
          name="service_price"
          placeholder="0.00 грн"
          :class="{ 'p-invalid': v$.tarrifExpenseCost.$invalid && submitted }"
        ></InputNumber>
        <p v-if="v$.tarrifExpenseCost.$error" class="p-error">
          {{ v$.tarrifExpenseCost.$errors[0].$message }}
        </p>
      </div>
      <div class="calculation_controls">
        <h4>
          Тариф дорівнює:
          <Chip :label="selectedHouse ? finalCalculation() : '----'" style="font-size: 1.2rem" />грн.
        </h4>
        <Button
          type="submit"
          label="Згенерувати"
          icon="pi pi-check"
          class="p-button-info"
          :disabled="!expense.list.length"
        />
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, ref, watch } from 'vue';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Textarea from 'primevue/textarea';
import Dropdown from 'primevue/dropdown';
import Chip from 'primevue/chip';
import Button from 'primevue/button';

import { useStore } from 'vuex';
import { useVuelidate } from '@vuelidate/core';
import { tarrifCalculatorValidations } from '@/finance/utils/validators/financeCalculationValidators';

import { TarrifService, SelectedHouse } from '@/finance/store/types';
import { StoreModuleEnum } from '@/store/types';
import { HousesActionsEnum, HousesGettersEnum } from '@/houses/store/types';
import { CooperationGettersEnum } from '@/cooperation/store/types';
import { HouseModel } from '@/houses/models/house.model';

export default defineComponent({
  name: 'tarrifs-calculation',
  components: {
    InputText,
    InputNumber,
    Textarea,
    Dropdown,
    Chip,
    Button,
  },
  setup() {
    const selectedHouse = ref<SelectedHouse>();

    const formState = reactive({
      tarrifTitle: '',
      tarrifComment: '',
      tarrifExpenseTitle: '',
      tarrifExpenseCost: null,
    });
    const rules = tarrifCalculatorValidations;
    const v$ = useVuelidate(rules, formState);
    const submitted = ref(false);

    let expense = reactive({ list: [] as Array<TarrifService> });
    const houses = ref();
    const area = computed(() => {
      return selectedHouse.value ? selectedHouse.value.houseArea : 0;
    });

    const servicesTotal = ref('0.00');

    const store = useStore();

    const currentTarrif: string | null = localStorage.getItem('current-tarrif');
    if (currentTarrif) {
      expense.list = JSON.parse(currentTarrif).services;
      formState.tarrifTitle = JSON.parse(currentTarrif).tarrifTitle;
      formState.tarrifComment = JSON.parse(currentTarrif).tarrifComment;
      selectedHouse.value = JSON.parse(currentTarrif).selectedHouse;
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

    const countServices = (): number => {
      const total = expense.list.reduce((acc: any, service: TarrifService) => {
        if (service.servicePrice) {
          return (acc += service.servicePrice);
        }
      }, 0);
      return total ? total.toString() : '0';
    };

    const addExpense = (isServiceFieldsValid: boolean): void => {
      v$.value.tarrifExpenseTitle.$touch();
      v$.value.tarrifExpenseCost.$touch();
      if (isServiceFieldsValid) {
        return;
      }
      const newService: TarrifService = {
        editState: false,
        serviceName: formState.tarrifExpenseTitle,
        servicePrice: formState.tarrifExpenseCost,
      };
      expense.list.push(newService);
      formState.tarrifExpenseTitle = '';
      formState.tarrifExpenseCost = null;
      v$.value.tarrifExpenseTitle.$reset();
      v$.value.tarrifExpenseCost.$reset();
    };

    const updateLocalStorage = (): void => {
      const currentTarrif = {
        tarrifTitle: formState.tarrifTitle,
        tarrifComment: formState.tarrifComment,
        selectedHouse: selectedHouse.value,
        services: expense.list,
      };
      localStorage.setItem('current-tarrif', JSON.stringify(currentTarrif));
    };

    const handleSubmit = (isFormvalid: boolean): void => {
      submitted.value = true;
      if (!isFormvalid) {
        submitted.value = false;
        console.log('💩💩💩💩💩💩');
        return;
      }
      resetForm();
      console.log('Sended and saved to DB');
    };

    const resetForm = (): void => {
      formState.tarrifTitle = '';
      formState.tarrifComment = '';
      formState.tarrifExpenseTitle = '';
      formState.tarrifExpenseCost = null;
      expense.list = [];
      selectedHouse.value = '';
      localStorage.removeItem('current-tarrif');
    };

    const finalCalculation = () => {
      const finalTarrif = countServices() / area.value;
      return finalTarrif > 1 ? finalTarrif.toFixed(2) : finalTarrif.toPrecision(3);
    };

    const deleteExpense = (serviceToDelete: TarrifService): void => {
      expense.list = expense.list.filter((service: TarrifService) => service !== serviceToDelete);
    };
    const handleEdit = (service: TarrifService) => {
      service.editState = true;
    };

    watch(
      () => [...expense.list],
      () => updateLocalStorage()
    );

    watch(
      () => selectedHouse.value,
      () => updateLocalStorage()
    );

    return {
      formState,
      selectedHouse,
      area,
      houses,
      finalCalculation,
      deleteExpense,
      handleEdit,
      expense,
      addExpense,
      updateLocalStorage,
      servicesTotal,
      countServices,
      submitted,
      handleSubmit,
      resetForm,
      v$,
    };
  },
});
</script>

<style lang="scss" scoped>
.tarrifs-calculator {
  display: grid;
  gap: 2em;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(6, 1fr);
  grid-template-rows: auto;
  padding: 2em 0 3.5em 0;
  label {
    display: block;
    margin-block-end: 1em;
  }
  .input_field input {
    width: 100%;
  }
  .tarrif_name,
  .tarrif_comment {
    grid-column: 1 / 3;
  }
  .house_picker,
  .service_name,
  .service_actions {
    grid-column: 1 / 2;
  }
  .area-label,
  .service_price {
    grid-column: 2 / 3;
  }
  .area-label h4,
  .expense-list h3 {
    margin-top: 0;
  }
  .tarrif_comment textarea {
    width: 100%;
  }
  .area-label {
    grid-row: 3;
  }
  .service_price {
    grid-row: 4;
  }
}
::v-deep(.service_price .servise_price_input) {
  input {
    max-width: 150px;
  }
}
.expense-list {
  height: 500px;
  display: flex;
  flex-direction: column;
  grid-column: 3 / 5;
  grid-row: 1 / 6;
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
  &--item {
    gap: 2em;
  }
  &--item,
  &--item-edit {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  &--item-text {
    width: 90%;
    display: flex;
    justify-content: space-between;
  }
  &--actions {
    display: flex;
  }
}
.expense-list ul {
  max-height: 500px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  list-style: none;
  padding: 0 0 2em 0;
  margin: 0;
  li {
    line-height: 3;
    padding: 0.5em 0;
    p {
      margin: 0;
    }
  }
}
.calculation_controls {
  grid-column: 1 / 2;
  justify-self: start;
  h4 {
    display: inline;
    margin-right: 1em;
  }
  button {
    margin-top: 1em;
  }
}

@media screen and (max-width: 1000px) {
  .tarrif_name,
  .house_picker,
  .service_name,
  .tarrif_comment,
  .area-label,
  .service_price,
  .expense-list,
  .area-label,
  .calculation_controls {
    grid-column: 1 / 5 !important;
  }
  .expense-list {
    grid-row: 7;
  }
}
</style>
