<template>
  <div class="wrapper">
    <form class="registration__component" @submit.prevent="getInfoFromForm">
      <h1 class="title">Реєстрація користувача</h1>
      <div class="field">
        <input-text
          type="text"
          v-model="v$.firstName.$model"
          placeholder="Ім'я"
          :class="{ 'p-invalid': v$.firstName.$error }"
          @blur="v$.firstName.$touch"
        />
        <small v-if="v$.firstName.$error" id="email-help" class="p-error">{{ v$.firstName.$errors[0].$message }}</small>
      </div>
      <div class="field">
        <input-text
          type="text"
          v-model="state.midleName"
          placeholder="По-батькові"
          :class="{ 'p-invalid': v$.midleName.$error }"
          @blur="v$.midleName.$touch"
        />
        <small v-if="v$.midleName.$error" id="email-help" class="p-error">{{ v$.midleName.$errors[0].$message }}</small>
      </div>
      <div class="field">
        <input-text
          type="text"
          v-model="state.lastName"
          placeholder="Прізвище"
          :class="{ 'p-invalid': v$.lastName.$error }"
          @blur="v$.lastName.$touch"
        />
        <small v-if="v$.lastName.$error" id="email-help" class="p-error">{{ v$.lastName.$errors[0].$message }}</small>
      </div>
      <div class="field">
        <input-text
          type="text"
          v-model="state.email"
          placeholder="e-mail"
          :class="{ 'p-invalid': v$.email.$error }"
          @blur="v$.email.$touch"
        />
        <small v-if="v$.email.$error" id="email-help" class="p-error">{{ v$.email.$errors[0].$message }}</small>
      </div>
      <div class="field">
        <input-text
          type="text"
          v-model="state.password.password"
          placeholder="Пароль"
          :class="{ 'p-invalid': v$.password.password.$error }"
          @blur="v$.password.password.$touch"
        />
        <small v-if="v$.password.password.$error" id="email-help" class="p-error">{{
          v$.password.password.$errors[0].$message
        }}</small>
      </div>
      <div class="field">
        <input-text
          type="text"
          v-model="state.password.confirm"
          placeholder="Підтвердження паролю"
          :class="{ 'p-invalid': v$.password.confirm.$error }"
          @blur="v$.password.confirm.$touch"
        />
        <small v-if="v$.password.confirm.$error" id="email-help" class="p-error">{{
          v$.password.confirm.$errors[0].$message
        }}</small>
      </div>
      <div class="field">
        <input-text
          type="text"
          v-model="state.registrationKey"
          placeholder="Ключ реєстраціїї"
          :class="{ 'p-invalid': v$.registrationKey.$error }"
          @blur="v$.registrationKey.$touch"
        />
        <small v-if="v$.registrationKey.$error" id="email-help" class="p-error">{{
          v$.registrationKey.$errors[0].$message
        }}</small>
      </div>
      <Button class="p-button-info" type="submit" :disabled="v$.$invalid">Зареєструватися</Button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from 'vue';
import useVuelidate from '@vuelidate/core';
import {
  requiredValidator,
  emailValidator,
  emailMinLength,
  emailMaxLength,
  emailLastCharsValidator,
  keyValidator,
  passwordValidator,
  passwordMinLenght,
  passwordMaxLenght,
  nameValidator,
  nameLenghtValidator,
} from '@/utils/validators';
import { sameAs } from '@vuelidate/validators';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import store from '@/store';
export default defineComponent({
  name: 'userRegistration',
  components: { InputText, Button },
  setup() {
    const state = reactive({
      firstName: '',
      midleName: '',
      lastName: '',
      email: '',
      password: {
        password: '',
        confirm: '',
      },
      registrationKey: '',
    });

    const rules = computed(() => {
      return {
        firstName: {
          requiredValidator,
          nameValidator,
          nameLenghtValidator,
        },
        midleName: {
          requiredValidator,
          nameValidator,
          nameLenghtValidator,
        },
        lastName: {
          requiredValidator,
          nameValidator,
          nameLenghtValidator,
        },
        email: {
          requiredValidator,
          emailValidator,
          emailMinLength,
          emailMaxLength,
          emailLastCharsValidator,
        },
        password: {
          password: {
            requiredValidator,
            passwordMinLenght,
            passwordValidator,
            passwordMaxLenght,
          },
          confirm: {
            requiredValidator,

            sameAs: sameAs(state.password.password),
          },
        },
        registrationKey: {
          requiredValidator,
          keyValidator,
        },
      };
    });
    const v$ = useVuelidate(rules, state);
    console.log(state.registrationKey, 'sssssss');

    const payload = {
      params: {
        registration_token: state.registrationKey,
        first_name: state.firstName,
        last_name: state.lastName,
        email: state.email,
        password: state.password.confirm,
        contacts: [{ type: 'email', main: true, email: state.email }],
      },
    };
    return {
      state,
      v$,
      payload,
      // sendInfo: () => store.dispatch('userStore/SET_FIRST_NAME', payload)
    };
  },
  methods: {
    getInfoFromForm() {
      console.log(this.state);
      console.log(this.state.password.confirm);
      console.log(this.payload);
      // console.log(this.sendInfo);
    },
  },
});
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  overflow: auto;

  .registration__component {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: auto;
    min-width: 400px;
    .field {
      display: flex;
      position: relative;
      margin: 15px;
      flex-direction: column;
      align-items: center;
      .p-inputtext {
        min-width: 500px;
      }
      small {
        bottom: -23px;
        position: absolute;
      }
    }
    .title {
      color: #646e7c;
      font-weight: bold;
      line-height: 120%;
    }
    .error__message {
      color: #f43c3c;
    }
    Button {
      margin: 15px;
    }
  }
}
</style>
