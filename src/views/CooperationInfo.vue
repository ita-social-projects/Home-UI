<template>
  <div class="wrapper">
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
        <Button
          label="Редагувати"
          icon="pi pi-pencil"
          @click="openCooperationModal"
          class="p-button-outlined p-button-info"
        />
        <Dialog
          header="Редагувати ОСББ"
          v-model:visible="displayCooperationModal"
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
            <Button
              label="Скасувати"
              icon="pi pi-times"
              @click="closeCooperationModal"
              class="p-button-outlined p-button-info"
            />
          </template>
        </Dialog>
      </div>
    </div>

    <div class="add_btn">
      <Button label="Додати будинок" icon="pi pi-pencil" @click="addHouse" class="p-button-outlined p-button-info" />
    </div>

    <div class="container container-houses">
      <DataTable ref="dt" :value="houses" dataKey="houses.id" v-model:selection="selectedHouse">
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
                  <InputText id="coopEmail" placeholder="Адреса" v-model="address" />
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
import {
  CooperationInterface,
  CooperationStateInterface,
  CooperationContactsInterface,
} from '@/store/cooperation/types';
import { HouseInterface } from '@/store/houses/types';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Menu from 'primevue/menu';

export default defineComponent({
  name: 'CooperationInfo',
  components: {
    Dialog,
    Button,
    InputText,
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
      houses: {},
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
    this.$store.dispatch('housesStore/SET_HOUSES');
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
      this.houses = this.housesInfo;
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
    openCooperationModal() {
      this.$store.dispatch('cooperationStore/SET_MODAL_DISPLAY', true);
    },
    closeCooperationModal() {
      this.$store.dispatch('cooperationStore/SET_MODAL_DISPLAY', false);
    },
    openEditHouseModal() {
      this.$store.dispatch('housesStore/SET_MODAL_DISPLAY', true);
    },
    closeEditHouseModal() {
      this.$store.dispatch('housesStore/SET_MODAL_DISPLAY', false);
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
      this.$store.dispatch('housesStore/EDIT_HOUSE', payload);
      this.closeEditHouseModal();
    },
    toggle(event: Event) {
      (this.$refs.menu as any).toggle(event);
    },
  },
  computed: {
    cooperationInfo(): CooperationStateInterface {
      return this.$store.state.cooperationStore;
    },
    displayCooperationModal(): boolean {
      return this.$store.state.cooperationStore.displayModal;
    },
    displayHouseModal(): boolean {
      return this.$store.state.housesStore.displayModal;
    },
    housesInfo(): HouseInterface {
      return this.$store.getters['housesStore/getHousesData'];
    },
  },
});
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  margin: 20px 40px;
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
