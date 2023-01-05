<template>
  <form id="create_invit_form">
    <div class="input-field">
      <label class="dialog-item" for="invitation_type">Тип запрошення : </label>
      <div class="input-field__wrapper">
        <Dropdown
          id="invitation_type"
          optionLabel="name"
          optionValue="code"
          placeholder="Оберіть тип запрошення"
          v-model="selectedData.selectedType"
          :options="invitationData.invitationType"
          :class="{
            'p-invalid': v$.selectedData.selectedType.$error,
          }"
          @blur="v$.selectedData.selectedType.$touch"
        />
        <p v-if="v$.selectedData.selectedType.$error" class="p-error">
          {{ v$.selectedData.selectedType.$errors[0].$message }}
        </p>
      </div>
    </div>
    <div class="input-field">
      <label class="dialog-item dialog-item-address" for="user_email">Email : </label>
      <div class="input-field__wrapper">
        <InputText
          id="user_email"
          placeholder="Email"
          v-model.trim="invitationData.email"
          :class="{
            'p-invalid': v$.invitationData.email.$error,
          }"
          @blur="v$.invitationData.email.$touch"
        />
        <p v-if="v$.invitationData.email.$error" class="p-error">{{ v$.invitationData.email.$errors[0].$message }}</p>
      </div>
    </div>
    <div class="input-field">
      <label class="dialog-item" for="list_of_houses">Список домів : </label>
      <div class="input-field__wrapper">
        <Dropdown
          id="list_of_houses"
          placeholder="Оберіть дім"
          optionLabel="houseData"
          emptyMessage="В цьому ОСББ немає будинків"
          v-model="selectedData.selectedHouse"
          :options="listOfHouses"
          :class="{
            'p-invalid': v$.selectedData.selectedHouse.$error,
          }"
          @blur="v$.selectedData.selectedHouse.$touch"
          @change="onChangeHouse(selectedData.selectedHouse.houseId)"
        />
        <p v-if="v$.selectedData.selectedHouse.$error" class="p-error">
          {{ v$.selectedData.selectedHouse.$errors[0].$message }}
        </p>
      </div>
    </div>
    <div class="input-field">
      <label class="dialog-item" for="list_of_apartments">Список квартир : </label>
      <div class="input-field__wrapper">
        <Dropdown
          id="list_of_apartments"
          placeholder="Оберіть квартиру"
          v-model="selectedData.selectedApartment"
          :options="listOfApartments"
          optionLabel="apartmentData"
          :disabled="v$.selectedData.selectedHouse.$invalid"
          emptyMessage="В цьому будинку немає квартир"
          :class="{
            'p-invalid': v$.selectedData.selectedApartment.$error,
          }"
          @blur="v$.selectedData.selectedApartment.$touch"
          @change="
            onChangeApartment(selectedData.selectedApartment.apartmentId, selectedData.selectedApartment.apartmentData)
          "
        />
        <p v-if="v$.selectedData.selectedApartment.$error" class="p-error apartment">
          {{ v$.selectedData.selectedApartment.$errors[0].$message }}
        </p>
      </div>
    </div>
    <div class="buttons-container">
      <Button
        label="Відправити"
        icon="pi pi-check"
        autofocus
        class="p-button-info"
        type="button"
        value="Submit"
        :disabled="v$.$invalid"
        @click="createInvitation"
      />
      <Button
        label="Скасувати"
        icon="pi pi-times"
        class="p-button-outlined p-button-info"
        @click="closeCreatingInviteModal"
      />
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import useVuelidate from '@vuelidate/core';
import { StoreModuleEnum } from '@/store/types';
import { ApartmentInterface, ApartmentsActionsEnum, ApartmentsGettersEnum } from '@/apartment/store/apartments/types';
import {
  requiredValidator,
  emailValidator,
  emailMinLength,
  emailMaxLength,
  emailLastCharsValidator,
} from '@/utils/validators';
import { InvitationsActionsEnum, InvitationTypesEnum, PostInvitationInterface } from '@/invitation/store/types';
import { HousesActionsEnum, HousesGettersEnum, HouseInterface } from '@/houses/store/types';
import { CooperationGettersEnum } from '@/cooperation/store/types';

export default defineComponent({
  name: 'CreateInvitationForm',
  components: {
    Button,
    InputText,
    Dropdown,
  },
  data() {
    return {
      invitationData: {
        invitationType: [
          { name: `${InvitationTypesEnum.cooperation}`, code: 'cooperation' },
          { name: `${InvitationTypesEnum.apartment}`, code: 'apartment' },
        ],
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
  async mounted(): Promise<void> {
    try {
      await this.$store.dispatch(`${StoreModuleEnum.housesStore}/${HousesActionsEnum.SET_HOUSES}`, this.cooperationId);
    } catch {
      console.log('error was caught during mounting');
    }
  },
  methods: {
    closeCreatingInviteModal(): void {
      this.v$.$reset();
      this.resetInvitationDataFields(this.selectedData);
      this.$emit('close-invitation-modal');
    },
    async createInvitation(): Promise<void> {
      const data = {
        type: this.selectedData.selectedType,
        email: this.invitationData.email,
        cooperationId: this.cooperationId,
        apartmentId: this.apartmentId,
        role: 'admin',
      } as PostInvitationInterface;

      const address = {
        houseAddress: this.houses.filter((house: HouseInterface) => house.id === this.houseId)[0].address,
      };

      await this.$store.dispatch(`${StoreModuleEnum.invitationsStore}/${InvitationsActionsEnum.CREATE_INVITATION}`, {
        data,
        address,
      });

      this.resetInvitationDataFields(this.selectedData);
      this.$emit('close-invitation-modal');
      this.$emit('create-invitation');
    },
    resetInvitationDataFields(data: any): void {
      this.invitationData.email = '';
      for (let field in data) {
        data[field] = '';
      }
    },
    async onChangeHouse(houseId: number): Promise<void> {
      this.houseId = houseId;
      this.selectedData.selectedApartment = '';

      await this.$store.dispatch(`${StoreModuleEnum.apartmentsStore}/${ApartmentsActionsEnum.SET_APARTMENTS}`, houseId);
    },
    onChangeApartment(apartmentId: number): void {
      this.apartmentId = apartmentId;
    },
  },
  computed: {
    ...mapGetters({
      houses: `${StoreModuleEnum.housesStore}/${HousesGettersEnum.getHousesData}`,
      apartments: `${StoreModuleEnum.apartmentsStore}/${ApartmentsGettersEnum.getApartmentsData}`,
      cooperationId: `${StoreModuleEnum.cooperationStore}/${CooperationGettersEnum.getSelectedCooperationId}`,
    }),
    listOfHouses(): Array<Object> {
      return this.houses?.map((house: HouseInterface) => {
        const houseData = `вул. ${house.address.street}, будинок ${house.address.houseNumber}`;
        const houseId = house.id;
        return { houseData, houseId };
      });
    },
    listOfApartments(): Array<Object> {
      return this.apartments?.map((apartment: ApartmentInterface) => {
        const apartmentData = `кв. ${apartment.apartmentNumber}`;
        const apartmentId = apartment.id;
        return { apartmentData, apartmentId };
      });
    },
  },
});
</script>

<style lang="scss" scoped>
#create_invit_form {
  display: flex;
  flex-direction: column;
}
.input-field {
  min-height: 90px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-block: 1em;
  p {
    margin: 0;
  }
  &__wrapper {
    width: 50%;
  }
}
.buttons-container {
  display: flex;
  align-self: flex-end;
  gap: 1em;
}
</style>
