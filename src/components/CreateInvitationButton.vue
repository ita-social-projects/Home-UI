<template>
  <Button
    label="Створити запрошення"
    icon="pi pi-pencil"
    class="p-button-outlined p-button-info"
    @click="changeCreateInvitationModal(true)"
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
          v-model="selectedType"
          :options="invitationData.invitationType"
          placeholder="Оберіть тип запрошення"
          :class="{
            'p-invalid': v$.invitationData.invitationType.$error,
          }"
          @blur="v$.invitationData.invitationType.$touch"
        />
        <small v-if="v$.invitationData.invitationType.$error" class="p-error">{{
          v$.invitationData.invitationType.$errors[0].$message
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
          v-model="selectedHouse"
          :options="listOfHouses"
          optionLabel="houseData"
          placeholder="Оберіть дім"
          @change="getTheApartments(selectedHouse.houseId)"
          emptyMessage="В цьому ОСББ немає будинків"
        />
      </p>
      <p>
        <label class="dialog-item" for="list_of_apartments">Список квартир : </label>
        <Dropdown
          id="list_of_apartments"
          v-model="selectedApartment"
          :options="listOfApartments"
          placeholder="Оберіть квартиру"
          :disabled="isDisabled"
          emptyMessage="В цьому будинку немає квартир"
        />
      </p>
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
      />
      <Button
        label="Скасувати"
        icon="pi pi-times"
        @click="changeCreateInvitationModal(false)"
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
import { CreateInvitationInterface, InvitationsActionsEnum } from '@/store/invitations/types';

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
        invitationType: 'Ми запрошуємо власника квартири',
        email: '',
        listOfHouses: [],
        listOfApartments: [],
      } as CreateInvitationInterface,
      displayCreateInvitationModal: false,
      v$: useVuelidate(),
      isDisabled: true,
      selectedHouse: null,
      selectedType: null,
      selectedApartment: null,
    };
  },
  validations() {
    return {
      invitationData: {
        invitationType: { requiredValidator },
        email: { requiredValidator, emailValidator, emailMinLength, emailMaxLength, emailLastCharsValidator },
      },
    };
  },
  methods: {
    changeCreateInvitationModal(condition: boolean): void {
      if (condition) {
        console.log(condition);
        this.displayCreateInvitationModal = condition;
      } else {
        console.log(condition);
        this.displayCreateInvitationModal = condition;
        this.v$.$reset();
        this.resetHouseDataFields();
      }
    },
    async createInvitation(): Promise<void> {
      const isValid = await this.v$.$validate();

      if (!isValid) {
        return;
      }

      const payload = {
        ...this.invitationData,
      };
      await this.$store.dispatch(
        `${StoreModuleEnum.invitationsStore}/${InvitationsActionsEnum.CREATE_INVITATION}`,
        payload
      );

      this.resetHouseDataFields();
      this.changeCreateInvitationModal(false);
    },
    resetHouseDataFields(): void {
      this.selectedType = null;
      this.invitationData.email = '';
      this.selectedHouse = null;
      this.selectedApartment = null;
      this.isDisabled = true;
    },
    async getTheApartments(houseId: number): Promise<void> {
      this.isDisabled = false;

      await this.$store.dispatch(`${StoreModuleEnum.apartmentsStore}/${ApartmentsActionsEnum.SET_APARTMENTS}`, houseId);
    },
  },
  computed: {
    displayModal(): boolean {
      return this.displayCreateInvitationModal;
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
