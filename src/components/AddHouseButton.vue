<template>
  <Button
    label="Додати будинок"
    icon="pi pi-pencil"
    class="p-button-outlined p-button-info"
    @click="openAddHouseModal"
  />
  <Dialog
    header="Додати будинок"
    v-model:visible="displayAddHouseModal"
    :style="{ width: '51vw' }"
    :modal="true"
    :closable="false"
    :dismissableMask="true"
  >
    <form @submit.prevent="addNewHouse" id="houseDataForm">
      <p>
        <label class="dialog-item" for="quantityFlat">Кількість квартир в будинку : </label>
        <InputText
          id="quantityFlat"
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

      <label class="dialog-item" for="adrress-details-id">Адреса : </label>
      <div class="adrress-details" id="adrress-details-id">
        <p>
          <label class="dialog-item dialog-item-adress" for="region">Регіон : </label>
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
          <label class="dialog-item dialog-item-adress" for="city">Місто : </label>
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
          <label class="dialog-item dialog-item-adress" for="district">Район : </label>
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
          <label class="dialog-item dialog-item-adress" for="street">Вулиця : </label>
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
          <label class="dialog-item dialog-item-adress" for="house_block">Блок : </label>
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
          <label class="dialog-item dialog-item-adress" for="house_number">Номер будинку: </label>
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
          <label class="dialog-item dialog-item-adress" for="zip_code">Код : </label>
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
    </form>
    <template #footer>
      <Button
        label="Зберегти зміни"
        icon="pi pi-check"
        @click="addNewHouse"
        autofocus
        class="p-button-info"
        type="button"
        value="Submit"
      />
      <Button
        label="Скасувати зміни"
        icon="pi pi-times"
        @click="closeAddHouseModal"
        class="p-button-outlined p-button-info"
      />
    </template>
  </Dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import useVuelidate from '@vuelidate/core';
import {
  requiredValidator,
  flatQuantityValidator,
  houseAreaValidator,
  adjoiningAreaValidator,
  regionValidator,
  cityValidator,
  districtValidator,
  streetValidator,
  houseBlockNumberValidator,
  houseNumberValidator,
  zipCodeValidator,
} from '@/utils/validators';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import { StoreModuleEnum } from '@/store/types';
import { HousesActionsEnum } from '@/store/houses/types';

export default defineComponent({
  name: 'AddHouse',
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
        quantity_flat: { requiredValidator, flatQuantityValidator },
        house_area: { requiredValidator, houseAreaValidator },
        adjoining_area: { requiredValidator, adjoiningAreaValidator },
        address: {
          region: { requiredValidator, regionValidator },
          city: { requiredValidator, cityValidator },
          district: { requiredValidator, districtValidator },
          street: { requiredValidator, streetValidator },
          house_block: { requiredValidator, houseBlockNumberValidator },
          house_number: { requiredValidator, houseNumberValidator },
          zip_code: { requiredValidator, zipCodeValidator },
        },
      },
    };
  },
  methods: {
    openAddHouseModal() {
      this.$store.dispatch(`${StoreModuleEnum.housesStore}/${HousesActionsEnum.SET_ADD_HOUSE_MODAL}`, true);
    },
    closeAddHouseModal() {
      this.$store.dispatch(`${StoreModuleEnum.housesStore}/${HousesActionsEnum.SET_ADD_HOUSE_MODAL}`, false);
      this.v$.$reset();
      this.resetHouseDataFields(this.houseData);
    },
    async addNewHouse() {
      const isValid = await this.v$.$validate();

      if (!isValid) {
        return;
      }

      const ADDRESS = this.houseData.address;
      const payload = {
        cooperationId: this.$props.id,
        quantity_flat: this.houseData.quantity_flat,
        house_area: this.houseData.house_area,
        adjoining_area: this.houseData.adjoining_area,
        address: {
          region: ADDRESS.region,
          city: ADDRESS.city,
          district: ADDRESS.district,
          street: ADDRESS.street,
          house_block: ADDRESS.house_block,
          house_number: ADDRESS.house_number,
          zip_code: ADDRESS.zip_code,
        },
      };
      await this.$store.dispatch(`${StoreModuleEnum.housesStore}/${HousesActionsEnum.ADD_HOUSE}`, payload);
      this.resetHouseDataFields(this.houseData);
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
  },
  computed: {
    displayAddHouseModal(): boolean {
      return this.$store.state.housesStore.displayAddHouseModal;
    },
  },
});
</script>

<style lang="scss" scoped>
%error-message {
  margin: 0.4em 0.5rem;
  width: 80%;
}

.adrress-details {
  margin-left: 2rem;
}
.dialog-item-adress {
  margin-right: -2rem;
}
label {
  display: inline-block;
  width: 260px;
}
small {
  @extend %error-message;
}
</style>
