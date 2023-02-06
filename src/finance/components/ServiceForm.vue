<template>
  <div class="tariffs-calculator--service-form">
    <div class="input_field service_title">
      <label for="service_title" v-show="!isEdit">Назва статті витрат*</label>
      <InputText name="service_title" v-model="service.title"></InputText>
      <!-- <p v-if="v$.serviceTitle.$invalid && isServiceAdded" class="p-error">
        {{ v$.serviceTitle.$silentErrors[0].$message }}
      </p> -->
    </div>
    <div class="input_field service_price">
      <label for="service_price" v-show="!isEdit">Вартість статті витрат*</label>
      <InputText
        class="servise_price_input"
        name="service_price"
        placeholder="0.00 грн"
        v-model="service.price"
      ></InputText>
      <!-- <p v-if="v$.servicePrice.$invalid && isServiceAdded" class="p-error">
        {{ v$.servicePrice.$silentErrors[0].$message }}
      </p> -->
    </div>
    <div class="input_field service_actions">
      <Button class="p-button-success" @click="addService" v-show="!isEdit">
        Додати &nbsp;
        <i class="pi pi-plus-circle"></i>
      </Button>
      <Button icon="pi pi-check" class="p-button-rounded p-button-text" v-show="isEdit" @click="updateService" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import { TariffService } from '@/finance/store/types';

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

    const setServiceFields = (serviceToEdit: TariffService): void => {
      if (!props.isEdit) return;

      service.title = serviceToEdit.serviceTitle;
      service.price = serviceToEdit.servicePrice;
    };

    const resetServiceForm = (): void => {
      service.title = '';
      service.price = null;
    };
    const addService = (): void => {
      // isServiceAdded.value = true;
      // if (!isServiceValid) {
      //   return;
      // }
      const newService: TariffService = {
        editState: false,
        serviceTitle: service.title,
        servicePrice: service.price,
      };
      emit('add-service', newService);
      resetServiceForm();
    };

    const updateService = (): void => {
      const editedService: TariffService = {
        editState: false,
        serviceTitle: service.title,
        servicePrice: service.price,
      };
      const payload = { editedService, idx: props.serviceToEdit?.idx };
      emit('update-service', payload);
    };

    onMounted(() => {
      setServiceFields(props.serviceToEdit?.service);
    });

    return { service, addService, resetServiceForm, updateService, isServiceAdded };
  },
});
</script>

<style lang="scss" scoped>
.input_field {
  display: flex;
  flex-direction: column;
  padding-block-end: 1em;
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
