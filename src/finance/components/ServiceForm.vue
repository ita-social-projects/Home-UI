<template>
  <div class="tariffs-calculator--service-form">
    <div class="input_field service_title">
      <label for="service_title" v-show="!isEdit" :class="{ 'p-error': v$.title.$invalid && isServiceAdded }"
        >Назва статті витрат*</label
      >
      <InputText
        name="service_title"
        v-model="v$.title.$model"
        :class="{ 'p-error': isEdit ? v$.title.$invalid && isServiceEdited : v$.title.$invalid && isServiceAdded }"
      ></InputText>
      <p v-if="isEdit ? v$.title.$invalid && isServiceEdited : v$.title.$invalid && isServiceAdded" class="p-error">
        {{ v$.title.$silentErrors[0].$message }}
      </p>
    </div>
    <div class="input_field service_price">
      <label for="service_price" v-show="!isEdit" :class="{ 'p-error': v$.price.$invalid && isServiceAdded }"
        >Вартість статті витрат*</label
      >
      <InputText
        class="servise_price_input"
        name="service_price"
        placeholder="0.00 грн"
        v-model="v$.price.$model"
        :class="{ 'p-error': isEdit ? v$.price.$invalid && isServiceEdited : v$.price.$invalid && isServiceAdded }"
      ></InputText>
      <p v-if="isEdit ? v$.price.$invalid && isServiceEdited : v$.price.$invalid && isServiceAdded" class="p-error">
        {{ v$.price.$silentErrors[0].$message }}
      </p>
    </div>
    <div class="input_field service_actions">
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
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import { tariffCalculatorServiceValidations } from '@/finance/utils/validators/financeCalculationValidators';
import { TariffService } from '@/finance/store/types';
import useVuelidate from '@vuelidate/core';

export default defineComponent({
  name: 'ServiceItem',
  components: {
    InputText,
    Button,
  },
  emits: ['add-service', 'update-service'],
  props: {
    isEdit: {
      required: true,
      type: Boolean,
    },
    serviceToEdit: {
      required: false,
      type: Object,
    },
  },
  setup(props, { emit }) {
    const service: { title: string; price: number | null } = reactive({
      title: '',
      price: null,
    });
    const isServiceAdded = ref(false);
    const isServiceEdited = ref(false);
    const v$ = useVuelidate(tariffCalculatorServiceValidations, service);

    const setServiceFields = (serviceToEdit: TariffService): void => {
      if (!props.isEdit) return;

      service.title = serviceToEdit.serviceTitle;
      service.price = serviceToEdit.servicePrice;
    };

    const resetServiceForm = (): void => {
      isServiceAdded.value = false;
      service.title = '';
      service.price = null;
    };
    const addService = (isServiceValid: boolean): void => {
      isServiceAdded.value = true;
      if (!isServiceValid) {
        return;
      }
      const newService: TariffService = {
        editState: false,
        serviceTitle: service.title,
        servicePrice: service.price,
      };
      emit('add-service', newService);
      resetServiceForm();
    };

    const updateService = (isServiceEditValid: boolean): void => {
      isServiceEdited.value = true;
      if (!isServiceEditValid) {
        return;
      }
      const editedService: TariffService = {
        editState: false,
        serviceTitle: service.title,
        servicePrice: service.price,
      };
      const payload = { editedService, idx: props.serviceToEdit?.idx };
      emit('update-service', payload);
      isServiceEdited.value = false;
    };

    onMounted(() => {
      setServiceFields(props.serviceToEdit?.service);
    });

    return {
      service,
      addService,
      resetServiceForm,
      updateService,
      isServiceAdded,
      isServiceEdited,
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
</style>
