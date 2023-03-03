<template>
  <div class="tariffs-calculator--service-form">
    <div class="service-list--item">
      <div class="service-list--item-text">
        <p>{{ service.title }}</p>
        <span>{{ service.price }} грн.</span>
      </div>
    </div>

    <div class="input_field service_title">
      <label for="service_title">Назва статті витрат*</label>
      <InputText name="service_title" v-model="service.title"></InputText>
      <!-- <p v-if="isEdit ? v$.title.$invalid && isServiceEdited : v$.title.$invalid && isServiceAdded"
      class="p-error">
        {{ v$.title.$silentErrors[0].$message }}
      </p> -->
    </div>
    <div class="input_field service_price">
      <label for="service_price">Вартість статті витрат*</label>
      <InputText
        class="servise_price_input"
        name="service_price"
        placeholder="0.00 грн"
        v-model="service.price"
      ></InputText>
      <!-- <p v-if="isEdit ? v$.price.$invalid && isServiceEdited : v$.price.$invalid && isServiceAdded"
      class="p-error">
        {{ v$.price.$silentErrors[0].$message }}
      </p> -->
    </div>
    <!-- <div class="input_field service_actions">
      <Button
        class="p-button-success add-btn"
        @click="addService(!v$.title.$invalid && !v$.price.$invalid)"
        v-show="!isEdit"
      >
        Додати &nbsp;
        <i class="pi pi-plus-circle"></i>
      </Button>
      <Button
        icon="pi pi-check"
        class="p-button-rounded p-button-text"
        v-show="isEdit"
        @click="updateService(!v$.title.$invalid && !v$.price.$invalid)"
      />
    </div> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from 'vue';
// import type { PropType } from 'vue';
import InputText from 'primevue/inputtext';
// import Button from 'primevue/button';
// import { tariffCalculatorServiceValidations } from '@/finance/utils/validators/financeCalculationValidators';
import { TariffService } from '@/finance/store/types';
// import useVuelidate from '@vuelidate/core';

export default defineComponent({
  name: 'ServiceItem',
  components: {
    InputText,
    // Button,
  },
  props: {
    title: String,
    price: String,
  },
  setup(props, { emit }) {
    const service = reactive({
      title: '',
      price: '',
    });
    // const isServiceAdded = ref(false);
    // const isServiceEdited = ref(false);
    // const v$ = useVuelidate(tariffCalculatorServiceValidations, service);

    const setServiceFields = (initialTitle: string | undefined, initialPrice: string | undefined): void => {
      if (!initialTitle || !initialPrice) {
        service.title = '';
        service.price = '';
        return;
      }
      service.title = initialTitle;
      service.price = initialPrice;
    };

    onMounted(() => {
      setServiceFields(props.title, props.price);
    });

    return {
      service,
    };
  },
});
</script>

<style lang="scss" scoped>
.input_field {
  display: flex;
  flex-direction: column;
  padding-block-end: 2em;
  label {
    margin-block-end: 1em;
  }
}
.service_title,
.service_price {
  flex-grow: 1;
  width: 48%;
}
.service_actions {
  align-self: flex-end;
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
</style>
