<template>
  <div v-if="dataReady" class="wrapper">
    <div class="card">
      <div class="cards__wrap">
        <div class="card card__name">
          <div class="card__header__title"><h1>П.І.Б.</h1></div>
          <hr />
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
          <div class="card__header__title"><h1>Контакти</h1></div>
          <hr />

          <form @submit.prevent class="add__contact">
            <input-text v-model="phone" class="phone-input" placeholder="+38..." />
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
          </form>

          <Button @click="contactTest" type="submit" class="btn__add p-button-success p-button-sm p-button-outlined"
            >Додати контакт</Button
          >
          <table>
            <tr>
              <td>Email</td>
              <td>Priority</td>
              <td class="td__phone">{{ userInfo.email }}</td>
              <td class="td__del">
                <Button
                  @click="contactTest"
                  type="submit"
                  class="td__btn p-button-success p-button-sm p-button-outlined"
                  disabled
                  >Видалити</Button
                >
              </td>
            </tr>
            <tr v-if="showContact">
              <td>{{ typeContact.name }}</td>
              <td>{{ priorityContact.name }}</td>
              <td class="td__phone">+38063 777 77 77</td>
              <td class="td__del">
                <Button
                  @click="contactTest"
                  type="submit"
                  class="td__btn p-button-success p-button-sm p-button-outlined"
                >Видалити</Button
                >
              </td>
            </tr>
            <tr>
              <td>Телефон</td>
              <td>Додатковий</td>
              <td class="td__phone">+38063 777 77 77</td>
              <td class="td__del">
                <Button
                  @click="contactTest"
                  type="submit"
                  class="td__btn p-button-success p-button-sm p-button-outlined"
                >Видалити</Button
                >
              </td>
            </tr>
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
        <Button @click="onSubmit" type="submit" class="p-button-success p-button-sm p-button-outlined">Зберегти</Button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import { UserInterface } from '@/store/authorization/types';
import { RoutesEnum } from '@/router/types';

export default defineComponent({
  storeFirstName: 'ManageUser',
  components: { Button, InputText, Dropdown },
  data() {
    return {
      newUpdateData: {},
      dataReady: false,
      showContact: false,
      typeContact: null,
      priorityContact: null,
      phone: null,
      contactsType: [
        { name: 'Пошта', code: 'email' },
        { name: 'Телефон', code: 'phone' },
      ],
      contactsPriority: [
        { name: 'Основний', code: 'email' },
        { name: 'Додатковий', code: 'phone' },
      ],
    };
  },
  async mounted() {
    const user: string | null = localStorage.getItem('user');
    if (user !== null) {
      const userData: UserInterface = JSON.parse(user);
      await this.$store.dispatch('authorizationStore/GET_DATA', userData.id);
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

    contactTest() {
      this.showContact = true;
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
          margin-top: 28px;
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
