<template>
  <div class="tariffs-calculator--service-form">
    <div class="service-list--item" v-show="!currentService.editState && !isFormHeader">
      <div class="service-list--item-text">
        <p>{{ currentService.serviceTitle }}</p>
        <span>{{ currentService.servicePrice }} грн.</span>
      </div>
      <slot>
        <div class="service-list--actions">
          <Button
            icon="pi pi-pencil"
            class="p-button-rounded p-button-warning p-button-text"
            @click="toggleServiceEdit"
          />
          <Button
            icon="pi pi-times"
            class="p-button-rounded p-button-danger p-button-text"
            @click="handleServiceActions"
          />
        </div>
      </slot>
    </div>

    <div class="service-form__wrapper" v-show="currentService.editState || isFormHeader">
      <div class="input_field service_title">
        <label for="service_title" v-show="isFormHeader" :class="{ 'p-error': v$.serviceTitle.$error }"
          >Назва статті витрат*</label
        >
        <InputText
          name="service_title"
          v-model="currentService.serviceTitle"
          :class="{ 'p-invalid': v$.serviceTitle.$error }"
        ></InputText>
        <p v-if="v$.serviceTitle.$error" class="p-error">
          {{ v$.serviceTitle.$silentErrors[0].$message }}
        </p>
      </div>
      <div class="input_field service_price">
        <label for="service_price" v-show="isFormHeader" :class="{ 'p-error': v$.servicePrice.$error }"
          >Вартість статті витрат*</label
        >
        <InputText
          class="servise_price_input"
          :class="{ 'p-invalid': v$.servicePrice.$error }"
          name="service_price"
          placeholder="0.00 грн"
          v-model="currentService.servicePrice"
        ></InputText>
        <p v-if="v$.servicePrice.$error" class="p-error">
          {{ v$.servicePrice.$silentErrors[0].$message }}
        </p>
      </div>
      <div class="input_field service_actions">
        <Button
          icon="pi pi-check"
          class="p-button-rounded p-button-text"
          @click="handleServiceActions"
          v-show="!isFormHeader"
        />
      </div>
    </div>
    <slot name="form-header" :add-new-service="addNewService"></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, watch, reactive, computed } from 'vue';
import type { PropType } from 'vue';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

import { useVuelidate } from '@vuelidate/core';
import {
  requiredValidator,
  tariffCalculatorServicePrice,
  tariffCalculatorServiceTitle,
  tariffCalculatorDigitsOnly,
} from '@/utils/validators';
import { TariffService, ServicePayload } from '@/finance/store/types';

export default defineComponent({
  name: 'ServiceItem',
  components: {
    InputText,
    Button,
  },
  emits: {
    'handle-service-actions': null,
    'add-new-service': null,
  },
  props: {
    originalService: {
      required: false,
      type: Object as PropType<{ service: TariffService; idx: number }>,
    },
    isFormHeader: Boolean,
  },
  setup(props, { emit }) {
    const currentService = reactive({
      editState: false,
      serviceTitle: '',
      servicePrice: null,
    });

    const rules = computed(() => {
      return {
        serviceTitle: { requiredValidator, tariffCalculatorServiceTitle },
        servicePrice: { requiredValidator, tariffCalculatorServicePrice, tariffCalculatorDigitsOnly },
      };
    });
    const v$ = useVuelidate(rules, currentService);

    const setServiceFields = (service: TariffService | undefined): void => {
      if (!service) return;
      Object.assign(currentService, service);
    };

    const toggleServiceEdit = (): void => {
      currentService.editState = !currentService.editState;
    };

    const handleServiceActions = async (): Promise<void> => {
      if (!props.originalService) return;

      let payload: ServicePayload = {
        index: props.originalService.idx,
        updatedService: null,
      };

      if (currentService.editState) {
        const result = await v$.value.$validate();
        if (!result) return;

        payload = {
          index: props.originalService.idx,
          updatedService: {
            editState: false,
            serviceTitle: currentService.serviceTitle,
            servicePrice: currentService.servicePrice,
          },
        };
      }
      emit('handle-service-actions', payload);
      v$.value.$reset();
      currentService.editState = false;
    };

    const resetForm = () => {
      currentService.serviceTitle = '';
      currentService.servicePrice = null;
      v$.value.$reset();
    };

    const addNewService = async (): Promise<void> => {
      const result = await v$.value.$validate();
      if (!result) return;
      const newService: TariffService = {
        editState: false,
        serviceTitle: currentService.serviceTitle,
        servicePrice: currentService.servicePrice,
      };
      emit('add-new-service', newService);
      resetForm();
    };

    onMounted(() => {
      setServiceFields(props.originalService?.service);
    });

    watch(
      () => ({ ...props.originalService?.service }),
      () => setServiceFields(props.originalService?.service)
    );

    return {
      currentService,
      toggleServiceEdit,
      handleServiceActions,
      addNewService,
      resetForm,
      rules,
      v$,
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
.service-form__wrapper {
  display: flex;
  width: 100%;
  gap: 1em;
  flex-wrap: wrap;
}
.service_price,
.service_title {
  flex: auto;
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
