<template>
  <form>
    <div>
      <label for="coopName">Назва : </label>
      <div class="input-block">
        <small v-if="v$.cooperationData.name.$error" class="p-error">{{
          v$.cooperationData.name.$errors[0].$message
        }}</small>
        <InputText
          id="coopName"
          :class="{ 'p-invalid': v$.cooperationData.name.$error }"
          @blur="v$.cooperationData.name.$touch"
          placeholder="Назва"
          v-model.trim="cooperationData.name"
        />
      </div>
    </div>
    <div>
      <label for="coopIban">Iban номер : </label>
      <div class="input-block">
        <small v-if="v$.cooperationData.iban.$error" class="p-error">{{
          v$.cooperationData.iban.$errors[0].$message
        }}</small>
        <InputText
          id="coopIban"
          placeholder="iban номер"
          v-model.trim="cooperationData.iban"
          :class="{ 'p-invalid': v$.cooperationData.iban.$error }"
          @blur="v$.cooperationData.iban.$touch"
          maxlength="29"
        />
      </div>
    </div>
    <div>
      <label for="coopEmail">Електронна адреса : </label>
      <div class="input-block">
        <small v-if="v$.cooperationData.email.$error" class="p-error">{{
          v$.cooperationData.email.$errors[0].$message
        }}</small>
        <InputText
          id="coopEmail"
          placeholder="Електрона адреса"
          v-model.trim="cooperationData.email"
          :class="{ 'p-invalid': v$.cooperationData.email.$error }"
          @blur="v$.cooperationData.email.$touch"
          maxlength="320"
        />
      </div>
    </div>
    <div>
      <label for="edrpou">Код реєстрації : </label>
      <div class="input-block">
        <small v-if="v$.cooperationData.edrpou.$error" class="p-error">{{
          v$.cooperationData.edrpou.$errors[0].$message
        }}</small>
        <InputText
          id="edrpou"
          placeholder="ОСББ номер"
          v-model.trim="cooperationData.edrpou"
          :class="{ 'p-invalid': v$.cooperationData.edrpou.$error }"
          @blur="v$.cooperationData.edrpou.$touch"
          maxlength="8"
        />
      </div>
    </div>
    <div>
      <label for="coopPhone">Номер телефону : </label>
      <div class="input-block">
        <small v-if="v$.cooperationData.phone.$error" class="p-error">{{
          v$.cooperationData.phone.$errors[0].$message
        }}</small>
        <InputText
          id="coopPhone"
          placeholder="+38 000 000 00 00"
          v-model.trim="cooperationData.phone"
          :class="{ 'p-invalid': v$.cooperationData.phone.$error }"
          @blur="v$.cooperationData.phone.$touch"
          maxlength="13"
        />
      </div>
    </div>
    <div>
      <p>Адреса:</p>
      <div class="address-wrapper">
        <div>
          <label for="coopRegion">Регіон : </label>
          <div class="input-block">
            <small v-if="v$.cooperationData.address.region.$error" class="p-error">{{
              v$.cooperationData.address.region.$errors[0].$message
            }}</small>
            <InputText
              id="coopRegion"
              placeholder="Регіон"
              v-model.trim="cooperationData.address.region"
              :class="{ 'p-invalid': v$.cooperationData.address.region.$error }"
              @blur="v$.cooperationData.address.region.$touch"
            />
          </div>
        </div>
        <div>
          <label for="coopCity">Місто : </label>
          <div class="input-block">
            <small v-if="v$.cooperationData.address.city.$error" class="p-error">{{
              v$.cooperationData.address.city.$errors[0].$message
            }}</small>
            <InputText
              id="coopCity"
              placeholder="Місто"
              v-model.trim="cooperationData.address.city"
              :class="{ 'p-invalid': v$.cooperationData.address.city.$error }"
              @blur="v$.cooperationData.address.city.$touch"
            />
          </div>
        </div>
        <div>
          <label for="coopDistrict">Район : </label>
          <div class="input-block">
            <small v-if="v$.cooperationData.address.district.$error" class="p-error">{{
              v$.cooperationData.address.district.$errors[0].$message
            }}</small>
            <InputText
              id="coopDistrict"
              placeholder="Район"
              v-model.trim="cooperationData.address.district"
              :class="{ 'p-invalid': v$.cooperationData.address.district.$error }"
              @blur="v$.cooperationData.address.district.$touch"
            />
          </div>
        </div>
        <div>
          <label for="coopStreet">Вулиця : </label>
          <div class="input-block">
            <small v-if="v$.cooperationData.address.street.$error" class="p-error">{{
              v$.cooperationData.address.street.$errors[0].$message
            }}</small>
            <InputText
              id="coopStreet"
              placeholder="Вулиця"
              v-model.trim="cooperationData.address.street"
              :class="{ 'p-invalid': v$.cooperationData.address.street.$error }"
              @blur="v$.cooperationData.address.street.$touch"
            />
          </div>
        </div>
        <div>
          <label for="coopHouse">Номер будинку : </label>
          <div class="input-block">
            <small v-if="v$.cooperationData.address.houseNumber.$error" class="p-error">{{
              v$.cooperationData.address.houseNumber.$errors[0].$message
            }}</small>
            <InputText
              id="coopHouse"
              placeholder="Номер будинку"
              v-model.trim="cooperationData.address.houseNumber"
              :class="{ 'p-invalid': v$.cooperationData.address.houseNumber.$error }"
              @blur="v$.cooperationData.address.houseNumber.$touch"
            />
          </div>
        </div>
        <div>
          <label for="coopBlock">Блок : </label>
          <div class="input-block">
            <small v-if="v$.cooperationData.address.houseBlock.$error" class="p-error">{{
              v$.cooperationData.address.houseBlock.$errors[0].$message
            }}</small>
            <InputText
              id="coopBlock"
              placeholder="Блок"
              v-model.trim="cooperationData.address.houseBlock"
              :class="{ 'p-invalid': v$.cooperationData.address.houseBlock.$error }"
              @blur="v$.cooperationData.address.houseBlock.$touch"
            />
          </div>
        </div>
        <div>
          <label for="coopZipCode">Індекс : </label>
          <div class="input-block">
            <small v-if="v$.cooperationData.address.zipCode.$error" class="p-error">{{
              v$.cooperationData.address.zipCode.$errors[0].$message
            }}</small>
            <InputText
              id="coopZipCode"
              placeholder="Індекс"
              v-model.trim="cooperationData.address.zipCode"
              :class="{ 'p-invalid': v$.cooperationData.address.zipCode.$error }"
              @blur="v$.cooperationData.address.zipCode.$touch"
            />
          </div>
        </div>
      </div>
    </div>
  </form>
  <div class="buttons-container">
    <Button
      :disabled="v$.cooperationData.$invalid"
      label="Редагувати"
      icon="pi pi-check"
      @click="editCooperationInfo"
      autofocus
      class="p-button-info"
    />

    <Button
      label="Скасувати"
      icon="pi pi-times"
      @click="cancelCooperationEdit"
      class="p-button-outlined p-button-info"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
  CooperationAddressInterface,
  CooperationContactsInterface,
  CooperationActionEnum,
  CooperationGettersEnum,
} from '@/store/cooperation/types';
import { mapGetters } from 'vuex';
import useVuelidate from '@vuelidate/core';
import {
  requiredValidator,
  edrpouValidator,
  emailLastCharsValidator,
  emailMaxLength,
  emailMinLength,
  emailValidator,
  someTitleLenghtValidator,
  ukrLangTitleValidator,
  ibanValidator,
  userPhoneValidator,
  houseNumAndHouseBlockValidator,
  zipCodeValidator,
  regionCityDistrictMaxLength,
  streetMaxLength,
  houseBlockHouseNumberMaxLength,
} from '@/utils/validators';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import { StoreModuleEnum } from '@/store/types';

export default defineComponent({
  name: 'EditCooperationForm',
  components: {
    Button,
    InputText,
  },
  data() {
    return {
      cooperationData: {
        id: 0,
        name: '',
        edrpou: '',
        iban: '',
        phone: '',
        email: '',
        address: {} as CooperationAddressInterface,
      },
      v$: useVuelidate(),
    };
  },
  props: {
    cooperationId: {
      type: Number,
      required: true,
    },
  },
  validations() {
    return {
      cooperationData: {
        name: {
          requiredValidator,
          ukrLangTitleValidator,
          someTitleLenghtValidator,
        },
        edrpou: { requiredValidator, edrpouValidator },
        iban: { requiredValidator, ibanValidator },
        phone: { requiredValidator, userPhoneValidator },
        email: {
          requiredValidator,
          emailMinLength,
          emailLastCharsValidator,
          emailValidator,
          emailMaxLength,
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
  async mounted() {
    this.initData();
    this.$emit('isLoadedMode');
  },
  methods: {
    initData() {
      this.cooperationData.name = this.cooperationInfo?.name ?? '';
      this.cooperationData.edrpou = this.cooperationInfo?.edrpou ?? '';
      this.cooperationData.iban = this.cooperationInfo?.iban ?? '';
      this.cooperationData.address = JSON.parse(
        JSON.stringify(this.cooperationInfo?.address ?? ({} as CooperationAddressInterface))
      );
      this.cooperationInfo?.contacts.forEach((el: CooperationContactsInterface) => this.mapContact(el));
    },
    mapContact(el: CooperationContactsInterface) {
      if (el.main) {
        for (let key in el) {
          if (key === 'email') {
            this.cooperationData.email = el[key];
          }
          if (key === 'phone') {
            this.cooperationData.phone = el[key];
          }
        }
      }
    },
    editCooperationInfo(): void {
      const payload = {
        id: this.$props.cooperationId,
        name: this.cooperationData.name,
        edrpou: this.cooperationData.edrpou,
        iban: this.cooperationData.iban,
        address: this.cooperationData.address,
        contacts: [
          { type: 'email', main: true, email: this.cooperationData.email },
          { type: 'phone', main: true, phone: this.cooperationData.phone },
        ],
      };
      this.$store.dispatch(
        `${StoreModuleEnum.cooperationStore}/${CooperationActionEnum.SET_COOPERATION_UPDATE}`,
        payload
      );
      this.$emit('cancel-editCoopInfo');
    },
    cancelCooperationEdit() {
      this.initData();
      this.$emit('cancel-editCoopInfo');
    },
  },
  computed: {
    ...mapGetters({
      cooperationInfo: `${StoreModuleEnum.cooperationStore}/${CooperationGettersEnum.getSelectedCooperation}`,
    }),
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
.address-wrapper label {
  margin-left: 25px;
  width: 215px;
}
.input-block {
  display: inline-block;
  margin-bottom: 15px;
}
small {
  display: block;
  width: 280px;
}
.buttons-container {
  float: right;
  .p-button-outlined {
    margin-left: 20px;
  }
}
</style>
