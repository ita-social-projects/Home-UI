<template>
  <Button
    label="Створити запрошення"
    icon="pi pi-pencil"
    class="p-button-outlined p-button-info"
    @click="changeInvitationModal(true)"
  />
  <Dialog
    header="Створити запрошення"
    v-model:visible="displayModal"
    :style="{ width: '51vw' }"
    :modal="true"
    :closable="false"
    :dismissableMask="true"
  >
    <form @submit.prevent="createInvitation" id="create_invit_form">
      <p>
        <label class="dialog-item" for="invitation_type">Тип запрошення : </label>
        <Dropdown
          id="invitation_type"
          v-model="selectedData.selectedType"
          :options="invitationData.invitationType"
          placeholder="Оберіть тип запрошення"
          :class="{
            'p-invalid': v$.selectedData.selectedType.$error,
          }"
          @blur="v$.selectedData.selectedType.$touch"
        />
        <small v-if="v$.selectedData.selectedType.$error" class="p-error">{{
          v$.selectedData.selectedType.$errors[0].$message
        }}</small>
      </p>
      <p>
        <label class="dialog-item dialog-item-address" for="user_email">Email : </label>
        <InputText
          id="user_email"
          placeholder="Email"
          v-model.trim="invitationData.email"
          :class="{
            'p-invalid': v$.invitationData.email.$error,
          }"
          @blur="v$.invitationData.email.$touch"
        />
        <small v-if="v$.invitationData.email.$error" class="p-error">{{
          v$.invitationData.email.$errors[0].$message
        }}</small>
      </p>
      <p>
        <label class="dialog-item" for="list_of_houses">Список домів : </label>
        <Dropdown
          id="list_of_houses"
          v-model="selectedData.selectedHouse"
          :options="listOfHouses"
          optionLabel="houseData"
          placeholder="Оберіть дім"
          @change="onChangeHouse(selectedData.selectedHouse.houseId, selectedData.selectedHouse.houseData)"
          emptyMessage="В цьому ОСББ немає будинків"
          :class="{
            'p-invalid': v$.selectedData.selectedHouse.$error,
          }"
          @blur="v$.selectedData.selectedHouse.$touch"
        />
        <small v-if="v$.selectedData.selectedHouse.$error" class="p-error">{{
          v$.selectedData.selectedHouse.$errors[0].$message
        }}</small>
      </p>
      <p>
        <label class="dialog-item" for="list_of_apartments">Список квартир : </label>
        <Dropdown
          id="list_of_apartments"
          v-model="selectedData.selectedApartment"
          :options="listOfApartments"
          optionLabel="apartmentData"
          placeholder="Оберіть квартиру"
          :disabled="isApartBtnDisabled"
          emptyMessage="В цьому будинку немає квартир"
          @change="
            onChangeApartment(selectedData.selectedApartment.apartmentId, selectedData.selectedApartment.apartmentData)
          "
          :class="{
            'p-invalid': v$.selectedData.selectedApartment.$error,
          }"
          @blur="v$.selectedData.selectedApartment.$touch"
        />
      </p>
      <small v-if="v$.selectedData.selectedApartment.$error" class="p-error">{{
        v$.selectedData.selectedApartment.$errors[0].$message
      }}</small>
    </form>
    <template #footer>
      <Button
        label="Відправити"
        icon="pi pi-check"
        @click="createInvitation"
        autofocus
        class="p-button-info"
        type="button"
        value="Submit"
        :disabled="isDisabled"
      />
      <Button
        label="Скасувати"
        icon="pi pi-times"
        @click="changeInvitationModal(false)"
        class="p-button-outlined p-button-info"
      />
    </template>
  </Dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import useVuelidate from '@vuelidate/core';
import { StoreModuleEnum } from '@/store/types';
import { mapGetters } from 'vuex';
import { ApartmentsActionsEnum } from '@/store/apartments/types';
import {
  requiredValidator,
  emailValidator,
  emailMinLength,
  emailMaxLength,
  emailLastCharsValidator,
} from '@/utils/validators';
import { InvitationsActionsEnum } from '@/store/invitations/types';
import { HousesActionsEnum } from '@/store/houses/types';

export default defineComponent({
  name: 'CreateInvitationButton',
  components: {
    Dialog,
    Button,
    InputText,
    Dropdown,
  },
  data() {
    return {
      invitationData: {
        invitationType: ['Ми запрошуємо власника квартири', 'Ми запрошуємо власника ОСББ'],
        email: '',
        listOfHouses: [],
        listOfApartments: [],
      },
      selectedData: {
        selectedHouse: '',
        selectedType: '',
        selectedApartment: '',
      },
      displayCreateInvitationModal: false,

      isApartBtnDisabled: true,
      isSubmitDisabled: true,

      houseAddress: '',
      apartmentNumber: '',
      apartmentId: 0,

      v$: useVuelidate(),
    };
  },
  validations() {
    return {
      invitationData: {
        email: { requiredValidator, emailValidator, emailMinLength, emailMaxLength, emailLastCharsValidator },
      },
      selectedData: {
        selectedApartment: { requiredValidator },
        selectedHouse: { requiredValidator },
        selectedType: { requiredValidator },
      },
    };
  },
  async mounted(): Promise<void> {
    await this.$store.dispatch(`${StoreModuleEnum.housesStore}/${HousesActionsEnum.SET_HOUSES}`);
  },
  methods: {
    changeInvitationModal(condition: boolean): void {
      if (condition) {
        this.displayCreateInvitationModal = condition;
      } else {
        this.displayCreateInvitationModal = condition;
        this.v$.$reset();
        this.resetHouseDataFields(this.selectedData);
      }
    },
    async createInvitation(): Promise<void> {
      const isValid = await this.v$.$validate();

      if (!isValid) {
        return;
      }

      const payload = {
        invitationType: this.selectedData.selectedType,
        email: this.invitationData.email,
        address: `${this.houseAddress}, ${this.apartmentNumber}`,
      };

      await this.$store.dispatch(
        `${StoreModuleEnum.invitationsStore}/${InvitationsActionsEnum.CREATE_INVITATION}`,
        payload
      );

      this.resetHouseDataFields(this.selectedData);
      this.changeInvitationModal(false);
    },
    resetHouseDataFields(data: any): void {
      this.invitationData.email = '';
      for (let field in data) {
        data[field] = '';
      }

      this.isApartBtnDisabled = true;
    },
    async onChangeHouse(houseId: number, houseData: string): Promise<void> {
      this.isApartBtnDisabled = false;
      this.houseAddress = houseData;
      this.selectedData.selectedApartment = '';

      await this.$store.dispatch(`${StoreModuleEnum.apartmentsStore}/${ApartmentsActionsEnum.SET_APARTMENTS}`, houseId);
    },
    onChangeApartment(apartmentId: number, apartmentData: string): void {
      this.apartmentId = apartmentId;
      this.apartmentNumber = apartmentData;
    },
  },
  computed: {
    displayModal(): boolean {
      return this.displayCreateInvitationModal;
    },
    isDisabled(): boolean {
      const isValid =
        Object.values(this.selectedData).every((selectedField) => selectedField !== '') &&
        this.invitationData.email !== '';
      isValid ? (this.isSubmitDisabled = false) : (this.isSubmitDisabled = true);

      return this.isSubmitDisabled;
    },
    ...mapGetters({
      listOfHouses: `${StoreModuleEnum.housesStore}/getListOfHouses`,
      listOfApartments: `${StoreModuleEnum.apartmentsStore}/getListOfApartments`,
    }),
  },
});
</script>

<style lang="scss" scoped>
%error-message {
  margin: 0.4em 0.5rem;
  width: 80%;
}

.dialog-item {
  display: inline-block;
  width: 260px;
}
.p-error {
  @extend %error-message;
}
</style>
