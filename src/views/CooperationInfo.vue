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
            <Button label="Скасувати" icon="pi pi-times" @click="closeModal" class="p-button-outlined p-button-info" />
          </template>
        </Dialog>
      </div>
    </div>
    <div class="add_btn">
      <Button label="Додати будинок" icon="pi pi-pencil" @click="addHouse" class="p-button-outlined p-button-info" />
    </div>
    <div class="container container-houses">
      <DataTable :value="housesInfo">
        <template #header>
          <h4>Будинки в цьому ОСББ</h4>
        </template>
        <Column field="quantity_flat" style="min-width: 20rem" header="Кількість квартир в будинку" :sortable="true" />
        <Column field="house_area" style="min-width: 20rem" header="Площа будинку" :sortable="true" />
        <Column field="adjoining_area" style="min-width: 20rem" header="Прибудинкової теріторії" :sortable="true" />
        <Column field="address" style="min-width: 20rem" header="Адреса" :sortable="true" />
        <Column>
          <template #body>
            <Button
              icon="pi pi-pencil"
              class="p-button p-button-info p-button-text"
              type="button"
              @click="toggle"
              aria-haspopup="true"
              aria-controls="overlay_menu"
            />
            <Menu :model="houseActions" id="overlay_menu" ref="menu" :popup="true" />
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
        },
        {
          label: 'Редагувати',
          icon: 'pi pi-user-edit',
        },
      ],
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
    openModal() {
      this.$store.dispatch('cooperationStore/SET_MODAL_DISPLAY', true);
    },
    closeModal() {
      this.$store.dispatch('cooperationStore/SET_MODAL_DISPLAY', false);
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
      this.closeModal();
    },
    toggle(event: Event) {
      (this.$refs.menu as any).toggle(event);
    },
  },
  computed: {
    cooperationInfo(): CooperationStateInterface {
      return this.$store.state.cooperationStore;
    },
    displayModal(): boolean {
      return this.$store.state.cooperationStore.displayModal;
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
  display: flex;
  padding: 10px;
  border-radius: 10px;
  height: 40%;
  background-color: #fafafa;
  justify-content: space-between;
  &.container-houses {
    padding: 1px;
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
  width: 160px;
}
</style>
