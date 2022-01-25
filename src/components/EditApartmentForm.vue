<template>
  <form @submit.prevent="updateApartment()">
    <div>
      <label for="iban">Номер квартири : </label>
      <div class="input-block">
        <small v-if="v$.apartmentData.apartmentNumber.$error" class="p-error">{{
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
        <small v-if="v$.apartmentData.apartmentArea.$error" class="p-error">{{
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
        :disabled="disabled || v$.apartmentData.$invalid"
        label="Зберегти зміни"
        icon="pi pi-check"
        type="submit"
        autofocus
        class="p-button-info"
        value="Submit"
      />
      <Button label="Скасувати" icon="pi pi-times" class="p-button-outlined p-button-info" @click="cancelEditing" />
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import useVuelidate from '@vuelidate/core';
import { apartmentValidations } from '@/utils/apartment-validations';
import { StoreModuleEnum } from '@/store/types';
import { ApartmentsActionsEnum, ApartmentsGettersEnum } from '@/store/apartments/types';

export default defineComponent({
  name: 'EditApartmentForm',
  components: {
    Button,
    InputText,
  },
  props: ['houseId', 'apartmentId', 'propsApartmentData'],
  emits: ['cancel-editing', 'apartment-saved'],
  data() {
    return {
      apartmentData: {
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
    async updateApartment() {
      const payload = {
        houseId: this.$props.houseId,
        apartmentId: this.$props.apartmentId,
        body: this.apartmentData,
      };
      this.$store.dispatch(`${StoreModuleEnum.apartmentsStore}/${ApartmentsActionsEnum.EDIT_APARTMENT}`, payload);
      this.showSuccessEdit(this.apartmentData.apartmentNumber);
      this.$emit('apartment-saved');
    },
    showSuccessEdit(apartment: number) {
      this.$toast.add({
        severity: 'success',
        summary: 'Успішно',
        detail: `Дані про квартиру № ${apartment} змінено`,
        life: 3000,
      });
    },
    cancelEditing() {
      this.$emit('cancel-editing');
    },
  },
  computed: {
    ...mapGetters({
      stateApartmentInfo: `${StoreModuleEnum.apartmentsStore}/${ApartmentsGettersEnum.getApartmentInfo}`,
    }),
  },
  watch: {
    apartmentData: {
      handler() {
        this.disabled =
          this.apartmentData.apartmentNumber === this.stateApartmentInfo.apartmentNumber &&
          this.apartmentData.apartmentArea == this.stateApartmentInfo.apartmentArea;
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
