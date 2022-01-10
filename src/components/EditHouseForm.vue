<template>
  <form @submit.prevent="editHouseInfo" id="house_data_form">
    <p>
      <label class="dialog-item" for="coopName">Кількість квартир в будинку : </label>
      <InputText
        id="quantityFlat"
        placeholder="Кількість квартир в будинку"
        v-model.trim="house.flatQuantity"
        :class="{ 'p-invalid': v$.house.flatQuantity.$error }"
        @blur="v$.house.flatQuantity.$touch"
      />
      <small v-if="v$.house.flatQuantity.$error" class="p-error">{{ v$.house.flatQuantity.$errors[0].$message }}</small>
    </p>
    <p>
      <label class="dialog-item" for="coopAddress">Площа будинку : </label>
      <InputText
        id="houseArea"
        placeholder="Площа будинку"
        v-model="house.houseArea"
        :class="{ 'p-invalid': v$.house.houseArea.$error }"
        @blur="v$.house.houseArea.$touch"
      />
      <small v-if="v$.house.houseArea.$error" class="p-error">{{ v$.house.houseArea.$errors[0].$message }}</small>
    </p>
    <p>
      <label class="dialog-item" for="iban">Прибудинкової теріторії : </label>
      <InputText
        id="adjoiningArea"
        v-model="house.adjoiningArea"
        :class="{ 'p-invalid': v$.house.adjoiningArea.$error }"
        @blur="v$.house.adjoiningArea.$touch"
      />
      <small v-if="v$.house.adjoiningArea.$error" class="p-error">{{
        v$.house.adjoiningArea.$errors[0].$message
      }}</small>
    </p>

    <label class="dialog-item" for="address-details-id">Адреса : </label>
    <div class="address-details" id="address-details-id">
      <p>
        <label class="dialog-item dialog-item-address" for="coopEmail">Регіон : </label>
        <InputText
          id="address-region"
          placeholder="Регіон"
          v-model="house.address.region"
          :class="{ 'p-invalid': v$.house.address.region.$error }"
          @blur="v$.house.address.region.$touch"
        />
        <small v-if="v$.house.address.region.$error" class="p-error">{{
          v$.house.address.region.$errors[0].$message
        }}</small>
      </p>
      <p>
        <label class="dialog-item dialog-item-address" for="coopEmail">Місто : </label>
        <InputText
          id="address-city"
          placeholder="Регіон"
          v-model="house.address.city"
          :class="{ 'p-invalid': v$.house.address.city.$error }"
          @blur="v$.house.address.city.$touch"
        />
        <small v-if="v$.house.address.city.$error" class="p-error">{{
          v$.house.address.city.$errors[0].$message
        }}</small>
      </p>
      <p>
        <label class="dialog-item dialog-item-address" for="coopEmail">Район : </label>
        <InputText
          id="address-region"
          placeholder="Регіон"
          v-model="house.address.district"
          :class="{ 'p-invalid': v$.house.address.district.$error }"
          @blur="v$.house.address.district.$touch"
        />
        <small v-if="v$.house.address.district.$error" class="p-error">{{
          v$.house.address.district.$errors[0].$message
        }}</small>
      </p>
      <p>
        <label class="dialog-item dialog-item-address" for="coopEmail">Вулиця : </label>
        <InputText
          id="address-street"
          placeholder="Регіон"
          v-model="house.address.street"
          :class="{ 'p-invalid': v$.house.address.street.$error }"
          @blur="v$.house.address.street.$touch"
        />
        <small v-if="v$.house.address.street.$error" class="p-error">{{
          v$.house.address.street.$errors[0].$message
        }}</small>
      </p>
      <p>
        <label class="dialog-item dialog-item-address" for="coopEmail">Блок : </label>
        <InputText
          id="address-block"
          placeholder="Регіон"
          v-model="house.address.houseBlock"
          :class="{ 'p-invalid': v$.house.address.houseBlock.$error }"
          @blur="v$.house.address.houseBlock.$touch"
        />
        <small v-if="v$.house.address.houseBlock.$error" class="p-error">{{
          v$.house.address.houseBlock.$errors[0].$message
        }}</small>
      </p>
      <p>
        <label class="dialog-item dialog-item-address" for="coopEmail">Номер будинку : </label>
        <InputText
          id="address-housenumber"
          placeholder="Регіон"
          v-model="house.address.houseNumber"
          :class="{ 'p-invalid': v$.house.address.houseNumber.$error }"
          @blur="v$.house.address.houseNumber.$touch"
        />
        <small v-if="v$.house.address.houseNumber.$error" class="p-error">{{
          v$.house.address.houseNumber.$errors[0].$message
        }}</small>
      </p>
      <p>
        <label class="dialog-item dialog-item-address" for="coopEmail">Код : </label>
        <InputText
          id="address-zipcode"
          placeholder="Регіон"
          v-model="house.address.zipCode"
          :class="{ 'p-invalid': v$.house.address.zipCode.$error }"
          @blur="v$.house.address.zipCode.$touch"
        />
        <small v-if="v$.house.address.zipCode.$error" class="p-error">{{
          v$.house.address.zipCode.$errors[0].$message
        }}</small>
      </p>
    </div>
  </form>

  <div class="button-div">
    <Button
      :disabled="v$.house.$invalid"
      label="Зберегти зміни"
      icon="pi pi-check"
      @click="editHouseInfo"
      autofocus
      class="p-button-info"
    />
    <Button label="Скасувати" icon="pi pi-times" @click="cancelEditing" class="p-button-outlined p-button-info" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import { HousesActionsEnum } from '@/store/houses/types';
import { StoreModuleEnum } from '@/store/types';
import useVuelidate from '@vuelidate/core';
import { HouseModel } from '@/shared/models/house.model';
import { AddressModel } from '@/shared/models/address.model';
import { houseValidations } from '@/utils/house-validations';

export default defineComponent({
  name: 'EditHouseForm',
  components: {
    Button,
    InputText,
  },
  props: ['propsHouseData', 'cooperationId'],
  emits: ['cancel-editing', 'isLoadedModeHouse', 'house-saved'],
  data() {
    return {
      cooperationData: {
        id: 0,
      },
      isLoaded: false,
      house: {
        id: this.$props.propsHouseData.id,
        flatQuantity: this.$props.propsHouseData.flatQuantity,
        houseArea: this.$props.propsHouseData.houseArea,
        adjoiningArea: this.$props.propsHouseData.adjoiningArea,
        address: {
          region: this.$props.propsHouseData.address.region,
          city: this.$props.propsHouseData.address.city,
          district: this.$props.propsHouseData.address.district,
          street: this.$props.propsHouseData.address.street,
          houseBlock: this.$props.propsHouseData.address.houseBlock,
          houseNumber: this.$props.propsHouseData.address.houseNumber,
          zipCode: this.$props.propsHouseData.address.zipCode,
        } as AddressModel,
      } as HouseModel,
      displayModalForHouse: false,
      displayModalForCooperation: false,
      displayAddHouseModal: false,
      v$: useVuelidate(),
    };
  },
  validations() {
    return {
      house: houseValidations,
    };
  },

  methods: {
    async editHouseInfo() {
      const payload = {
        cooperationId: this.$props.cooperationId,
        id: this.house.id,
        flatQuantity: this.house.flatQuantity,
        houseArea: this.house.houseArea,
        adjoiningArea: this.house.adjoiningArea,

        address: {
          region: this.house.address.region,
          city: this.house.address.city,
          district: this.house.address.district,
          street: this.house.address.street,
          houseBlock: this.house.address.houseBlock,
          houseNumber: this.house.address.houseNumber,
          zipCode: this.house.address.zipCode,
        },
      };
      this.$store.dispatch(`${StoreModuleEnum.housesStore}/${HousesActionsEnum.EDIT_HOUSE}`, payload);
      this.showSuccessEdit(this.house.id!);
      this.$emit('house-saved');
    },
    showSuccessEdit(id: number) {
      this.$toast.add({
        severity: 'success',
        summary: 'Успішно',
        detail: `Дані про будинок з ID ${id} змінено`,
        life: 3000,
      });
    },
    cancelEditing() {
      this.$emit('cancel-editing');
    },
  },
  computed: {
    displayHouseModal(): boolean {
      return this.displayModalForHouse;
    },
  },
});
</script>

<style lang="scss" scoped>
.address-details {
  margin-left: 2rem;
  .dialog-item-address {
    margin-right: -2rem;
  }
}
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
