<template>
  <div>
    <h1>Калькулятор тарифів</h1>
    <div class="tarrifs-calculator">
      <div class="input_field tarrif_name">
        <label for="tarrif_name">Назва тарифу:</label>
        <InputText name="tarrif_name" placeholder="Введіть назву тарифу" v-model="tarrifName"></InputText>
      </div>
      <div class="expense-list">
        <h3>{{ tarrifName }}</h3>
        <p>{{ comment }}</p>
        <!-- {{ housesInfo }} -->
        <ul>
          <li>
            Стаття витрат 1
            <div class="expense-list--actions">
              <Button icon="pi pi-pencil" class="p-button-rounded p-button-warning p-button-text" />
              <Button icon="pi pi-times" class="p-button-rounded p-button-danger p-button-text" />
            </div>
          </li>
          <li>
            Стаття витрат 2
            <div class="expense-list--actions">
              <Button icon="pi pi-pencil" class="p-button-rounded p-button-warning p-button-text" />
              <Button icon="pi pi-times" class="p-button-rounded p-button-danger p-button-text" />
            </div>
          </li>
          <li>
            Стаття витрат 3
            <div class="expense-list--actions">
              <Button icon="pi pi-pencil" class="p-button-rounded p-button-warning p-button-text" />
              <Button icon="pi pi-times" class="p-button-rounded p-button-danger p-button-text" />
            </div>
          </li>
          <li>
            Стаття витрат 4
            <div class="expense-list--actions">
              <Button icon="pi pi-pencil" class="p-button-rounded p-button-warning p-button-text" />
              <Button icon="pi pi-times" class="p-button-rounded p-button-danger p-button-text" />
            </div>
          </li>
          <li>
            Стаття витрат 5
            <div class="expense-list--actions">
              <Button icon="pi pi-pencil" class="p-button-rounded p-button-warning p-button-text" />
              <Button icon="pi pi-times" class="p-button-rounded p-button-danger p-button-text" />
            </div>
          </li>
          <li>
            Стаття витрат 5
            <div class="expense-list--actions">
              <Button icon="pi pi-pencil" class="p-button-rounded p-button-warning p-button-text" />
              <Button icon="pi pi-times" class="p-button-rounded p-button-danger p-button-text" />
            </div>
          </li>
          <li>
            Стаття витрат 5
            <div class="expense-list--actions">
              <Button icon="pi pi-pencil" class="p-button-rounded p-button-warning p-button-text" />
              <Button icon="pi pi-times" class="p-button-rounded p-button-danger p-button-text" />
            </div>
          </li>
          <li>
            Стаття витрат 5
            <div class="expense-list--actions">
              <Button icon="pi pi-pencil" class="p-button-rounded p-button-warning p-button-text" />
              <Button icon="pi pi-times" class="p-button-rounded p-button-danger p-button-text" />
            </div>
          </li>
        </ul>
      </div>
      <div class="input_field tarrif_comment">
        <label for="comment">Коментар до тарифу:</label>
        <Textarea v-model="comment" name="comment" rows="5" cols="30" placeholder="Напишіть коментар" />
      </div>
      <div class="input_field house_picker">
        <label for="house">Оберіть будинок під тариф:</label>
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
        <InputText name="service_name" placeholder="Введіть назву"></InputText>
      </div>
      <div class="input_field service_price">
        <label for="service_price">Вартість статті витрат:</label>
        <InputNumber class="servise_price_input" name="service_price" placeholder="0.00 грн"></InputNumber>
        <Button class="p-button-success add-btn">
          Додати &nbsp;
          <i class="pi pi-plus-circle"></i>
        </Button>
      </div>
      <div class="calculation_controls">
        <p>Тариф дорівнює: {{ finalCalculation }} грн</p>
        <Button label="Згенерувати" icon="pi pi-check" class="p-button-info" />
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
    const tarrifName = ref('');
    const selectedHouse = ref(null);
    let houses = reactive([]);
    const area = ref(0);
    const finalCalculation = ref('0.00');
    const comment = ref('');
    const store = useStore();
    const housesInfo = ref();
    const cooperationId = ref(null);

    cooperationId.value =
      store.getters[`${StoreModuleEnum.cooperationStore}/${CooperationGettersEnum.getSelectedCooperationId}`];
    store.dispatch(`${StoreModuleEnum.housesStore}/${HousesActionsEnum.SET_HOUSES}`, cooperationId.value);
    housesInfo.value = store.getters[`${StoreModuleEnum.housesStore}/${HousesGettersEnum.getHousesData}`];
    houses = housesInfo.value.map((house: HouseModel) =>
      // `${house.address.city}, ${house.address.district}, ${house.address.street},
      // ${house.address.houseBlock}, ${house.address.houseNumber}`
      console.log(house)
    );

    const deleteExpense = () => {
      console.log('deleting this expense');
    };

    return {
      tarrifName,
      selectedHouse,
      houses,
      area,
      finalCalculation,
      comment,
      housesInfo,
      cooperationId,
      deleteExpense,
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
  .add-btn {
    margin-left: 1em;
  }
  .tarrif_name,
  .tarrif_comment {
    grid-column: 1 / 3;
  }
  .house_picker,
  .service_name {
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
}
::v-deep(.service_price .servise_price_input) {
  input {
    max-width: 90px;
  }
}
.expense-list {
  grid-column: 3 / 5;
  grid-row: 1 / 6;
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
