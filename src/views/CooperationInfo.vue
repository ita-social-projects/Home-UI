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
          :style="{ width: '750px' }"
          :modal="true"
          :closable="false"
          :dismissableMask="true"
        >
          <form @submit.prevent="editCooperationInfo">
            <div>
              <label for="coopName">Назва : </label>
              <div class="input-block">
                <small v-if="v$.cooperationData.name.$error" class="p-error">{{
                  v$.cooperationData.name.$errors[0].$message
                }}</small>
                <InputText
                  id="coopName"
                  :class="{ 'p-invalid': v$.cooperationData.name.$error }"
                  @blur="v$.cooperationData.name.$touch"
                  placeholder="Назва"
                  v-model.trim="cooperationData.name"
                />
              </div>
            </div>
            <div>
              <label for="iban">Iban номер : </label>
              <div class="input-block">
                <small v-if="v$.cooperationData.iban.$error" class="p-error">{{
                  v$.cooperationData.iban.$errors[0].$message
                }}</small>
                <InputText
                  id="coopIban"
                  placeholder="iban номер"
                  v-model="cooperationData.iban"
                  :class="{ 'p-invalid': v$.cooperationData.iban.$error }"
                  @blur="v$.cooperationData.iban.$touch"
                  maxlength="29"
                />
              </div>
            </div>
            <div>
              <label for="coopEmail">Електронна адреса : </label>
              <div class="input-block">
                <small v-if="v$.cooperationData.email.$error" class="p-error">{{
                  v$.cooperationData.email.$errors[0].$message
                }}</small>
                <InputText
                  id="coopEmail"
                  placeholder="Електрона адреса"
                  v-model.trim="cooperationData.email"
                  :class="{ 'p-invalid': v$.cooperationData.email.$error }"
                  @blur="v$.cooperationData.email.$touch"
                  maxlength="320"
                />
              </div>
            </div>
            <div>
              <label for="edrpou">Код реєстрації : </label>
              <div class="input-block">
                <small v-if="v$.cooperationData.edrpou.$error" class="p-error">{{
                  v$.cooperationData.edrpou.$errors[0].$message
                }}</small>
                <InputText
                  id="edrpou"
                  placeholder="ОСББ номер"
                  v-model="cooperationData.edrpou"
                  :class="{ 'p-invalid': v$.cooperationData.edrpou.$error }"
                  @blur="v$.cooperationData.edrpou.$touch"
                  maxlength="8"
                />
              </div>
            </div>
            <div>
              <label for="coopPhone">Номер телефону : </label>
              <div class="input-block">
                <small v-if="v$.cooperationData.phone.$error" class="p-error">{{
                  v$.cooperationData.phone.$errors[0].$message
                }}</small>
                <InputText
                  id="coopPhone"
                  placeholder="+38 000 000 00 00"
                  v-model="cooperationData.phone"
                  :class="{ 'p-invalid': v$.cooperationData.phone.$error }"
                  @blur="v$.cooperationData.phone.$touch"
                  maxlength="13"
                />
              </div>
            </div>
            <div>
              Адреса
              <div>
                <label for="coopAddress">регіон : </label>
                <div class="input-block">
                  <small v-if="v$.cooperationData.address.region.$error" class="p-error">{{
                    v$.cooperationData.address.$errors[0].$message
                  }}</small>
                  <InputText
                    id="coopAddress"
                    placeholder="регіон"
                    v-model="cooperationData.address.region"
                    :class="{ 'p-invalid': v$.cooperationData.address.$error }"
                    @blur="v$.cooperationData.address.region.$touch"
                    maxlength="50"
                  />
                </div>
              </div>
              <div>
                <label for="coopAddress">місто : </label>
                <div class="input-block">
                  <small v-if="v$.cooperationData.address.city.$error" class="p-error">{{
                    v$.cooperationData.address.city.$errors[0].$message
                  }}</small>
                  <InputText
                    id="coopAddress"
                    placeholder="місто"
                    v-model="cooperationData.address.city"
                    :class="{ 'p-invalid': v$.cooperationData.address.$error }"
                    @blur="v$.cooperationData.address.city.$touch"
                    maxlength="50"
                  />
                </div>
              </div>
              <div>
                <label for="coopAddress">район : </label>
                <div class="input-block">
                  <small v-if="v$.cooperationData.address.district.$error" class="p-error">{{
                    v$.cooperationData.address.district.$errors[0].$message
                  }}</small>
                  <InputText
                    id="coopAddress"
                    placeholder="район"
                    v-model="cooperationData.address.district"
                    :class="{ 'p-invalid': v$.cooperationData.address.district.$error }"
                    @blur="v$.cooperationData.address.district.$touch"
                    maxlength="50"
                  />
                </div>
              </div>
              <div>
                <label for="coopAddress">вулиця : </label>
                <div class="input-block">
                  <small v-if="v$.cooperationData.address.street.$error" class="p-error">{{
                    v$.cooperationData.address.street.$errors[0].$message
                  }}</small>
                  <InputText
                    id="coopAddress"
                    placeholder="вулиця"
                    v-model="cooperationData.address.street"
                    :class="{ 'p-invalid': v$.cooperationData.address.street.$error }"
                    @blur="v$.cooperationData.address.street.$touch"
                    maxlength="50"
                  />
                </div>
              </div>
              <div>
                <label for="coopAddress">номер будинку : </label>
                <div class="input-block">
                  <small v-if="v$.cooperationData.address.houseNumber.$error" class="p-error">{{
                    v$.cooperationData.address.houseNumber.$errors[0].$message
                  }}</small>
                  <InputText
                    id="coopAddress"
                    placeholder="номер будинку"
                    v-model="cooperationData.address.houseNumber"
                    :class="{ 'p-invalid': v$.cooperationData.address.houseNumber.$error }"
                    @blur="v$.cooperationData.address.houseNumber.$touch"
                    maxlength="10"
                  />
                </div>
              </div>
              <div>
                <label for="coopAddress">блок : </label>
                <div class="input-block">
                  <small v-if="v$.cooperationData.address.houseBlock.$error" class="p-error">{{
                    v$.cooperationData.address.houseBlock.$errors[0].$message
                  }}</small>
                  <InputText
                    id="coopAddress"
                    placeholder="блок"
                    v-model="cooperationData.address.houseBlock"
                    :class="{ 'p-invalid': v$.cooperationData.address.houseBlock.$error }"
                    @blur="v$.cooperationData.address.houseBlock.$touch"
                    maxlength="10"
                  />
                </div>
              </div>
              <div>
                <label for="coopAddress">індекс : </label>
                <div class="input-block">
                  <small v-if="v$.cooperationData.address.zipCode.$error" class="p-error">{{
                    v$.cooperationData.address.zipCode.$errors[0].$message
                  }}</small>
                  <InputText
                    id="coopAddress"
                    placeholder="індекс"
                    v-model="cooperationData.address.zipCode"
                    :class="{ 'p-invalid': v$.cooperationData.address.zipCode.$error }"
                    @blur="v$.cooperationData.address.zipCode.$touch"
                    maxlength="5"
                  />
                </div>
              </div>
            </div>
          </form>

          <template #footer>

            <Button
              label="Редагувати"
              icon="pi pi-check"
              @click="editCooperationInfo"
              autofocus
              class="p-button-info"
            />

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
      <AddHouseButton :id="cooperationData.id"></AddHouseButton>
    </div>
    <div class="container container-houses">
      <DataTable
        ref="dt"
        :value="isLoaded ? houses : []"
        selectionMode="single"
        v-model:selection="selectedHouse"
        dataKey="houses.id"
        @rowSelect="onRowSelect"
      >
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
            >
              <form>
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

                <label class="dialog-item" for="address-details-id">Адреса : </label>
                <div class="address-details" id="address-details-id">
                  <p>
                    <label class="dialog-item dialog-item-address" for="coopEmail">Регіон : </label>
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
                    <label class="dialog-item dialog-item-address" for="coopEmail">Місто : </label>
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
                    <label class="dialog-item dialog-item-address" for="coopEmail">Район : </label>
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
                    <label class="dialog-item dialog-item-address" for="coopEmail">Вулиця : </label>
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
                    <label class="dialog-item dialog-item-address" for="coopEmail">Блок : </label>
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
                    <label class="dialog-item dialog-item-address" for="coopEmail">Номер будинку : </label>
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
                    <label class="dialog-item dialog-item-address" for="coopEmail">Код : </label>
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
                </div>
              </form>

              <template #footer>
                <Button
                  label="Зберегти зміни"
                  icon="pi pi-check"
                  @click="editHouseInfo(house)"
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
import { defineComponent, ref } from 'vue';
import { mapGetters } from 'vuex';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Menu from 'primevue/menu';
import ConfirmPopup from 'primevue/confirmpopup';

import Breadcrumb from '@/components/Breadcrumb.vue';
import AddHouseButton from '@/components/AddHouseButton.vue';
import { CooperationModel } from '@/store/cooperation/models/cooperation.model';
import { CooperationAddressInterface, CooperationContactsInterface } from '@/store/cooperation/types';
import { HouseInterface } from '@/store/houses/types';
import { StoreModuleEnum } from '@/store/types';
import { AddressInterface, HouseInterface } from '@/store/houses/types';

import useVuelidate from '@vuelidate/core';
import {
  requiredValidator,
  edrpouValidator,
  emailLastCharsValidator,
  emailMaxLength,
  emailMinLength,
  emailValidator,
  nameLenghtValidator,
  ukrLangTitleValidator,
  ibanValidator,
  phoneNumberValidator,
  houseNumAndHouseBlockValidator,
  zipCodeValidator,
} from '@/utils/validators';

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
    AddHouseButton,
  },
  data() {
    return {
      houseActions: (house: HouseInterface) => {
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
              this.showSuccessEdit(house);
            },
          },
        ];
      },
      selectedHouse: ref(),
      houses: [] as Array<HouseInterface>,
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
  },
  validations() {
    return {
      cooperationData: {
        name: {
          requiredValidator,
          ukrLangTitleValidator,
          nameLenghtValidator,
        },
        edrpou: { requiredValidator, edrpouValidator },
        iban: { requiredValidator, ibanValidator },
        phone: { requiredValidator, phoneNumberValidator },
        email: {
          requiredValidator,
          emailMinLength,
          emailLastCharsValidator,
          emailValidator,
          emailMaxLength,
        },
        address: {
          region: { requiredValidator, ukrLangTitleValidator },
          city: { requiredValidator, ukrLangTitleValidator },
          district: { requiredValidator, ukrLangTitleValidator },
          street: { requiredValidator, ukrLangTitleValidator },
          houseBlock: { requiredValidator, houseNumAndHouseBlockValidator },
          houseNumber: { requiredValidator, houseNumAndHouseBlockValidator },
          zipCode: { requiredValidator, zipCodeValidator },
        },
      },
      house: {
        quantity_flat: { requiredValidator, mainHouseInfoValidator },
        house_area: { requiredValidator, mainHouseInfoValidator },
        adjoining_area: { requiredValidator, mainHouseInfoValidator },
        address: {
          region: { requiredValidator, addressValidator },
          city: { requiredValidator, addressValidator },
          district: { requiredValidator, addressValidator },
          street: { requiredValidator, addressValidator },
          house_block: { requiredValidator, houseNumAndHouseBlockValidator },
          house_number: { requiredValidator, houseNumAndHouseBlockValidator },
          zip_code: { requiredValidator, zipCodeValidator },
        },
    };
  },

  async mounted() {
    this.houses = Object.assign({}, this.housesInfo);
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
      this.cooperationData.id = cooperationInfo?.id ?? 1;
      this.cooperationData.name = cooperationInfo?.name ?? '';
      this.cooperationData.edrpou = cooperationInfo?.edrpou ?? '';
      this.cooperationData.iban = cooperationInfo?.iban ?? '';
      this.cooperationData.address = JSON.parse(
        JSON.stringify(cooperationInfo?.address ?? ({} as CooperationAddressInterface))
      );
      cooperationInfo?.contacts.forEach((el) => this.mapContact(el));
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
          await this.$store.dispatch('housesStore/DELETE_HOUSE', payload);
          this.showSuccessDelete();
          this.houses = Object.assign({}, this.housesInfo);
        },
        reject: () => {
          console.log('rejected delete');
        },
      });
    },
    setHouse() {
      this.houses = this.$store.state.housesStore.houses as HouseInterface[];
    },
    openCooperationModal() {
      this.$store.dispatch(`${StoreModuleEnum.cooperationStore}/SET_MODAL_DISPLAY`, true);
    },
    closeCooperationModal() {
      this.$store.dispatch(`${StoreModuleEnum.cooperationStore}/SET_MODAL_DISPLAY`, false);
    },
    openEditHouseModal() {
      this.$store.dispatch(`${StoreModuleEnum.housesStore}/SET_MODAL_DISPLAY`, true);
    },
    closeEditHouseModal() {
      this.$store.dispatch(`${StoreModuleEnum.housesStore}/SET_MODAL_DISPLAY`, false);
    },
    cancelCooperationEdit() {
      this.initData();
      this.closeCooperationModal();
    },
    editCooperationInfo() {
      if (!this.v$.$invalid) {
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
        this.closeCooperationModal();
      }
    },
    async editHouseInfo(house: HouseInterface) {
      const payload = {
        cooperationId: this.cooperationData.id,
        id: house.id,
        quantity_flat: house.quantity_flat,
        house_area: house.house_area,
        adjoining_area: house.adjoining_area,

        address: {
          region: house.address.region,
          city: house.address.city,
          district: house.address.district,
          street: house.address.street,
          house_block: house.address.house_block,
          house_number: house.address.house_number,
          zip_code: house.address.zip_code,
        },
      };
      this.$store.dispatch(`${StoreModuleEnum.housesStore}/EDIT_HOUSE`, payload);
      this.closeEditHouseModal();
    },
    toggle(event: any, slotProps: any) {
      this.house = slotProps;
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

    choosenHouse() {
      this.$router.push({
        name: 'manage-apartment',
        params: { id: this.selectedHouse.id },
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
    ...mapGetters({
      housesInfo: `${StoreModuleEnum.housesStore}/getHousesData`,
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
  width: 260px;
}
label {
  display: inline-block;
  width: 260px;
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
