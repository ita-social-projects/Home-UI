<template>
  <div>
    <h1>Калькулятор тарифів</h1>
    <div class="tarrifs-calculator">
      <div class="tarrifs-calculator__left">
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            <i class="pi pi-tag"></i>
          </span>
          <InputText placeholder="Введіть назву тарифу"></InputText>
        </div>
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            <i class="pi pi-comment"></i>
          </span>
          <InputText placeholder="Коментар"></InputText>
        </div>
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            <i class="pi pi-home"></i>
          </span>
          <Dropdown
            v-model="selectedHouse"
            :options="houses"
            optionLabel="name"
            optionValue="code"
            placeholder="Оберіть будинок"
          />
        </div>
        <div class="p-inputgrup area-label">
          <h4>Загальна площа квартир у будинку:</h4>
          <Chip :label="area" icon="pi pi-pencil" />
        </div>
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            <i class="pi pi-tags"></i>
          </span>
          <InputText placeholder="Введіть назву статті витрат"></InputText>
        </div>
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            <i class="pi pi-wallet"></i>
          </span>
          <InputNumber placeholder="0 000"></InputNumber>
          <Button class="p-button-success">
            <i class="pi pi-plus-circle"></i>
          </Button>
        </div>
      </div>
      <div class="tarrifs-calculator__right">
        <div class="expense-list">
          <ul>
            <li>
              Стаття витрат 1 <Button icon="pi pi-times" class="p-button-rounded p-button-danger p-button-text" />
            </li>
            <li>
              Стаття витрат 2 <Button icon="pi pi-times" class="p-button-rounded p-button-danger p-button-text" />
            </li>
            <li>
              Стаття витрат 3 <Button icon="pi pi-times" class="p-button-rounded p-button-danger p-button-text" />
            </li>
            <li>
              Стаття витрат 4 <Button icon="pi pi-times" class="p-button-rounded p-button-danger p-button-text" />
            </li>
            <li>
              Стаття витрат 5 <Button icon="pi pi-times" class="p-button-rounded p-button-danger p-button-text" />
            </li>
            <li>
              Стаття витрат 5 <Button icon="pi pi-times" class="p-button-rounded p-button-danger p-button-text" />
            </li>
            <li>
              Стаття витрат 5 <Button icon="pi pi-times" class="p-button-rounded p-button-danger p-button-text" />
            </li>
            <li>
              Стаття витрат 5 <Button icon="pi pi-times" class="p-button-rounded p-button-danger p-button-text" />
            </li>
          </ul>
          <div class="calculation_controls">
            <p>Тариф дорівнює:</p>
            <Button label="Згенерувати" icon="pi pi-check" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Dropdown from 'primevue/dropdown';
import Chip from 'primevue/chip';
import Button from 'primevue/button';

export default defineComponent({
  name: 'tarrifs-calculation',
  components: {
    InputText,
    InputNumber,
    Dropdown,
    Chip,
    Button,
  },
  setup() {
    const selectedHouse = ref('');
    const houses = reactive([]);
    const area = ref('Оберіть будинок');

    return {
      selectedHouse,
      houses,
      area,
    };
  },
});
</script>

<style lang="scss" scoped>
.tarrifs-calculator {
  display: flex;
  justify-content: space-around;
  gap: 5em;
  width: 100%;
  padding-block: 2em;
  .area-label {
    display: flex;
    align-items: center;
    gap: 1em;
    h4 {
      margin: 0;
    }
  }
  &__left,
  &__right {
    display: flex;
    flex-direction: column;
    gap: 1em;
    width: 40%;
  }
}
.expense-list ul {
  display: flex;
  flex-direction: column;
  list-style: none;
  padding: 0;
  margin: 0;
  li {
    display: flex;
    justify-content: space-between;
    line-height: 3;
  }
}
</style>
