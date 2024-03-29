<template>
  <div class="login-component">
    <div class="form-group">
      <span></span>
      <h1>Вхід до Особистого кабінету</h1>
      <form class="form-login" @submit.prevent="login">
        <div class="form-login__item">
          <label for="email">Email</label>
          <InputText
            id="email"
            type="text"
            placeholder="john.doe@gmail.com"
            v-model.trim="email"
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
            @blur="passwordBlur"
            :class="{ 'p-invalid': v$.password.$error || check.password.correct }"
          />
          <small v-if="v$.password.$error" id="password-help" class="p-error">{{
            v$.password.$errors[0].$message
          }}</small>
          <small v-else-if="check.password.correct" id="password-correct" class="p-error">
            Ви ввели невірний пароль
          </small>
        </div>
        <section class="btn">
          <Button label="Увiйти" class="p-button-info" type="submit" :disabled="v$.$invalid" />
        </section>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import { AxiosResponse } from 'axios';
import useVuelidate from '@vuelidate/core';
import { RoutesEnum } from '@/router/types';
import { StoreModuleEnum } from '@/store/types';
import { LocalStorageGettersEnum } from '@/user/store/localstorage/types';
import { AuthActionEnum } from '@/user/store/authorization/types';
import { userPasswordValidations, userEmailValidations } from '@/user/utils/validators/userValidations';

export default defineComponent({
  name: 'login',
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
      check: {
        email: {
          valid: false,
          unregistered: false,
        },
        password: {
          valid: false,
          correct: false,
        },
      },
      errors: {
        checkError: false,
        submitError: false,
      },
      isEmailValid: false,
      isPasswordValid: false,
    };
  },
  validations() {
    return {
      email: userEmailValidations,
      password: userPasswordValidations,
    };
  },
  computed: {
    isTokenExist(): boolean {
      return this.$store.getters[`${StoreModuleEnum.localStorageStore}/${LocalStorageGettersEnum.isTokenExist}`];
    },
  },
  methods: {
    emailBlur() {
      this.v$.email.$touch();
      this.isEmailValid = !this.v$.email.$error;
    },
    passwordBlur() {
      this.v$.password.$touch();
      this.isPasswordValid = !this.v$.password.$error;
    },
    login() {
      const payload = {
        data: {
          email: this.email,
          password: this.password,
        },
        successCallback: (r: AxiosResponse): void => {
          this.errors.checkError = false;
          this.check.email.unregistered = r.data.length === 0;
          if (this.isTokenExist) {
            this.$router.push(RoutesEnum.MainPage);
          }
        },
        errorCallback: (): void => {
          this.check.password.correct = true;
          this.errors.checkError = true;
          this.isPasswordValid = true;
        },
      };
      if (!this.v$.$error) {
        this.$store.dispatch(`${StoreModuleEnum.authorizationStore}/${AuthActionEnum.SIGN_IN}`, payload);
      }
    },
  },
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
  @include flex-center-all();
  margin-top: $login-component__mt;
  .form-group {
    @include flex-center-all-column();

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
