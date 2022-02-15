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
              <span>{{ apartmentInfo?.apartmentArea }} кв.м.</span>
            </div>
            <div>
              <span>Площа будинку: </span>
              <span>{{ houseInfo?.houseArea }} кв.м.</span>
            </div>
          </div>
          <div class="edit-btn">
            <Button
              label="Редагувати"
              icon="pi pi-pencil"
              class="p-button-outlined p-button-info"
              @click="displayEditApartmentModal = true"
            />
          </div>
        </div>
        <Dialog
          header="Редагувати квартиру"
          v-model:visible="displayEditApartmentModal"
          :style="{ width: '750px' }"
          :modal="true"
          :closable="false"
          :dismissableMask="true"
        >
          <ApartmentForm
            :houseId="id"
            :apartmentId="apartment"
            :propsApartmentData="apartmentInfo"
            @apartment-saved="displayEditApartmentModal = false"
            @cancel="displayEditApartmentModal = false"
          >
          </ApartmentForm>
        </Dialog>
        <div class="container">
          <DataTable
            responsiveLayout="scroll"
            scrollHeight="400px"
            dataKey="id"
            :value="ownershipsInfo"
            :loading="loading"
          >
            <template #header>
              <h4>Інформація про власників та мешканців квартири</h4>
            </template>
            <Column field="fullName" header="Прізвище та ім'я" style="width: 25em" showGridlines></Column>
            <Column field="contact" header="Email" style="width: 20em" showGridlines></Column>
            <Column field="ownershipPart" header="Частка власності" style="width: 20em" showGridlines></Column>
            <Column field="voutsPart" header="Кількість голосів свіввласника" style="width: 25em" showGridlines>
              <template #body="slotProps">
                {{ calcOwnerVoutingShare.find((el) => el.id === slotProps.data.id)?.ownershipPart }}
              </template>
            </Column>
            <Column style="width: 10em">
              <template #body="slotProps">
                <Button
                  icon="pi pi-pencil"
                  class="p-button p-button-info p-button-text"
                  type="button"
                  aria-haspopup="true"
                  aria-controls="overlay_menu"
                  @click="toggle($event, slotProps.data)"
                />
                <Menu id="overlay_menu" ref="menu" :model="menuActions()" :popup="true" />
              </template>
            </Column>
          </DataTable>
        </div>
        <Dialog header="Попередження" v-model:visible="deleteOwnerDialog" :style="{ width: '450px' }" :modal="true">
          <div class="confirmation-content">
            <span v-if="selectedOwner">
              Видалити власника <strong>{{ selectedOwner.fullName }}</strong
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
          header="Редагувати частку власності"
          v-model:visible="editOwnerDialog"
          :style="{ width: '450px' }"
          :modal="true"
        >
          <div class="p-field dialog">
            <label for="name" class="dialog_item-label">Власник: </label>
            <div>
              <strong>{{ selectedOwner.fullName }}</strong>
            </div>
          </div>
          <div class="p-field dialog">
            <label for="name" class="dialog_item-label">Частка власності: </label>
            <InputText
              id="name"
              required="true"
              maxlength="10"
              autofocus
              v-model.trim="editOwnershipData.ownershipPart"
              :class="{ 'p-invalid': v$.ownershipPart.$error }"
              @blur="checkSum(selectedOwner.id)"
              @input="v$.ownershipPart.$touch"
            />
            <small v-if="v$.ownershipPart.$error" class="p-error">{{ v$.ownershipPart.$errors[0].$message }}</small>
            <small v-if="isErrorOwnershipSum" class="p-error">{{ errorSumText }}</small>
          </div>
          <template #footer>
            <Button
              label="Скасувати"
              icon="pi pi-times"
              class="p-button-outlined p-button-info"
              @click="editOwnerDialog = false"
            />
            <Button
              label="Зберегти"
              icon="pi pi-check"
              class="p-button-info"
              :disabled="v$.$invalid || checkSum(selectedOwner.id)"
              @click="editOwner"
            />
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
import ApartmentForm from '@/apartment/ApartmentForm.vue';
import { computed, defineComponent, onMounted, reactive, ref, toRefs, watch } from 'vue';
import { useStore } from 'vuex';
import { StoreModuleEnum } from '@/store/types';
import { ApartmentModel } from '@/apartment/models/apartment.model';
import { OwnershipsModel } from '@/apartment/models/ownerships.model';
import { UpdateOwnershipsDTOModel } from '@/apartment/models/update-ownershipsDTO.model';
import { ApartmentsActionsEnum, ApartmentsGettersEnum } from '@/apartment/store/apartments/types';
import { OwnershipsActionEnum, OwnershipsGettersEnum } from '@/apartment/store/ownerships/types';
import { HousesActionsEnum, HousesGettersEnum } from '@/houses/store/types';
import { useVuelidate } from '@vuelidate/core';
import { requiredValidator, ownershipPartValidator } from '@/utils/validators';
import { CooperationGettersEnum } from '@/cooperation/store/types';
import { UserContactInterface } from '@/store/user/types';
import { ContactTypeEnum } from '@/store/authorization/types';
import { HouseModel } from '@/houses/models/house.model';

export default defineComponent({
  name: 'ApartmentInfo',
  components: {
    ApartmentForm,
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
      type: String,
      required: true,
    },
    apartment: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const ownershipsInfo: any = ref([]);
    const isErrorOwnershipSum = ref(false);
    const errorSumText =
      'Перевірте усі поля "Частка власності", сумма усіх часток власності повинна бути рівна чи менше 1';
    const { id, apartment } = toRefs(props);
    const store = useStore();
    const loading = ref(true);
    const submitted = ref(false);
    const editOwnerDialog = ref(false);
    const deleteOwnerDialog = ref(false);
    const displayEditApartmentModal = ref(false);
    const selectedOwner = ref({
      id: 0,
      fullName: '',
      ownershipPart: '',
      contact: '',
      voutsPart: 0,
    });
    const editOwnershipData = reactive({
      id: 0,
      ownershipPart: '',
    });
    const menu = ref();

    const rules = {
      owner: {
        ownershipPart: { requiredValidator, ownershipPartValidator },
      },
    };
    const v$ = useVuelidate(rules.owner, editOwnershipData);

    const menuActions = () => {
      return [
        {
          label: 'Видалити',
          icon: 'pi pi-times',
          command: () => {
            deleteOwnerDialog.value = true;
          },
        },
        {
          label: 'Редагувати',
          icon: 'pi pi-refresh',
          command: () => {
            editOwnershipData.id = selectedOwner.value.id;
            editOwnershipData.ownershipPart = selectedOwner.value.ownershipPart;
            editOwnerDialog.value = true;
          },
        },
      ];
    };

    const toggle = (event: Event, data: any) => {
      menu.value.toggle(event);
      selectedOwner.value = data;
    };

    const cooperationId = computed(() => {
      return store.getters[`${StoreModuleEnum.cooperationStore}/${CooperationGettersEnum.getSelectedCooperationId}`];
    });

    const setHouseInfo = async () => {
      const payload = {
        cooperationId: cooperationId.value,
        id: id.value,
      };

      await store.dispatch(`${StoreModuleEnum.housesStore}/${HousesActionsEnum.GET_HOUSE_BY_ID}`, payload);
    };

    const houseInfo = computed((): HouseModel => {
      return store.getters[`${StoreModuleEnum.housesStore}/${HousesGettersEnum.getHouseInfo}`];
    });

    const setApartmentInfo = () => {
      const payload = {
        houseId: id.value,
        apartmentId: apartment.value,
      };
      store.dispatch(`${StoreModuleEnum.apartmentsStore}/${ApartmentsActionsEnum.SET_APARTMENT_BY_ID}`, payload);
      loading.value = true;
    };

    const apartmentInfo = computed((): ApartmentModel => {
      return store.getters[`${StoreModuleEnum.apartmentsStore}/${ApartmentsGettersEnum.getApartmentInfo}`];
    });

    const setOwnerships = async () => {
      await store.dispatch(
        `${StoreModuleEnum.ownershipsStore}/${OwnershipsActionEnum.SET_OWNERSHIPS}`,
        apartment.value
      );
      loading.value = false;
    };

    const ownershipsData = computed(() => {
      return store.getters[`${StoreModuleEnum.ownershipsStore}/${OwnershipsGettersEnum.getOwnershipsData}`];
    });

    const initDataTable = () => {
      ownershipsInfo.value = [];
      ownershipsData.value.map((el: any) => {
        const currentContact = el?.owner.contacts.find(
          (contact: UserContactInterface) => !!contact.main && contact.type === ContactTypeEnum.email
        );

        const newElem = {
          id: el?.id,
          fullName: `${el?.owner.firstName} ${el?.owner.middleName} ${el?.owner.lastName}`,
          contact: currentContact.email,
          ownershipPart: el?.ownershipPart,
          voutsPart: 0,
        };

        ownershipsInfo.value.push(newElem);
      });
    };

    const calcOwnerVoutingShare = computed(() => {
      if (loading.value) {
        return [];
      } else {
        return ownershipsData.value.reduce((acc: any, cur: OwnershipsModel) => {
          const ownershipsPartNumber = convertFractionToDecimal(cur.ownershipPart);
          const voutingShare =
            (ownershipsPartNumber * (apartmentInfo?.value?.apartmentArea || 1) * 100) /
            (houseInfo?.value?.houseArea || 1);
          const element = {
            id: cur.id,
            ownershipPart: voutingShare.toFixed(3),
          };
          acc.push(element);
          return acc;
        }, []);
      }
    });

    const deleteOwner = () => {
      const payload = {
        apartmentId: apartment.value,
        ownerId: selectedOwner.value.id,
      };
      store.dispatch(`${StoreModuleEnum.ownershipsStore}/${OwnershipsActionEnum.DELETE_OWNER}`, payload);
      deleteOwnerDialog.value = false;
    };

    const editOwner = () => {
      if (editOwnershipData.ownershipPart === selectedOwner.value.ownershipPart) {
        editOwnerDialog.value = false;
        return;
      }
      const payload = {
        apartmentId: apartment.value,
        ownerId: selectedOwner.value.id,
        data: new UpdateOwnershipsDTOModel({
          ownershipPart: editOwnershipData.ownershipPart,
        }),
      };
      store.dispatch(`${StoreModuleEnum.ownershipsStore}/${OwnershipsActionEnum.EDIT_OWNER}`, payload);
      editOwnerDialog.value = false;
    };

    const convertFractionToDecimal = (fraction: string): number => {
      if (fraction.length === 1) return parseInt(fraction);
      const splitFraction = fraction.split('/');
      const decimal = (+splitFraction[0] / +splitFraction[1]).toFixed(4);
      return Number(decimal);
    };

    const sumOwnershipPart = computed(() => {
      return ownershipsData.value.reduce((acc: number, cur: any) => {
        acc += convertFractionToDecimal(cur.ownershipPart);
        return acc;
      }, 0);
    });

    const checkSum = (ownerId: number) => {
      const prevValue = ownershipsData.value.find((el: any) => el.id === ownerId).ownershipPart;
      const totalSum =
        Number(sumOwnershipPart.value) +
        convertFractionToDecimal(editOwnershipData.ownershipPart) -
        convertFractionToDecimal(prevValue);
      if (totalSum > 1) {
        isErrorOwnershipSum.value = true;
        return true;
      }
      isErrorOwnershipSum.value = false;
      return false;
    };

    watch(ownershipsData, initDataTable);

    onMounted(() => {
      setApartmentInfo();
      setHouseInfo();
      setOwnerships();
    });

    return {
      checkSum,
      isErrorOwnershipSum,
      errorSumText,
      convertFractionToDecimal,
      sumOwnershipPart,
      displayEditApartmentModal,
      v$,
      calcOwnerVoutingShare,
      setApartmentInfo,
      apartmentInfo,
      houseInfo,
      setOwnerships,
      ownershipsInfo,
      ownershipsData,
      menu,
      menuActions,
      toggle,
      selectedOwner,
      editOwnershipData,
      loading,
      submitted,
      editOwnerDialog,
      deleteOwnerDialog,
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
