<template>
  <div class="tariffs-calculator--service-form">
    <div class="service-list--item" v-show="!currentService.editState && !isFormHeader">
      <div class="service-list--item-text">
        <p>{{ currentService.serviceTitle }}</p>
        <span>{{ currentService.servicePrice }} грн.</span>
      </div>
      <slot name="service-actions" :toggle-service-edit="toggleServiceEdit"></slot>
    </div>

    <div class="input_field service_title" v-show="currentService.editState || isFormHeader">
      <label for="service_title" v-show="isFormHeader">Назва статті витрат*</label>
      <InputText name="service_title" v-model="currentService.serviceTitle"></InputText>
      <!-- <p v-if="isEdit ? v$.title.$invalid && isServiceEdited : v$.title.$invalid && isServiceAdded"
      class="p-error">
        {{ v$.title.$silentErrors[0].$message }}
      </p> -->
    </div>
    <div class="input_field service_price" v-show="currentService.editState || isFormHeader">
      <label for="service_price" v-show="isFormHeader">Вартість статті витрат*</label>
      <InputText
        class="servise_price_input"
        name="service_price"
        placeholder="0.00 грн"
        v-model="currentService.servicePrice"
      ></InputText>
      <!-- <p v-if="isEdit ? v$.price.$invalid && isServiceEdited : v$.price.$invalid && isServiceAdded"
      class="p-error">
        {{ v$.price.$silentErrors[0].$message }}
      </p> -->
    </div>
    <div class="input_field service_actions" v-show="currentService.editState || isFormHeader">
      <Button
        icon="pi pi-check"
        class="p-button-rounded p-button-text"
        @click="updateService(service)"
        v-show="!isFormHeader"
      />
    </div>
    <slot name="form-header"></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from 'vue';
import type { PropType } from 'vue';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import { TariffService } from '../store/types';
// import { tariffCalculatorServiceValidations } from '@/finance/utils/validators/financeCalculationValidators';
// import { TariffService } from '@/finance/store/types';
// import useVuelidate from '@vuelidate/core';

export default defineComponent({
  name: 'ServiceItem',
  components: {
    InputText,
    Button,
  },
  props: {
    service: {
      required: false,
      type: Object as PropType<TariffService>,
      default: () => {
        return {
          editState: false,
          serviceTitle: '',
          servicePrice: null,
        };
      },
    },
    isFormHeader: Boolean,
  },
  setup(props, { emit }) {
    const currentService: TariffService = reactive({
      serviceTitle: '',
      servicePrice: null,
      editState: false,
    });
    // const isServiceAdded = ref(false);
    // const isServiceEdited = ref(false);
    // const v$ = useVuelidate(tariffCalculatorServiceValidations, service);

    const setServiceFields = (service: TariffService | undefined): void => {
      if (!service) {
        currentService.serviceTitle = '';
        currentService.servicePrice = null;
        return;
      }
      currentService.serviceTitle = service.serviceTitle;
      currentService.servicePrice = service.servicePrice;
      currentService.editState = service.editState;
    };

    const toggleServiceEdit = () => {
      currentService.editState = !currentService.editState;
    };

    const updateService = (serviceToUpdate: TariffService) => {
      console.log(currentService.serviceTitle);
    };

    onMounted(() => {
      setServiceFields(props.service);
    });

    return {
      currentService,
      toggleServiceEdit,
      updateService,
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
