<template>
  <ErrorPage :errorNumber="errorNumber" :errorMessage="errorMessage" :decision="decision">
    <nav>
      <router-link to="/main">Головна <span class="pi pi-arrow-right" /></router-link>
      <router-link v-if="!isLoggedIn" to="/login">Увійти <span class="pi pi-arrow-right" /></router-link>
      <router-link to="/register-cooperation">Зареєструвати об'єднання <span class="pi pi-arrow-right" /></router-link>
    </nav>
  </ErrorPage>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { StoreModuleEnum } from '@/store/types';
import ErrorPage from '@/components/ErrorPage.vue';
import { AuthGettersEnum } from '@/user/store/authorization/types';

export default defineComponent({
  name: 'PageNotFound',
  components: { ErrorPage },
  data() {
    return {
      errorNumber: '404',
      errorMessage: 'За вашим запитом не знайдено жодної сторінки :(',
      decision: 'Будь ласка, скористайтеся посиланнями для навігації',
    };
  },
  computed: {
    isLoggedIn(): boolean {
      return this.$store.getters[`${StoreModuleEnum.authorizationStore}/${AuthGettersEnum.loggedIn}`];
    },
  },
});
</script>

<style lang="scss" scoped>
nav {
  @include flex-custom(center, flex-start, column nowrap);
  padding: 1em 0;

  a {
    @include flex-center-all();
    font-size: 2em;
    font-weight: 300;
    color: $main-btn-background-color;
    text-decoration: none;
    border-bottom: 3px solid transparent;
    transition: color 0.6s;
    user-select: none;
    -webkit-user-drag: none;

    span {
      margin: 0 0 0 1em;
      transition: all 0.6s;
    }

    &:hover {
      color: $hover-btn-background-color;
      border-bottom: 3px solid;
    }

    &:active span {
      transform: translateX(2em);
    }
  }
}
</style>
