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
    :style="{ width: '50vw' }"
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
          v-model.trim="houseData.flatQuantity"
          :class="{
            'p-invalid': v$.houseData.flatQuantity.$error,
          }"
          @blur="v$.houseData.flatQuantity.$touch"
        />
        <small v-if="v$.houseData.flatQuantity.$error" class="p-error">{{
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
        <small v-if="v$.houseData.houseArea.$error" class="p-error">{{
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
        <small v-if="v$.houseData.adjoiningArea.$error" class="p-error">{{
          v$.houseData.adjoiningArea.$errors[0].$message
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
          <label class="dialog-item dialog-item-adress" for="houseBlock">Блок : </label>
          <InputText
            id="houseBlock"
            placeholder="Блок"
            v-model.trim="houseData.address.houseBlock"
            :class="{
              'p-invalid': v$.houseData.address.houseBlock.$error,
            }"
            @blur="v$.houseData.address.houseBlock.$touch"
          />
          <small v-if="v$.houseData.address.houseBlock.$error" class="p-error">{{
            v$.houseData.address.houseBlock.$errors[0].$message
          }}</small>
        </p>
        <p>
          <label class="dialog-item dialog-item-adress" for="houseNumber">Номер будинку: </label>
          <InputText
            id="houseNumber"
            placeholder="Номер"
            v-model.trim="houseData.address.houseNumber"
            :class="{
              'p-invalid': v$.houseData.address.houseNumber.$error,
            }"
            @blur="v$.houseData.address.houseNumber.$touch"
          />
          <small v-if="v$.houseData.address.houseNumber.$error" class="p-error">{{
            v$.houseData.address.houseNumber.$errors[0].$message
          }}</small>
        </p>
        <p>
          <label class="dialog-item dialog-item-adress" for="zipCode">Код : </label>
          <InputText
            id="zipCode"
            placeholder="Код"
            v-model.trim="houseData.address.zipCode"
            :class="{
              'p-invalid': v$.houseData.address.zipCode.$error,
            }"
            @blur="v$.houseData.address.zipCode.$touch"
          />
          <small v-if="v$.houseData.address.zipCode.$error" class="p-error">{{
            v$.houseData.address.zipCode.$errors[0].$message
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
        flatQuantity: '',
        houseArea: '',
        adjoiningArea: '',
        address: {
          region: '',
          city: '',
          district: '',
          street: '',
          houseBlock: '',
          houseNumber: '',
          zipCode: '',
        },
      },
      v$: useVuelidate(),
    };
  },
  validations() {
    return {
      houseData: {
        flatQuantity: { requiredValidator, flatQuantityValidator },
        houseArea: { requiredValidator, houseAreaValidator },
        adjoiningArea: { requiredValidator, adjoiningAreaValidator },
        address: {
          region: { requiredValidator, regionValidator },
          city: { requiredValidator, cityValidator },
          district: { requiredValidator, districtValidator },
          street: { requiredValidator, streetValidator },
          houseBlock: { requiredValidator, houseBlockNumberValidator },
          houseNumber: { requiredValidator, houseNumberValidator },
          zipCode: { requiredValidator, zipCodeValidator },
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
        id: this.$props.id,
        flatQuantity: this.houseData.flatQuantity,
        houseArea: this.houseData.houseArea,
        adjoiningArea: this.houseData.adjoiningArea,
        address: {
          region: ADDRESS.region,
          city: ADDRESS.city,
          district: ADDRESS.district,
          street: ADDRESS.street,
          houseBlock: ADDRESS.houseBlock,
          houseNumber: ADDRESS.houseNumber,
          zipCode: ADDRESS.zipCode,
        },
      };
      await this.$store.dispatch(`${StoreModuleEnum.housesStore}/${HousesActionsEnum.ADD_HOUSE}`, payload).then(() => {
        this.resetHouseDataFields(this.houseData);
        this.closeAddHouseModal();
      });
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
