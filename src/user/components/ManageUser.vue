<template>
  <div class="wrapper">
    <div class="card">
      <div class="cards__wrap">
        <div class="card card__name">
          <h2 class="card__header__title">П.І.Б.</h2>
          <form class="user__form" @submit.prevent>
            <div class="field">
              <label for="firstName">І'мя</label>
              <InputText
                class="form__input"
                id="firstName"
                v-model.trim="userFullName.firstName"
                type="text"
                @change="updateName('firstName')"
                :class="{ 'p-invalid': v$.userFullName.firstName.$error }"
                @blur="v$.userFullName.firstName.$touch"
                @input="isDisabled = false"
              />
              <small id="firstName-help" v-if="v$.userFullName.firstName.$error" class="p-error">{{
                v$.userFullName.firstName.$errors[0].$message
              }}</small>
            </div>
            <div class="field">
              <label for="middleName">По-батькові</label>
              <InputText
                class="form__input"
                id="middleName"
                v-model.trim="userFullName.middleName"
                type="text"
                @change="updateName('middleName')"
                :class="{ 'p-invalid': v$.userFullName.middleName.$error }"
                @blur="v$.userFullName.middleName.$touch"
                @input="isDisabled = false"
              />
              <small id="middleName-help" v-if="v$.userFullName.middleName.$error" class="p-error">{{
                v$.userFullName.middleName.$errors[0].$message
              }}</small>
            </div>
            <div class="field">
              <label for="lastname">Прізвище</label>
              <InputText
                class="form__input"
                id="lastname"
                v-model.trim="userFullName.lastName"
                type="text"
                @change="updateName('lastName')"
                :class="{ 'p-invalid': v$.userFullName.lastName.$error }"
                @blur="v$.userFullName.lastName.$touch"
                @input="isDisabled = false"
              />
              <small id="lastname-help" v-if="v$.userFullName.lastName.$error" class="p-error">{{
                v$.userFullName.lastName.$errors[0].$message
              }}</small>
            </div>
          </form>
        </div>

        <div class="card card__contacts">
          <h2 class="card__header__title">Контакти</h2>
          <span>Додайте ваш новий контакт</span>
          <form @submit.prevent class="add__contact">
            <InputText class="phone-input" disabled v-if="typeContact === String" :placeholder="placeholderValue" />
            <InputText
              id="phone-input"
              class="phone-input"
              v-else-if="typeContact.name === 'Телефон'"
              placeholder="Телефон"
              v-model.trim="inputValue.phone"
              :class="{ 'p-invalid': v$.inputValue.phone.$error }"
              @blur="v$.inputValue.phone.$touch"
            />
            <InputText
              class="phone-input"
              v-else-if="typeContact.name === 'Пошта'"
              placeholder="Пошта"
              v-model.trim="inputValue.email"
              :class="{ 'p-invalid': v$.inputValue.email.$error }"
              @blur="v$.inputValue.email.$touch"
            />
            <div class="selections">
              <Dropdown
                class="drop__menu"
                v-model="typeContact"
                :options="contactsType"
                optionLabel="name"
                placeholder="Тип"
                @change="v$.inputValue.$reset()"
              />
              <Dropdown
                class="drop__menu"
                v-model="priorityContact"
                :options="contactsPriority"
                optionLabel="name"
                placeholder="Пріоритет"
              />
            </div>
          </form>
          <div>
            <small v-if="v$.inputValue.email.$error" class="p-error">{{
              v$.inputValue.email.$errors[0].$message
            }}</small>
          </div>
          <div>
            <small v-if="v$.inputValue.phone.$error" class="p-error">{{
              v$.inputValue.phone.$errors[0].$message
            }}</small>
          </div>

          <Button
            id="add-contact"
            @click="addContact"
            :disabled="v$.inputValue.$invalid || typeContact === String"
            type="submit"
            class="btn__add p-button-success p-button-sm p-button-outlined"
            >Додати контакт</Button
          >
          <table aria-describedby="contactTable">
            <th id="table-header"></th>
            <tr style="color: #9a9898">
              <td>Пошта</td>
              <td>Основний</td>
              <td class="td__phone">{{ userInfo.email }}</td>
            </tr>
            <template v-if="userInfo.contacts">
              <tr class="contact-tr" v-for="contact in userInfo.contacts" :key="contact.id">
                <td>{{ contact.type === 'email' ? 'Пошта' : 'Телефон' }}</td>
                <td>{{ contact.main === false ? 'Додатковий' : 'Основний' }}</td>
                <td>{{ contact.type === 'email' ? contact.email : contact.phone }}</td>
                <td class="td__del">
                  <Button
                    id="delete-contact"
                    @click="deleteContact(contact.id)"
                    label="Видалити"
                    type="submit"
                    class="td__btn p-button-danger p-button-sm p-button-outlined"
                  />
                </td>
              </tr>
            </template>
          </table>
        </div>
      </div>

      <div class="buttons__box">
        <Button
          id="cancel-button"
          @click="closeEditPage"
          label="Скасувати"
          icon="pi pi-times"
          class="btn p-button-secondary p-button-outlined p-button-sm"
        />
        <Button
          id="submit-btn"
          :disabled="v$.userFullName.$invalid || isDisabled"
          @click="onSubmit"
          label="Зберегти"
          icon="pi pi-check"
          type="submit"
          class="p-button-success p-button-sm"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';
import { RoutesEnum } from '@/router/types';
import useVuelidate from '@vuelidate/core';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import { userPhoneValidator } from '@/utils/validators';
import { helpers, requiredIf } from '@vuelidate/validators';
import { StoreModuleEnum } from '@/store/types';
import { AuthActionEnum, AuthMutationEnum, AuthGettersEnum } from '@/user/store/authorization/types';
import { userFullNameValidations, userEmailValidations } from '@/user/utils/validators/userValidations';
import { LocalStorageActionEnum, LocalStorageGettersEnum } from '../store/localstorage/types';

export default defineComponent({
  storeFirstName: 'ManageUser',
  components: { Button, InputText, Dropdown },
  data() {
    return {
      userFullName: {
        firstName: '',
        middleName: '',
        lastName: '',
      },
      newUpdateData: {},
      placeholderValue: 'Спочатку оберіть тип контакту...',
      inputValue: {
        email: '',
        phone: '',
      },
      typeContact: String,
      priorityContact: {
        name: String,
        code: Boolean,
      },
      contactsType: [
        { name: 'Пошта', code: 'email' },
        { name: 'Телефон', code: 'phone' },
      ],
      contactsPriority: [
        { name: 'Основний', code: true },
        { name: 'Додатковий', code: false },
      ],
      userContacts: [] as any,

      v$: useVuelidate(),
      isDisabled: true,
    };
  },
  mounted() {
    this.setData();
  },
  validations() {
    return {
      userFullName: userFullNameValidations,
      inputValue: {
        email: {
          required: helpers.withMessage(
            "Це обов'язкове поле",
            requiredIf((): any => {
              return this.typeContact.name === 'Пошта';
            })
          ),
          ...userEmailValidations,
        },
        phone: {
          required: helpers.withMessage(
            "Це обов'язкове поле",
            requiredIf((): any => {
              return this.typeContact.name === 'Телефон';
            })
          ),
          userPhoneValidator,
        },
      },
    };
  },
  methods: {
    async setData() {
      this.$store.dispatch(`${StoreModuleEnum.localStorageStore}/${LocalStorageActionEnum.GET_USER_FROM_STORAGE}`);
      await this.$store.dispatch(
        `${StoreModuleEnum.authorizationStore}/${AuthActionEnum.GET_DATA}`,
        this.storageUserData.id
      );

      this.userFullName.firstName = this.userInfo.firstName;
      this.userFullName.middleName = this.userInfo.middleName;
      this.userFullName.lastName = this.userInfo.lastName;
    },
    updateName(name: string) {
      let partOfName = Object.entries(this.userFullName).find((el, prop) => el[prop] === name);

      this.newUpdateData = { ...this.newUpdateData, [`${name}`]: partOfName ? partOfName[1] : '' };
    },

    async onSubmit() {
      if (this.inputValue.email.length > 0 || this.inputValue.phone.length > 0) {
        this.addContact();
      }
      this.$store.commit(`${StoreModuleEnum.authorizationStore}/${AuthMutationEnum.SET_FORM}`, this.newUpdateData);
      await this.$store.dispatch(`${StoreModuleEnum.authorizationStore}/${AuthActionEnum.UPDATE_USER}`, this.userInfo);

      this.$router.push(RoutesEnum.MainPage);
    },

    closeEditPage() {
      this.$router.push(RoutesEnum.MainPage);
    },

    addContact() {
      const contactsType: any = {
        type: this.typeContact.name,
        main: this.priorityContact.code,
      };
      if (contactsType.type === 'Пошта') {
        contactsType.email = this.inputValue.email;
        contactsType.type = 'email';
      } else {
        contactsType.phone = this.inputValue.phone;
        contactsType.type = 'phone';
      }
      this.userContacts.push(contactsType);
      this.$store.dispatch(`${StoreModuleEnum.authorizationStore}/${AuthActionEnum.ADD_CONTACT}`, this.userContacts);
      this.inputValue.email = this.inputValue.phone = '';
      this.userContacts = [];
      this.typeContact = String;
    },

    deleteContact(idx: number) {
      this.$store.dispatch(`${StoreModuleEnum.authorizationStore}/${AuthActionEnum.DELETE_CONTACT}`, idx);
    },
  },
  computed: {
    ...mapGetters({
      userInfo: `${StoreModuleEnum.authorizationStore}/${AuthGettersEnum.userData}`,
      storageUserData: `${StoreModuleEnum.localStorageStore}/${LocalStorageGettersEnum.getUserFromStorage}`,
    }),
  },
});
</script>

<style lang="scss" scoped>
h1 {
  margin: 0;
}
.wrapper {
  width: 100%;
  display: flex;
  .card {
    width: 100%;
    padding: 20px;
    height: auto;
    border-radius: 4px;
    background: #fff;
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.08), 0 0 6px rgba(0, 0, 0, 0.05);
    .card__header {
      display: flex;
      justify-content: flex-end;
      height: 46px;
      width: 100%;
      margin-bottom: 15px;
      .card__header__title {
        vertical-align: middle;
        line-height: normal;
      }
      .card__header__btn {
        margin-left: auto;
      }
    }

    .cards__wrap {
      display: flex;
      justify-content: space-between;

      .card__name {
        width: 35%;
        .user__form {
          width: 100%;
          .field {
            flex-basis: 100%;
            margin-bottom: 20px;
            background-color: rgb(255, 255, 255);
            .p-inputtext {
              margin-top: 5px;
              width: 100%;
            }
          }
        }
      }

      .card__contacts {
        width: 62%;
        .add__contact {
          display: flex;
          justify-content: space-between;
          margin-top: 5px;
          .phone-input {
            width: 50%;
          }
          .selections {
            display: flex;
            flex-basis: 48%;
            justify-content: space-between;
          }
          .drop__menu {
            width: 160px;
          }
        }
        .btn__add {
          margin-top: 15px;
        }

        table {
          margin-top: 15px;
          border-collapse: collapse;
          width: 100%;
          td {
            border-bottom: 1px solid #cecece;
            padding: 5px 0;
            text-align: center;
          }
          .td__btn {
            margin-top: 0px;
          }

          .td__del {
            border-bottom: none;
          }
        }
      }
    }

    .buttons__box {
      margin-top: 35px;
      display: flex;
      justify-content: flex-end;
      .btn {
        margin-right: 30px;
      }
    }
  }
}
</style>
