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
      <Button label="Додати будинок" icon="pi pi-pencil" @click="addHouse" class="p-button-outlined p-button-info" />
    </div>
    <!-- МОЙ КОНТЕЙНЕР -->
    <div class="container container-houses">
      <DataTable ref="dt" :value="houses" dataKey="houses" v-model:selection="selectedHouse">
        <template #header>
          <h4>Будинки в цьому ОСББ</h4>
        </template>

        <Column field="quantity_flat" style="min-width: 20rem" header="Кількість квартир в будинку" :sortable="true" />
        <Column field="house_area" style="min-width: 20rem" header="Площа будинку" :sortable="true" />
        <Column field="adjoining_area" style="min-width: 20rem" header="Прибудинкової теріторії" :sortable="true" />
        <Column field="address" style="min-width: 20rem" header="Адреса" :sortable="true">
          <template #body="slotProps">
            {{ slotProps.data.address.region }}, {{ slotProps.data.address.city }},
            {{ slotProps.data.address.district }}, {{ slotProps.data.address.street }},
            {{ slotProps.data.address.house_block }}, {{ slotProps.data.address.house_number }},
            {{ slotProps.data.address.zip_code }}
          </template>
        </Column>
        <Column field="id" style="min-width: 20rem" header="id" :sortable="true" />
        <Column>
          <template #body="slotProps">
            <Button
              icon="pi pi-pencil"
              class="p-button p-button-info p-button-text"
              type="button"
              @click="toggle($event, slotProps.data)"
              aria-haspopup="true"
              aria-controls="overlay_menu"
              ref="button"
              :item="slotProps.data"
            />
            <Menu :model="houseActions(house)" id="overlay_menu" ref="menu" :popup="true" />

            <ConfirmPopup></ConfirmPopup>

            <Dialog
              header="Редагувати будинок"
              v-model:visible="displayHouseModal"
              :style="{ width: '50vw' }"
              :modal="true"
              :closable="false"
              :dismissableMask="true"
              :itemid="this.house.id"
            >
              <form submit.prevent="editHouseInfo">
                <p>
                  <label class="dialog-item" for="coopName">Кількість квартир в будинку : </label>
                  <InputText
                    id="quantityFlat"
                    placeholder="Кількість квартир в будинку"
                    v-model.trim="house.quantity_flat"
                    :class="{ 'p-invalid': v$.house.quantity_flat.$error }"
                    @blur="v$.house.quantity_flat.$touch"
                  />
                  <small v-if="v$.house.quantity_flat.$error" class="p-error">{{
                    v$.house.quantity_flat.$errors[0].$message
                  }}</small>
                </p>
                <p>
                  <label class="dialog-item" for="coopAddress">Площа будинку : </label>
                  <InputText
                    id="houseArea"
                    placeholder="Площа будинку"
                    v-model="house.house_area"
                    :class="{ 'p-invalid': v$.house.house_area.$error }"
                    @blur="v$.house.house_area.$touch"
                  />
                  <small v-if="v$.house.house_area.$error" class="p-error">{{
                    v$.house.house_area.$errors[0].$message
                  }}</small>
                </p>
                <p>
                  <label class="dialog-item" for="iban">Прибудинкової теріторії : </label>
                  <InputText
                    id="adjoiningArea"
                    v-model="house.adjoining_area"
                    :class="{ 'p-invalid': v$.house.adjoining_area.$error }"
                    @blur="v$.house.adjoining_area.$touch"
                  />
                  <small v-if="v$.house.adjoining_area.$error" class="p-error">{{
                    v$.house.adjoining_area.$errors[0].$message
                  }}</small>
                </p>
                <p>
                  <label class="dialog-item" for="coopEmail">
                    <pre>Адреса:</pre>
                    <pre>     Регіон :</pre>
                  </label>
                  <InputText
                    id="address-region"
                    placeholder="Регіон"
                    v-model="house.address.region"
                    :class="{ 'p-invalid': v$.house.address.region.$error }"
                    @blur="v$.house.address.region.$touch"
                  />
                  <small v-if="v$.house.address.region.$error" class="p-error">{{
                    v$.house.address.region.$errors[0].$message
                  }}</small>
                </p>
                <p>
                  <label class="dialog-item" for="coopEmail">
                    <pre>     Місто :</pre>
                  </label>
                  <InputText
                    id="address-city"
                    placeholder="Регіон"
                    v-model="house.address.city"
                    :class="{ 'p-invalid': v$.house.address.city.$error }"
                    @blur="v$.house.address.city.$touch"
                  />
                  <small v-if="v$.house.address.city.$error" class="p-error">{{
                    v$.house.address.city.$errors[0].$message
                  }}</small>
                </p>
                <p>
                  <label class="dialog-item" for="coopEmail">
                    <pre>     Район :</pre>
                  </label>
                  <InputText
                    id="address-region"
                    placeholder="Регіон"
                    v-model="house.address.district"
                    :class="{ 'p-invalid': v$.house.address.district.$error }"
                    @blur="v$.house.address.district.$touch"
                  />
                  <small v-if="v$.house.address.district.$error" class="p-error">{{
                    v$.house.address.district.$errors[0].$message
                  }}</small>
                </p>
                <p>
                  <label class="dialog-item" for="coopEmail">
                    <pre>     Вулиця :</pre>
                  </label>
                  <InputText
                    id="address-street"
                    placeholder="Регіон"
                    v-model="house.address.street"
                    :class="{ 'p-invalid': v$.house.address.street.$error }"
                    @blur="v$.house.address.street.$touch"
                  />
                  <small v-if="v$.house.address.street.$error" class="p-error">{{
                    v$.house.address.street.$errors[0].$message
                  }}</small>
                </p>
                <p>
                  <label class="dialog-item" for="coopEmail">
                    <pre>     Блок :</pre>
                  </label>
                  <InputText
                    id="address-block"
                    placeholder="Регіон"
                    v-model="house.address.house_block"
                    :class="{ 'p-invalid': v$.house.address.house_block.$error }"
                    @blur="v$.house.address.house_block.$touch"
                  />
                  <small v-if="v$.house.address.house_block.$error" class="p-error">{{
                    v$.house.address.house_block.$errors[0].$message
                  }}</small>
                </p>
                <p>
                  <label class="dialog-item" for="coopEmail">
                    <pre>     Номер будинку :</pre>
                  </label>
                  <InputText
                    id="address-housenumber"
                    placeholder="Регіон"
                    v-model="house.address.house_number"
                    :class="{ 'p-invalid': v$.house.address.house_number.$error }"
                    @blur="v$.house.address.house_number.$touch"
                  />
                  <small v-if="v$.house.address.house_number.$error" class="p-error">{{
                    v$.house.address.house_number.$errors[0].$message
                  }}</small>
                </p>
                <p>
                  <label class="dialog-item" for="coopEmail">
                    <pre>     Код :</pre>
                  </label>
                  <InputText
                    id="address-zipcode"
                    placeholder="Регіон"
                    v-model="house.address.zip_code"
                    :class="{ 'p-invalid': v$.house.address.zip_code.$error }"
                    @blur="v$.house.address.zip_code.$touch"
                  />
                  <small v-if="v$.house.address.zip_code.$error" class="p-error">{{
                    v$.house.address.zip_code.$errors[0].$message
                  }}</small>
                </p>
              </form>

              <template #footer>
                <Button
                  label="Зберегти зміни"
                  icon="pi pi-check"
                  @click="editHouseInfo(this.house)"
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
import useVuelidate from '@vuelidate/core';
import {
  requiredValidator,
  flatQuantityValidator,
  addressValidator,
  houseAreaValidator,
  adjoiningAreaValidator,
  regionValidator,
  cityValidator,
  districtValidator,
  streetValidator,
  houseBlockNumberValidator,
  houseNumberValidator,
  zipCodeValidator,
} from '@/utils/validators';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Menu from 'primevue/menu';
import Breadcrumb from '@/components/Breadcrumb.vue';
import { CooperationModel } from '@/store/cooperation/models/cooperation.model';
import { CooperationAddressInterface, CooperationContactsInterface } from '@/store/cooperation/types';
import { AddressInterface, HouseInterface } from '@/store/houses/types';
import ConfirmPopup from 'primevue/confirmpopup';

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
    ConfirmPopup,
  },
  data() {
    return {
      houseActions: (house: any) => {
        return [
          {
            label: 'Видалити',
            icon: 'pi pi-times',
            command: () => {
              this.confirmDeleteHouse(event);
            },
          },
          {
            label: 'Редагувати',
            icon: 'pi pi-user-edit',
            command: () => {
              this.openEditHouseModal();
              this.showSuccessEdit(house);
            },
          },
        ];
      },
      selectedHouse: null,
      houses: {},
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
      house: {
        quantity_flat: 0,
        house_area: 0,
        adjoining_area: 0,
        address: {
          region: '',
          city: '',
          district: '',
          street: '',
          house_block: '',
          house_number: '',
          zip_code: '',
        } as AddressInterface,
      } as HouseInterface,
      v$: useVuelidate(),
    };
  },
  validations() {
    return {
      house: {
        quantity_flat: { requiredValidator, flatQuantityValidator },
        house_area: { requiredValidator, houseAreaValidator },
        adjoining_area: { requiredValidator, adjoiningAreaValidator },
        address: {
          region: { requiredValidator, regionValidator },
          city: { requiredValidator, cityValidator },
          district: { requiredValidator, districtValidator },
          street: { requiredValidator, streetValidator },
          house_block: { requiredValidator, houseBlockNumberValidator },
          house_number: { requiredValidator, houseNumberValidator },
          zip_code: { requiredValidator, zipCodeValidator },
        },
      },
    };
  },
  async mounted() {
    await Promise.all([this.$store.dispatch('cooperationStore/SET_USER_COOPERATIONS')]).then(() => {
      this.initData();
      this.isLoaded = true;
    });
    this.$store.dispatch('housesStore/SET_HOUSES');
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
      if (el.main === true) {
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
    confirmDeleteHouse(event: any) {
      this.$confirm.require({
        target: event.currentTarget,
        message: 'Are you sure you want to proceed?',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.$store.dispatch('housesStore/DELETE_HOUSE', this.house.id);
          this.showSuccessDelete();
          this.initData();
          console.log('accepted delete');
          //callback to execute when user confirms the action
        },
        reject: () => {
          console.log('rejected delete');
          console.log(event);
          //callback to execute when user rejects the action
        },
      });
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
    async closeEditHouseModal() {
      await this.$store.dispatch('housesStore/SET_MODAL_DISPLAY', false);
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
      this.$store.dispatch('cooperationStore/SET_COOPERATION_UPDATE', payload);
      console.log('edit payload');
      this.closeCooperationModal();
    },
    editHouseInfo(house: HouseInterface) {
      // house: HouseInterface not used because it gives wrong id (always last)
      const payload = {
        id: this.house.id,
        quantity_flat: this.house.quantity_flat,
        house_area: this.house.house_area,
        adjoining_area: this.house.adjoining_area,
        address: this.house.address,
      };
      this.$store.dispatch('housesStore/EDIT_HOUSE', payload);
      this.closeEditHouseModal();
    },
    toggle(event: any, slotProps: any) {
      console.log(slotProps.quantity_flat);
      this.house = slotProps;
      (this.$refs.menu as any).toggle(event);
    },
    toggleConfirm(event: Event) {
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
    showSuccessEdit(house: HouseInterface) {
      this.$toast.add({
        severity: 'success',
        summary: 'Успішно',
        detail: `Дані про будинок з ID ${house.id} змінено`,
        life: 3000,
      });
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
