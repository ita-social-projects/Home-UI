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
                <span>{{ houseInfo?.address.house_number }}</span>
              </div>
              <div>
                <span>Кількість квартир: </span>
                <span>{{ houseInfo?.quantity_flat }}</span>
              </div>
              <div>
                <span>Адреса: </span>
                <span>
                  місто {{ houseInfo?.address.city }}, вулиця {{ houseInfo?.address.street }}, будинок
                  {{ houseInfo?.address.house_number }}, {{ houseInfo?.address.house_block }} блок.
                </span>
              </div>
            </div>
          </div>
          <div class="edit-btn">
            <Button label="Редагувати" icon="pi pi-pencil" class="p-button-outlined p-button-info" />
          </div>
        </div>
        <div class="add-btn">
          <Button label="Додати квартиру" icon="pi pi-pencil" class="p-button-outlined p-button-info" />
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
            <Column style="width: 50rem" />
            <Column style="width: 10em">
              <template #body="slotProps">
                <Button
                  icon="pi pi-pencil"
                  class="p-button p-button-info p-button-text"
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
            <span v-if="deleteData">
              Видалити квартиру № <strong>{{ deleteData.apartmentNumber }}</strong
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
              v-model.trim="editData.apartmentNumber"
              required="true"
              autofocus
              :class="{ 'p-invalid': submitted && !editData.apartmentNumber }"
            />
            <small class="p-error" v-if="submitted && !editData.apartmentNumber">Введіть номер квартири</small>
          </div>
          <div class="p-field dialog_item">
            <label for="name" class="dialog_item-label">Площа квартири: </label>
            <InputText
              id="name"
              v-model.trim="editData.apartmentArea"
              required="true"
              autofocus
              :class="{ 'p-invalid': submitted && !editData.apartmentArea }"
            />
            <small class="p-error" v-if="submitted && !editData.apartmentArea">Введіть площу квартири</small>
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
import { HouseInterface, HousesActionsEnum } from '@/store/houses/types';
import { useStore } from 'vuex';
import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Dialog from 'primevue/dialog';
import Menu from 'primevue/menu';
import InputText from 'primevue/inputtext';
import Breadcrumb from '@/components/Breadcrumb.vue';
import { StoreModuleEnum } from '@/store/types';
import { ApartmentsActionsEnum } from '@/store/apartments/types';

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
  },
  props: {
    id: {
      type: Number,
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
    const deleteData = ref({});
    const editApartmentDialog = ref(false);
    const editData = ref({});
    const item = ref({});
    const submitted = ref(false);

    const toggle = (event: any, data: ApartmentModel) => {
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
            deleteData.value = item.value;
            deleteApartmentDialog.value = true;
          },
        },
        {
          label: 'Редагувати',
          icon: 'pi pi-refresh',
          command: () => {
            editApartmentDialog.value = true;
            editData.value = item.value;
          },
        },
      ];
    };

    const cooperationId = computed(() => {
      return store.getters[`${StoreModuleEnum.cooperationStore}/getSelectedCooperationId`];
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
      return store.getters[`${StoreModuleEnum.apartmentsStore}/getApartmentsData`];
    });

    const onRowSelect = () => {
      router.push({
        name: 'apartment-info',
        params: { apartment: selectedApartment.value.id },
      });
    };

    const setHouseInfo = async () => {
      const payload = {
        cooperationId: cooperationId.value,
        houseID: id.value,
      };
      await store.dispatch(`${StoreModuleEnum.housesStore}/${HousesActionsEnum.GET_HOUSE_BY_ID}`, payload);
    };

    const houseInfo = computed((): HouseInterface => {
      return store.getters[`${StoreModuleEnum.housesStore}/getHouseInfo`];
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
      deleteData,
      deleteApartment,
      editApartmentDialog,
      editData,
      editApartment,
      submitted,
      item,
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
</style>
