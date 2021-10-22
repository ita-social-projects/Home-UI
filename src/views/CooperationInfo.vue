<template>
  <div class="container" v-if="isLoaded">
    <div class="coop_info">
      <div>
        <span>Назва ОСББ : </span>
        <span>{{ cooperationData.name }}</span>
      </div>
      <div>
        <span>Адреса : </span>
        <span>{{ this.fillAddress }}</span>
      </div>
      <div>
        <span>IBAN номер : </span>
        <span>{{ cooperationData.iban }}</span>
      </div>
      <div v-if="cooperationData.email">
        <span>Електрона адреса : </span>
        <span>{{ cooperationData.email }}</span>
      </div>
      <div>
        <span>Код реєстрации : </span>
        <span>{{ cooperationData.edrpou }}</span>
      </div>
      <div v-if="cooperationData.phone">
        <span>Номер телефону : </span>
        <span>{{ cooperationData.phone }}</span>
      </div>
    </div>

    <div class="edit_btn">
      <Button label="Редагувати" icon="pi pi-pencil" @click="openModal" class="p-button-outlined p-button-info" />
      <Dialog
        header="Редагувати ОСББ"
        v-model:visible="displayModal"
        :style="{ width: '50vw' }"
        :modal="true"
        :closable="false"
        :dismissableMask="true"
      >
        <form @submit.prevent="editCoopInfo">
          <p>
            <label for="coopName">Назва : </label>
            <InputText
              id="coopName"
              placeholder="Назва"
              v-model.trim="cooperationData.name"
              :class="{ 'p-invalid': v$.cooperationData.name.$error }"
              @blur="v$.cooperationData.name.$touch()"
            />

            <small v-if="v$.cooperationData.name.$error" class="p-error">{{
              v$.cooperationData.name.$errors[0].$message
            }}</small>
          </p>

          <p>
            <label for="iban">Iban номер : </label>
            <InputText
              id="coopIban"
              placeholder="iban номер"
              v-model="cooperationData.iban"
              :class="{ 'p-invalid': v$.cooperationData.iban.$error }"
              @blur="v$.cooperationData.iban.$touch()"
            />
            <small v-if="v$.cooperationData.iban.$error" class="p-error">{{
              v$.cooperationData.iban.$errors[0].$message
            }}</small>
          </p>
          <p>
            <label for="coopEmail">Електронна адреса : </label>
            <InputText id="coopEmail" placeholder="Електрона адреса" v-model.trim="cooperationData.email" />
            <!-- <small v-if="v$.cooperationData.email.$error" 
            class="p-error">{{ v$.email.$errors[0].$message }}</small> -->
            <!--maxlength="320"
              -->
            <!-- @blur="v$.cooperationData.email.$touch()"
              :class="{ 'p-invalid': v$.cooperationData.email.$error }" -->
          </p>
          <p>
            <label for="edrpou">Код реєстрації : </label>
            <InputText id="edrpou" placeholder="ОСББ номер" v-model="cooperationData.edrpou" maxlength="8" />
          </p>
          <p>
            <label for="coopPhone">Номер телефону : </label>
            <InputText id="coopPhone" placeholder="+38 011 222 33 00" v-model="cooperationData.phone" maxlength="13" />
          </p>
          <div>
            Адреса
            <p>
              <label for="coopAddress">регіон : </label>
              <InputText
                id="coopAddress"
                placeholder="регіон"
                v-model="cooperationData.address.region"
                maxlength="50"
              />
            </p>
            <p>
              <label for="coopAddress">місто : </label>
              <InputText id="coopAddress" placeholder="місто" v-model="cooperationData.address.city" maxlength="50" />
            </p>
            <p>
              <label for="coopAddress">район : </label>
              <InputText
                id="coopAddress"
                placeholder="район"
                v-model="cooperationData.address.district"
                maxlength="50"
              />
            </p>
            <p>
              <label for="coopAddress">вулиця : </label>
              <InputText
                id="coopAddress"
                placeholder="вулиця"
                v-model="cooperationData.address.street"
                maxlength="50"
              />
            </p>
            <p>
              <label for="coopAddress">номер будинку : </label>
              <InputText
                id="coopAddress"
                placeholder="номер будинку"
                v-model="cooperationData.address.houseNumber"
                maxlength="10"
              />
            </p>
            <p>
              <label for="coopAddress">блок : </label>
              <InputText
                id="coopAddress"
                placeholder="блок"
                v-model="cooperationData.address.houseBlock"
                maxlength="10"
              />
            </p>
            <p>
              <label for="coopAddress">індекс : </label>
              <InputText
                id="coopAddress"
                placeholder="індекс"
                v-model="cooperationData.address.zipCode"
                maxlength="5"
              />
            </p>
          </div>
        </form>

        <template #footer>
          <Button label="Редагувати" icon="pi pi-check" @click="editCoopInfo" autofocus class="p-button-info" />
          <Button label="Скасувати" icon="pi pi-times" @click="cancel" class="p-button-outlined p-button-info" />
        </template>
      </Dialog>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
  CooperationStateInterface,
  CooperationContactsInterface,
  CooperationAddressInterface,
} from '@/store/cooperation/types';
import useVuelidate from '@vuelidate/core';
import {
  edrpouValidator,
  emailLastCharsValidator,
  emailMaxLength,
  emailMinLength,
  emailValidator,
  requiredValidator,
  nameLenghtValidator,
  сooperationNameValidator,
  ibanValidator,
} from '@/utils/validators';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import { CooperationModel } from '@/store/cooperation/models/cooperation.model';

export default defineComponent({
  name: 'CooperationInfo',
  components: {
    Dialog,
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
        // contacts: [] as Array<CooperationContactsInterface>,
      },
      isLoaded: false,
      v$: useVuelidate(),
    };
  },
  validations() {
    return {
      cooperationData: {
        name: {
          requiredValidator,
          сooperationNameValidator,
          nameLenghtValidator,
        },
        edrpou: { requiredValidator, edrpouValidator },
        iban: { requiredValidator, ibanValidator },
        phone: {},
        email: {
          requiredValidator,
          emailMinLength,
          emailLastCharsValidator,
          emailValidator,
          emailMaxLength,
        },
        address: {
          city: {},
        },
      },
    };
  },
  async mounted() {
    await Promise.all([this.$store.dispatch('cooperationStore/SET_USER_COOPERATIONS')]).then(() => {
      this.initData();
      this.isLoaded = true;
    });
  },

  methods: {
    initData() {
      let cooperationInfo: CooperationModel | null = this.$store.state.cooperationStore.selectedCooperation;
      this.cooperationData.id = cooperationInfo?.id ?? 0;
      this.cooperationData.name = cooperationInfo?.name ?? '';
      this.cooperationData.edrpou = cooperationInfo?.edrpou ?? '';
      this.cooperationData.iban = cooperationInfo?.iban ?? '';
      this.cooperationData.address = cooperationInfo?.address ?? ({} as CooperationAddressInterface);
      // this.cooperationData.contacts = cooperationInfo?.contacts ?? ([] as Array<CooperationContactsInterface>);
      cooperationInfo?.contacts.forEach((el) => this.mapContact(el));
      // this.cooperationData.contacts.forEach((el) => this.mapContact(el));
    },
    mapContact(el: CooperationContactsInterface) {
      if (el.main === true) {
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
    openModal() {
      this.$store.dispatch('cooperationStore/SET_MODAL_DISPLAY', true);
    },
    closeModal() {
      this.$store.dispatch('cooperationStore/SET_MODAL_DISPLAY', false);
    },
    cancel() {
      this.initData();
      this.cooperationData.email = '';
      this.cooperationData.phone = '';
      this.closeModal();
    },
    editCoopInfo() {
      // : CooperationInterface
      const payload = {
        id: this.cooperationData.id,
        name: this.cooperationData.name,
        edrpou: this.cooperationData.edrpou,
        iban: this.cooperationData.iban,
        address: this.cooperationData.address,
        contacts: [
          { type: 'email', main: true, email: this.cooperationData.email },
          { type: 'phone', main: true, phone: this.cooperationData.phone },
        ],
      };
      console.log(payload, 'payload component');
      this.$store.dispatch('cooperationStore/SET_COOPERATION_UPDATE', payload);
      this.closeModal();
    },
  },
  computed: {
    fillAddress(): string {
      return `${this.cooperationData.address.street}, 
      ${this.cooperationData.address.houseNumber},
      ${this.cooperationData.address.houseBlock}, 
      ${this.cooperationData.address.district},
      ${this.cooperationData.address.city},
      ${this.cooperationData.address.region},       
      ${this.cooperationData.address.zipCode} `;
    },
    cooperationInfo(): CooperationStateInterface {
      return this.$store.state.cooperationStore;
    },
    displayModal(): boolean {
      return this.$store.state.cooperationStore.displayModal;
    },
  },
});
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  padding: 10px;
  border-radius: 10px;
  background-color: #fafafa;
  justify-content: space-between;
  box-shadow: rgba(0, 0, 0, 0.1) -1px 4px 5px 1px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
}

.coop_info {
  margin: 10px;
}

.coop_info div {
  padding: 8px;
  & :nth-child(1) {
    font-weight: bold;
  }
}

.edit_btn {
  margin: 15px;
}

label {
  display: inline-block;
  width: 160px;
}

small {
  display: block;
  text-align: center;
  margin-top: 10px;
}
</style>
