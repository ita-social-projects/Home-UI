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
      <ManageHouseForm :cooperationId="$props.cooperationId" @cancel-managing="displayModalForAddHouse = false" />
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
    <ManageHouseForm
      :cooperationId="$props.cooperationId"
      :houseData="this.house"
      @cancel-managing="displayModalForEditHouse = false"
    />
  </Dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import ListOfHouses from '@/houses/components/ListOfHouses.vue';
import { HouseInterface, AddressInterface, HousesActionsEnum } from '@/houses/store/types';
import { StoreModuleEnum } from '@/store/types';
import ManageHouseForm from '@/houses/components/ManageHouseForm.vue';

export default defineComponent({
  name: 'ManageHouses',
  components: {
    Dialog,
    Button,
    ListOfHouses,
    ManageHouseForm,
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
        } as AddressInterface,
      } as HouseInterface,

      displayModalForAddHouse: false,
      displayModalForEditHouse: false,
    };
  },
  mounted() {
    this.$store.dispatch(`${StoreModuleEnum.housesStore}/${HousesActionsEnum.SET_HOUSES}`, this.$props.cooperationId);
  },
  methods: {
    catchHouseData(house: HouseInterface) {
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
