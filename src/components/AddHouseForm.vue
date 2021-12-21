<template>
  <form @submit.prevent="addNewHouse" id="house_data_form">
    <p>
      <label class="dialog-item" for="quantity_flat">Кількість квартир в будинку : </label>
      <InputText
        id="quantity_flat"
        placeholder="Кількість квартир в будинку"
        v-model.trim="houseData.quantity_flat"
        :class="{
          'p-invalid': v$.houseData.quantity_flat.$error,
        }"
        @blur="v$.houseData.quantity_flat.$touch"
      />
      <small v-if="v$.houseData.quantity_flat.$error" class="p-error">{{
        v$.houseData.quantity_flat.$errors[0].$message
      }}</small>
    </p>
    <p>
      <label class="dialog-item" for="house_area">Площа будинку : </label>
      <InputText
        id="house_area"
        placeholder="Площа будинку"
        v-model.trim="houseData.house_area"
        :class="{
          'p-invalid': v$.houseData.house_area.$error,
        }"
        @blur="v$.houseData.house_area.$touch"
      />
      <small v-if="v$.houseData.house_area.$error" class="p-error">{{
        v$.houseData.house_area.$errors[0].$message
      }}</small>
    </p>
    <p>
      <label class="dialog-item" for="adjoining_area">Прибудинкової теріторії : </label>
      <InputText
        id="adjoining_area"
        placeholder="Прибудинкової теріторії"
        v-model.trim="houseData.adjoining_area"
        :class="{
          'p-invalid': v$.houseData.adjoining_area.$error,
        }"
        @blur="v$.houseData.adjoining_area.$touch"
      />
      <small v-if="v$.houseData.adjoining_area.$error" class="p-error">{{
        v$.houseData.adjoining_area.$errors[0].$message
      }}</small>
    </p>

    <label class="dialog-item" for="address-details-id">Адреса : </label>
    <div class="address-details" id="address-details-id">
      <p>
        <label class="dialog-item dialog-item-address" for="region">Регіон : </label>
        <InputText
          id="region"
          placeholder="Регіон"
          v-model.trim="houseData.address.region"
          :class="{
            'p-invalid': v$.houseData.address.region.$error,
          }"
          @blur="v$.houseData.address.region.$touch"
        />
        <small v-if="v$.houseData.address.region.$error" class="p-error">{{
          v$.houseData.address.region.$errors[0].$message
        }}</small>
      </p>
      <p>
        <label class="dialog-item dialog-item-address" for="city">Місто : </label>
        <InputText
          id="city"
          placeholder="Місто"
          v-model.trim="houseData.address.city"
          :class="{
            'p-invalid': v$.houseData.address.city.$error,
          }"
          @blur="v$.houseData.address.city.$touch"
        />
        <small v-if="v$.houseData.address.city.$error" class="p-error">{{
          v$.houseData.address.city.$errors[0].$message
        }}</small>
      </p>
      <p>
        <label class="dialog-item dialog-item-address" for="district">Район : </label>
        <InputText
          id="district"
          placeholder="Район"
          v-model.trim="houseData.address.district"
          :class="{
            'p-invalid': v$.houseData.address.district.$error,
          }"
          @blur="v$.houseData.address.district.$touch"
        />
        <small v-if="v$.houseData.address.district.$error" class="p-error">{{
          v$.houseData.address.district.$errors[0].$message
        }}</small>
      </p>
      <p>
        <label class="dialog-item dialog-item-address" for="street">Вулиця : </label>
        <InputText
          id="street"
          placeholder="Вулиця"
          v-model.trim="houseData.address.street"
          :class="{
            'p-invalid': v$.houseData.address.street.$error,
          }"
          @blur="v$.houseData.address.street.$touch"
        />
        <small v-if="v$.houseData.address.street.$error" class="p-error">{{
          v$.houseData.address.street.$errors[0].$message
        }}</small>
      </p>
      <p>
        <label class="dialog-item dialog-item-address" for="house_block">Блок : </label>
        <InputText
          id="house_block"
          placeholder="Блок"
          v-model.trim="houseData.address.house_block"
          :class="{
            'p-invalid': v$.houseData.address.house_block.$error,
          }"
          @blur="v$.houseData.address.house_block.$touch"
        />
        <small v-if="v$.houseData.address.house_block.$error" class="p-error">{{
          v$.houseData.address.house_block.$errors[0].$message
        }}</small>
      </p>
      <p>
        <label class="dialog-item dialog-item-address" for="house_number">Номер будинку: </label>
        <InputText
          id="house_number"
          placeholder="Номер"
          v-model.trim="houseData.address.house_number"
          :class="{
            'p-invalid': v$.houseData.address.house_number.$error,
          }"
          @blur="v$.houseData.address.house_number.$touch"
        />
        <small v-if="v$.houseData.address.house_number.$error" class="p-error">{{
          v$.houseData.address.house_number.$errors[0].$message
        }}</small>
      </p>
      <p>
        <label class="dialog-item dialog-item-address" for="zip_code">Код : </label>
        <InputText
          id="zip_code"
          placeholder="Код"
          v-model.trim="houseData.address.zip_code"
          :class="{
            'p-invalid': v$.houseData.address.zip_code.$error,
          }"
          @blur="v$.houseData.address.zip_code.$touch"
        />
        <small v-if="v$.houseData.address.zip_code.$error" class="p-error">{{
          v$.houseData.address.zip_code.$errors[0].$message
        }}</small>
      </p>
    </div>
    <div class="buttons-container">
      <Button
        label="Зберегти зміни"
        icon="pi pi-check"
        @click="addNewHouse"
        autofocus
        class="p-button-info"
        type="button"
        value="Submit"
        :disabled="v$.houseData.$invalid"
      />
      <Button
        label="Скасувати зміни"
        icon="pi pi-times"
        @click="closeAddHouseModal"
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
  ukrLangTitleValidator,
  houseNumAndHouseBlockValidator,
  zipCodeValidator,
  zeroValidator,
  regionCityDistrictMaxLength,
  streetMaxLength,
  houseBlockAndNumberMaxLength,
  quantityAndAreaValidator,
  houseAreaValidator,
} from '@/utils/validators';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import { StoreModuleEnum } from '@/store/types';
import { HousesActionsEnum } from '@/store/houses/types';

export default defineComponent({
  name: 'AddHouseForm',
  components: {
    Dialog,
    Button,
    InputText,
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      houseData: {
        quantity_flat: '',
        house_area: '',
        adjoining_area: '',
        address: {
          region: '',
          city: '',
          district: '',
          street: '',
          house_block: '',
          house_number: '',
          zip_code: '',
        },
      },
      v$: useVuelidate(),
    };
  },
  validations() {
    return {
      houseData: {
        quantity_flat: { requiredValidator, zeroValidator, quantityAndAreaValidator },
        house_area: { requiredValidator, zeroValidator, houseAreaValidator },
        adjoining_area: { requiredValidator, zeroValidator, quantityAndAreaValidator },
        address: {
          region: { requiredValidator, ukrLangTitleValidator, regionCityDistrictMaxLength },
          city: { requiredValidator, ukrLangTitleValidator, regionCityDistrictMaxLength },
          district: { requiredValidator, ukrLangTitleValidator, regionCityDistrictMaxLength },
          street: { requiredValidator, ukrLangTitleValidator, streetMaxLength },
          house_block: { requiredValidator, houseNumAndHouseBlockValidator, houseBlockAndNumberMaxLength },
          house_number: { requiredValidator, houseNumAndHouseBlockValidator, houseBlockAndNumberMaxLength },
          zip_code: { requiredValidator, zipCodeValidator },
        },
      },
    };
  },
  methods: {
    async addNewHouse() {
      const isValid = await this.v$.$validate();

      if (!isValid) {
        return;
      }

      const payload = {
        cooperationId: this.$props.id,
        ...this.houseData,
      };

      await this.$store.dispatch(`${StoreModuleEnum.housesStore}/${HousesActionsEnum.ADD_HOUSE}`, payload);

      this.resetHouseDataFields(this.houseData);
      this.$emit('cancel-addHouseModal');
    },
    resetHouseDataFields(houseData: any) {
      for (let field in houseData) {
        if (typeof houseData[field] === 'object') {
          this.resetHouseDataFields(houseData[field]);
        } else {
          houseData[field] = '';
        }
      }
    },
    closeAddHouseModal() {
      this.resetHouseDataFields(this.houseData);
      this.$emit('cancel-addHouseModal');
    },
  },
});
</script>

<style lang="scss" scoped>
%error-message {
  margin: 0.4em 0.5rem;
  width: 80%;
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
}
.p-error {
  @extend %error-message;
}
.buttons-container {
  float: right;
  .p-button-outlined {
    margin-left: 20px;
  }
}
</style>
