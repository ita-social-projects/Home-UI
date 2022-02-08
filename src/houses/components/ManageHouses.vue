<template>
  <div class="add_btn">
    <Button
      label="Додати будинок"
      icon="pi pi-pencil"
      class="p-button-outlined p-button-info"
      @click="displayModalForAddHouse = true"
    />
    <Dialog
      header="Додати будинок"
      v-model:visible="displayAddHouseModal"
      :style="{ width: '580px' }"
      :modal="true"
      :closable="false"
      :dismissableMask="true"
    >
      <ManagingHouseForm
        :cooperationId="$props.cooperationId"
        :isAddHouse="true"
        @cancel-managing="displayModalForAddHouse = false"
      ></ManagingHouseForm>
    </Dialog>
  </div>

  <div class="container container-houses">
    <ListOfHouses
      :isLoaded="$props.isLoaded"
      :cooperationId="$props.cooperationId"
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
    <ManagingHouseForm
      :cooperationId="$props.cooperationId"
      :houseData="this.house"
      :isEditHouse="true"
      @cancel-managing="displayModalForEditHouse = false"
    ></ManagingHouseForm>
  </Dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import ListOfHouses from '@/houses/components/ListOfHouses.vue';
import { HouseModel } from '@/houses/models/house.model';
import { AddressModel } from '@/houses/models/address.model';
import { HousesActionsEnum } from '@/houses/store/types';
import { StoreModuleEnum } from '@/store/types';
import ManagingHouseForm from '@/houses/components/ManagingHouseForm.vue';

export default defineComponent({
  name: 'ManageHouses',
  components: {
    Dialog,
    Button,
    ListOfHouses,
    ManagingHouseForm,
  },
  props: {
    isLoaded: {
      type: Boolean,
      required: true,
    },
    cooperationId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
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

      displayModalForAddHouse: false,
      displayModalForEditHouse: false,
    };
  },
  mounted() {
    this.$store.dispatch(`${StoreModuleEnum.housesStore}/${HousesActionsEnum.SET_HOUSES}`, this.$props.cooperationId);
  },
  methods: {
    catchHouseData(house: HouseModel) {
      this.house = house;
    },
  },
  computed: {
    displayEditHouseModal(): boolean {
      return this.displayModalForEditHouse;
    },
    displayAddHouseModal(): boolean {
      return this.displayModalForAddHouse;
    },
  },
});
</script>

<style>
.container-houses {
  padding: 1px;
  margin-bottom: 150px;
}

.edit_btn {
  margin: 15px;
}

.add_btn {
  display: flex;
  margin: 15px;
  justify-content: flex-end;
}
</style>
