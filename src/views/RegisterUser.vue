<template>
  <div class="wrapper">
    <form class="registration__component" @submit.prevent="onSubmit">
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
          v-model="state.formData.middleName"
          placeholder="По-батькові"
          :class="{ 'p-invalid': v$.middleName.$error }"
          @blur="v$.middleName.$touch"
        />
        <small v-if="v$.middleName.$error" class="p-error">{{ v$.middleName.$errors[0].$message }}</small>
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
        <Password
          class="input-password-class"
          :feedback="false"
          v-model="state.formData.password.password"
          placeholder="Пароль"
          :class="{ 'p-invalid': v$.password.password.$error }"
          @blur="v$.password.password.$touch"
          toggleMask
        />
        <small v-if="v$.password.password.$error" class="p-error">{{ v$.password.password.$errors[0].$message }}</small>
      </div>
      <div class="field">
        <Password
          class="input-password-class"
          :feedback="false"
          v-model="state.formData.password.confirm"
          placeholder="Підтвердження паролю"
          :class="{ 'p-invalid': v$.password.confirm.$error }"
          @blur="v$.password.confirm.$touch"
          toggleMask
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
  userNameValidator,
  someTitleLenghtValidator,
} from '@/utils/validators';
import { sameAs } from '@vuelidate/validators';
import Password from 'primevue/password';

import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import store from '@/store';
import { UserStateInterface, UserActionEnum, UserGettersEnum } from '@/store/user/types';
import { useToast } from 'primevue/usetoast';
import { StoreModuleEnum } from '@/store/types';
import { ContactTypeEnum } from '@/store/authorization/types';

export default defineComponent({
  name: 'userRegistration',
  components: { InputText, Button, Password },
  setup() {
    const toast = useToast();
    const state = reactive({
      formData: {
        firstName: '',
        middleName: '',
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
          userNameValidator,
          someTitleLenghtValidator,
        },
        middleName: {
          requiredValidator,
          userNameValidator,
          someTitleLenghtValidator,
        },
        lastName: {
          requiredValidator,
          userNameValidator,
          someTitleLenghtValidator,
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
      const userData: UserStateInterface['data'] = {
        registrationToken: state.formData.registrationKey,
        firstName: state.formData.firstName,
        middleName: state.formData.middleName,
        lastName: state.formData.lastName,
        email: state.formData.email,
        password: state.formData.password.confirm,
        contacts: [{ type: ContactTypeEnum.EMAIL, main: false, email: state.formData.email }],
      };
      await store.dispatch(`${StoreModuleEnum.userStore}/${UserActionEnum.SET_USER_INFO}`, userData);
    }
    const showStatus = (status: string, message: string) => {
      toast.add({ severity: status, summary: message, life: 6000 });
    };
    const resetFields = () => {
      v$.value.$reset();
      state.formData.firstName = '';
      state.formData.middleName = '';
      state.formData.lastName = '';
      state.formData.email = '';
      state.formData.password = {
        password: '',
        confirm: '',
      };
      state.formData.registrationKey = '';
    };

    async function onSubmit() {
      await sendInfo();
      watch(
        () => store.getters[`${StoreModuleEnum.userStore}/${UserGettersEnum.getErrorMessage}`],
        function () {
          if (store.getters[`${StoreModuleEnum.userStore}/${UserGettersEnum.getErrorMessage}`]) {
            const errMessage = store.getters[`${StoreModuleEnum.userStore}/${UserGettersEnum.getErrorMessage}`];
            const severityStatus = 'error';
            showStatus(severityStatus, errMessage);
            store.dispatch(`${StoreModuleEnum.userStore}/${UserActionEnum.RESET_ERROR_ACTION}`);
          }
        }
      );
      watch(
        () => store.getters[`${StoreModuleEnum.userStore}/${UserGettersEnum.getSuccessMessage}`],
        function () {
          const severityStatus = 'success';
          const sucMessage = store.getters[`${StoreModuleEnum.userStore}/${UserGettersEnum.getSuccessMessage}`];
          showStatus(severityStatus, sucMessage);
          resetFields();
        }
      );
    }
    return {
      state,
      v$,
      onSubmit,
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
      min-width: 500px;

      .p-inputtext {
        width: 100%;
        min-width: 500px;
      }
      .input-password-class {
        ::v-deep {
          .p-inputtext {
            width: 100%;
          }
        }
      }
      div {
        width: 100%;
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
