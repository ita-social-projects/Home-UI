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
        <div v-if="cooperationData.email">
          <span>Електрона адреса : </span>
          <span>{{ cooperationInfo.contacts[0].email }}</span>
        </div>
        <div>
          <span>Код реєстрації : </span>
          <span>{{ cooperationInfo.edrpou }}</span>
        </div>
        <div v-if="cooperationData.phone">
          <span>Номер телефону : </span>
          <span>{{ cooperationInfo.contacts[1].phone }}</span>
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
          :style="{ width: '580px' }"
          :modal="true"
          :closable="false"
          :dismissableMask="true"
        >
          <form>
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
              <label for="coopIban">Iban номер : </label>
              <div class="input-block">
                <small v-if="v$.cooperationData.iban.$error" class="p-error">{{
                  v$.cooperationData.iban.$errors[0].$message
                }}</small>
                <InputText
                  id="coopIban"
                  placeholder="iban номер"
                  v-model.trim="cooperationData.iban"
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
                  v-model.trim="cooperationData.edrpou"
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
                  v-model.trim="cooperationData.phone"
                  :class="{ 'p-invalid': v$.cooperationData.phone.$error }"
                  @blur="v$.cooperationData.phone.$touch"
                  maxlength="13"
                />
              </div>
            </div>
            <div>
              <p>Адреса:</p>
              <div class="address-wrapper">
                <div>
                  <label for="coopRegion">Регіон : </label>
                  <div class="input-block">
                    <small v-if="v$.cooperationData.address.region.$error" class="p-error">{{
                      v$.cooperationData.address.region.$errors[0].$message
                    }}</small>
                    <InputText
                      id="coopRegion"
                      placeholder="Регіон"
                      v-model.trim="cooperationData.address.region"
                      :class="{ 'p-invalid': v$.cooperationData.address.region.$error }"
                      @blur="v$.cooperationData.address.region.$touch"
                    />
                  </div>
                </div>
                <div>
                  <label for="coopCity">Місто : </label>
                  <div class="input-block">
                    <small v-if="v$.cooperationData.address.city.$error" class="p-error">{{
                      v$.cooperationData.address.city.$errors[0].$message
                    }}</small>
                    <InputText
                      id="coopCity"
                      placeholder="Місто"
                      v-model.trim="cooperationData.address.city"
                      :class="{ 'p-invalid': v$.cooperationData.address.city.$error }"
                      @blur="v$.cooperationData.address.city.$touch"
                    />
                  </div>
                </div>
                <div>
                  <label for="coopDistrict">Район : </label>
                  <div class="input-block">
                    <small v-if="v$.cooperationData.address.district.$error" class="p-error">{{
                      v$.cooperationData.address.district.$errors[0].$message
                    }}</small>
                    <InputText
                      id="coopDistrict"
                      placeholder="Район"
                      v-model.trim="cooperationData.address.district"
                      :class="{ 'p-invalid': v$.cooperationData.address.district.$error }"
                      @blur="v$.cooperationData.address.district.$touch"
                    />
                  </div>
                </div>
                <div>
                  <label for="coopStreet">Вулиця : </label>
                  <div class="input-block">
                    <small v-if="v$.cooperationData.address.street.$error" class="p-error">{{
                      v$.cooperationData.address.street.$errors[0].$message
                    }}</small>
                    <InputText
                      id="coopStreet"
                      placeholder="Вулиця"
                      v-model.trim="cooperationData.address.street"
                      :class="{ 'p-invalid': v$.cooperationData.address.street.$error }"
                      @blur="v$.cooperationData.address.street.$touch"
                    />
                  </div>
                </div>
                <div>
                  <label for="coopHouse">Номер будинку : </label>
                  <div class="input-block">
                    <small v-if="v$.cooperationData.address.houseNumber.$error" class="p-error">{{
                      v$.cooperationData.address.houseNumber.$errors[0].$message
                    }}</small>
                    <InputText
                      id="coopHouse"
                      placeholder="Номер будинку"
                      v-model.trim="cooperationData.address.houseNumber"
                      :class="{ 'p-invalid': v$.cooperationData.address.houseNumber.$error }"
                      @blur="v$.cooperationData.address.houseNumber.$touch"
                    />
                  </div>
                </div>
                <div>
                  <label for="coopBlock">Блок : </label>
                  <div class="input-block">
                    <small v-if="v$.cooperationData.address.houseBlock.$error" class="p-error">{{
                      v$.cooperationData.address.houseBlock.$errors[0].$message
                    }}</small>
                    <InputText
                      id="coopBlock"
                      placeholder="Блок"
                      v-model.trim="cooperationData.address.houseBlock"
                      :class="{ 'p-invalid': v$.cooperationData.address.houseBlock.$error }"
                      @blur="v$.cooperationData.address.houseBlock.$touch"
                    />
                  </div>
                </div>
                <div>
                  <label for="coopZipCode">Індекс : </label>
                  <div class="input-block">
                    <small v-if="v$.cooperationData.address.zipCode.$error" class="p-error">{{
                      v$.cooperationData.address.zipCode.$errors[0].$message
                    }}</small>
                    <InputText
                      id="coopZipCode"
                      placeholder="Індекс"
                      v-model.trim="cooperationData.address.zipCode"
                      :class="{ 'p-invalid': v$.cooperationData.address.zipCode.$error }"
                      @blur="v$.cooperationData.address.zipCode.$touch"
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>

          <template #footer>
            <Button
              :disabled="v$.cooperationData.$invalid"
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
      <Button
        label="Додати будинок"
        icon="pi pi-pencil"
        class="p-button-outlined p-button-info"
        @click="this.displayAddHouseModal = true"
      />
      <Dialog
        header="Додати будинок"
        v-model:visible="displayAddHouseModal"
        :style="{ width: '580px' }"
        :modal="true"
        :closable="false"
        :dismissableMask="true"
      >
        <AddHouseForm :id="cooperationData.id" @cancel-addHouseModal="displayAddHouseModal = false"></AddHouseForm>
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
        <Column field="quantity_flat" style="min-width: 15rem" header="Кількість квартир в будинку" :sortable="true" />
        <Column field="house_area" style="min-width: 15rem" header="Площа будинку" :sortable="true" />
        <Column field="adjoining_area" style="min-width: 15rem" header="Прибудинкової теріторії" :sortable="true" />
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
            <Menu :model="houseActions()" id="overlay_menu" ref="menu" :popup="true" />

            <ConfirmPopup></ConfirmPopup>
          </template>
        </Column>
      </DataTable>
    </div>
    <Dialog
      header="Редагувати будинок"
      v-model:visible="displayHouseModal"
      :style="{ width: '580px' }"
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
          <small v-if="v$.house.house_area.$error" class="p-error">{{ v$.house.house_area.$errors[0].$message }}</small>
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
          :disabled="v$.house.$invalid"
          label="Зберегти зміни"
          icon="pi pi-check"
          @click="editHouseInfo"
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
import AddHouseForm from '@/components/AddHouseForm.vue';
import { CooperationAddressInterface, CooperationContactsInterface } from '@/store/cooperation/types';
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
  zeroValidator,
  regionCityDistrictMaxLength,
  streetMaxLength,
  houseBlockAndNumberMaxLength,
  quantityAndAreaValidator,
  houseAreaValidator,
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
    AddHouseForm,
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
        name: '',
        edrpou: '',
        iban: '',
        phone: '',
        email: '',
        address: {} as CooperationAddressInterface,
      },
      isLoaded: false,
      house: {
        id: 0,
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
      displayAddHouseModal: false,
    };
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
          region: { requiredValidator, ukrLangTitleValidator, regionCityDistrictMaxLength },
          city: { requiredValidator, ukrLangTitleValidator, regionCityDistrictMaxLength },
          district: { requiredValidator, ukrLangTitleValidator, regionCityDistrictMaxLength },
          street: { requiredValidator, ukrLangTitleValidator, streetMaxLength },
          houseBlock: { requiredValidator, houseNumAndHouseBlockValidator, houseBlockAndNumberMaxLength },
          houseNumber: { requiredValidator, houseNumAndHouseBlockValidator, houseBlockAndNumberMaxLength },
          zipCode: { requiredValidator, zipCodeValidator },
        },
      },
      house: {
        quantity_flat: { requiredValidator, zeroValidator, quantityAndAreaValidator },
        house_area: { requiredValidator, zeroValidator, houseAreaValidator },
        adjoining_area: { requiredValidator, zeroValidator, quantityAndAreaValidator },
        address: {
          region: { requiredValidator, ukrLangTitleValidator, regionCityDistrictMaxLength },
          city: { requiredValidator, ukrLangTitleValidator, regionCityDistrictMaxLength },
          district: { requiredValidator, ukrLangTitleValidator, regionCityDistrictMaxLength },
          street: { requiredValidator, ukrLangTitleValidator, streetMaxLength },
          house_block: { requiredValidator, houseNumAndHouseBlockValidator, houseBlockAndNumberMaxLength },
          house_number: { requiredValidator, houseNumAndHouseBlockValidator, houseBlockAndNumberMaxLength },
          zip_code: { requiredValidator, zipCodeValidator },
        },
      },
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
      this.cooperationData.id = this.cooperationInfo?.id ?? 1;
      this.cooperationData.name = this.cooperationInfo?.name ?? '';
      this.cooperationData.edrpou = this.cooperationInfo?.edrpou ?? '';
      this.cooperationData.iban = this.cooperationInfo?.iban ?? '';
      this.cooperationData.address = JSON.parse(
        JSON.stringify(this.cooperationInfo?.address ?? ({} as CooperationAddressInterface))
      );
      this.cooperationInfo?.contacts.forEach((el: CooperationContactsInterface) => this.mapContact(el));
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
        },
        reject: () => {
          console.log('rejected delete');
        },
      });
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

    resetAddHouseDataFields(houseData: any) {
      for (let field in houseData) {
        if (typeof houseData[field] === 'object') {
          this.resetAddHouseDataFields(houseData[field]);
        } else {
          houseData[field] = '';
        }
      }
    },
    editCooperationInfo() {
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
    },
    async editHouseInfo() {
      const payload = {
        cooperationId: this.cooperationData.id,
        id: this.house.id,
        quantity_flat: this.house.quantity_flat,
        house_area: this.house.house_area,
        adjoining_area: this.house.adjoining_area,

        address: {
          region: this.house.address.region,
          city: this.house.address.city,
          district: this.house.address.district,
          street: this.house.address.street,
          house_block: this.house.address.house_block,
          house_number: this.house.address.house_number,
          zip_code: this.house.address.zip_code,
        },
      };
      this.$store.dispatch(`${StoreModuleEnum.housesStore}/EDIT_HOUSE`, payload);
      this.closeEditHouseModal();
      this.showSuccessEdit(this.house.id);
    },
    toggle(event: any, slotProps: any) {
      const { id, quantity_flat, house_area, adjoining_area, address } = slotProps;
      this.house.id = id;
      this.house.quantity_flat = quantity_flat;
      this.house.house_area = house_area;
      this.house.adjoining_area = adjoining_area;
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
    showSuccessEdit(id: number) {
      this.$toast.add({
        severity: 'success',
        summary: 'Успішно',
        detail: `Дані про будинок з ID ${id} змінено`,
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
      return this.$store.state.cooperationStore.displayModal;
    },
    displayHouseModal(): boolean {
      return this.$store.state.housesStore.displayModal;
    },
    displayAddHouseModal(): boolean {
      return this.displayAddHouseModal;
    },
    ...mapGetters({
      housesInfo: `${StoreModuleEnum.housesStore}/getHousesData`,
      cooperationInfo: `${StoreModuleEnum.cooperationStore}/getSelectedCooperation`,
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
