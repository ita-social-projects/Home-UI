<template>
  <baseHeader />
  <div class="login__component">
    <h1 class="title">Вхід до Особистого кабінету</h1>
    <form @submit.prevent="" class="input__group">
      <span class="p-input-icon-right">
        <InputText
          id="email"
          type="text"
          placeholder="Email"
          v-model="email"
          @input="email = $event.target.value"
          @blur="v$.email.$touch"
          :class="{ 'p-invalid': v$.email.$error }"
        />
      </span>
      <small class="error__message" v-if="v$.email.$error">Потрібно заповнити поле</small>
      <span class="p-input-icon-right">
        <InputText
          id="password"
          type="password"
          placeholder="Пароль"
          v-model="password"
          @input="password = $event.target.value"
          @blur="v$.password.$touch"
          :class="{ 'p-invalid': v$.password.$error }"
        />
      </span>
      <div class="btn">
        <Button label="Увiйти" class="p-button-info" @click="userLogin" type="submit" />
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import useVuelidate from '@vuelidate/core';
import { required, email } from '@vuelidate/validators';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import BaseHeader from '../components/base/BaseHeader.vue';

export default defineComponent({
  name: 'userlogin',
  components: {
    InputText,
    Button,
    BaseHeader,
  },
  data() {
    return {
      v$: useVuelidate(),
      email: '',
      password: '',
    };
  },
  validations() {
    return {
      email: { required, email },
      password: { required },
    };
  },
  methods: {
    userLogin() {
      this.v$.$validate();
      if (!this.v$.$error) {
        // if success
        this.email = '';
        this.password = '';
      } else {
        // if failed
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.login__component {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 150px auto;
  .title {
    line-height: 120%;
  }
  .input__group {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .p-input-icon-right {
    margin: 1rem 0;
  }
  .btn {
    display: flex;
    align-self: flex-end;
  }
  .error__message {
    display: flex;
    margin: 0;
    color: #f43c3c;
  }
}
</style>
