<template>
  <form @submit.prevent="manageHouseInfo" v-if="isLoaded">
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
        placeholder="Прибудинкової території"
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
        id="add-new-house-btn"
        label="Зберегти зміни"
        icon="pi pi-check"
        autofocus
        class="p-button-info"
        type="submit"
        :disabled="v$.houseData.$invalid"
      />
      <Button
        id="cancel-btn"
        label="Скасувати зміни"
        icon="pi pi-times"
        class="p-button-outlined p-button-info"
        @click="cancelManagingModal"
      />
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import useVuelidate from '@vuelidate/core';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import { houseValidations } from '@/houses/utils/validators/house-validations';
import { AddressInterface, HouseInterface, HousesActionsEnum } from '@/houses/store/types';
import { StoreModuleEnum } from '@/store/types';
import { HouseModel } from '../models/house.model';

export default defineComponent({
  name: 'ManageHouseForm',
  components: {
    Button,
    InputText,
  },
  props: {
    cooperationId: {
      type: Number,
      required: true,
    },
    houseData: {
      type: HouseModel,
      required: true,
    },
  },
  data() {
    return {
      houseData: {
        cooperationId: this.$props.cooperationId,
        flatQuantity: null as any,
        houseArea: null as any,
        adjoiningArea: null as any,
        address: {
          region: '',
          city: '',
          district: '',
          street: '',
          houseBlock: '',
          houseNumber: '',
          zipCode: '',
        } as AddressInterface,
      } as HouseInterface,

      isLoaded: false,
      v$: useVuelidate(),
    };
  },
  validations() {
    return {
      houseData: houseValidations,
    };
  },
  async mounted() {
    if (this.$props.houseData) {
      this.initData();
    }
    this.isLoaded = true;
  },
  methods: {
    initData() {
      this.houseData.flatQuantity = this.$props.houseData?.flatQuantity ?? 0;
      this.houseData.houseArea = this.$props.houseData?.houseArea ?? 0;
      this.houseData.adjoiningArea = this.$props.houseData?.adjoiningArea ?? 0;
      this.houseData.address = this.$props.houseData.address
        ? JSON.parse(JSON.stringify(this.$props.houseData.address))
        : {};
    },
    async manageHouseInfo() {
      const payload = { ...this.houseData };

      if (this.$props.houseData) {
        payload.id = this.$props.houseData.id ? this.$props.houseData.id : 0;

        await this.$store.dispatch(`${StoreModuleEnum.housesStore}/${HousesActionsEnum.EDIT_HOUSE}`, payload);
      } else {
        await this.$store.dispatch(`${StoreModuleEnum.housesStore}/${HousesActionsEnum.ADD_HOUSE}`, payload);
      }

      this.showSuccessOperation();
      this.cancelManagingModal();
    },
    cancelManagingModal() {
      this.$emit('cancel-managing');
    },
    showSuccessOperation() {
      const detailText = this.$props.houseData
        ? `Дані про будинок з ID ${this.$props.houseData.id!} змінено!`
        : `Новий будинок додано!`;

      this.$toast.add({
        severity: 'success',
        summary: 'Успішно',
        detail: `${detailText}`,
        life: 3000,
      });
    },
  },
});
</script>

<style lang="scss" scoped>
input {
  max-width: 265px;
}
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
