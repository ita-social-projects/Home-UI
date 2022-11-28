<template>
  <li v-for="(service, idx) in services" :key="idx">
    <div class="expense-list--item" v-if="!service.editState">
      <div class="expense-list--item-text">
        <p>{{ service.serviceName }}</p>
        <span>{{ service.servicePrice }} грн.</span>
      </div>
      <div class="expense-list--actions">
        <Button
          icon="pi pi-pencil"
          class="p-button-rounded p-button-warning p-button-text"
          @click="handleEdit(service)"
        />
        <Button
          icon="pi pi-times"
          class="p-button-rounded p-button-danger p-button-text"
          @click="deleteExpense(service)"
        />
      </div>
    </div>
    <div class="expense-list--item-edit" v-else>
      <InputText name="edit-service-name" v-model="service.serviceName"></InputText>
      <InputNumber name="edit-service-price" v-model="service.servicePrice"></InputNumber>
      <Button icon="pi pi-check" class="p-button-rounded p-button-text" @click="service.editState = false" />
    </div>
  </li>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { TarrifService } from '@/finance/store/types';

export default defineComponent({
  name: 'ServiceItem',
  emits: ['handle-edit'],
  props: {
    services: {
      required: true,
      type: Array as Array<TarrifService>,
    },
  },
  setup(props, { emit }) {
    const handleEdit = (service): void => {
      emit('handle-edit', service.id);
    };
    return {
      handleEdit,
    };
  },
});
</script>

<style lang="scss" scoped></style>
