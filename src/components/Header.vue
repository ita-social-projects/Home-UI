<template>
  <header class="header">
    <div class="header__logo">
      <div class="logo" @click="redirectToMain"></div>
    </div>

    <div class="header__info">
      <span>{{ headerInfo }}</span>
    </div>

    <div class="header__btn">
      <Dropdown
        v-show="isLoggedIn"
        class="drop-menu"
        v-model="typeContact"
        :options="contactsType"
        optionLabel="name"
        placeholder="Обрати ОСББ"
      />
      <div>
        <Button
          v-if="!isLoggedIn"
          v-show="$route.name !== '/login'"
          label="Увійти"
          @click="redirectToLogin"
          class="p-button-info"
        />
        <Button
          label="Info"
          v-else
          type="button"
          @click="toggle"
          aria-haspopup="true"
          aria-controls="overlay_tmenu"
          class="p-button-rounded p-button-info p-button-sm"
        >
          <Avatar icon="pi pi-user" class="p-mr-2" style="background-color: #ffffff; color: #609af8" shape="circle" />
          <span class="p-ml-2 p-text-bold">{{ getNameFromStore }}</span>
        </Button>
        <Menu id="overlay_tmenu" ref="menu" :model="items" :popup="true" />
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { RoutesEnum } from '@/router/types';
import Avatar from 'primevue/avatar';
import Button from 'primevue/button';
import Menu from 'primevue/menu';

import Dropdown from 'primevue/dropdown';

export default defineComponent({
  name: 'baseHeader',
  data() {
    return {
      headerInfo: 'Додаток для керування ОСББ.',
      items: [
        {
          label: 'Редагувати',
          icon: 'pi pi-fw pi-pencil',
          command: () => {
            this.$router.push(RoutesEnum.ManageUser);
          },
        },

        {
          separator: true,
        },
        {
          label: 'Вийти',
          icon: 'pi pi-fw pi-power-off',
          command: () => {
            this.$store.dispatch('authorizationStore/SIGN_OUT', null);
            this.$router.push(RoutesEnum.StartPage);
          },
        },
      ],

      typeContact: null,
      contactsType: [{ name: 'Авіатор-1' }, { name: 'Дубовий гай' }, { name: 'Добробут' }],
    };
  },
  components: {
    Avatar,
    Button,
    Menu,
    Dropdown,
  },
  computed: {
    isLoggedIn(): boolean {
      return this.$store.getters['authorizationStore/loggedIn'];
    },
    getNameFromStore(): any {
      const dataFromStore = this.$store.getters['authorizationStore/userData'];
      return `${dataFromStore['firstName']} ${dataFromStore['lastName']}`;
    },
  },
  methods: {
    redirectToMain() {
      this.isLoggedIn ? this.$router.push(RoutesEnum.MainPage) : this.$router.push(RoutesEnum.StartPage);
    },
    redirectToLogin() {
      this.$router.push(RoutesEnum.UserLogin);
    },
    userLogout() {
      this.$store.dispatch('authorizationStore/SIGN_OUT', null);
      this.$router.push(RoutesEnum.StartPage);
    },
    toggle(event: any) {
      (this.$refs.menu as Menu).toggle(event);
    },
  },
});
</script>

<style lang="scss" scoped>
.header {
  height: 80px;
  width: 100%;
  background-color: $main-background-color;
  box-shadow: rgba(0, 0, 0, 0.1) 0 1px 3px, rgba(0, 0, 0, 0.06) 0 1px 2px;
  display: flex;
  align-items: center;
  padding: 20px;
  color: #495057;
  user-select: none;
}

.header__logo {
  @include flex-custom(flex-start);
  height: 40px;
  width: 100%;
  padding-left: 65px;
  padding-right: 15px;
  flex: 1 1 auto;

  .logo {
    height: 100%;
    width: 10em;
    background-image: url('../assets/logo.svg');
    background-repeat: no-repeat;
    background-position: 0 center;
    cursor: pointer;
  }
}
.header__info {
  @include flex-center-all();
  width: 100%;
  flex: 1 1 auto;
}

.header__btn {
  @include flex-custom(flex-end);
  align-items: center;
  width: 100%;
  flex: 1 1 auto;
  .drop-menu {
    width: 200px;
    background-color: $main-background-color;
    display: flex;
    align-items: center;
    box-shadow: none;
  }
  .p-avatar {
    margin-right: 10px;
  }
  button {
    margin: 0 65px;
  }
}
</style>
