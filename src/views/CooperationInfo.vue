<template>
  <div class="container">
    <div class="coop_info">
      <div>
        <span><b>Назва ОСББ : </b></span>
        <span>{{ cooperationInfo.name }}</span>
      </div>

      <div>
        <span><b>Номер ОСББ : </b></span>
        <span>{{ cooperationInfo.erdpou }}</span>
      </div>
      <div>
        <span><b>Адреса: </b></span>
        <span>{{ cooperationInfo.erdpou }}</span>
      </div>

      <div>
        <span><b>IBAN номер : </b></span>
        <span>{{ cooperationInfo.erdpou }}</span>
      </div>

      <div>
        <span><b>Електрона адреса : </b></span>
        <span>{{ cooperationInfo.erdpou }}</span>
      </div>

      <div>
        <span><b>Номер телефону : </b></span>
        <span>{{ cooperationInfo.erdpou }}</span>
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
            <label for="coopName">Назва :</label>
            <InputText id="coopName" placeholder="Назва" v-model="name" maxlength="50" />
          </p>
          <p class="p-m-0">
            <label for="edrpou">ОСББ номер :</label>
            <InputText id="edrpou" placeholder="номер ОСББ" v-model="erdpou" maxlength="8" />
          </p>
          <p class="p-m-0">
            <label for="iban">iban номер :</label>
            <InputText id="iban" placeholder="iban" v-model="cooperationInfo.iban" maxlength="8" />
          </p>

          <p class="p-m-0">
            <label for="edrpou">adress :</label>
            <InputText id="edrpou" placeholder="номер ОСББ" v-model="cooperationInfo" maxlength="50" />
          </p>
          <div><b>...state.cooperationStore : </b>{{ this.$store.state.cooperationStore }}</div>
          <div><b>coopInfo function: </b>{{ cooperationInfo }}</div>

          {{ this.$data.name }}
          <br />
          <!-- {{editCoopInfo().name}} -->

          <!-- end -->
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
import { CooperationInterface, CooperationStateInterface } from '@/store/cooperation/types';
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
      name: '',
      erdpou: '',
      iban: '',
      houses: [],
      contacts: [],
      address: [],
    };
  },
  mounted() {
    let basicCooperationInfo: CooperationInterface | null = this.$store.state.cooperationStore.selectedCooperation;
    this.name = basicCooperationInfo?.name ?? '';
    this.erdpou = basicCooperationInfo?.erdpou ?? '';
    this.iban = basicCooperationInfo?.iban ?? '';
  },
  methods: {
    openModal() {
      this.$store.dispatch('cooperationStore/SET_MODAL_DISPLAY', true);
    },
    closeModal() {
      this.$store.dispatch('cooperationStore/SET_MODAL_DISPLAY', false);
    },
    editCoopInfo() {
      // const payload = {
      //   name: this.name,
      //   erdpou: this.erdpou,
      //   iban: this.iban,
      //   houses: [],
      //   contacts: [],
      //   address: [],
      // };
      // this.$store.dispatch('cooperationStore/SET_COOPERATION_UPDATE_INFO', payload);
      this.closeModal();
    },
  },
  created() {
    this.$store.dispatch('cooperationStore/SET_COOPERATION_INFO');
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
  padding: 5px;
}

.edit_btn {
  margin: 15px;
}

label {
  display: inline-block;
  width: 160px;
}
</style>
