<template>
  <div class="wrapper">
    <div class="breadcrumb">
      <Breadcrumb />
    </div>
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
        <Button
          label="Редагувати"
          icon="pi pi-pencil"
          @click="openCooperationModal"
          class="p-button-outlined p-button-info"
        />
        <Dialog
          header="Редагувати ОСББ"
          v-model:visible="displayCooperationModal"
          :style="{ width: '550px' }"
          :modal="true"
          :closable="false"
          :dismissableMask="true"
        >
          <form @submit.prevent="editCoopInfo">
            <p>
              <label for="coopName">Назва : </label>
              <InputText id="coopName" placeholder="Назва" v-model="cooperationData.name" />
            </p>
            <p>
              <label for="iban">Iban номер : </label>
              <InputText id="coopIban" placeholder="iban номер" v-model="cooperationData.iban" />
            </p>
            <p>
              <label for="coopEmail">Електронна адреса : </label>
              <InputText id="coopEmail" placeholder="Електрона адреса" v-model.trim="cooperationData.email" />
            </p>
            <p>
              <label for="edrpou">Код реєстрації : </label>
              <InputText id="edrpou" placeholder="ОСББ номер" v-model="cooperationData.edrpou" maxlength="8" />
            </p>
            <p>
              <label for="coopPhone">Номер телефону : </label>
              <InputText
                id="coopPhone"
                placeholder="+38 000 000 00 00"
                v-model="cooperationData.phone"
                maxlength="13"
              />
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
            <Button
              label="Скасувати"
              icon="pi pi-times"
              @click="cancelCooperationEdit"
              class="p-button-outlined p-button-info"
            />
          </template>
        </Dialog>
      </div>
    </div>

    <div class="add_btn">
      <Button label="Додати будинок" icon="pi pi-pencil" class="p-button-outlined p-button-info" />
    </div>

    <div class="container container-houses">
      <DataTable ref="dt" :value="isLoaded ? houses : []" dataKey="houses.id" v-model:selection="selectedHouse">
        <template #header>
          <h4>Будинки в цьому ОСББ</h4>
        </template>
        <Column field="quantity_flat" style="min-width: 20rem" header="Кількість квартир в будинку" :sortable="true" />
        <Column field="house_area" style="min-width: 20rem" header="Площа будинку" :sortable="true" />
        <Column field="adjoining_area" style="min-width: 20rem" header="Прибудинкової теріторії" :sortable="true" />
        <Column field="address" style="min-width: 20rem" header="Адреса" :sortable="true">
          <template #body="slotProps">
            {{ slotProps.data.address.region }}, {{ slotProps.data.address.city }}, {{ slotProps.data.address.city }},
            {{ slotProps.data.address.district }}, {{ slotProps.data.address.street }},
            {{ slotProps.data.address.house_block }}, {{ slotProps.data.address.house_number }},
            {{ slotProps.data.address.zip_code }}
          </template>
        </Column>
        <Column>
          <template #body="slotProps">
            <Button
              icon="pi pi-pencil"
              class="p-button p-button-info p-button-text"
              type="button"
              @click="toggle"
              aria-haspopup="true"
              aria-controls="overlay_menu"
            />
            <Menu :model="houseActions" id="overlay_menu" ref="menu" :popup="true" />
            <Dialog
              header="Редагувати будинок"
              v-model:visible="displayHouseModal"
              :style="{ width: '50vw' }"
              :modal="true"
              :closable="false"
              :dismissableMask="true"
            >
              <form @submit.prevent="editHouseInfo">
                <p>
                  <label class="dialog-item" for="coopName">Кількість квартир в будинку : </label>
                  <InputText id="quantityFlat" placeholder="Кількість квартир в будинку" v-model="quantity_flat" />
                </p>
                <p>
                  <label class="dialog-item" for="coopAddress">Площа будинку : </label>
                  <InputText id="houseArea" placeholder="Площа будинку" v-model="house_area" />
                </p>
                <p>
                  <label class="dialog-item" for="iban">Прибудинкової теріторії : </label>
                  <InputText id="adjoiningArea" placeholder="Прибудинкової теріторії" v-model="adjoining_area" />
                </p>
                <p>
                  <label class="dialog-item" for="coopEmail">Адреса : </label>
                  <InputText id="coopEmail" placeholder="Адреса" v-model="address.city" />
                </p>
              </form>

              <template #footer>
                <Button
                  label="Редагувати"
                  icon="pi pi-check"
                  @click="editHouseInfo(slotProps.data)"
                  autofocus
                  class="p-button-info"
                />
                <Button
                  label="Скасувати"
                  icon="pi pi-times"
                  @click="closeEditHouseModal"
                  class="p-button-outlined p-button-info"
                />
              </template>
            </Dialog>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Menu from 'primevue/menu';
import Breadcrumb from '@/components/Breadcrumb.vue';
import { CooperationModel } from '@/store/cooperation/models/cooperation.model';
import { CooperationAddressInterface, CooperationContactsInterface } from '@/store/cooperation/types';
import { HouseInterface } from '@/store/houses/types';
import { StoreModuleEnum } from '@/store/types';

export default defineComponent({
  name: 'CooperationInfo',
  components: {
    Dialog,
    Button,
    InputText,
    Breadcrumb,
    DataTable,
    Column,
    Menu,
  },
  data() {
    return {
      houseActions: [
        {
          label: 'Видалити',
          icon: 'pi pi-times',
          command: () => {
            this.confirmDeleteHouse();
          },
        },
        {
          label: 'Редагувати',
          icon: 'pi pi-user-edit',
          command: () => {
            this.openEditHouseModal();
          },
        },
      ],
      selectedHouse: null,
      houses: [] as Array<HouseInterface>,
      id: 0,
      name: '',
      edrpou: '',
      iban: '',
      phone: '',
      email: '',
      address: {},
      cooperationData: {
        id: 0,
        name: '',
        edrpou: '',
        iban: '',
        phone: '',
        email: '',
        address: {} as CooperationAddressInterface,
      },
      isLoaded: false,
    };
  },
  async mounted() {
    await Promise.all([
      this.$store.dispatch('cooperationStore/SET_USER_COOPERATIONS'),
      this.$store.dispatch('housesStore/SET_HOUSES'),
    ]).then(() => {
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
      this.cooperationData.address = JSON.parse(
        JSON.stringify(cooperationInfo?.address ?? ({} as CooperationAddressInterface))
      );
      cooperationInfo?.contacts.forEach((el) => this.mapContact(el));
      this.houses = this.housesInfo;
    },
    mapContact(el: CooperationContactsInterface) {
      if (el.main) {
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
    openCooperationModal() {
      this.$store.dispatch(`${StoreModuleEnum.cooperationStore}/SET_MODAL_DISPLAY`, true);
    },
    closeCooperationModal() {
      this.$store.dispatch(`${StoreModuleEnum.cooperationStore}/SET_MODAL_DISPLAY`, false);
    },
    openEditHouseModal() {
      this.$store.dispatch(`${StoreModuleEnum.cooperationStore}/SET_MODAL_DISPLAY`, true);
    },
    closeEditHouseModal() {
      this.$store.dispatch(`${StoreModuleEnum.cooperationStore}/SET_MODAL_DISPLAY`, false);
    },
    cancelCooperationEdit() {
      this.initData();
      this.closeCooperationModal();
    },
    editCoopInfo() {
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
      this.$store.dispatch(`${StoreModuleEnum.cooperationStore}/SET_COOPERATION_UPDATE`, payload);
      this.closeCooperationModal();
    },
    editHouseInfo(house: HouseInterface) {
      const payload = {
        id: house.id,
        quantity_flat: house.quantity_flat,
        house_area: house.house_area,
        adjoining_area: house.adjoining_area,
        address: house.address,
      };
      this.$store.dispatch(`${StoreModuleEnum.housesStore}/EDIT_HOUSE`, payload);
      this.closeEditHouseModal();
    },
    toggle(event: Event) {
      (this.$refs.menu as any).toggle(event);
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
    displayCooperationModal(): boolean {
      return this.$store.state.cooperationStore.displayModal;
    },
    displayHouseModal(): boolean {
      return this.$store.state.housesStore.displayModal;
    },
    housesInfo(): Array<HouseInterface> {
      return this.$store.getters[`${StoreModuleEnum.cooperationStore}/getHousesData`];
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

label {
  display: inline-block;
  width: 260px;
}
</style>
