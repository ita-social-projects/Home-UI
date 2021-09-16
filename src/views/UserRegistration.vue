<template>
  <div class="registration__component" @submit.prevent="handleSubmit(!v$.$invalid)">
    <h1 class="title">Реєстрація користувача</h1>
    <div class="field">
      <input-text
        type="text"
        v-model="v$.firstName.$model"
        placeholder="Ім'я"
        :class="{ 'p-invalid': v$.firstName.$error }"
        @blur="v$.firstName.$touch"
      />
      <div class="error__area">
        <small v-if="v$.firstName.$error" id="email-help" class="p-error">{{ v$.firstName.$errors[0].$message }}</small>
      </div>
    </div>
    <div class="field">
      <input-text
        type="text"
        v-model="state.midleName"
        placeholder="По-батькові"
        :class="{ 'p-invalid': v$.midleName.$error }"
        @blur="v$.midleName.$touch"
      />
      <div class="error__area">
        <small v-if="v$.midleName.$error" id="email-help" class="p-error">{{ v$.midleName.$errors[0].$message }}</small>
      </div>
    </div>
    <div class="field">
      <input-text
        type="text"
        v-model="state.lastName"
        placeholder="Прізвище"
        :class="{ 'p-invalid': v$.lastName.$error }"
        @blur="v$.lastName.$touch"
      />
      <div class="error__area">
        <small v-if="v$.lastName.$error" id="email-help" class="p-error">{{ v$.lastName.$errors[0].$message }}</small>
      </div>
    </div>
    <div class="field">
      <input-text
        type="text"
        v-model="state.email"
        placeholder="e-mail"
        :class="{ 'p-invalid': v$.email.$error }"
        @blur="v$.email.$touch"
      />
      <div class="error__area">
        <small v-if="v$.email.$error" id="email-help" class="p-error">{{ v$.email.$errors[0].$message }}</small>
      </div>
    </div>
    <div class="field">
      <input-text
        type="text"
        v-model="state.password.password"
        placeholder="Пароль"
        :class="{ 'p-invalid': v$.password.password.$error }"
        @blur="v$.password.password.$touch"
      />
      <div class="error__area">
        <small v-if="v$.password.password.$error" id="email-help" class="p-error">{{
          v$.password.password.$errors[0].$message
        }}</small>
      </div>
    </div>
    <div class="field">
      <input-text
        type="text"
        v-model="state.password.confirm"
        placeholder="Підтвердження паролю"
        :class="{ 'p-invalid': v$.password.confirm.$error }"
        @blur="v$.password.confirm.$touch"
      />
      <div class="error__area">
        <small v-if="v$.password.confirm.$error" id="email-help" class="p-error">{{
          v$.password.confirm.$errors[0].$message
        }}</small>
      </div>
    </div>
    <div class="field">
      <input-text
        type="text"
        v-model="state.registrationKey"
        placeholder="Ключ реєстраціїї"
        :class="{ 'p-invalid': v$.registrationKey.$error }"
        @blur="v$.registrationKey.$touch"
      />
      <div class="error__area">
        <small v-if="v$.registrationKey.$error" id="email-help" class="p-error">{{
          v$.registrationKey.$errors[0].$message
        }}</small>
      </div>
    </div>
    <Button @click="submitForm">Зареєструватися</Button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import useVuelidate from '@vuelidate/core';
import { required, sameAs, email, minLength, maxLength, helpers } from '@vuelidate/validators';
import { reactive, computed, ref } from 'vue';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
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
    const maxLengthStr = 'Максимальна кількість символів - ';
    const requiredField = "Обов'язкове поле";
    const validKey = helpers.regex(/^[a-zA-Z0-9]*$/);
    const validPassword = helpers.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/);

    const rules = computed(() => {
      return {
        firstName: {
          required: helpers.withMessage(requiredField, required),
          maxLength: helpers.withMessage(`${maxLengthStr}50`, maxLength(50)),
        },
        midleName: {
          required: helpers.withMessage(requiredField, required),
          maxLength: helpers.withMessage(`${maxLengthStr}50`, maxLength(50)),
        },
        lastName: {
          required: helpers.withMessage(requiredField, required),
          maxLength: helpers.withMessage(`${maxLengthStr}50`, maxLength(50)),
        },
        email: {
          required: helpers.withMessage(requiredField, required),
          email: helpers.withMessage('E-mail повинен відповідати стандарту', email),
        },
        password: {
          password: {
            required: helpers.withMessage(requiredField, required),
            validPassword: helpers.withMessage(
              'Пароль повинен містити латинські великі та маленькі літери, цифри',
              validPassword
            ),
            maxLength: helpers.withMessage(`${maxLengthStr}128`, maxLength(128)),
          },
          confirm: {
            required: helpers.withMessage(requiredField, required),
            sameAs: sameAs(state.password.password),
          },
        },
        registrationKey: {
          required: helpers.withMessage(requiredField, required),
          validKey: helpers.withMessage('Ключ з E-mail, латинські великі та маленькі літери, цифри', validKey),
          minLength: helpers.withMessage('Ключ повинен мати 36 символів', minLength(36)),
          maxLength: helpers.withMessage('Ключ повинен мати 36 символів', maxLength(36)),
        },
      };
    });

    const submitted = ref(false);
    const showMessage = ref(false);
    // const getFirstName = ref();
    // const getMidleName = ref();
    // const getLastName = ref();
    // const getEmail = ref();
    // const getPassword = ref();
    // const getRegistrationKey = ref();

    const v$ = useVuelidate(rules, state);
    // const handleSubmit = (isFormValid) => {
    //   submitted.value = true;

    //   if (!isFormValid) {
    //     return;
    //   }

    //   // toggleDialog();
    // };

    return {
      state,
      v$,
    };
  },
  methods: {
    submitForm() {
      this.v$.$validate();
      if (!this.v$.$error) {
        alert('YES');
        console.log(this.state.firstName);
      } else {
        alert('no');
        console.log(this.state.lastName);
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.registration__component {
  display: flex;
  font-family: 'Open sans';
  flex-direction: column;
  align-items: center;
  margin: 150px auto;
  min-width: 700px;
  .field {
    display: flex;
    flex-direction: column;
    align-items: center;
    .p-inputtext {
      min-width: 500px;
    }
    .error__area {
      display: flex;
      align-items: center; /* Vertical center alignment */
      justify-content: center;
      height: 30px;
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
}
</style>
