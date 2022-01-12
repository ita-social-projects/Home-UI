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
      <DataTable
        ref="dt"
        :value="isLoaded ? housesInfo : []"
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
            {{ slotProps.data.address.region }}, {{ slotProps.data.address.city }},
            {{ slotProps.data.address.district }}, {{ slotProps.data.address.street }},
            {{ slotProps.data.address.houseBlock }}, {{ slotProps.data.address.houseNumber }},
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
import { defineComponent, ref } from 'vue';
import { mapGetters } from 'vuex';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Menu from 'primevue/menu';
import ConfirmPopup from 'primevue/confirmpopup';
import Breadcrumb from '@/components/Breadcrumb.vue';
import AddHouseForm from '@/components/AddHouseForm.vue';
import EditCooperationForm from '@/components/EditCooperationInfo.vue';
import EditHouseForm from '@/components/EditHouseForm.vue';
import { CooperationActionEnum, CooperationGettersEnum } from '@/store/cooperation/types';
import { HousesActionsEnum, HousesGettersEnum } from '@/store/houses/types';
import { StoreModuleEnum } from '@/store/types';
import useVuelidate from '@vuelidate/core';
import { HouseModel } from '@/shared/models/house.model';
import { AddressModel } from '@/shared/models/address.model';

export default defineComponent({
  name: 'CooperationInfo',
  components: {
    Dialog,
    Button,
    Breadcrumb,
    DataTable,
    Column,
    Menu,
    ConfirmPopup,
    AddHouseForm,
    EditCooperationForm,
    EditHouseForm,
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
              this.confirmDeleteHouse(event);
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
      cooperationData: {
        id: 0,
      },
      isLoaded: false,
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
      displayModalForEditHouse: false,
      displayModalForCooperation: false,
      displayModalForAddHouse: false,
      v$: useVuelidate(),
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
    this.houses = Object.assign({}, this.housesInfo);
  },
  methods: {
    onRowSelect() {
      this.choosenHouse();
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
            cooperationId: this.cooperationData.id,
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
    openEditHouseModal() {
      this.displayModalForEditHouse = true;
    },
    toggleOptions(event: any, slotProps: any) {
      const { id, flatQuantity, houseArea, adjoiningArea, address } = slotProps;
      this.house.id = id;
      this.house.flatQuantity = flatQuantity;
      this.house.houseArea = houseArea;
      this.house.adjoiningArea = adjoiningArea;
      this.house.address = { ...address };
      (this.$refs.menu as any).toggle(event);
    },
    showSuccessDelete() {
      this.$toast.add({
        severity: 'success',
        summary: 'Успішно',
        detail: `Будинок з ID ${this.house.id} успішно видалено`,
        life: 3000,
      });
    },
    choosenHouse() {
      this.$router.push({
        name: 'manage-apartment',
        params: { id: this.selectedHouse.id },
      });
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
      housesInfo: `${StoreModuleEnum.housesStore}/${HousesGettersEnum.getHousesData}`,
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
