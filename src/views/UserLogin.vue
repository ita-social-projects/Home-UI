<template>
  <div class="login-component">
    <div class="form-group">
      <h4 v-for="user in users" :key="user.id">Привет {{ user.first_name }} {{ user.last_name }}</h4>
      <h1>Вхід до Особистого кабінету</h1>
      <form class="form-login" @submit.prevent="userLogin">
        <div class="form-login__item">
          <label for="email">Email</label>
          <InputText
            id="email"
            type="text"
            placeholder="Email"
            v-model.trim="email"
            @input="email = $event.target.value"
            @blur="emailBlur"
            maxlength="320"
            class="p-inputtext"
            :class="{ 'p-invalid': v$.email.$error }"
          />
          <small v-if="v$.email.$error" id="email-help" class="p-error">{{ v$.email.$errors[0].$message }}</small>
        </div>
        <div class="form-login__item">
          <label for="password">Пароль</label>
          <InputText
            id="password"
            type="password"
            placeholder="Пароль"
            v-model="password"
            @input="password = $event.target.value"
            @blur="passwordBlur"
            :class="{ 'p-invalid': v$.password.$error }"
          />
          <small v-if="v$.password.$error" id="password-help" class="p-error">{{
            v$.password.$errors[0].$message
          }}</small>
        </div>
        <section class="btn">
          <Button label="Увiйти" class="p-button-info" type="submit" />
        </section>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import useVuelidate from '@vuelidate/core';
import {
  requiredValidator,
  emailValidator,
  emailMinLength,
  emailMaxLength,
  emailLastCharsValidator,
  passwordMinLenght,
  passwordMaxLenght,
  passwordValidator,
} from '@/utils/validators';
const EMPTY_EMAIL = '';
const EMPTY_PASSWORD = '';

export default defineComponent({
  name: 'userlogin',
  components: {
    InputText,
    Button,
  },
  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  data() {
    return {
      email: '',
      password: '',
      users: {},
      isEmailValid: false,
      isPasswordValid: false,
    };
  },
  methods: {
    userLogin() {
      this.v$.$validate();
      if (!this.v$.$error) {
        // this.$http
        // .get('/users', { params: { email: this.email } }).
        // then((response) => this.users = response.data);
        // async check if user exist in DB
        // if exist - set to store
        // else - show validation error
        this.email = EMPTY_EMAIL;
        this.password = EMPTY_PASSWORD;
      } else {
        // if failed
      }
    },
    emailBlur() {
      this.v$.email.$touch();
      this.isEmailValid = !this.v$.email.$error;
    },
    passwordBlur() {
      this.v$.password.$touch();
      this.isPasswordValid = !this.v$.password.$error;
    },
  },
  validations() {
    return {
      email: {
        requiredValidator,
        emailMinLength,
        emailLastCharsValidator,
        emailValidator,
        emailMaxLength,
      },
      password: {
        requiredValidator,
        passwordMaxLenght,
        passwordMinLenght,
        passwordValidator,
      },
    };
  },
  watch: {},
});
</script>

<style lang="scss" scoped>
$login-component__mt: 150px;
$form-login__width: 75%;
$login-item__mr: 0.7em 0;
$login-label__mr: 0.8em 0;
$btn-mr: 2em;
%error-message {
  margin: 0.4em 0;
  width: 80%;
}

.login-component {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: $login-component__mt;
  .form-group {
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
    .form-login {
      width: $form-login__width;
      .form-login__item {
        display: flex;
        flex-flow: column;
        margin: $login-item__mr;
      }
      label {
        margin: $login-label__mr;
      }
    }
  }
  small {
    @extend %error-message;
  }
  .btn {
    margin-top: $btn-mr;
    display: flex;
    justify-content: flex-end;
  }
}
</style>
