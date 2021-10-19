<template>
  <div class="container">
    <div class="coop_info">
      <div>
        <span>Назва ОСББ : </span>
        <span>{{ name }}</span>
      </div>
      <div>
        <span>Адреса : </span>
        <span
          >{{ address?.city }}, {{ address?.district }}, {{ address?.street }}, {{ address?.house_block }},
          {{ address?.house_number }}
        </span>
      </div>
      <div>
        <span>IBAN номер : </span>
        <span>{{ iban }}</span>
      </div>
      <div>
        <span>Електрона адреса : </span>
        <span>{{ email }}</span>
      </div>
      <div>
        <span>Код реєстрации : </span>
        <span>{{ edrpou }}</span>
      </div>
      <div>
        <span>Номер телефону : </span>
        <span>{{ phone }}</span>
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
          <p class="p-m-0">
            <label for="coopName">Назва : </label>
            <InputText id="coopName" placeholder="Назва" v-model="name" maxlength="50" />
          </p>
          <p class="p-m-0">
            <label for="coopAddress">Адреса : </label>
            <InputText id="coopAddress" placeholder="Адреса" v-model="address.city" maxlength="250" />
          </p>
          <p class="p-m-0">
            <label for="iban">Iban номер : </label>
            <InputText id="coopIban" placeholder="iban номер" v-model="iban" maxlength="29" />
          </p>
          <p class="p-m-0">
            <label for="coopEmail">Електронна адреса : </label>
            <InputText id="coopEmail" placeholder="Електрона адреса" v-model="email" maxlength="320" />
          </p>
          <p class="p-m-0">
            <label for="edrpou">Код реєстрації : </label>
            <InputText id="edrpou" placeholder="ОСББ номер" v-model="edrpou" maxlength="8" />
          </p>
          <p class="p-m-0">
            <label for="coopPhone">Номер телефону : </label>
            <InputText id="coopPhone" placeholder="Назва" v-model="phone" maxlength="13" />
          </p>
        </form>

        <template #footer>
          <Button label="Редагувати" icon="pi pi-check" @click="editCoopInfo" autofocus class="p-button-info" />
          <Button label="Скасувати" icon="pi pi-times" @click="closeModal" class="p-button-outlined p-button-info" />
        </template>
      </Dialog>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
  CooperationInterface,
  CooperationStateInterface,
  CooperationContactsInterface,
} from '@/store/cooperation/types';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';

export default defineComponent({
  name: 'CooperationInfo',
  components: {
    Dialog,
    Button,
    InputText,
  },
  data() {
    return {
      id: 0,
      name: '',
      edrpou: '',
      iban: '',
      phone: '',
      email: '',
      address: {},
    };
  },
  mounted() {
    this.$store.dispatch('cooperationStore/SET_USER_COOPERATIONS').then(() => {
      this.initData();
    });
  },
  methods: {
    initData() {
      let cooperationInfo: CooperationInterface | null = this.$store.state.cooperationStore.selectedCooperation;
      this.id = cooperationInfo?.id ?? 0;
      this.name = cooperationInfo?.name ?? '';
      this.edrpou = cooperationInfo?.edrpou ?? '';
      this.iban = cooperationInfo?.iban ?? '';
      this.address = cooperationInfo?.address ?? {};
      cooperationInfo?.contacts.forEach((el) => this.mapContact(el));
    },
    mapContact(el: CooperationContactsInterface) {
      for (let key in el) {
        if (key == 'email') {
          this.email = el[key];
        }
        if (key == 'phone') {
          this.phone = el[key];
        }
      }
    },
    openModal() {
      this.$store.dispatch('cooperationStore/SET_MODAL_DISPLAY', true);
    },
    closeModal() {
      this.$store.dispatch('cooperationStore/SET_MODAL_DISPLAY', false);
    },
    editCoopInfo() {
      const payload = {
        id: this.id,
        name: this.name,
        edrpou: this.edrpou,
        iban: this.iban,
        address: {},
      };
      this.$store.dispatch('cooperationStore/SET_COOPERATION_UPDATE', payload);
      this.closeModal();
    },
  },
  computed: {
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
  height: 40%;
  margin: 20px 40px;
  background-color: #fafafa;
  justify-content: space-between;
}

.coop_info {
  margin: 15px;
}

.coop_info div {
  padding: 10px;
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
</style>

function getContacts() { throw new Error('Function not implemented.'); }
