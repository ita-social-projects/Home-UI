<template>
  <header class="header">
    <div class="header__logo">
      <div class="logo" @click="redirectToMain"></div>
    </div>

    <div class="header__info">
      <span>{{ headerInfo }}</span>
    </div>

    <div class="header__btn">
      <div>
        <Button
          v-if="!isLoggedIn"
          v-show="$route.name !== '/login'"
          label="Увійти"
          @click="redirectToLogin"
          class="p-button-info"
        />
        <Button v-else label="Вийти" @click="userLogout" class="p-button-info" />
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Routes } from '@/router/types';
import Button from 'primevue/button';

export default defineComponent({
  name: 'baseHeader',
  data() {
    return {
      headerInfo: 'Додаток для керування ОСББ.',
    };
  },
  components: {
    Button,
  },
  computed: {
    isLoggedIn(): boolean {
      return this.$store.getters['userStore/loggedIn'];
    },
  },
  methods: {
    redirectToMain() {
      this.isLoggedIn ? this.$router.push(Routes.MainPage) : this.$router.push(Routes.StartPage);
    },
    redirectToLogin() {
      this.$router.push(Routes.UserLogin);
    },
    userLogout() {
      this.$router.push(Routes.StartPage);
      localStorage.removeItem('user');
    },
  },
});
</script>

<style lang="scss" scoped>
.header {
  height: 80px;
  width: 100%;
  background-color: $main-background-color;
  box-shadow: rgba(0, 0, 0, 0.1) 0 1px 3px 0, rgba(0, 0, 0, 0.06) 0 1px 2px 0;
  display: flex;
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
    width: 30%;
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
  padding-left: 15px;
  padding-right: 65px;
  width: 100%;
  flex: 1 1 auto;
}
</style>
