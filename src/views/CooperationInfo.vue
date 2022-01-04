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
          @click="this.displayCooperationModal = true"
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
          <EditCooperationInfo
            :initData="initData"
            @cancel-editCoopInfo="displayCooperationModal = false"
          ></EditCooperationInfo>
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
            v-model.trim="house.flatQuantity"
            :class="{ 'p-invalid': v$.house.flatQuantity.$error }"
            @blur="v$.house.flatQuantity.$touch"
          />
          <small v-if="v$.house.flatQuantity.$error" class="p-error">{{
            v$.house.flatQuantity.$errors[0].$message
          }}</small>
        </p>
        <p>
          <label class="dialog-item" for="coopAddress">Площа будинку : </label>
          <InputText
            id="houseArea"
            placeholder="Площа будинку"
            v-model="house.houseArea"
            :class="{ 'p-invalid': v$.house.houseArea.$error }"
            @blur="v$.house.houseArea.$touch"
          />
          <small v-if="v$.house.houseArea.$error" class="p-error">{{ v$.house.houseArea.$errors[0].$message }}</small>
        </p>
        <p>
          <label class="dialog-item" for="iban">Прибудинкової теріторії : </label>
          <InputText
            id="adjoiningArea"
            v-model="house.adjoiningArea"
            :class="{ 'p-invalid': v$.house.adjoiningArea.$error }"
            @blur="v$.house.adjoiningArea.$touch"
          />
          <small v-if="v$.house.adjoiningArea.$error" class="p-error">{{
            v$.house.adjoiningArea.$errors[0].$message
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
              v-model="house.address.houseBlock"
              :class="{ 'p-invalid': v$.house.address.houseBlock.$error }"
              @blur="v$.house.address.houseBlock.$touch"
            />
            <small v-if="v$.house.address.houseBlock.$error" class="p-error">{{
              v$.house.address.houseBlock.$errors[0].$message
            }}</small>
          </p>
          <p>
            <label class="dialog-item dialog-item-address" for="coopEmail">Номер будинку : </label>
            <InputText
              id="address-housenumber"
              placeholder="Регіон"
              v-model="house.address.houseNumber"
              :class="{ 'p-invalid': v$.house.address.houseNumber.$error }"
              @blur="v$.house.address.houseNumber.$touch"
            />
            <small v-if="v$.house.address.houseNumber.$error" class="p-error">{{
              v$.house.address.houseNumber.$errors[0].$message
            }}</small>
          </p>
          <p>
            <label class="dialog-item dialog-item-address" for="coopEmail">Код : </label>
            <InputText
              id="address-zipcode"
              placeholder="Регіон"
              v-model="house.address.zipCode"
              :class="{ 'p-invalid': v$.house.address.zipCode.$error }"
              @blur="v$.house.address.zipCode.$touch"
            />
            <small v-if="v$.house.address.zipCode.$error" class="p-error">{{
              v$.house.address.zipCode.$errors[0].$message
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
          @click="manageHouseModal"
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
import EditCooperationInfo from '@/components/EditCooperationInfo.vue';
import {
  CooperationAddressInterface,
  CooperationContactsInterface,
  CooperationActionEnum,
  CooperationGettersEnum,
} from '@/store/cooperation/types';
import { HousesActionsEnum, HousesGettersEnum } from '@/store/houses/types';
import { StoreModuleEnum } from '@/store/types';

import useVuelidate from '@vuelidate/core';
import {
  requiredValidator,
  ukrLangTitleValidator,
  houseNumAndHouseBlockValidator,
  zipCodeValidator,
  zeroValidator,
  regionCityDistrictMaxLength,
  streetMaxLength,
  houseBlockAndNumberMaxLength,
  houseAreaValidator,
  flatQuantityAndAdjoiningAreaValidator,
  houseDecimalValidator,
} from '@/utils/validators';
import { HouseModel } from '@/shared/models/house.model';
import { AddressModel } from '@/shared/models/address.model';

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
    EditCooperationInfo,
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
              this.manageHouseModal();
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
      displayModalForHouse: false,
      displayModalForCooperation: false,
      displayAddHouseModal: false,
      v$: useVuelidate(),
    };
  },
  validations() {
    return {
      house: {
        flatQuantity: {
          requiredValidator,
          zeroValidator,
          flatQuantityAndAdjoiningAreaValidator,
          houseDecimalValidator,
        },
        houseArea: { requiredValidator, zeroValidator, houseAreaValidator, houseDecimalValidator },
        adjoiningArea: {
          requiredValidator,
          zeroValidator,
          flatQuantityAndAdjoiningAreaValidator,
          houseDecimalValidator,
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
    };
  },
  async mounted() {
    this.cooperationData.id = this.cooperationInfo?.id ?? 1;

    await Promise.all([
      this.$store.dispatch(`${StoreModuleEnum.cooperationStore}/${CooperationActionEnum.SET_USER_COOPERATIONS}`),
      this.$store.dispatch(`${StoreModuleEnum.housesStore}/${HousesActionsEnum.SET_HOUSES}`, this.cooperationData.id),
    ]).then(() => {
      this.initData();
      this.isLoaded = true;
    });
  },
  methods: {
    initData() {
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
          await this.$store.dispatch(`${StoreModuleEnum.housesStore}/${HousesActionsEnum.DELETE_HOUSE}`, payload);
          this.showSuccessDelete();
        },
        reject: () => {
          console.log('rejected delete');
        },
      });
    },
    manageHouseModal() {
      if (this.displayModalForHouse) {
        this.displayModalForHouse = false;
      } else {
        this.displayModalForHouse = true;
      }
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
    async editHouseInfo() {
      const payload = {
        cooperationId: this.cooperationData.id,
        id: this.house.id,
        flatQuantity: this.house.flatQuantity,
        houseArea: this.house.houseArea,
        adjoiningArea: this.house.adjoiningArea,

        address: {
          region: this.house.address.region,
          city: this.house.address.city,
          district: this.house.address.district,
          street: this.house.address.street,
          houseBlock: this.house.address.houseBlock,
          houseNumber: this.house.address.houseNumber,
          zipCode: this.house.address.zipCode,
        },
      };
      this.$store.dispatch(`${StoreModuleEnum.housesStore}/${HousesActionsEnum.EDIT_HOUSE}`, payload);
      this.manageHouseModal();
      this.showSuccessEdit(this.house.id!);
    },
    toggle(event: any, slotProps: any) {
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
      return this.displayModalForCooperation;
    },
    displayHouseModal(): boolean {
      return this.displayModalForHouse;
    },
    displayAddHouseModal(): boolean {
      return this.displayAddHouseModal;
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
