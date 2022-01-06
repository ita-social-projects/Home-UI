<template>
  <form @submit.prevent="addNewHouse" id="house_data_form">
    <p>
      <label class="dialog-item" for="flatQuantity">Кількість квартир в будинку : </label>
      <InputText
        id="flatQuantity"
        placeholder="Кількість квартир в будинку"
        v-model.trim="houseData.flatQuantity"
        :class="{
          'p-invalid': v$.houseData.flatQuantity.$error,
        }"
        @blur="v$.houseData.flatQuantity.$touch"
      />
      <small v-if="v$.houseData.flatQuantity.$error" class="p-error" id="flatQuantity-help">{{
        v$.houseData.flatQuantity.$errors[0].$message
      }}</small>
    </p>
    <p>
      <label class="dialog-item" for="houseArea">Площа будинку : </label>
      <InputText
        id="houseArea"
        placeholder="Площа будинку"
        v-model.trim="houseData.houseArea"
        :class="{
          'p-invalid': v$.houseData.houseArea.$error,
        }"
        @blur="v$.houseData.houseArea.$touch"
      />
      <small v-if="v$.houseData.houseArea.$error" class="p-error" id="houseArea-help">{{
        v$.houseData.houseArea.$errors[0].$message
      }}</small>
    </p>
    <p>
      <label class="dialog-item" for="adjoiningArea">Прибудинкової теріторії : </label>
      <InputText
        id="adjoiningArea"
        placeholder="Прибудинкової теріторії"
        v-model.trim="houseData.adjoiningArea"
        :class="{
          'p-invalid': v$.houseData.adjoiningArea.$error,
        }"
        @blur="v$.houseData.adjoiningArea.$touch"
      />
      <small v-if="v$.houseData.adjoiningArea.$error" class="p-error" id="adjoiningArea-help">{{
        v$.houseData.adjoiningArea.$errors[0].$message
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
        <small v-if="v$.houseData.address.region.$error" class="p-error" id="region-help">{{
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
        <small v-if="v$.houseData.address.city.$error" class="p-error" id="city-help">{{
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
        <small v-if="v$.houseData.address.district.$error" class="p-error" id="district-help">{{
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
        <small v-if="v$.houseData.address.street.$error" class="p-error" id="street-help">{{
          v$.houseData.address.street.$errors[0].$message
        }}</small>
      </p>
      <p>
        <label class="dialog-item dialog-item-address" for="houseBlock">Блок : </label>
        <InputText
          id="houseBlock"
          placeholder="Блок"
          v-model.trim="houseData.address.houseBlock"
          :class="{
            'p-invalid': v$.houseData.address.houseBlock.$error,
          }"
          @blur="v$.houseData.address.houseBlock.$touch"
        />
        <small v-if="v$.houseData.address.houseBlock.$error" class="p-error" id="houseBlock-help">{{
          v$.houseData.address.houseBlock.$errors[0].$message
        }}</small>
      </p>
      <p>
        <label class="dialog-item dialog-item-address" for="houseNumber">Номер будинку: </label>
        <InputText
          id="houseNumber"
          placeholder="Номер"
          v-model.trim="houseData.address.houseNumber"
          :class="{
            'p-invalid': v$.houseData.address.houseNumber.$error,
          }"
          @blur="v$.houseData.address.houseNumber.$touch"
        />
        <small v-if="v$.houseData.address.houseNumber.$error" class="p-error" id="houseNumber-help">{{
          v$.houseData.address.houseNumber.$errors[0].$message
        }}</small>
      </p>
      <p>
        <label class="dialog-item dialog-item-address" for="zipCode">Код : </label>
        <InputText
          id="zipCode"
          placeholder="Код"
          v-model.trim="houseData.address.zipCode"
          :class="{
            'p-invalid': v$.houseData.address.zipCode.$error,
          }"
          @blur="v$.houseData.address.zipCode.$touch"
        />
        <small v-if="v$.houseData.address.zipCode.$error" class="p-error" id="zipCode-help">{{
          v$.houseData.address.zipCode.$errors[0].$message
        }}</small>
      </p>
    </div>
    <div class="buttons-container">
      <Button
        label="Зберегти зміни"
        icon="pi pi-check"
        autofocus
        class="p-button-info"
        type="submit"
        :disabled="v$.houseData.$invalid"
        id="add-new-house-btn"
      />
      <Button
        label="Скасувати зміни"
        icon="pi pi-times"
        @click="closeAddHouseModal"
        class="p-button-outlined p-button-info"
        id="cancel-btn"
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
  houseBlockHouseNumberMaxLength,
  houseAreaValidator,
  flatQuantityAndAdjoiningAreaValidator,
  houseDecimalValidator,
} from '@/utils/validators';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import { StoreModuleEnum } from '@/store/types';
import { HousesActionsEnum } from '@/store/houses/types';
import { AddressModel } from '@/shared/models/address.model';
import { HouseModel } from '@/shared/models/house.model';

export default defineComponent({
  name: 'AddHouseForm',
  components: {
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
        flatQuantity: null,
        houseArea: null,
        adjoiningArea: null,
        address: {
          region: '',
          city: '',
          district: '',
          street: '',
          houseBlock: '',
          houseNumber: '',
          zipCode: '',
        } as AddressModel,
      } as HouseModel,
      v$: useVuelidate(),
    };
  },
  validations() {
    return {
      houseData: {
        flatQuantity: {
          requiredValidator,
          zeroValidator,
          flatQuantityAndAdjoiningAreaValidator,
          houseDecimalValidator,
        },
        houseArea: { requiredValidator, zeroValidator, houseAreaValidator, houseDecimalValidator },
        adjoiningArea: {
          requiredValidator,
          zeroValidator,
          flatQuantityAndAdjoiningAreaValidator,
          houseDecimalValidator,
        },
        address: {
          region: { requiredValidator, ukrLangTitleValidator, regionCityDistrictMaxLength },
          city: { requiredValidator, ukrLangTitleValidator, regionCityDistrictMaxLength },
          district: { requiredValidator, ukrLangTitleValidator, regionCityDistrictMaxLength },
          street: { requiredValidator, ukrLangTitleValidator, streetMaxLength },
          houseBlock: {
            requiredValidator,
            houseNumAndHouseBlockValidator,
            houseBlockAndNumberMaxLength: houseBlockHouseNumberMaxLength,
          },
          houseNumber: {
            requiredValidator,
            houseNumAndHouseBlockValidator,
            houseBlockAndNumberMaxLength: houseBlockHouseNumberMaxLength,
          },
          zipCode: { requiredValidator, zipCodeValidator },
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

      this.closeAddHouseModal();
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
  margin: 0.2em 0.9rem;
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
