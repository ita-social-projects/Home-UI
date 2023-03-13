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
        @click="handleServiceActions"
        v-show="!isFormHeader"
      />
    </div>
    <slot name="form-header" :add-new-service="addNewService"></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, watch, reactive } from 'vue';
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
  emits: {
    'handle-service-actions': null,
    'add-new-service': null,
  },
  props: {
    service: {
      required: false,
      type: Object as PropType<TariffService>,
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
      if (!service) return;
      Object.assign(currentService, service);
    };

    const toggleServiceEdit = (): void => {
      currentService.editState = !currentService.editState;
    };

    const handleServiceActions = () => {
      if (!props.service) return;
      type ServicePayload = {
        originalService: TariffService;
        updatedService: TariffService | null;
      };
      let payload: ServicePayload = {
        originalService: props.service,
        updatedService: null,
      };
      if (currentService.editState) {
        payload = {
          originalService: props.service,
          updatedService: {
            editState: false,
            serviceTitle: currentService.serviceTitle,
            servicePrice: currentService.servicePrice,
          },
        };
      }
      emit('handle-service-actions', payload);
      currentService.editState = false;
    };

    const addNewService = (): void => {
      const newService: TariffService = {
        editState: false,
        serviceTitle: currentService.serviceTitle,
        servicePrice: currentService.servicePrice,
      };
      emit('add-new-service', newService);
      currentService.serviceTitle = '';
      currentService.servicePrice = null;
    };

    onMounted(() => {
      setServiceFields(props.service);
    });

    watch(
      () => ({ ...props.service }),
      () => setServiceFields(props.service)
    );

    return {
      currentService,
      toggleServiceEdit,
      handleServiceActions,
      addNewService,
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
