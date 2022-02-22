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
                <span>{{ houseInfo?.address?.houseNumber }}</span>
              </div>
              <div>
                <span>Кількість квартир: </span>
                <span>{{ houseInfo?.flatQuantity }}</span>
              </div>
              <div>
                <span>Адреса: </span>
                <span>
                  місто {{ houseInfo?.address?.city }}, вулиця {{ houseInfo?.address?.street }}, будинок
                  {{ houseInfo?.address?.houseNumber }}, {{ houseInfo?.address?.houseBlock }} блок.
                </span>
              </div>
            </div>
          </div>
          <div class="edit-btn">
            <Button
              label="Редагувати"
              icon="pi pi-pencil"
              class="p-button-outlined p-button-info"
              @click="displayModalForEditHouse = true"
            />
            <Dialog
              header="Редагувати будинок"
              v-model:visible="displayModalForEditHouse"
              :style="{ width: '580px' }"
              :modal="true"
              :closable="false"
              :dismissableMask="true"
            >
              <ManageHouseForm
                :cooperationId="cooperationId"
                :houseData="houseInfo"
                :isEditHouse="true"
                @cancel-managing="displayModalForEditHouse = false"
              />
            </Dialog>
          </div>
        </div>
        <div class="add-btn">
          <Button
            label="Додати квартиру"
            icon="pi pi-pencil"
            class="p-button-outlined p-button-info"
            @click="displayApartmentModal = true"
          />
          <Dialog
            header="Додати квартиру"
            v-model:visible="displayApartmentModal"
            :modal="true"
            :closable="false"
            :dismissableMask="true"
          >
            <ApartmentForm
              :houseId="id"
              @apartment-saved="displayApartmentModal = false"
              @cancel="displayApartmentModal = false"
            >
            </ApartmentForm>
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
            <Button label="Видалити" icon="pi pi-check" class="p-button-info" @click="deleteApartment(item.id)" />
          </template>
        </Dialog>
        <Dialog
          v-model:visible="editApartmentDialog"
          :style="{ width: '450px' }"
          :modal="true"
          header="Редагувати квартиру"
        >
          <ApartmentForm
            :houseId="id"
            :apartmentId="item.id"
            :propsApartmentData="item"
            @apartment-saved="editApartmentDialog = false"
            @cancel="editApartmentDialog = false"
          >
          </ApartmentForm>
        </Dialog>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { toRefs, ref, computed, defineComponent, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { ApartmentModel } from '@/apartment/models/apartment.model';
import { useStore } from 'vuex';
import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Dialog from 'primevue/dialog';
import Menu from 'primevue/menu';
import Breadcrumb from '@/components/Breadcrumb.vue';
import ApartmentForm from '@/apartment/ApartmentForm.vue';
import { StoreModuleEnum } from '@/store/types';
import { CooperationGettersEnum } from '@/cooperation/store/types';
import { ApartmentsActionsEnum, ApartmentsGettersEnum } from '@/apartment/store/apartments/types';
import ManageHouseForm from '@/houses/components/ManageHouseForm.vue';
import { HousesActionsEnum, HousesGettersEnum } from '@/houses/store/types';
import { HouseModel } from '@/houses/models/house.model';

export default defineComponent({
  name: 'ManageApartments',
  components: {
    Breadcrumb,
    Button,
    DataTable,
    Column,
    Menu,
    Dialog,
    ManageHouseForm,
    ApartmentForm,
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
    const displayApartmentModal = ref(false);
    const displayModalForEditHouse = ref(false);

    const toggle = (event: KeyboardEvent, data: ApartmentModel) => {
      menu.value.toggle(event);
      item.value = data;
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

    const cooperationId = computed(() => {
      return store.getters[`${StoreModuleEnum.cooperationStore}/${CooperationGettersEnum.getSelectedCooperationId}`];
    });

    const deleteApartment = async (apartmentId: number) => {
      const payload = {
        houseId: id.value,
        apartmentId: apartmentId,
      };
      await store.dispatch(`${StoreModuleEnum.apartmentsStore}/${ApartmentsActionsEnum.DELETE_APARTMENT}`, payload);
      deleteApartmentDialog.value = false;
    };

    const setApartments = async () => {
      await store.dispatch(`${StoreModuleEnum.apartmentsStore}/${ApartmentsActionsEnum.SET_APARTMENTS}`, id.value);
      loading.value = false;
    };

    const apartmentsData = computed((): Array<ApartmentModel> => {
      return store.getters[`${StoreModuleEnum.apartmentsStore}/${ApartmentsGettersEnum.getApartmentsData}`];
    });

    const onRowSelect = (event: any) => {
      const apartmentId = event.data.id;
      router.push({
        name: 'apartment-info',
        params: { apartment: apartmentId },
      });
    };

    const setHouseInfo = async () => {
      const payload = {
        cooperationId: cooperationId.value,
        id: id.value,
      };

      await store.dispatch(`${StoreModuleEnum.housesStore}/${HousesActionsEnum.SET_HOUSE_BY_ID}`, payload);
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
      item,
      displayApartmentModal,
      displayModalForEditHouse,
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
</style>
