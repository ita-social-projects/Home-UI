<template>
  <form id="create_invit_form">
    <p>
      <label class="dialog-item" for="invitation_type">Тип запрошення : </label>
      <Dropdown
        id="invitation_type"
        :options="invitationData.invitationType"
        v-model.trim="selectedData.selectedType"
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
        placeholder="Оберіть будинок"
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
    <div class="buttons-container">
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
        @click="closeInvitationTemplateModal"
        class="p-button-outlined p-button-info"
      />
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import Button from 'primevue/button';
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
  name: 'InvitationTemplate',
  components: {
    Button,
    InputText,
    Dropdown,
  },
  props: ['propsInvitationData'],
  data() {
    return {
      invitationData: {
        invitationType: [`${InvitationTypesEnum.cooperation}`, `${InvitationTypesEnum.apartment}`],
        email: this.$props.propsInvitationData.email,
        listOfHouses: [],
        listOfApartments: [],
      },
      selectedData: {
        selectedType: this.$props.propsInvitationData.type,
        selectedHouse: {
          houseData: `вул. ${this.$props.propsInvitationData.apartment.address.street}, будинок ${this.$props.propsInvitationData.apartment.address.houseNumber}`,
          houseId: 2486,
        },
        selectedApartment: {
          apartmentData: `кв. ${this.$props.propsInvitationData.apartment.apartmentNumber}`,
          apartmentId: this.$props.propsInvitationData.apartment.id,
        },
      },
      displayCreateInvitModal: false,
      apartmentId: 0,
      houseId: 0,

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
  async mounted() {
    try {
      await this.$store.dispatch(`${StoreModuleEnum.housesStore}/${HousesActionsEnum.SET_HOUSES}`, this.cooperationId);
      await this.$store.dispatch(`${StoreModuleEnum.apartmentsStore}/${ApartmentsActionsEnum.SET_APARTMENTS}`, 2486);
    } catch {
      console.log('error was caught during mounting');
    }
  },
  methods: {
    closeInvitationTemplateModal(): void {
      this.$emit('close-template-modal');
    },
    async createInvitation(): Promise<void> {
      const payload = {
        type: this.selectedData.selectedType,
        email: this.invitationData.email,
        cooperationId: this.cooperationId,
        apartmentId: this.selectedData.selectedApartment.apartmentId,
        role: 'user',
      };
      console.log(payload);
      // await Promise.all([
      //   this.$store.dispatch(
      //     `${StoreModuleEnum.invitationsStore}/${InvitationsActionsEnum.CREATE_INVITATION}`,
      //     payload
      //   ),
      //   this.$store.dispatch(`${StoreModuleEnum.invitationsStore}/${InvitationsActionsEnum.SET_APARTMENT_INVITATIONS}`),
      // ]).catch((e) => {
      //   console.log('error: ', e);
      // });
      this.$emit('close-template-modal');
    },
    async onChangeHouse(houseId: number): Promise<void> {
      this.houseId = houseId;
      await this.$store.dispatch(`${StoreModuleEnum.apartmentsStore}/${ApartmentsActionsEnum.SET_APARTMENTS}`, houseId);
    },
    onChangeApartment(apartmentId: number): void {
      this.apartmentId = apartmentId;
    },
  },
  computed: {
    ...mapGetters({
      listOfHouses: `${StoreModuleEnum.housesStore}/${HousesGettersEnum.getListOfHouses}`,
      listOfApartments: `${StoreModuleEnum.apartmentsStore}/${ApartmentsGettersEnum.getListOfApartments}`,
      cooperationId: `${StoreModuleEnum.cooperationStore}/${CooperationGettersEnum.getSelectedCooperationId}`,
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
.apartment {
  position: absolute;
  margin-left: 30rem;
  margin-top: -3rem;
}
.buttons-container {
  float: right;
  .p-button-outlined {
    margin-left: 20px;
  }
}
</style>
