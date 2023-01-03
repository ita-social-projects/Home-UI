<template>
  <li>
    <div class="service-list--item" v-if="!service.editState">
      <div class="service-list--item-text">
        <p>{{ service.serviceTitle }}</p>
        <span>{{ service.servicePrice }} грн.</span>
      </div>
      <div class="service-list--actions">
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
    <div class="service-list--item-edit" v-else>
      <div class="item-edit__inputs">
        <InputText name="edit-service-name" v-model="service.serviceTitle"></InputText>
        <InputNumber name="edit-service-price" v-model="service.servicePrice"></InputNumber>
      </div>
      <Button icon="pi pi-check" class="p-button-rounded p-button-text" @click="toggleServiceEdit(service)" />
    </div>
  </li>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { TariffService } from '@/finance/store/types';

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
  emits: ['toggle-service-edit', 'handle-service-delete'],
  props: {
    service: {
      required: true,
      type: Object,
    },
  },
  setup(props, { emit }) {
    const toggleServiceEdit = (service: TariffService): void => {
      emit('toggle-service-edit', service);
    };
    const handleServiceDelete = (service: TariffService): void => {
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
