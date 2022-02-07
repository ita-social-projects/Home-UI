<template>
  <form @submit.prevent="submit()" id="edit-apartment-form">
    <div>
      <label for="iban">Номер квартири : </label>
      <div class="input-block">
        <small v-if="v$.apartmentData.apartmentNumber.$error" class="p-error" id="apartmentNumber-help">{{
          v$.apartmentData.apartmentNumber.$errors[0].$message
        }}</small>
        <InputText
          v-model="apartmentData.apartmentNumber"
          :class="{ 'p-invalid': v$.apartmentData.apartmentNumber.$error }"
          id="apartmentNumber"
          placeholder="Номер квартири"
          maxlength="6"
          @input="v$.apartmentData.apartmentNumber.$touch"
        />
      </div>
    </div>
    <div>
      <label for="edrpou">Площа квартири : </label>
      <div class="input-block">
        <small v-if="v$.apartmentData.apartmentArea.$error" class="p-error" id="apartmentArea-help">{{
          v$.apartmentData.apartmentArea.$errors[0].$message
        }}</small>
        <InputText
          v-model="apartmentData.apartmentArea"
          :class="{ 'p-invalid': v$.apartmentData.apartmentArea.$error }"
          id="apartmentArea"
          placeholder="Площа квартири"
          maxlength="7"
          @input="v$.apartmentData.apartmentArea.$touch"
        />
        <span> кв.м.</span>
      </div>
    </div>
    <div class="button-div">
      <Button
        label="Зберегти зміни"
        icon="pi pi-check"
        type="submit"
        autofocus
        class="p-button-info"
        value="Submit"
        id="update-apartment-btn"
        :disabled="disabled || v$.apartmentData.$invalid"
      />
      <Button
        label="Скасувати"
        icon="pi pi-times"
        class="p-button-outlined p-button-info"
        id="cancel-edit-apartment-btn"
        @click="cancelEditing"
      />
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import useVuelidate from '@vuelidate/core';
import { apartmentValidations } from '@/utils/apartment-validations';
import { StoreModuleEnum } from '@/store/types';
import { ApartmentsActionsEnum } from '@/store/apartments/types';

export default defineComponent({
  name: 'ApartmentForm',
  components: {
    Button,
    InputText,
  },
  props: ['houseId', 'apartmentId', 'propsApartmentData'],
  emits: ['cancel', 'apartment-saved'],
  data() {
    return {
      apartmentData: {
        ...this.$props.propsApartmentData,
      },
      previousApartmentData: {
        ...this.$props.propsApartmentData,
      },
      disabled: true,
      v$: useVuelidate(),
    };
  },
  validations() {
    return {
      apartmentData: apartmentValidations,
    };
  },
  methods: {
    async submit(): Promise<void> {
      const message = !this.$props.apartmentId
        ? `Квартиру № ${this.apartmentData.apartmentNumber} додано.`
        : `Дані про квартиру № ${this.apartmentData.apartmentNumber} змінено.`;
      if (!this.$props.apartmentId) {
        this.$store.dispatch(`${StoreModuleEnum.apartmentsStore}/${ApartmentsActionsEnum.ADD_APARTMENT}`, {
          body: this.apartmentData,
          houseId: this.$props.houseId,
        });
      } else {
        this.$store.dispatch(`${StoreModuleEnum.apartmentsStore}/${ApartmentsActionsEnum.EDIT_APARTMENT}`, {
          body: this.apartmentData,
          houseId: this.$props.houseId,
          apartmentId: this.$props.apartmentId,
        });
      }
      this.$emit('apartment-saved');
      this.showSuccessMessage(message);
      this.v$.$reset();
    },
    showSuccessMessage(message: string) {
      this.$toast.add({
        severity: 'success',
        summary: 'Успішно!',
        detail: `${message}`,
        life: 3000,
      });
    },
    cancelEditing() {
      this.$emit('cancel');
    },
  },
  watch: {
    apartmentData: {
      handler() {
        this.disabled =
          this.apartmentData.apartmentNumber === this.previousApartmentData.apartmentNumber &&
          this.apartmentData.apartmentArea == this.previousApartmentData.apartmentArea;
      },
      deep: true,
    },
  },
});
</script>

<style lang="scss" scoped>
.dialog-item {
  display: inline-block;
  width: 240px;
}
label {
  display: inline-block;
  width: 240px;
}

.input-block {
  display: inline-block;
  margin-bottom: 15px;
}
small {
  display: block;
  width: 280px;
}

.button-div {
  float: right;
  .p-button-outlined {
    margin-left: 20px;
  }
}
</style>
