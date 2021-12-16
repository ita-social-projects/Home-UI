<template>
  <form @submit.prevent="addNewApartment" id="apartment_data_form">
    <p>
      <label class="dialog-item" for="apartment_number">Номер квартири: </label>
      <InputText
        id="apartment_number"
        placeholder="Номер квартири "
        v-model="apartmentData.apartmentNumber"
        :class="{ 'p-invalid': v$.apartmentData.apartmentNumber.$error }"
        @blur="v$.apartmentData.apartmentNumber.$touch"
      />
      <small v-if="v$.apartmentData.apartmentNumber.$error" class="p-error">{{
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
      <small v-if="v$.apartmentData.apartmentArea.$error" class="p-error">{{
        v$.apartmentData.apartmentArea.$errors[0].$message
      }}</small>
    </p>
    <Button
      label="Додати квартиру"
      icon="pi pi-check"
      @click="addNewApartment"
      autofocus
      class="p-button-info"
      type="button"
      value="Submit"
    />
    <Button label="Відмінити" icon="pi pi-times" @click="closeApartmentModal" class="p-button-outlined p-button-info" />
  </form>
  <div></div>
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
        invitations: [
          {
            email: 'test.receive.messages@gmail.com',
            type: 'apartment',
          },
          {
            email: 'test.receive.messages@gmail.com',
            type: 'apartment',
          },
        ],
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
    async addNewApartment() {
      const isValid = await this.v$.$validate();
      if (!isValid) {
        return;
      }
      const payload = {
        id: this.$props.houseId,
        number: this.apartmentData.apartmentNumber.toString(),
        area: this.apartmentData.apartmentArea,
      };
      await this.$store.dispatch(`apartmentsStore/ADD_APARTMENT`, payload);
      this.$store.dispatch(`${StoreModuleEnum.cooperationStore}/SET_MODAL_DISPLAY`, false);
      this.resetApartmentDataFields(this.apartmentData);
      this.v$.$reset();
    },
    closeApartmentModal() {
      this.resetApartmentDataFields(this.apartmentData);
      this.$store.dispatch(`${StoreModuleEnum.cooperationStore}/SET_MODAL_DISPLAY`, false);
    },
    resetApartmentDataFields(apartmentData: any) {
      for (let field in apartmentData) {
        if (typeof apartmentData[field] === 'object') {
          this.resetApartmentDataFields(apartmentData[field]);
        } else {
          apartmentData[field] = '';
        }
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
  width: 260px;
  margin-top: 30px;
}
.p-error {
  display: flex;
  justify-content: right;
  margin-bottom: -30px;
  margin-top: 0;
  @extend %error-message;
}
</style>
