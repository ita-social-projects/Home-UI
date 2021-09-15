<template>
  <BaseHeader />
  <div class="login__component">
    <h1 class="title">Вхід до Особистого кабінету</h1>
    <div class="input__group">
      <span class="p-input-icon-right">
        <i class="pi pi-envelope"></i>
        <InputText
          id="email"
          type="text"
          placeholder="Email"
          v-model="email"
          @input="email = $event.target.value"
          @blur="v$.email.$touch"
        />
      </span>
      <div class="error__message" v-if="v$.email.$error">Потрібно заповнити поле</div>
      <span span class="p-input-icon-right">
        <i class="pi pi-lock"></i>
        <InputText
          id="password"
          type="password"
          placeholder="Пароль"
          v-model="password"
          @input="password = $event.target.value"
        />
      </span>
      <div class="btn">
        <Button label="Увiйти" icon="pi pi-user" class="p-button-sm" @click="userLogin" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import useVuelidate from '@vuelidate/core';
import { required, email } from '@vuelidate/validators';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import BaseHeader from './base/BaseHeader.vue';
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
        alert('success');
        console.log({
          email: this.email,
          password: this.password,
        });
        this.email = '';
        this.password = '';
      } else {
        alert('failed');
      }
    },
  },
  // computed: {
  //   nameErrors() {
  //     const errors = [];
  //     if (!this.v$.email.required) errors.push('Потрібно заповнити поле');
  //     return errors;
  //   }
  // },
});
</script>

<style lang="scss" scoped>
.login__component {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 150px auto;
  max-width: 450px;
  .title {
    font-family: 'Open sans';
    color: #646e7c;
    font-weight: bold;
    line-height: 120%;
  }
  .input__group {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .p-input-icon-right {
    margin: 1rem;
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
