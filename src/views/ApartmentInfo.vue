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
              <span>{{ houseInfo?.house_area }} кв.м.</span>
            </div>
          </div>
          <div class="edit-btn">
            <Button
              label="Редагувати"
              icon="pi pi-pencil"
              class="p-button-outlined p-button-info"
              @click="openEditApartmentDialog"
            />
          </div>
        </div>
        <Dialog
          header="Редагувати квартиру"
          v-model:visible="visibleApartmentDialog"
          :style="{ width: '750px' }"
          :modal="true"
          :closable="false"
          :dismissableMask="true"
        >
          <form>
            <div>
              <label for="iban">Номер квартири : </label>
              <div class="input-block">
                <small v-if="v$.apartmentNumber.$error" class="p-error">{{
                  v$.apartmentNumber.$errors[0].$message
                }}</small>
                <InputText
                  id="apartmentNumber"
                  placeholder="Номер квартири"
                  v-model="editApartmentInfo.apartmentNumber"
                  :class="{ 'p-invalid': v$.apartmentNumber.$error }"
                  @input="v$.apartmentNumber.$touch"
                  maxlength="6"
                />
              </div>
            </div>
            <div>
              <label for="edrpou">Площа квартири : </label>
              <div class="input-block">
                <small v-if="v$.apartmentArea.$error" class="p-error">{{ v$.apartmentArea.$errors[0].$message }}</small>
                <InputText
                  id="apartmentArea"
                  placeholder="Площа квартири"
                  v-model="editApartmentInfo.apartmentArea"
                  :class="{ 'p-invalid': v$.apartmentArea.$error }"
                  @input="v$.apartmentArea.$touch"
                  maxlength="7"
                />
                <span> кв.м.</span>
              </div>
            </div>
          </form>

          <template #footer>
            <Button
              label="Редагувати"
              icon="pi pi-check"
              class="p-button-info"
              :disabled="v$.$invalid"
              @click="updateApartment"
            />

            <Button
              label="Скасувати"
              icon="pi pi-times"
              @click="visibleApartmentDialog = false"
              class="p-button-outlined p-button-info"
            />
          </template>
        </Dialog>

        <div class="container">
          <DataTable
            :value="ownershipsInfo"
            responsiveLayout="scroll"
            scrollHeight="400px"
            :loading="loading"
            dataKey="id"
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
          v-model:visible="editOwnerDialog"
          :style="{ width: '450px' }"
          header="Редагувати частку власності"
          :modal="true"
        >
          <div class="p-field dialog">
            <label for="name" class="dialog_item-label"
              >Власник: <strong>{{ selectedOwner.fullName }}</strong></label
            >
          </div>
          <div class="p-field dialog">
            <label for="name" class="dialog_item-label">Частка власності: </label>
            <InputText
              id="name"
              v-model.trim="editOwnershipData.ownershipPart"
              required="true"
              autofocus
              :class="{ 'p-invalid': v$$.ownershipPart.$error }"
              @blur="checkSum(selectedOwner.id)"
              @input="v$$.ownershipPart.$touch"
              maxlength="10"
            />
            <small v-if="v$$.ownershipPart.$error" class="p-error">{{ v$$.ownershipPart.$errors[0].$message }}</small>
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
              :disabled="v$$.$invalid || checkSum(selectedOwner.id)"
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
import { computed, defineComponent, onMounted, reactive, ref, toRefs, watch } from 'vue';
import { useStore } from 'vuex';
import { StoreModuleEnum } from '@/store/types';
import { ContactsModel } from '@/shared/models/contacts.modal';
import { ApartmentModel } from '@/store/apartments/models/apartment.model';
import { OwnershipsModel } from '@/shared/models/ownerships.model';
import { UpdateApartmentDTOModel } from '@/store/apartments/models/update-upartmentDTO.model';
import { UpdateOwnershipsDTOModel } from '@/shared/models/update-ownershipsDTO.model';
import { ApartmentsActionsEnum } from '@/store/apartments/types';
import { OwnershipsActionEnum } from '@/store/ownerships/types';
import { HousesActionsEnum } from '@/store/houses/types';
import { useVuelidate } from '@vuelidate/core';
import {
  requiredValidator,
  apartmentNumberValidator,
  apartmentAreaValidator,
  ownershipPartValidator,
} from '@/utils/validators';

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
    const loading = ref(true);
    const submitted = ref(false);
    const editOwnerDialog = ref(false);
    const deleteOwnerDialog = ref(false);
    const visibleApartmentDialog = ref(false);
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
    const editApartmentInfo = reactive({
      id: 0,
      apartmentNumber: '',
      apartmentArea: 0,
    });
    const menu = ref();

    const rules = {
      apartment: {
        apartmentNumber: { requiredValidator, apartmentNumberValidator },
        apartmentArea: { requiredValidator, apartmentAreaValidator },
      },
      owner: {
        ownershipPart: { requiredValidator, ownershipPartValidator },
      },
    };
    const v$ = useVuelidate(rules.apartment, editApartmentInfo);
    const v$$ = useVuelidate(rules.owner, editOwnershipData);

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

    const toggle = (event: any, data: any) => {
      menu.value.toggle(event);
      selectedOwner.value = data;
    };

    const cooperationId = computed(() => {
      return store.getters[`${StoreModuleEnum.cooperationStore}/getSelectedCooperationId`];
    });

    const setHouseInfo = async () => {
      const payload = {
        cooperationId: cooperationId.value,
        houseID: id.value,
      };
      await store.dispatch(`${StoreModuleEnum.housesStore}/${HousesActionsEnum.GET_HOUSE_BY_ID}`, payload);
    };

    const houseInfo = computed((): any => {
      return store.getters[`${StoreModuleEnum.housesStore}/getHouseInfo`];
    });

    const setApartmentInfo = () => {
      const payload = {
        houseId: id.value,
        apartmentId: apartment.value,
      };
      store.dispatch(`${StoreModuleEnum.apartmentsStore}/${ApartmentsActionsEnum.GET_APARTMENT_BY_ID}`, payload);
      loading.value = true;
    };

    const apartmentInfo = computed((): ApartmentModel => {
      return store.getters[`${StoreModuleEnum.apartmentsStore}/getApartmentInfo`];
    });

    const setOwnerships = async () => {
      await store.dispatch(
        `${StoreModuleEnum.ownershipsStore}/${OwnershipsActionEnum.SET_OWNERSHIPS}`,
        apartment.value
      );
      loading.value = false;
    };

    const ownershipsData = computed(() => {
      return store.getters[`${StoreModuleEnum.ownershipsStore}/getOwnershipsData`];
    });

    const displayFractionOwnershipPart = (ownershipPart: number) => {
      if (ownershipPart === 1) {
        return '1';
      } else if (ownershipPart === 0) {
        return '0';
      }
      const splitOwnershipPart = ownershipPart.toString().split('.')[1];
      const nullsQvt = splitOwnershipPart.length;

      const numerator = Number(splitOwnershipPart);
      const denominator = Math.pow(10, nullsQvt);
      const gcd = findGcd(numerator, denominator);

      const ownerFraction = `${numerator / gcd}/${denominator / gcd}`;
      return ownerFraction;
    };

    const findGcd = (a: number, b: number): number => {
      if (!b) {
        return a;
      }
      return findGcd(b, a % b);
    };

    const initDataTable = () => {
      ownershipsInfo.value = [];
      ownershipsData.value.map((el: any) => {
        const currentContact = el?.owner.contacts.find(
          (contact: ContactsModel) => !!contact.main && contact.type === 'email'
        );

        const newElem = {
          id: el?.id,
          fullName: `${el?.owner.firstName} ${el?.owner.middleName} ${el?.owner.lastName}`,
          contact: currentContact.email,
          ownershipPart: displayFractionOwnershipPart(el?.ownershipPart),
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
          const voutingShare =
            (cur.ownershipPart * (apartmentInfo?.value?.apartmentArea || 1) * 100) /
            (houseInfo?.value?.house_area || 1);
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
      // const splitOwnershipPart = editOwnershipData.ownershipPart.split('/');
      // const correctOwnershipPart = Number((+splitOwnershipPart[0] / +splitOwnershipPart[1]).toFixed(4));
      const correctOwnershipPart = Number(convertFractionToDecimal(editOwnershipData.ownershipPart));

      const payload = {
        apartmentId: apartment.value,
        ownerId: selectedOwner.value.id,
        payloadData: new UpdateOwnershipsDTOModel({
          ownershipPart: correctOwnershipPart,
        }),
        number: correctOwnershipPart, ////for mock and testing
      };
      store.dispatch(`${StoreModuleEnum.ownershipsStore}/${OwnershipsActionEnum.EDIT_OWNER}`, payload);
      editOwnerDialog.value = false;
    };

    const convertFractionToDecimal = (fraction: string) => {
      if (fraction === '1') {
        return '1';
      } else if (fraction === '0') {
        return '0';
      }
      const splitFraction = fraction.split('/');
      const decimal = String((+splitFraction[0] / +splitFraction[1]).toFixed(4));
      return decimal;
    };

    const openEditApartmentDialog = () => {
      visibleApartmentDialog.value = true;
      editApartmentInfo.id = apartmentInfo.value.id;
      editApartmentInfo.apartmentNumber = apartmentInfo.value.apartmentNumber;
      editApartmentInfo.apartmentArea = apartmentInfo.value.apartmentArea;
    };

    const updateApartment = () => {
      if (
        editApartmentInfo.apartmentNumber === apartmentInfo.value.apartmentNumber &&
        editApartmentInfo.apartmentArea === apartmentInfo.value.apartmentArea
      ) {
        visibleApartmentDialog.value = false;
        return;
      }
      const payload = {
        houseId: id.value,
        apartmentId: editApartmentInfo.id,
        payloadData: new UpdateApartmentDTOModel(editApartmentInfo),
      };
      store.dispatch(`${StoreModuleEnum.apartmentsStore}/${ApartmentsActionsEnum.EDIT_APARTMENT}`, payload);
      visibleApartmentDialog.value = false;
    };

    const sumOwnershipPart = computed(() => {
      const sum = ownershipsData.value.reduce((acc: number, cur: any) => {
        acc += Number(cur.ownershipPart);
        return acc;
      }, 0);
      return sum;
    });

    const checkSum = (id: any) =>{
      const prevValue = ownershipsData.value.find((el: any) => el.id === id);
      const check =
        Number(sumOwnershipPart.value) +
        Number(convertFractionToDecimal(editOwnershipData.ownershipPart)) -
        Number(prevValue.ownershipPart);
      console.log(check);
      if (check > 1) {
        console.log(true);
        return true;
      }
      console.log(false);
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
      convertFractionToDecimal,
      sumOwnershipPart,
      editApartmentInfo,
      openEditApartmentDialog,
      updateApartment,
      v$,
      v$$,
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
      visibleApartmentDialog,
      deleteOwner,
      editOwner,
      displayFractionOwnershipPart,
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
