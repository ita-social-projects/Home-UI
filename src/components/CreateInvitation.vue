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
    :style="{ width: '52vw' }"
    :modal="true"
    :closable="false"
    :dismissableMask="true"
  >
    <form id="create_invit_form">
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
          :disabled="v$.selectedData.selectedHouse.$invalid"
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
      <small v-if="v$.selectedData.selectedApartment.$error" class="p-error apartment">{{
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
        :disabled="v$.$invalid"
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
import { ApartmentsActionsEnum, ApartmentsGettersEnum } from '@/store/apartments/types';
import {
  requiredValidator,
  emailValidator,
  emailMinLength,
  emailMaxLength,
  emailLastCharsValidator,
} from '@/utils/validators';
import { InvitationsActionsEnum, InvitationTypesEnum } from '@/store/invitations/types';
import { HousesActionsEnum, HousesGettersEnum } from '@/store/houses/types';
import { CooperationGettersEnum } from '@/store/cooperation/types';

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
        invitationType: [`${InvitationTypesEnum.cooperation}`, `${InvitationTypesEnum.apartment}`],
        email: '',
        listOfHouses: [],
        listOfApartments: [],
      },
      selectedData: {
        selectedType: '',
        selectedHouse: '',
        selectedApartment: '',
      },
      displayCreateInvitModal: false,

      apartmentId: 0,
      apartmentData: '',
      houseAddress: '',

      v$: useVuelidate(),
    };
  },
  validations() {
    return {
      invitationData: {
        email: { requiredValidator, emailValidator, emailMinLength, emailMaxLength, emailLastCharsValidator },
      },
      selectedData: {
        selectedHouse: { requiredValidator },
        selectedType: { requiredValidator },
        selectedApartment: { requiredValidator },
      },
    };
  },
  async mounted(): Promise<void> {
    await this.$store.dispatch(`${StoreModuleEnum.housesStore}/${HousesActionsEnum.SET_HOUSES}`, this.cooperationId);
  },
  methods: {
    changeInvitationModal(condition: boolean): void {
      if (condition) {
        this.displayCreateInvitModal = condition;
      } else {
        this.displayCreateInvitModal = condition;
        this.v$.$reset();
        this.resetHouseDataFields(this.selectedData);
      }
    },
    async createInvitation(): Promise<void> {
      const payload = {
        type: this.selectedData.selectedType,
        email: this.invitationData.email,
        cooperationId: this.cooperationId,
        apartmentId: this.apartmentId,
        role: 'user',
      };

      await this.$store.dispatch(
        `${StoreModuleEnum.invitationsStore}/${InvitationsActionsEnum.CREATE_INVITATION}`,
        payload
      );
      await this.$store.dispatch(
        `${StoreModuleEnum.invitationsStore}/${InvitationsActionsEnum.SET_APARTMENT_INVITATIONS}`
      );

      this.resetHouseDataFields(this.selectedData);
      this.changeInvitationModal(false);
    },
    resetHouseDataFields(data: any): void {
      this.invitationData.email = '';
      for (let field in data) {
        data[field] = '';
      }
    },
    async onChangeHouse(houseId: number, houseData: any): Promise<void> {
      this.selectedData.selectedApartment = '';
      this.houseAddress = houseData;

      await this.$store.dispatch(`${StoreModuleEnum.apartmentsStore}/${ApartmentsActionsEnum.SET_APARTMENTS}`, houseId);
    },
    onChangeApartment(apartmentId: number, apartmentData: any): void {
      this.apartmentId = apartmentId;
      this.apartmentData = apartmentData;
    },
  },
  computed: {
    displayModal(): boolean {
      return this.displayCreateInvitModal;
    },
    ...mapGetters({
      listOfHouses: `${StoreModuleEnum.housesStore}/${HousesGettersEnum.getListOfHouses}`,
      listOfApartments: `${StoreModuleEnum.apartmentsStore}/${ApartmentsGettersEnum.getListOfApartments}`,
      cooperationId: `${StoreModuleEnum.cooperationStore}/${CooperationGettersEnum.getSelectedCooperationId}`,
    }),
  },
  created() {
    this.$store.watch(
      (state) => state.invitationsStore.invitations,
      () => {
        console.log('(component) links changed!');
      }
    );
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
.apartment {
  position: absolute;
  margin-left: 30rem;
  margin-top: -3rem;
}
</style>
