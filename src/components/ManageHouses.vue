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
      <AddHouseForm :id="cooperationData.id" @cancel-addHouseModal="displayModalForAddHouse = false"></AddHouseForm>
    </Dialog>
  </div>

  <div class="container container-houses">
    <ListOfHouses
      :isLoaded="$props.isLoaded"
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
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import EditHouseForm from '@/components/EditHouseForm.vue';
import ListOfHouses from '@/components/ListOfHouses.vue';
import AddHouseForm from '@/components/AddHouseForm.vue';
import { HouseModel } from '@/shared/models/house.model';
import { AddressModel } from '@/shared/models/address.model';

export default defineComponent({
  name: 'ManageHouses',
  components: {
    Dialog,
    Button,
    EditHouseForm,
    ListOfHouses,
    AddHouseForm,
  },
  props: {
    isLoaded: {
      type: Boolean,
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
      displayModalForCooperation: false,
    };
  },
  methods: {
    catchHouseData(house: HouseModel) {
      this.house = house;
    },
  },
  computed: {
    displayCooperationModal(): boolean {
      return this.displayModalForCooperation;
    },
    displayEditHouseModal(): boolean {
      return this.displayModalForEditHouse;
    },
    displayAddHouseModal(): boolean {
      return this.displayModalForAddHouse;
    },
  },
});
</script>

<style></style>
