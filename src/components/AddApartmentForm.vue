<template>
  <form @submit.prevent="saveApartment" id="apartment_data_form">
    <p>
      <label class="dialog-item" for="apartment_number">Номер квартири: </label>
      <InputText
        id="apartment_number"
        placeholder="Номер квартири "
        v-model="apartmentData.apartmentNumber"
        :class="{ 'p-invalid': v$.apartmentData.apartmentNumber.$error }"
        @blur="v$.apartmentData.apartmentNumber.$touch"
      />
      <small v-if="v$.apartmentData.apartmentNumber.$error" id="apartment_number_help" class="p-error">{{
        v$.apartmentData.apartmentNumber.$errors[0].$message
      }}</small>
      <br />
      <label class="dialog-item" for="apartment_area">Площа квартири: </label>
      <InputText
        id="apartment_area"
        placeholder="Площа квартири, м.кв."
        v-model="apartmentData.apartmentArea"
        :class="{ 'p-invalid': v$.apartmentData.apartmentArea.$error }"
        @blur="v$.apartmentData.apartmentArea.$touch"
      />
      <small v-if="v$.apartmentData.apartmentArea.$error" id="apartment_area_help" class="p-error">{{
        v$.apartmentData.apartmentArea.$errors[0].$message
      }}</small>
    </p>
    <div class="button-div">
      <Button
        id="save-button"
        label="Додати квартиру"
        icon="pi pi-check"
        @click="saveApartment"
        autofocus
        class="p-button-info"
        type="button"
        value="Submit"
      />
      <Button
        id="cancel-button"
        label="Відмінити"
        icon="pi pi-times"
        @click="cancelEditing"
        class="p-button-outlined p-button-info"
      />
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import useVuelidate from '@vuelidate/core';
import {
  requiredValidator,
  apartmentNumberValidator,
  apartmentAreaValidator,
  apartmentDecimalValidator,
} from '@/utils/validators';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import { StoreModuleEnum } from '@/store/types';
import { ApartmentsActionsEnum } from '@/store/apartments/types';

export default defineComponent({
  name: 'AddApartment',
  components: {
    Button,
    InputText,
  },
  props: {
    houseId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      apartmentData: {
        apartmentNumber: '',
        apartmentArea: '',
      },
      displayAddApartmentModal: false,
      v$: useVuelidate(),
    };
  },
  validations() {
    return {
      apartmentData: {
        apartmentNumber: { requiredValidator, apartmentNumberValidator },
        apartmentArea: { requiredValidator, apartmentAreaValidator, apartmentDecimalValidator },
      },
    };
  },
  methods: {
    async saveApartment(): Promise<void> {
      const isValid = await this.v$.$validate();
      if (!isValid) {
        return;
      }
      const payload = {
        id: this.$props.houseId,
        number: this.apartmentData.apartmentNumber.toString(),
        area: this.apartmentData.apartmentArea,
      };
      this.resetApartmentDataFields(this.apartmentData);
      this.v$.$reset();
      this.$emit('apartment-saved');
      this.$store.dispatch(`${StoreModuleEnum.apartmentsStore}/${ApartmentsActionsEnum.ADD_APARTMENT}`, payload);
    },
    cancelEditing() {
      this.resetApartmentDataFields(this.apartmentData);
      this.$emit('cancel-editing');
    },
    resetApartmentDataFields(apartmentData: any) {
      for (let field in apartmentData) {
        apartmentData[field] = '';
      }
    },
  },
});
</script>

<style lang="scss" scoped>
%error-message {
  margin: 0.4em 0.5rem;
  width: 100%;
}

.address-details {
  margin-left: 2rem;
  .dialog-item-address {
    margin-right: -2rem;
  }
}
.dialog-item {
  display: inline-block;
  position: relative;
  width: 260px;
  height: 50px;
  margin-bottom: 13px;
}
.p-error {
  display: flex;
  position: absolute;
  justify-content: right;
  margin: -26px -25px 0 -50px;
  @extend %error-message;
}

.button-div {
  float: right;
  .p-button-outlined {
    margin-left: 20px;
  }
}

.input {
  min-height: 50px;
}
</style>
