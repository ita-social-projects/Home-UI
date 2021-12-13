<template>
  <div class="apartment-info">
    <div class="wrapper">
      <div class="breadcrumb">
        <Breadcrumb />
      </div>
      <div class="wrapper-container">
        <div class="container">
          <div class="detailed-info">
            <div>
              <span>Квартира № {{ apartmentInfo?.apartmentNumber }}</span>
            </div>
            <div>
              <span>Площа квартири: </span>
              <span>{{ apartmentInfo?.apartmentArea }}</span>
            </div>
          </div>
          <div class="edit-btn">
            <Button label="Редагувати" icon="pi pi-pencil" class="p-button-outlined p-button-info" />
          </div>
        </div>

        <div class="container">
          <DataTable
            :value="ownershipsInfo"
            responsiveLayout="scroll"
            scrollHeight="400px"
            :loading="loading"
            v-model:selection="selectedOwner"
            selectionMode="single"
            dataKey="id"
          >
            <template #header>
              <h4>Інформація про власників та мешканців квартири</h4>
            </template>
            <Column field="fullName" header="Прізвище та ім'я" style="width: 25em" showGridlines></Column>
            <Column field="contact" header="Email" style="width: 20em" showGridlines></Column>
            <Column field="ownershipPart" header="Частка власності" style="width: 20em" showGridlines></Column>
            <Column
              field="voutsPart"
              header="Кількість голосів свіввласника"
              style="width: 25em"
              showGridlines
            ></Column>
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
        <Dialog v-model:visible="deleteOwnerDialog" :style="{ width: '450px' }" header="Попередження" :modal="true">
          <div class="confirmation-content">
            <span v-if="deleteData">
              Видалити власника <strong>{{ deleteData.fullName }}</strong
              >?</span
            >
          </div>
          <template #footer>
            <Button
              label="Скасувати"
              icon="pi pi-times"
              class="p-button-outlined p-button-info"
              @click="deleteOwnerDialog = false"
            />
            <Button label="Видалити" icon="pi pi-check" class="p-button-info" @click="deleteOwner" />
          </template>
        </Dialog>
        <Dialog
          v-model:visible="editOwnerDialog"
          :style="{ width: '450px' }"
          header="Редагувати частку власності"
          :modal="true"
        >
          <div class="p-field dialog">
            <label for="name" class="dialog_item-label"
              >Власник: <strong>{{ editData.fullName }}</strong></label
            >
          </div>
          <div class="p-field dialog">
            <label for="name" class="dialog_item-label">Частка власності: </label>
            <InputText
              id="name"
              v-model.trim="editData.ownershipPart"
              required="true"
              autofocus
              :class="{ 'p-invalid': submitted && !editData.ownershipPart }"
            />
            <small class="p-error" v-if="submitted && !editData.ownershipPart">Введіть частку власності</small>
          </div>
          <template #footer>
            <Button
              label="Скасувати"
              icon="pi pi-times"
              class="p-button-outlined p-button-info"
              @click="editOwnerDialog = false"
            />
            <Button label="Зберегти" icon="pi pi-check" class="p-button-info" @click="editOwner" />
          </template>
        </Dialog>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputText from 'primevue/inputtext';
import Dialog from 'primevue/dialog';
import Menu from 'primevue/menu';
import Breadcrumb from '@/components/Breadcrumb.vue';
import { computed, defineComponent, onMounted, ref, toRefs, watch } from 'vue';
import { useStore } from 'vuex';
import { StoreModuleEnum } from '@/store/types';
import { OwnershipsModel } from '@/shared/models/ownerships.model';
import { ContactsModel } from '@/shared/models/contacts.modal';
import { ApartmentsActionsEnum } from '@/store/apartments/types';
import { ApartmentModel } from '@/store/apartments/models/apartment.model';

export default defineComponent({
  name: 'ApartmentInfo',
  components: {
    Breadcrumb,
    Button,
    Menu,
    Column,
    DataTable,
    Dialog,
    InputText,
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
    apartment: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const ownershipsInfo: any = ref([]);
    const { apartment } = toRefs(props);
    const { id } = toRefs(props);
    const store = useStore();
    const selectedOwner = ref();
    const loading = ref(false);
    const submitted = ref(false);
    const editOwnerDialog = ref(false);
    const deleteOwnerDialog = ref(false);
    const editData = ref({});
    const deleteData = ref({});
    const item = ref({});
    const menu = ref();
    const menuActions = () => {
      return [
        {
          label: 'Видалити',
          icon: 'pi pi-times',
          command: () => {
            deleteOwnerDialog.value = true;
            deleteData.value = item.value;
            console.log(item);
          },
        },
        {
          label: 'Редагувати',
          icon: 'pi pi-refresh',
          command: () => {
            editOwnerDialog.value = true;
            editData.value = item.value;
            console.log(item);
          },
        },
      ];
    };

    const toggle = (event: any, data: any) => {
      menu.value.toggle(event);
      item.value = data;
    };

    const setOwnerships = async () => {
      await store.dispatch(`${StoreModuleEnum.ownershipsStore}/SET_OWNERSHIPS`, apartment.value);
      loading.value = false;
    };

    const ownerShipsData = computed(() => {
      return store.getters[`${StoreModuleEnum.ownershipsStore}/getOwnershipsData`];
    });

    const initData = () => {
      ownershipsInfo.value = [];
      ownerShipsData.value.map((el: any) => {
        const currentContact = el?.owner.contacts.find(
          (contact: ContactsModel) => !!contact.main && contact.type === 'email'
        );
        const newElem = {
          id: el?.id,
          fullName: `${el?.owner.firstName} ${el?.owner.middleName} ${el?.owner.lastName}`,
          contact: currentContact.email,
          ownershipPart: el?.ownershipPart,
          voutsPart: 0.675,
        };
        ownershipsInfo.value.push(newElem);
      });
    };

    watch(ownerShipsData, initData);

    const deleteOwner = () => {
      console.log('delete owner', deleteData.value);
      deleteOwnerDialog.value = false;
    };

    const editOwner = () => {
      console.log('edit owner');
      editOwnerDialog.value = false;
    };

    const setApartmentInfo = async () => {
      const payload = {
        houseId: id.value,
        apartmentId: apartment.value,
      };
      await store.dispatch(`${StoreModuleEnum.apartmentsStore}/${ApartmentsActionsEnum.GET_APARTMENT_BY_ID}`, payload);
    };

    const apartmentInfo = computed((): ApartmentModel => {
      return store.getters[`${StoreModuleEnum.apartmentsStore}/getApartmentInfo`];
    });

    onMounted(() => {
      setApartmentInfo();
      loading.value = true;
      setOwnerships();
      console.log(ownershipsInfo);
      console.log(apartmentInfo);
    });

    return {
      setApartmentInfo,
      apartmentInfo,
      setOwnerships,
      ownershipsInfo,
      ownerShipsData,
      menu,
      menuActions,
      toggle,
      selectedOwner,
      loading,
      submitted,
      item,
      editOwnerDialog,
      deleteOwnerDialog,
      editData,
      deleteData,
      deleteOwner,
      editOwner,
    };
  },
});
</script>

<style lang="scss" scoped>
.apartment-info {
  height: 100%;
}

.wrapper {
  height: 100%;

  .breadcrumb {
    margin: 0 0 1em 0;
  }
}

.wrapper-container {
  display: flex;
  flex-direction: column;
  height: 100%;

  .edit-btn {
    margin: 15px;
  }
}

.container {
  padding: 10px;
  border-radius: 10px;
  display: flex;
  background-color: #fafafa;
  justify-content: space-between;
  box-shadow: rgba(0, 0, 0, 0.1) -1px 4px 5px 1px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
  margin-bottom: 50px;
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
