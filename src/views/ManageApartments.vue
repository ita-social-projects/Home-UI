<template>
  <div class="manage-apartments">
    <div class="wrapper">
      <div class="breadcrumb">
        <Breadcrumb />
      </div>
      <div class="wrapper-container">
        <div class="container" v-if="!loading">
          <div class="detailed">
            <div class="detailed-info">
              <div>
                <span>Номер будинку: </span>
                <span>{{ houseInfo?.address.houseNumber }}</span>
              </div>
              <div>
                <span>Кількість квартир: </span>
                <span>{{ houseInfo?.flatQuantity }}</span>
              </div>
              <div>
                <span>Адреса: </span>
                <span>
                  місто {{ houseInfo?.address.city }}, вулиця {{ houseInfo?.address.street }}, будинок
                  {{ houseInfo?.address.houseNumber }}, {{ houseInfo?.address.houseBlock }} блок.
                </span>
              </div>
            </div>
          </div>
          <div class="edit-btn">
            <Button label="Редагувати" icon="pi pi-pencil" class="p-button-outlined p-button-info" />
          </div>
        </div>
        <div class="add-btn">
          <Button
            label="Додати квартиру"
            icon="pi pi-pencil"
            class="p-button-outlined p-button-info"
            @click="openApartmentModal"
          />
          <Dialog
            header="Додати квартиру"
            v-model:visible="displayApartmentModal"
            :modal="true"
            :closable="false"
            :dismissableMask="true"
          >
            <AddApartmentForm
              :houseId="id"
              @apartment-saved="displayApartmentModal = false"
              @cancel-editing="displayApartmentModal = false"
            >
            </AddApartmentForm>
          </Dialog>
        </div>
        <div class="container">
          <DataTable
            :value="apartmentsData"
            responsiveLayout="scroll"
            scrollHeight="400px"
            :loading="loading"
            v-model:selection="selectedApartment"
            @rowSelect="onRowSelect"
            selectionMode="single"
            dataKey="id"
          >
            <template #header>
              <h4>Список квартир в будинку</h4>
            </template>
            <Column
              field="apartmentNumber"
              header="Номер квартири"
              :sortable="true"
              style="width: 40em"
              showGridlines
            ></Column>
            <Column field="apartmentArea" header="Площа квартири" :sortable="true" showGridlines style="width: 50rem">
            </Column>
            <Column style="width: 10em">
              <template #body="slotProps">
                <Button
                  icon="pi pi-pencil"
                  class="col-btn p-button p-button-info p-button-text"
                  type="button"
                  @click="toggle($event, slotProps.data)"
                  aria-haspopup="true"
                  aria-controls="overlay_menu"
                />
                <Menu id="overlay_menu" ref="menu" :model="menuActions()" :popup="true" />
              </template>
            </Column>
          </DataTable>
        </div>
        <Dialog v-model:visible="deleteApartmentDialog" :style="{ width: '450px' }" header="Попередження" :modal="true">
          <div class="confirmation-content">
            <span v-if="item">
              Видалити квартиру № <strong>{{ item.apartmentNumber }}</strong
              >?</span
            >
          </div>
          <template #footer>
            <Button
              label="Скасувати"
              icon="pi pi-times"
              class="p-button-outlined p-button-info"
              @click="deleteApartmentDialog = false"
            />
            <Button label="Видалити" icon="pi pi-check" class="p-button-info" @click="deleteApartment" />
          </template>
        </Dialog>
        <Dialog
          v-model:visible="editApartmentDialog"
          :style="{ width: '450px' }"
          header="Редагувати квартиру"
          :modal="true"
        >
          <div class="p-field dialog">
            <label for="name" class="dialog_item-label">Номер квартири: </label>
            <InputText
              id="name"
              v-model.trim="item.apartmentNumber"
              required="true"
              autofocus
              :class="{ 'p-invalid': submitted && !item.apartmentNumber }"
            />
            <small class="p-error" v-if="submitted && !item.apartmentNumber">Введіть номер квартири</small>
          </div>
          <div class="p-field dialog_item">
            <label for="name" class="dialog_item-label">Площа квартири: </label>
            <InputText
              id="name"
              v-model.trim="item.apartmentArea"
              required="true"
              autofocus
              :class="{ 'p-invalid': submitted && !item.apartmentArea }"
            />
            <small class="p-error" v-if="submitted && !item.apartmentArea">Введіть площу квартири</small>
          </div>
          <template #footer>
            <Button
              label="Скасувати"
              icon="pi pi-times"
              class="p-button-outlined p-button-info"
              @click="editApartmentDialog = false"
            />
            <Button label="Зберегти" icon="pi pi-check" class="p-button-info" @click="editApartment" />
          </template>
        </Dialog>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { toRefs, ref, computed, defineComponent, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { ApartmentModel } from '@/store/apartments/models/apartment.model';
import { useStore } from 'vuex';
import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Dialog from 'primevue/dialog';
import Menu from 'primevue/menu';
import InputText from 'primevue/inputtext';
import Breadcrumb from '@/components/Breadcrumb.vue';
import AddApartmentForm from '@/components/AddApartmentForm.vue';

import { StoreModuleEnum } from '@/store/types';
import { CooperationGettersEnum } from '@/store/cooperation/types';
import { ApartmentsActionsEnum, ApartmentsGettersEnum } from '@/store/apartments/types';
import { HousesActionsEnum, HousesGettersEnum } from '@/store/houses/types';

import { HouseModel } from '@/shared/models/house.model';

export default defineComponent({
  name: 'ManageApartments',
  components: {
    Breadcrumb,
    Button,
    DataTable,
    Column,
    Menu,
    Dialog,
    InputText,
    AddApartmentForm,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const router = useRouter();
    const store = useStore();
    const selectedApartment = ref();
    const loading = ref(true);
    const { id } = toRefs(props);
    const menu = ref();
    const deleteApartmentDialog = ref(false);
    const editApartmentDialog = ref(false);
    const item = ref({});
    const submitted = ref(false);
    const displayApartmentModal = ref(false);

    const toggle = (event: KeyboardEvent, data: ApartmentModel) => {
      menu.value.toggle(event);
      item.value = data;
      submitted.value = false;
    };

    const menuActions = () => {
      return [
        {
          label: 'Видалити',
          icon: 'pi pi-times',
          command: () => {
            deleteApartmentDialog.value = true;
          },
        },
        {
          label: 'Редагувати',
          icon: 'pi pi-refresh',
          command: () => {
            editApartmentDialog.value = true;
          },
        },
      ];
    };

    function openApartmentModal() {
      displayApartmentModal.value = true;
    }

    const cooperationId = computed(() => {
      return store.getters[`${StoreModuleEnum.cooperationStore}/${CooperationGettersEnum.getSelectedCooperationId}`];
    });

    const deleteApartment = () => {
      submitted.value = true;
      deleteApartmentDialog.value = false;
    };

    const editApartment = () => {
      submitted.value = true;
      editApartmentDialog.value = false;
    };

    const setApartments = async () => {
      await store.dispatch(`${StoreModuleEnum.apartmentsStore}/${ApartmentsActionsEnum.SET_APARTMENTS}`, id.value);
      loading.value = false;
    };

    const apartmentsData = computed((): Array<ApartmentModel> => {
      return store.getters[`${StoreModuleEnum.apartmentsStore}/${ApartmentsGettersEnum.getApartmentsData}`];
    });

    const onRowSelect = (event: KeyboardEvent) => {
      const apartmentId = event.data.id;
      router.push({
        name: 'apartment-info',
        params: { apartment: apartmentId },
      });
    };

    const setHouseInfo = async () => {
      const payload = {
        cooperationId: cooperationId.value,
        houseId: id.value,
      };
      await store.dispatch(`${StoreModuleEnum.housesStore}/${HousesActionsEnum.GET_HOUSE_BY_ID}`, payload);
    };

    const houseInfo = computed((): HouseModel => {
      return store.getters[`${StoreModuleEnum.housesStore}/${HousesGettersEnum.getHouseInfo}`];
    });

    onMounted(() => {
      setHouseInfo();
      setApartments();
    });

    return {
      cooperationId,
      menu,
      menuActions,
      houseInfo,
      toggle,
      loading,
      apartmentsData,
      selectedApartment,
      onRowSelect,
      deleteApartmentDialog,
      deleteApartment,
      editApartmentDialog,
      editApartment,
      submitted,
      item,
      displayApartmentModal,
      openApartmentModal,
    };
  },
});
</script>

<style lang="scss" scoped>
.manage-apartments {
  height: 100%;
}

.wrapper {
  display: flex;
  flex-direction: column;

  .breadcrumb {
    margin: 0 0 1em 0;
  }
}

.wrapper-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .edit-btn,
  .add-btn {
    margin: 15px;
  }

  .add-btn {
    display: flex;
    justify-content: flex-end;
  }
}

.container {
  padding: 10px;
  border-radius: 10px;
  display: flex;
  background-color: #fafafa;
  justify-content: space-between;
  box-shadow: rgba(0, 0, 0, 0.1) -1px 4px 5px 1px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
}

.detailed-info {
  min-height: 150px;
  height: 100%;
  margin: 10px;

  & div {
    padding: 8px;

    & :nth-child(1) {
      font-weight: bold;
    }
  }
}

.dialog {
  &_item {
    margin-bottom: 20px;

    &-label {
      display: inline-block;
      margin-right: 15px;
    }
  }
}

.p-field {
  margin-bottom: 20px;
}
%error-message {
  margin: 0.4em 0.5rem;
  width: 100%;
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
  margin-top: 30px;
}
.p-error {
  display: flex;
  justify-content: right;
  margin-bottom: -30px;
  margin-top: 0;
  @extend %error-message;
}
</style>
