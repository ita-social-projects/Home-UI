<template>
  <div v-if="dataReady" class="wrapper">
    <div class="card">
      <div class="cards__wrap">
        <div class="card card__name">
          <h2 class="card__header__title">П.І.Б.</h2>
          <form class="user__form" @submit.prevent>
            <div class="field">
              <label for="firstName">І'мя</label>
              <input-text
                class="form__input"
                id="firstName"
                v-model.trim="firstName"
                type="text"
                @change="updateName"
                :class="{ 'p-invalid': v$.firstName.$error }"
                @blur="v$.firstName.$touch"
              />
              <small v-if="v$.firstName.$error" class="p-error">{{ v$.firstName.$errors[0].$message }}</small>
            </div>
            <div class="field">
              <label for="middleName">По-батькові</label>
              <input-text
                class="form__input"
                id="middleName"
                v-model.trim="middleName"
                type="text"
                @change="updateMiddleName"
                :class="{ 'p-invalid': v$.middleName.$error }"
                @blur="v$.middleName.$touch"
              />
              <small v-if="v$.middleName.$error" class="p-error">{{ v$.middleName.$errors[0].$message }}</small>
            </div>
            <div class="field">
              <label for="lastname">Прізвище</label>
              <input-text
                class="form__input"
                id="lastname"
                v-model.trim="lastName"
                type="text"
                @change="updateLastName"
                :class="{ 'p-invalid': v$.lastName.$error }"
                @blur="v$.lastName.$touch"
              />
              <small v-if="v$.lastName.$error" class="p-error">{{ v$.lastName.$errors[0].$message }}</small>
            </div>
          </form>
        </div>

        <div class="card card__contacts">
          <h2 class="card__header__title">Контакти</h2>
          <span>Додайте ваш новий контакт</span>
          <form @submit.prevent class="add__contact">
            <input-text class="phone-input" disabled v-if="typeContact === String" :placeholder="placeholderValue" />
            <input-text
              class="phone-input"
              v-else-if="typeContact.name === 'Телефон'"
              placeholder="Телефон"
              v-model.trim="inputValue.phone"
              :class="{ 'p-invalid': v$.inputValue.phone.$error }"
              @blur="v$.inputValue.phone.$touch"
            />
            <input-text
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
            @click="addContact"
            :disabled="v$.$invalid || typeContact === String"
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
            <template v-if="userInfo.contacts.length">
              <tr v-for="contact in userInfo.contacts" :key="contact.id">
                <td>{{ contact.type === 'email' ? 'Пошта' : 'Телефон' }}</td>
                <td>{{ contact.main === false ? 'Додатковий' : 'Основний' }}</td>
                <td>{{ contact.type === 'email' ? contact.email : contact.phone }}</td>
                <td class="td__del">
                  <Button
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
          @click="closeEditPage"
          label="Скасувати"
          icon="pi pi-times"
          class="btn p-button-secondary p-button-outlined p-button-sm"
        />
        <Button
          :disabled="v$.$invalid"
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
import {
  requiredValidator,
  nameValidator,
  nameLenghtValidator,
  emailValidator,
  emailMinLength,
  emailMaxLength,
  phoneNumberValidator,
} from '@/utils/validators';
import useVuelidate from '@vuelidate/core';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import { helpers, requiredIf } from '@vuelidate/validators';
import { UserModel } from '@/store/authorization/models/user.model';

export default defineComponent({
  storeFirstName: 'ManageUser',
  components: { Button, InputText, Dropdown },
  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  data() {
    return {
      firstName: '',
      middleName: '',
      lastName: '',
      newUpdateData: {},
      dataReady: false,
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
    };
  },
  async mounted() {
    const user: string | null = localStorage.getItem('user');
    if (user !== null) {
      const userData: UserModel = JSON.parse(user);
      await this.$store.dispatch('authorizationStore/GET_DATA', userData.id);
      this.firstName = this.userInfo.firstName;
      this.middleName = this.userInfo.middleName;
      this.lastName = this.userInfo.lastName;
      this.dataReady = true;
    }
  },
  validations() {
    return {
      firstName: {
        requiredValidator,
        nameValidator,
        nameLenghtValidator,
      },
      middleName: {
        requiredValidator,
        nameValidator,
        nameLenghtValidator,
      },
      lastName: {
        requiredValidator,
        nameValidator,
        nameLenghtValidator,
      },
      inputValue: {
        email: {
          required: helpers.withMessage(
            "Це обов'язкове поле",
            requiredIf((): any => {
              return this.typeContact.name === 'Пошта';
            })
          ),
          emailValidator,
          emailMinLength,
          emailMaxLength,
        },
        phone: {
          required: helpers.withMessage(
            "Це обов'язкове поле",
            requiredIf((): any => {
              return this.typeContact.name === 'Телефон';
            })
          ),
          phoneNumberValidator,
        },
      },
    };
  },
  methods: {
    showStatus(status: string, message: string) {
      this.$toast.add({ severity: 'error', summary: 'Error Message', detail: 'Message Content', life: 3000 });
    },
    updateName(e: any) {
      this.newUpdateData = { ...this.newUpdateData, firstName: e.target.value };
    },
    updateMiddleName(e: any) {
      this.newUpdateData = { ...this.newUpdateData, middleName: e.target.value };
    },
    updateLastName(e: any) {
      this.newUpdateData = { ...this.newUpdateData, lastName: e.target.value };
    },

    onSubmit() {
      if (this.inputValue.email.length > 0 || this.inputValue.phone.length > 0) {
        this.addContact();
      }
      this.$store.commit('authorizationStore/SET_FORM', this.newUpdateData);
      this.$store.dispatch('authorizationStore/UPDATE_USER', this.userInfo);
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
      this.$store.dispatch('authorizationStore/ADD_CONTACT', this.userContacts);
      this.inputValue.email = this.inputValue.phone = '';
      this.userContacts = [];
      this.typeContact = String;
    },

    deleteContact(idx: number) {
      this.$store.dispatch('authorizationStore/DELETE_CONTACT', idx);
    },
  },
  computed: {
    ...mapGetters({
      userInfo: 'authorizationStore/userData',
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
