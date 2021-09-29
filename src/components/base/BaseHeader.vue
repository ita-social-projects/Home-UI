<template>
  <div class="header">
    <div class="header__logo">
      <img :src="require('@/assets/logo.svg')" alt="logo" />
    </div>

    <div class="header__info">
      <span>{{ headerInfo }}</span>
    </div>

    <div class="header__btn">
      <div>
        <Button v-show="$route.name !== '/login'" label="Увійти" @click="loginUser" class="p-button-info" />
      </div>
    </div>
  </div>
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
    // route check
  },
  methods: {
    loginUser() {
      this.$router.push(Routes.UserLogin);
    },
  },
});
</script>

<style lang="scss" scoped>
.header {
  height: 80px;
  width: 100%;
  background-color: #dbf1ed;
  box-shadow: rgba(0, 0, 0, 0.1) 0 1px 3px 0, rgba(0, 0, 0, 0.06) 0 1px 2px 0;
  display: flex;
  padding: 20px;

  font-family: Verdana, Geneva, Tahoma, sans-serif;
  color: #495057;
}
.header__logo {
  height: 40px;
  width: 100%;
  padding-left: 65px;
  padding-right: 15px;
  display: flex;
  flex: 1 1 auto;
  justify-content: flex-start;
}
.header__info {
  width: 100%;
  display: flex;
  flex: 1 1 auto;
  align-items: center;
  justify-content: center;
}
.header__btn {
  padding-left: 15px;
  padding-right: 65px;
  display: flex;
  width: 100%;
  flex: 1 1 auto;
  justify-content: flex-end;
}
</style>
