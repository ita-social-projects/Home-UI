<template>
  <header class="header">
    <div class="header__logo">
      <div class="logo" @click="redirectToMain"></div>
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
        <Button v-if="!isLoggedIn" label="Увійти" @click="redirectToLogin" class="p-button-info login_btn" />
        <Button
          label="Info"
          v-else
          type="button"
          @click="toggle"
          aria-haspopup="true"
          aria-controls="overlay_tmenu"
          class="p-button-rounded p-button-info p-button-sm avatar_btn"
        >
          <Avatar icon="pi pi-user" class="p-mr-2" style="background-color: #ffffff; color: #609af8" shape="circle" />
          <span class="user_name p-ml-2 p-text-bold">{{ getNameFromStore }}</span>
        </Button>
        <Menu id="overlay_tmenu" ref="menu" :model="items" :popup="true" />
      </div>
      <Button
        @click="showMobSidebar"
        v-show="!isStartPage"
        icon="pi pi-align-justify"
        label="Меню"
        class="menu_btn p-button-rounded p-button-info p-button"
      />
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
import { UserCredentialInterface, AuthActionEnum, AuthGettersEnum } from '@/user/store/authorization/types';
import { StoreModuleEnum } from '@/store/types';

export default defineComponent({
  name: 'baseHeader',
  emit: ['showMobSidebar'],
  data() {
    return {
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
            const payload = {
              firstName: '',
              middleName: '',
              lastName: '',
              email: '',
              id: 0,
              contacts: [],
            };
            this.$store.dispatch(`${StoreModuleEnum.authorizationStore}/${AuthActionEnum.SIGN_OUT}`, payload);
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
      return this.$store.getters[`${StoreModuleEnum.authorizationStore}/${AuthGettersEnum.loggedIn}`];
    },
    getNameFromStore(): any {
      const dataFromStore = this.$store.getters[`${StoreModuleEnum.authorizationStore}/${AuthGettersEnum.userData}`];
      return `${dataFromStore['firstName']} ${dataFromStore['lastName']}`;
    },
    isStartPage(): boolean {
      return this.$route.path === '/';
    },
  },
  async mounted() {
    const user: string | null = localStorage.getItem('user');
    if (user !== null) {
      const userData: UserCredentialInterface = JSON.parse(user);
      await this.$store.dispatch(`${StoreModuleEnum.authorizationStore}/GET_DATA`, userData.id);
    }
  },
  methods: {
    redirectToMain() {
      this.isLoggedIn ? this.$router.push(RoutesEnum.MainPage) : this.$router.push(RoutesEnum.StartPage);
    },
    redirectToLogin() {
      this.$router.push(RoutesEnum.UserLogin);
    },

    toggle(event: any) {
      (this.$refs.menu as Menu).toggle(event);
    },

    showMobSidebar() {
      this.$emit('showMobSidebar');
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
  padding-left: 65px;
  padding-right: 1rem;
  .logo {
    height: 100%;
    width: 10em;
    background-image: url('../assets/logo.svg');
    background-repeat: no-repeat;
    background-position: 0 center;
    cursor: pointer;
  }
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
    margin: 0 3rem 0 2rem;
  }

  .p-button.p-button-sm {
    padding: 0.5rem;
  }
}

@media (max-width: 768px) {
  .header__btn .drop-menu {
    display: none;
  }

  .header__btn .menu_btn {
    margin: 0 2rem 0 1rem;
  }
  .header__btn button {
    margin: 0;
  }

  .header__btn .p-button.p-button-lg {
    font-size: 1rem;
  }

  .header__logo {
    padding-left: 0;
  }
}

@media (min-width: 769px) {
  .header__btn .menu_btn {
    display: none;
  }
}

@media (max-width: 590px) {
  .header {
    padding: 20px 7px 20px 7px;
  }

  .user_name {
    display: none;
  }

  .header__btn .p-avatar {
    margin-right: 0;
  }

  .header__btn .menu_btn {
    margin: 0 0.5rem 0 0.75rem;
    padding: 0.75rem;
  }

  .header__btn .login_btn {
    padding: 0.75rem;
  }

  .header__logo {
    padding-right: 0;
  }

  .header .header__logo .logo {
    width: 9em;
  }
}
</style>
