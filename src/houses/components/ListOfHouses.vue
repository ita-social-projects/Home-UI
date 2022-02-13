<template>
  <div>
    <DataTable
      ref="dt"
      :value="this.$props.isLoaded ? housesInfo : []"
      selectionMode="single"
      v-model:selection="selectedHouse"
      dataKey="houses.id"
      @rowSelect="onRowSelect"
      responsiveLayout="scroll"
    >
      <template #header>
        <h4>Будинки в цьому ОСББ</h4>
      </template>
      <Column field="flatQuantity" style="min-width: 15rem" header="Кількість квартир в будинку" :sortable="true" />
      <Column field="houseArea" style="min-width: 15rem" header="Площа будинку" :sortable="true" />
      <Column field="adjoiningArea" style="min-width: 15rem" header="Прибудинкової теріторії" :sortable="true" />
      <Column field="address" style="min-width: 20rem" header="Адреса" :sortable="true">
        <template #body="slotProps">
          {{ slotProps.data.address.region }}, {{ slotProps.data.address.city }}, {{ slotProps.data.address.district }},
          {{ slotProps.data.address.street }}, {{ slotProps.data.address.houseBlock }},
          {{ slotProps.data.address.houseNumber }},
          {{ slotProps.data.address.zipCode }}
        </template>
      </Column>

      <Column>
        <template #body="slotProps">
          <Button
            icon="pi pi-pencil"
            class="p-button p-button-info p-button-text"
            type="button"
            @click="toggleOptions($event, slotProps.data)"
            aria-haspopup="true"
            aria-controls="overlay_menu"
            ref="button"
          />
          <Menu :model="houseActions()" id="overlay_menu" ref="menu" :popup="true" />

          <ConfirmPopup></ConfirmPopup>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { mapGetters } from 'vuex';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Menu from 'primevue/menu';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import ConfirmPopup from 'primevue/confirmpopup';
import { StoreModuleEnum } from '@/store/types';
import { HousesActionsEnum, HousesGettersEnum } from '@/houses/store/types';
import { HouseModel } from '@/houses/models/house.model';
import { AddressModel } from '@/houses/models/address.model';

export default defineComponent({
  name: 'ListOfHouses',
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
  components: {
    DataTable,
    Dialog,
    Column,
    ConfirmPopup,
    Menu,
    Button,
  },
  data() {
    return {
      houseActions: () => {
        return [
          {
            label: 'Видалити',
            icon: 'pi pi-times',
            type: 'Submit',
            command: () => {
              this.confirmDeleteHouse(event as Event);
            },
          },
          {
            label: 'Редагувати',
            icon: 'pi pi-user-edit',
            command: () => {
              this.openEditHouseModal();
            },
          },
        ];
      },

      selectedHouse: ref(),

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
    };
  },
  methods: {
    onRowSelect() {
      this.chosenHouse();
    },
    chosenHouse() {
      this.$router.push({
        name: 'manage-apartment',
        params: { id: this.selectedHouse.id },
      });
    },
    confirmDeleteHouse(event: Event) {
      this.$confirm.require({
        target: event.currentTarget,
        message: 'Видалити обраний будинок?',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Так',
        rejectLabel: 'Ні',
        accept: async () => {
          const payload = {
            cooperationId: this.$props.cooperationId,
            id: this.house.id,
          };
          await this.$store.dispatch(`${StoreModuleEnum.housesStore}/${HousesActionsEnum.DELETE_HOUSE}`, payload);
          this.showSuccessDelete();
        },
        reject: () => {
          console.log('rejected delete');
        },
      });
    },
    toggleOptions(event: any, slotProps: any) {
      const { id, flatQuantity, houseArea, adjoiningArea, address } = slotProps;
      this.house.id = id;
      this.house.flatQuantity = flatQuantity;
      this.house.houseArea = houseArea;
      this.house.adjoiningArea = adjoiningArea;
      this.house.address = { ...address };
      (this.$refs.menu as any).toggle(event);

      this.$emit('houseData', this.house);
    },
    showSuccessDelete() {
      this.$toast.add({
        severity: 'success',
        summary: 'Успішно',
        detail: `Будинок з ID ${this.house.id} успішно видалено`,
        life: 3000,
      });
    },
    openEditHouseModal() {
      this.$emit('open-edit-house-modal');
    },
  },
  computed: {
    ...mapGetters({
      housesInfo: `${StoreModuleEnum.housesStore}/${HousesGettersEnum.getHousesData}`,
    }),
  },
});
</script>
