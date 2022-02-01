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
          @click="this.displayModalForCooperation = true"
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
            :cooperationId="cooperationData.id"
          ></EditCooperationForm>
        </Dialog>
      </div>
    </div>

    <div class="add_btn">
      <Button
        label="Додати будинок"
        icon="pi pi-pencil"
        class="p-button-outlined p-button-info"
        @click="this.displayModalForAddHouse = true"
      />
      <Dialog
        header="Додати будинок"
        v-model:visible="displayAddHouseModal"
        :style="{ width: '580px' }"
        :modal="true"
        :closable="false"
        :dismissableMask="true"
      >
        <AddHouseForm :id="cooperationData.id" @cancel-addHouseModal="displayModalForAddHouse = false"></AddHouseForm>
      </Dialog>
    </div>

    <div class="container container-houses">
      <ListOfHouses
        :isLoaded="isLoaded"
        :cooperationId="cooperationData.id"
        @open-edit-house-modal="displayModalForEditHouse = true"
        @houseData="catchHouseData"
      ></ListOfHouses>
    </div>

    <Dialog
      header="Редагувати будинок"
      v-model:visible="displayEditHouseModal"
      :style="{ width: '580px' }"
      :modal="true"
      :closable="false"
      :dismissableMask="true"
    >
      <EditHouseForm
        :cooperationId="cooperationData.id"
        :propsHouseData="this.house"
        @house-saved="displayModalForEditHouse = false"
        @cancel-editing="displayModalForEditHouse = false"
      ></EditHouseForm
    ></Dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import Breadcrumb from '@/components/Breadcrumb.vue';
import AddHouseForm from '@/components/AddHouseForm.vue';
import EditCooperationForm from '@/components/EditCooperationInfo.vue';
import EditHouseForm from '@/components/EditHouseForm.vue';
import ListOfHouses from '@/components/ListOfHouses.vue';
import { CooperationActionEnum, CooperationGettersEnum } from '@/store/cooperation/types';
import { HousesActionsEnum } from '@/store/houses/types';
import { StoreModuleEnum } from '@/store/types';
import { HouseModel } from '@/shared/models/house.model';
import { AddressModel } from '@/shared/models/address.model';

export default defineComponent({
  name: 'CooperationInfo',
  components: {
    Dialog,
    Button,
    Breadcrumb,
    AddHouseForm,
    EditCooperationForm,
    EditHouseForm,
    ListOfHouses,
  },
  data() {
    return {
      cooperationData: {
        id: 0,
      },

      house: {
        id: 0,
        flatQuantity: 0,
        houseArea: 0,
        adjoiningArea: 0,
        address: {
          region: '',
          city: '',
          district: '',
          street: '',
          houseBlock: '',
          houseNumber: '',
          zipCode: '',
        } as AddressModel,
      } as HouseModel,

      isLoaded: false,
      displayModalForEditHouse: false,
      displayModalForCooperation: false,
      displayModalForAddHouse: false,
    };
  },

  async mounted() {
    this.cooperationData.id = this.cooperationInfo?.id ?? 1;

    await Promise.all([
      this.$store.dispatch(
        `${StoreModuleEnum.cooperationStore}/${CooperationActionEnum.SET_USER_COOPERATIONS}`,
        this.cooperationData.id
      ),
      this.$store.dispatch(`${StoreModuleEnum.housesStore}/${HousesActionsEnum.SET_HOUSES}`, this.cooperationData.id),
    ]).then(() => {
      this.isLoaded = true;
    });
  },
  methods: {
    catchHouseData(house: HouseModel) {
      this.house = house;
    },
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
    displayCooperationModal(): boolean {
      return this.displayModalForCooperation;
    },
    displayEditHouseModal(): boolean {
      return this.displayModalForEditHouse;
    },
    displayAddHouseModal(): boolean {
      return this.displayModalForAddHouse;
    },
    ...mapGetters({
      cooperationInfo: `${StoreModuleEnum.cooperationStore}/${CooperationGettersEnum.getSelectedCooperation}`,
    }),
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
}

.container {
  padding: 10px;
  border-radius: 10px;
  display: flex;
  background-color: #fafafa;
  justify-content: space-between;
  &.container-houses {
    padding: 1px;
    margin-bottom: 150px;
  }
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

.add_btn {
  display: flex;
  margin: 15px;
  justify-content: flex-end;
}
.address-details {
  margin-left: 2rem;
  .dialog-item-address {
    margin-right: -2rem;
  }
}
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
</style>
