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
                :value="userInfo.first_name"
                type="text"
                @change="updateName"
              />
            </div>
            <div class="field">
              <label for="middleName">По-батькові</label>
              <input-text
                class="form__input"
                id="middleName"
                :value="userInfo.middle_name"
                type="text"
                @change="updateMiddleName"
              />
            </div>
            <div class="field">
              <label for="lastname">Прізвище</label>
              <input-text
                class="form__input"
                id="lastname"
                :value="userInfo.last_name"
                type="text"
                @change="updateLastName"
              />
            </div>
          </form>
        </div>

        <div class="card card__contacts">
          <h2 class="card__header__title">Контакти</h2>
          <span>Додайте ваш новий контакт</span>
          <form @submit.prevent class="add__contact">
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
                placeholder="Приоритет"
              />
            </div>
            <input-text
              type="text"
              v-model="email"
              class="phone-input"
              :placeholder="typeContact.code === 'email' ? 'email' : 'phone'"
            />
          </form>
          <Button @click="addContact" type="submit" class="btn__add p-button-success p-button-sm p-button-outlined"
            >Додати контакт</Button
          >
          <table>
            <tr style="color: #9a9898">
              <td>Пошта</td>
              <td>Основний</td>
              <td class="td__phone">{{ userInfo.email }}</td>
            </tr>
            <template v-if="userInfo.contacts.length">
              <tr v-for="contact in userInfo.contacts" :key="contact.id">
                <td>{{ contact.type === 'email' ? 'Пошта' : 'Телефон' }}</td>
                <td>{{ contact.main === false ? 'Додатковий' : 'Основний' }}</td>
                <td>{{ contact.email }}</td>
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
import { UserInterface } from '@/store/authorization/types';
import { RoutesEnum } from '@/router/types';
// primevue
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';

export default defineComponent({
  storeFirstName: 'ManageUser',
  components: { Button, InputText, Dropdown },
  data() {
    return {
      newUpdateData: {},
      dataReady: false,
      showContact: false,
      email: '',
      typeContact: {
        name: String,
        code: Boolean,
      },
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
      const userData: UserInterface = JSON.parse(user);
      await this.$store.dispatch('authorizationStore/GET_DATA', userData.id);
      await this.$store.dispatch('authorizationStore/SET_CONTACT');
      this.dataReady = true;
    }
  },
  methods: {
    updateName(e: any) {
      this.newUpdateData = { ...this.newUpdateData, first_name: e.target.value };
    },
    updateMiddleName(e: any) {
      this.newUpdateData = { ...this.newUpdateData, middle_name: e.target.value };
    },
    updateLastName(e: any) {
      this.newUpdateData = { ...this.newUpdateData, last_name: e.target.value };
    },

    onSubmit() {
      this.$store.commit('authorizationStore/SET_FORM', this.newUpdateData);
      this.$store.dispatch('authorizationStore/UPDATE_USER', this.userInfo);
      this.$router.push(RoutesEnum.MainPage);
    },

    closeEditPage() {
      this.$router.push(RoutesEnum.MainPage);
    },

    addContact() {
      this.userContacts.push({ type: this.typeContact.code, main: this.priorityContact.code, email: this.email });
      this.$store.dispatch('authorizationStore/ADD_CONTACT', this.userContacts);
      this.email = '';
      this.userContacts = [];
      this.$store.dispatch('authorizationStore/SET_CONTACT');
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
