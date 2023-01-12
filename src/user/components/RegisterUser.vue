<template>
  <div class="wrapper">
    <form class="registration__component" @submit.prevent="onSubmit">
      <h1>Рєєстрація користувача</h1>
      <div class="field">
        <input-text
          type="text"
          v-model="state.userFullName.firstName"
          placeholder="Ім'я"
          :class="{ 'p-invalid': v$.userFullName.firstName.$error }"
          @blur="v$.userFullName.firstName.$touch"
        />
        <small v-if="v$.userFullName.firstName.$error" class="p-error">{{
          v$.userFullName.firstName.$errors[0].$message
        }}</small>
      </div>
      <div class="field">
        <input-text
          type="text"
          v-model="state.userFullName.middleName"
          placeholder="По-батькові"
          :class="{ 'p-invalid': v$.userFullName.middleName.$error }"
          @blur="v$.userFullName.middleName.$touch"
        />
        <small v-if="v$.userFullName.middleName.$error" class="p-error">{{
          v$.userFullName.middleName.$errors[0].$message
        }}</small>
      </div>
      <div class="field">
        <input-text
          type="text"
          v-model="state.userFullName.lastName"
          placeholder="Прізвище"
          :class="{ 'p-invalid': v$.userFullName.lastName.$error }"
          @blur="v$.userFullName.lastName.$touch"
        />
        <small v-if="v$.userFullName.lastName.$error" class="p-error">{{
          v$.userFullName.lastName.$errors[0].$message
        }}</small>
      </div>
      <div class="field">
        <input-text
          type="text"
          v-model="state.email"
          placeholder="john.doe@gmail.com"
          :class="{ 'p-invalid': v$.email.$error }"
          @blur="v$.email.$touch"
        />
        <small v-if="v$.email.$error" class="p-error">{{ v$.email.$errors[0].$message }}</small>
      </div>
      <div class="field">
        <Password
          class="input-password-class"
          :feedback="false"
          v-model="state.password.password"
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
          v-model="state.password.confirm"
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
          v-model="state.registrationToken"
          placeholder="Ключ реєстраціїї"
          :class="{ 'p-invalid': v$.registrationToken.$error }"
          @blur="v$.registrationToken.$touch"
        />
        <small v-if="v$.registrationToken.$error" class="p-error">{{ v$.registrationToken.$errors[0].$message }}</small>
      </div>
      <Button class="p-button-info" type="submit" :disabled="v$.$invalid">Зареєструватися</Button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, watch } from 'vue';
import useVuelidate from '@vuelidate/core';
import { requiredValidator } from '@/utils/validators';
import { sameAs } from '@vuelidate/validators';
import Password from 'primevue/password';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import store from '@/store';
import { UserStateInterface, UserActionEnum, UserGettersEnum } from '@/user/store/user/types';
import { useToast } from 'primevue/usetoast';
import { StoreModuleEnum } from '@/store/types';
import { ContactTypeEnum } from '@/user/store/authorization/types';
import {
  userEmailValidations,
  userPasswordValidations,
  userFullNameValidations,
} from '@/user/utils/validators/userValidations';

export default defineComponent({
  name: 'userRegistration',
  components: { InputText, Button, Password },
  setup() {
    const toast = useToast();
    const state = reactive({
      userFullName: {
        firstName: '',
        middleName: '',
        lastName: '',
      },
      email: '',
      password: {
        password: '',
        confirm: '',
      },
      registrationToken: '',
    });
    const rules = computed(() => {
      return {
        userFullName: userFullNameValidations,
        email: userEmailValidations,
        password: {
          password: userPasswordValidations,
          confirm: {
            requiredValidator,
            sameAs: sameAs(state.password.password),
          },
        },
        registrationToken: {
          requiredValidator,
        },
      };
    });
    const v$ = useVuelidate(rules, state);

    async function sendInfo() {
      const userData: UserStateInterface['data'] = {
        registrationToken: state.registrationToken,
        firstName: state.userFullName.firstName,
        middleName: state.userFullName.middleName,
        lastName: state.userFullName.lastName,
        email: state.email,
        password: state.password.confirm,
        contacts: [{ type: ContactTypeEnum.email, main: false, email: state.email }],
      };

      await store.dispatch(`${StoreModuleEnum.userStore}/${UserActionEnum.SET_USER_INFO}`, userData);
    }

    const showStatus = (status: string, message: string) => {
      toast.add({ severity: status, summary: message, life: 6000 });
    };

    const resetFields = () => {
      v$.value.$reset();
      getProp(state);

      function getProp(obj: any) {
        for (let prop in obj) {
          typeof obj[prop] === 'object' ? getProp(obj[prop]) : (obj[prop] = '');
        }
      }
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
