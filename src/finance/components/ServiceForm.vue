<template>
  <div>
    <div class="input_field service_title">
      <label for="service_title">Назва статті витрат*</label>
      <InputText name="service_title"></InputText>
      <!-- <p v-if="v$.serviceTitle.$invalid && isServiceAdded" class="p-error">
        {{ v$.serviceTitle.$silentErrors[0].$message }}
      </p> -->
    </div>
    <div class="input_field service_price">
      <label for="service_price">Вартість статті витрат*</label>
      <InputText class="servise_price_input" name="service_price" placeholder="0.00 грн"></InputText>
      <!-- <p v-if="v$.servicePrice.$invalid && isServiceAdded" class="p-error">
        {{ v$.servicePrice.$silentErrors[0].$message }}
      </p> -->
    </div>
    <div class="input_field service_actions">
      <Button class="p-button-success add-btn">
        Додати &nbsp;
        <i class="pi pi-plus-circle"></i>
      </Button>
      <Button icon="pi pi-check" class="p-button-rounded p-button-text" />
    </div>
    <!-- <div class="service-list--item-edit">
      <div class="item-edit__inputs">
        <InputText name="service-title"></InputText>
        <InputText name="service-price"></InputText>
      </div>
      <Button icon="pi pi-check" class="p-button-rounded p-button-text" />
    </div> -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

export default defineComponent({
  name: 'ServiceItem',
  components: {
    InputText,
    Button,
  },
  // emits: ['toggle-service-edit', 'handle-service-delete'],
  props: {},
  setup() {
    // const toggleServiceEdit = (service: TariffService): void => {
    //   emit('toggle-service-edit', service);
    // };
    // const handleServiceDelete = (service: TariffService): void => {
    //   emit('handle-service-delete', service);
    // };

    return {
      // toggleServiceEdit,
      // handleServiceDelete,
    };
  },
});
</script>

<style lang="scss" scoped>
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
