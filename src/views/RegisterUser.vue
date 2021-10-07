<template>
  <div class="wrapper">
    <form class="registration__component" @submit.prevent="showStatus">
      <h1>Рєєстрація користувача</h1>
      <div class="field">
        <input-text
          type="text"
          v-model="state.formData.firstName"
          placeholder="Ім'я"
          :class="{ 'p-invalid': v$.firstName.$error }"
          @blur="v$.firstName.$touch"
        />
        <small v-if="v$.firstName.$error" class="p-error">{{ v$.firstName.$errors[0].$message }}</small>
      </div>
      <div class="field">
        <input-text
          type="text"
          v-model="state.formData.midleName"
          placeholder="По-батькові"
          :class="{ 'p-invalid': v$.midleName.$error }"
          @blur="v$.midleName.$touch"
        />
        <small v-if="v$.midleName.$error" class="p-error">{{ v$.midleName.$errors[0].$message }}</small>
      </div>
      <div class="field">
        <input-text
          type="text"
          v-model="state.formData.lastName"
          placeholder="Прізвище"
          :class="{ 'p-invalid': v$.lastName.$error }"
          @blur="v$.lastName.$touch"
        />
        <small v-if="v$.lastName.$error" class="p-error">{{ v$.lastName.$errors[0].$message }}</small>
      </div>
      <div class="field">
        <input-text
          type="text"
          v-model="state.formData.email"
          placeholder="e-mail"
          :class="{ 'p-invalid': v$.email.$error }"
          @blur="v$.email.$touch"
        />
        <small v-if="v$.email.$error" class="p-error">{{ v$.email.$errors[0].$message }}</small>
      </div>
      <div class="field">
        <input-text
          type="text"
          v-model="state.formData.password.password"
          placeholder="Пароль"
          :class="{ 'p-invalid': v$.password.password.$error }"
          @blur="v$.password.password.$touch"
        />
        <small v-if="v$.password.password.$error" class="p-error">{{ v$.password.password.$errors[0].$message }}</small>
      </div>
      <div class="field">
        <input-text
          type="text"
          v-model="state.formData.password.confirm"
          placeholder="Підтвердження паролю"
          :class="{ 'p-invalid': v$.password.confirm.$error }"
          @blur="v$.password.confirm.$touch"
        />
        <small v-if="v$.password.confirm.$error" class="p-error">{{ v$.password.confirm.$errors[0].$message }}</small>
      </div>
      <div class="field">
        <input-text
          type="text"
          v-model="state.formData.registrationKey"
          placeholder="Ключ реєстраціїї"
          :class="{ 'p-invalid': v$.registrationKey.$error }"
          @blur="v$.registrationKey.$touch"
        />
        <small v-if="v$.registrationKey.$error" class="p-error">{{ v$.registrationKey.$errors[0].$message }}</small>
      </div>
      <Button class="p-button-info" type="submit" :disabled="v$.$invalid">Зареєструватися</Button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, watch } from 'vue';
import useVuelidate from '@vuelidate/core';
import {
  requiredValidator,
  emailValidator,
  emailMinLength,
  emailMaxLength,
  emailLastCharsValidator,
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
import { UserStateInterface } from '@/store/user';
import { useToast } from 'primevue/usetoast';

export default defineComponent({
  name: 'userRegistration',
  components: { InputText, Button },
  setup() {
    const toast = useToast();
    const state = reactive({
      formData: {
        firstName: '',
        midleName: '',
        lastName: '',
        email: '',
        password: {
          password: '',
          confirm: '',
        },
        registrationKey: '',
      },
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
            sameAs: sameAs(state.formData.password.password),
          },
        },
        registrationKey: {
          requiredValidator,
        },
      };
    });
    const v$ = useVuelidate(rules, state.formData);
    async function sendInfo() {
      const userData: UserStateInterface['Data'] = {
        registration_token: state.formData.registrationKey,
        first_name: state.formData.firstName,
        last_name: state.formData.lastName,
        email: state.formData.email,
        password: state.formData.password.confirm,
        contacts: [{ id: Date.now(), type: 'email', main: false, email: state.formData.email }],
      };
      store.dispatch('userStore/SET_USER_INFO', userData);
    }
    const showInfo = (status: string, message: string) => {
      toast.add({ severity: status, summary: message, life: 6000 });
    };
    const resetFields = () => {
      state.formData.firstName = '';
      state.formData.midleName = '';
      state.formData.lastName = '';
      state.formData.email = '';
      state.formData.password = {
        password: '',
        confirm: '',
      };
      state.formData.registrationKey = '';
    };

    async function showStatus() {
      await sendInfo();
      watch(
        () => store.getters['userStore/getErrorMessage'],
        function () {
          const errMessage = store.getters['userStore/getErrorMessage'];
          const severityStatus = 'error';
          showInfo(severityStatus, errMessage);
          resetFields();
        }
      );
      watch(
        () => store.getters['userStore/getSuccessMessage'],
        function () {
          const severityStatus = 'success';
          const sucMessage = store.getters['userStore/getSuccessMessage'];
          showInfo(severityStatus, sucMessage);
          resetFields();
        }
      );
    }
    return {
      state,
      v$,
      showStatus,
    };
  },
});
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
  height: 100%;
  display: flex;

  .registration__component {
    @include flex-custom(flex-start, center, column nowrap);
    margin: auto;
    min-width: 400px;
    .field {
      @include flex-custom(flex-start, center, column nowrap);
      position: relative;
      margin: 15px;
      .p-inputtext {
        min-width: 500px;
      }
      small {
        bottom: -23px;
        position: absolute;
      }
    }
    .error__message {
      color: #f43c3c;
    }
    button {
      margin: 15px;
    }
  }
}
</style>
