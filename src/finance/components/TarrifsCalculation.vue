<template>
  <div>
    <h1>Калькулятор тарифу</h1>
    <div class="tarrifs-calculator">
      <div class="input_field tarrif_name">
        <label for="tarrif_name">Назва тарифу:</label>
        <InputText
          name="tarrif_name"
          v-model="tarrifTitle"
          :class="{ 'p-invalid': v$.tarrifTitle.$error }"
          @blur="v$.tarrifTitle.$touch"
        ></InputText>
        <p v-if="v$.tarrifTitle.$error" class="p-error">{{ v$.tarrifTitle.$errors[0].$message }}</p>
      </div>
      <div class="expense-list">
        <h3>{{ tarrifTitle }}</h3>
        <p>{{ tarrifComment }}</p>
        <!-- {{ housesInfo }} -->
        <ul v-show="expenseList">
          <li v-for="(expense, idx) in expenseList" :key="idx">
            {{ expense.serviceName }}
            <span>{{ expense.servicePrice }} грн.</span>
            <div class="expense-list--actions">
              <Button icon="pi pi-pencil" class="p-button-rounded p-button-warning p-button-text" />
              <Button icon="pi pi-times" class="p-button-rounded p-button-danger p-button-text" />
            </div>
          </li>
        </ul>
        <h4>Сума статей витрат: <Chip :label="finalCalculation" /> грн.</h4>
      </div>
      <div class="input_field tarrif_comment">
        <label for="comment">Коментар до тарифу:</label>
        <Textarea
          v-model="tarrifComment"
          name="comment"
          rows="5"
          cols="30"
          :class="{ 'p-invalid': v$.tarrifComment.$error }"
          @blur="v$.tarrifComment.$touch"
        />
        <p v-if="v$.tarrifComment.$error" class="p-error">{{ v$.tarrifComment.$errors[0].$message }}</p>
      </div>
      <div class="input_field house_picker">
        <!-- <label for="house">Оберіть будинок під тариф:</label> -->
        <Dropdown
          name="house"
          v-model="selectedHouse"
          :options="houses"
          optionLabel="name"
          optionValue="code"
          placeholder="Оберіть будинок"
        />
      </div>
      <div class="input_field area-label">
        <h4>Загальна площа:</h4>
        <Chip :label="`${area}, м²`" icon="pi pi-pencil" />
      </div>
      <div class="input_field service_name">
        <label for="service_name">Назва статті витрат:</label>
        <InputText
          name="service_name"
          v-model="tarrifExpenseTitle"
          :class="{ 'p-invalid': v$.tarrifExpenseTitle.$error }"
          @blur="v$.tarrifExpenseTitle.$touch"
        ></InputText>
        <p v-if="v$.tarrifExpenseTitle.$error" class="p-error">{{ v$.tarrifExpenseTitle.$errors[0].$message }}</p>
      </div>
      <div class="input_field service_actions">
        <Button class="p-button-success add-btn" @click="addExpense">
          Додати &nbsp;
          <i class="pi pi-plus-circle"></i>
        </Button>
      </div>
      <div class="input_field service_price">
        <label for="service_price">Вартість статті витрат:</label>
        <InputNumber
          class="servise_price_input"
          v-model="tarrifExpenseCost"
          name="service_price"
          placeholder="0.00 грн"
          :class="{ 'p-invalid': v$.tarrifExpenseCost.$error }"
          @blur="v$.tarrifExpenseCost.$touch"
        ></InputNumber>
        <p v-if="v$.tarrifExpenseCost.$error" class="p-error">{{ v$.tarrifExpenseCost.$errors[0].$message }}</p>
      </div>
      <div class="calculation_controls">
        <h4>Тариф дорівнює: <Chip :label="finalCalculation" />грн.</h4>
        <Button label="Згенерувати" icon="pi pi-check" class="p-button-info" :disabled="v$.$invalid" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Textarea from 'primevue/textarea';
import Dropdown from 'primevue/dropdown';
import Chip from 'primevue/chip';
import Button from 'primevue/button';

import { useStore } from 'vuex';
import { useVuelidate } from '@vuelidate/core';
import { tarrifCalculatorValidations } from '@/finance/utils/validators/financeCalculationValidators';

import { TarrifService } from '@/finance/store/types';
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
    const tarrifTitle = ref('');
    const tarrifComment = ref('');
    const tarrifExpenseTitle = ref('');
    const tarrifExpenseCost = ref(null);
    const selectedHouse = ref(null);
    let expenseList: Array<TarrifService> = reactive([]);

    let houses = reactive([]);
    const area = ref(0);
    const servicesTotal = ref('0.00');
    const finalCalculation = ref('0.00');

    const store = useStore();
    const housesInfo = ref();
    const cooperationId = ref(null);

    const rules = tarrifCalculatorValidations;
    const v$ = useVuelidate(rules, { tarrifTitle, tarrifComment, tarrifExpenseTitle, tarrifExpenseCost });

    // const countServices = () => {
    //   return expenseList.reduce((acc, service) => (acc += service.servicePrice));
    // };
    const currentTarrif: string | null = localStorage.getItem('current-tarrif');
    if (currentTarrif) {
      expenseList = JSON.parse(currentTarrif).services;
      tarrifTitle.value = JSON.parse(currentTarrif).tarrifTitle;
      tarrifComment.value = JSON.parse(currentTarrif).tarrifComment;
    }

    cooperationId.value =
      store.getters[`${StoreModuleEnum.cooperationStore}/${CooperationGettersEnum.getSelectedCooperationId}`];
    store.dispatch(`${StoreModuleEnum.housesStore}/${HousesActionsEnum.SET_HOUSES}`, cooperationId.value);
    housesInfo.value = store.getters[`${StoreModuleEnum.housesStore}/${HousesGettersEnum.getHousesData}`];
    houses = housesInfo.value.map((house: HouseModel) =>
      // `${house.address.city}, ${house.address.district}, ${house.address.street},
      // ${house.address.houseBlock}, ${house.address.houseNumber}`
      console.log(house)
    );

    const addExpense = (): void => {
      const newService: TarrifService = {
        serviceName: tarrifExpenseTitle.value,
        servicePrice: tarrifExpenseCost.value,
      };
      expenseList.push(newService);
      updateLocalStorage();
      tarrifExpenseTitle.value = '';
      tarrifExpenseCost.value = null;
    };
    const updateLocalStorage = () => {
      const currentTarrif = {
        tarrifTitle: tarrifTitle.value,
        tarrifComment: tarrifComment.value,
        services: expenseList,
      };
      localStorage.setItem('current-tarrif', JSON.stringify(currentTarrif));
    };
    const deleteExpense = () => {
      console.log('deleting this expense');
    };

    return {
      tarrifTitle,
      tarrifComment,
      tarrifExpenseTitle,
      tarrifExpenseCost,
      selectedHouse,
      houses,
      area,
      finalCalculation,
      housesInfo,
      cooperationId,
      deleteExpense,
      expenseList,
      addExpense,
      updateLocalStorage,
      servicesTotal,
      // countServices,
      v$,
    };
  },
});
</script>

<style lang="scss" scoped>
.tarrifs-calculator {
  display: grid;
  gap: 1em;
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
  display: flex;
  flex-direction: column;
  grid-column: 3 / 5;
  grid-row: 1 / 6;
  h4 {
    align-self: flex-end;
  }
}
.expense-list ul {
  max-height: 500px;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  list-style: none;
  padding: 0 2em 0 0;
  margin: 0;
  li {
    display: flex;
    justify-content: space-between;
    line-height: 3;
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
