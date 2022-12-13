<template>
  <div class="expense-list--item" v-if="!service.editState">
    <div class="expense-list--item-text">
      <p>{{ service.serviceName }}</p>
      <span>{{ service.servicePrice }} грн.</span>
    </div>
    <div class="expense-list--actions">
      <Button
        icon="pi pi-pencil"
        class="p-button-rounded p-button-warning p-button-text"
        @click="toggleServiceEdit(service)"
      />
      <Button
        icon="pi pi-times"
        class="p-button-rounded p-button-danger p-button-text"
        @click="handleServiceDelete(service)"
      />
    </div>
  </div>
  <div class="expense-list--item-edit" v-else>
    <InputText name="edit-service-name" v-model="service.serviceName"></InputText>
    <InputNumber name="edit-service-price" v-model="service.servicePrice"></InputNumber>
    <Button icon="pi pi-check" class="p-button-rounded p-button-text" @click="toggleServiceEdit(service)" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { TarrifService } from '@/finance/store/types';

import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Button from 'primevue/button';

export default defineComponent({
  name: 'ServiceItem',
  components: {
    InputText,
    InputNumber,
    Button,
  },
  emits: ['toggle-service-edit', 'handle-service-delete', 'handle-edit-service-name', 'handle-edit-service-price'],
  props: {
    service: {
      required: true,
      type: Object,
    },
  },
  setup(props, { emit }) {
    const toggleServiceEdit = (service: TarrifService): void => {
      emit('toggle-service-edit', service);
    };
    const handleServiceDelete = (service: TarrifService): void => {
      emit('handle-service-delete', service);
    };

    return {
      toggleServiceEdit,
      handleServiceDelete,
    };
  },
});
</script>

<style lang="scss" scoped>
.expense-list--item {
  gap: 2em;
  &-text {
    width: 90%;
    display: flex;
    justify-content: space-between;
  }
  .expense-list--actions {
    display: flex;
  }
}
.expense-list--item,
.expense-list--item-edit {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
</style>
