<template>
  <div>
    <h1>Калькулятор тарифів</h1>
    <div class="tarrifs-calculator">
      <div class="input_field tarrif_name">
        <label for="tarrif_name">Назва тарифу:</label>
        <InputText name="tarrif_name" placeholder="Введіть назву тарифу"></InputText>
      </div>
      <div class="expense-list">
        <ul>
          <li>Стаття витрат 1 <Button icon="pi pi-times" class="p-button-rounded p-button-danger p-button-text" /></li>
          <li>Стаття витрат 2 <Button icon="pi pi-times" class="p-button-rounded p-button-danger p-button-text" /></li>
          <li>Стаття витрат 3 <Button icon="pi pi-times" class="p-button-rounded p-button-danger p-button-text" /></li>
          <li>Стаття витрат 4 <Button icon="pi pi-times" class="p-button-rounded p-button-danger p-button-text" /></li>
          <li>Стаття витрат 5 <Button icon="pi pi-times" class="p-button-rounded p-button-danger p-button-text" /></li>
          <li>Стаття витрат 5 <Button icon="pi pi-times" class="p-button-rounded p-button-danger p-button-text" /></li>
          <li>Стаття витрат 5 <Button icon="pi pi-times" class="p-button-rounded p-button-danger p-button-text" /></li>
          <li>Стаття витрат 5 <Button icon="pi pi-times" class="p-button-rounded p-button-danger p-button-text" /></li>
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
        <h4>Загальна площа квартир у будинку:</h4>
        <Chip :label="area" icon="pi pi-pencil" />
      </div>
      <div class="input_field service_name">
        <label for="service_name">Назва статті витрат:</label>
        <InputText name="service_name" placeholder="Введіть назву"></InputText>
      </div>
      <div class="input_field service_price">
        <label for="service_price">Вартість статті витрат:</label>
        <InputNumber class="servise_price_input" name="service_price" placeholder="0 000"></InputNumber>
        <Button class="p-button-success add-btn">
          Додати &nbsp;
          <i class="pi pi-plus-circle"></i>
        </Button>
      </div>
      <div class="calculation_controls">
        <p>Тариф дорівнює: {{ finalCalculation }}</p>
        <Button label="Згенерувати" icon="pi pi-check" />
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
    const selectedHouse = ref('');
    const houses = reactive([]);
    const area = ref('Оберіть будинок');
    const finalCalculation = ref(0);
    const comment = ref('');

    return {
      selectedHouse,
      houses,
      area,
      finalCalculation,
      comment,
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
  padding: 2em 0 4em 0;
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
  .area-label h4 {
    margin-top: 0;
  }
  .tarrif_comment textarea {
    width: 100%;
  }
}
::v-deep(.service_price .servise_price_input) {
  input {
    max-width: 80px;
  }
}
.expense-list {
  max-height: 400px;
  overflow-y: scroll;
  padding-block-start: 2em;
  grid-column: 3 / 5;
  grid-row: 1 / 6;
}
.expense-list ul {
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
