<template>
  <div class="wrapper">
    <div class="breadcrumb">
      <Breadcrumb />
    </div>
    <div class="container" v-if="isLoaded">
      <div class="coop_info">
        <div>
          <span>Назва ОСББ : </span>
          <span>{{ cooperationInfo.name }}</span>
        </div>
        <div>
          <span>Адреса : </span>
          <span>{{ this.fillAddress }}</span>
        </div>
        <div>
          <span>IBAN номер : </span>
          <span>{{ cooperationInfo.iban }}</span>
        </div>
        <div v-if="cooperationInfo.contacts[0].email">
          <span>Електрона адреса : </span>
          <span>{{ cooperationInfo.contacts[0].email }}</span>
        </div>
        <div>
          <span>Код реєстрації : </span>
          <span>{{ cooperationInfo.edrpou }}</span>
        </div>
        <div v-if="cooperationInfo.contacts[1].phone">
          <span>Номер телефону : </span>
          <span>{{ cooperationInfo.contacts[1].phone }}</span>
        </div>
      </div>

      <div class="edit_btn">
        <Button
          label="Редагувати"
          icon="pi pi-pencil"
          @click="displayModalForCooperation = true"
          class="p-button-outlined p-button-info"
        />
        <Dialog
          header="Редагувати ОСББ"
          v-model:visible="displayCooperationModal"
          :style="{ width: '580px' }"
          :modal="true"
          :closable="false"
          :dismissableMask="true"
        >
          <EditCooperationForm
            @cancel-editCoopInfo="displayModalForCooperation = false"
            @isLoadedMode="isLoaded = true"
            :cooperationId="cooperationId"
          ></EditCooperationForm>
        </Dialog>
      </div>
    </div>

    <div>
      <ManageHouses :isLoaded="isLoaded" :cooperationId="cooperationId"></ManageHouses>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import Breadcrumb from '@/components/Breadcrumb.vue';
import EditCooperationForm from '@/cooperation/components/EditCooperationForm.vue';
import ManageHouses from '@/houses/components/ManageHouses.vue';
import { CooperationActionEnum, CooperationGettersEnum } from '@/cooperation/store/types';
import { StoreModuleEnum } from '@/store/types';

export default defineComponent({
  name: 'CooperationInfo',
  components: {
    Dialog,
    Button,
    Breadcrumb,
    EditCooperationForm,
    ManageHouses,
  },
  data() {
    return {
      isLoaded: false,
      displayModalForCooperation: false,
    };
  },
  async mounted() {
    await this.$store
      .dispatch(
        `${StoreModuleEnum.cooperationStore}/${CooperationActionEnum.SET_USER_COOPERATIONS}`,
        this.cooperationId
      )
      .then(() => {
        this.isLoaded = true;
      });
  },
  computed: {
    fillAddress(): string {
      return `${this.cooperationInfo.address.street},
      ${this.cooperationInfo.address.houseNumber},
      ${this.cooperationInfo.address.houseBlock},
      ${this.cooperationInfo.address.district},
      ${this.cooperationInfo.address.city},
      ${this.cooperationInfo.address.region},
      ${this.cooperationInfo.address.zipCode} `;
    },
    ...mapGetters({
      cooperationInfo: `${StoreModuleEnum.cooperationStore}/${CooperationGettersEnum.getSelectedCooperation}`,
      cooperationId: `${StoreModuleEnum.cooperationStore}/${CooperationGettersEnum.getSelectedCooperationId}`,
    }),
    displayCooperationModal(): boolean {
      return this.displayModalForCooperation;
    },
  },
});
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  .breadcrumb {
    margin: 0 0 1em 0;
  }

  .container {
    padding: 10px;
    border-radius: 10px;
    display: flex;
    background-color: #fafafa;
    justify-content: space-between;
    box-shadow: rgba(0, 0, 0, 0.1) -1px 4px 5px 1px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
    .coop_info {
      margin: 10px;
      div {
        padding: 8px;
        & :nth-child(1) {
          font-weight: bold;
        }
      }
    }
  }
}
</style>
