<template>
  <div class="cooperation-wrap">
    <div class="form-wrap">
      <h1>ЗАРЕЄСТРУВАТИ ОБ'ЄДНАННЯ</h1>
      <form @submit.prevent="registerCooperation" class="coop-reg">
        <div>
          <label for="email">Електронна пошта <span>*</span></label>
          <InputText
            id="email"
            placeholder="john.doe@gmail.com"
            v-model.trim="email"
            :class="{ 'p-invalid': v$.email.$error || !check.isRegistrationAvailable }"
            @blur="emailBlur"
            maxlength="321"
          />
          <small v-if="v$.email.$error" id="email-help" class="p-error">{{ v$.email.$errors[0].$message }}</small>
        </div>
        <div>
          <label for="edrpou">ЄДРПОУ <span>*</span></label>
          <InputText
            id="edrpou"
            placeholder="12345678"
            v-model="edrpou"
            :class="{ 'p-invalid': v$.edrpou.$error || !check.isRegistrationAvailable }"
            @blur="edrpouBlur"
            maxlength="8"
          />
          <small v-if="v$.edrpou.$error" id="edrpou-help" class="p-error">{{ v$.edrpou.$errors[0].$message }}</small>
          <div class="counter" :class="{ 'counter-ok': count === 8 }">
            <span> {{ count }} </span>/8
          </div>
        </div>
        <section class="submit-buttons">
          <Button label="Відмінити" class="p-button-outlined p-button-info" @click="v$.$reset" type="reset" />
          <Button label="Заре'єструвати" :disabled="!isFormValid" class="p-button-info" type="submit" />
        </section>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import useVuelidate from '@vuelidate/core';
import {
  edrpouValidator,
  emailLastCharsValidator,
  emailMaxLength,
  emailMinLength,
  emailValidator,
  requiredValidator,
} from '@/utils/validators';

import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import { AxiosResponse } from 'axios';

export default defineComponent({
  name: 'RegisterCooperation',
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
      edrpou: '',
      count: 0,
      check: {
        isEmailValid: false,
        isEdrpouValid: false,
        isRegistrationAvailable: true,
      },
      submitError: false,
    };
  },
  computed: {
    isFormValid(): boolean {
      return this.check.isEmailValid && this.check.isEdrpouValid && this.check.isRegistrationAvailable;
    },
  },
  methods: {
    async emailBlur() {
      this.v$.email.$touch();
      this.check.isEmailValid = await this.v$.email.$validate();
      this.check.isRegistrationAvailable = true;
    },
    async edrpouBlur() {
      this.v$.edrpou.$touch();
      this.check.isEdrpouValid = await this.v$.edrpou.$validate();
      this.check.isRegistrationAvailable = true;
    },
    showSuccessToast() {
      this.$toast.add({
        severity: 'success',
        summary: 'Юхуууу!',
        detail: 'Будь ласка, перевірте пошту для завершення реєстрації',
      });
    },
    showAlreadyRegisteredToast() {
      this.$toast.add({
        severity: 'warn',
        summary: 'Помилка',
        detail: `Неможливо зареєструвати об'єднання з ЄДРПОУ ${this.edrpou} на адресу ${this.email}.
         Ви вже реєстрували об'єднання з таким кодом.`,
      });
    },
    showErrorToast() {
      this.$toast.add({
        severity: 'error',
        summary: 'Помилка',
        detail: 'Під час реєстрації виникла помилка. Будь ласка спробуйте пізніше',
      });
    },
    async registerCooperation() {
      const isValid = await this.v$.$validate();
      if (!isValid) {
        return;
      }

      const payload = {
        data: {
          email: this.email,
          edrpou: this.edrpou,
        },
        successCallback: (r: AxiosResponse) => {
          console.log('suc', r);
          // if (r.status === 202) {
          // }
          this.showSuccessToast();
        },
        errorCallback: () => {
          this.showErrorToast();
        },
      };
      this.$store.dispatch('cooperationStore/CREATE_COOPERATION', payload);
    },
  },
  validations() {
    return {
      email: {
        requiredValidator,
        emailMinLength,
        emailMaxLength,
        emailLastCharsValidator,
        emailValidator,
      },
      edrpou: {
        requiredValidator,
        edrpouValidator,
      },
    };
  },
  watch: {
    edrpou(value) {
      this.count = value.length;
    },
    submitError(value) {
      value && this.showErrorToast();
    },
  },
});
</script>

<style scoped lang="scss">
.cooperation-wrap {
  @include flex-custom(center);
  height: 100%;
  padding: 0 2em;
}

.form-wrap {
  @include flex-custom(center, center, column nowrap);
  background-color: rgba(242, 251, 255, 0.4);
  border-radius: 1em;
  padding: 2em;
  margin: 6em;

  .coop-reg > div {
    display: flex;
    flex-flow: column;
    margin: 1em 0;
  }
}

.coop-reg {
  width: 85%;

  label {
    margin: 0.8em 0;
  }

  label span {
    color: red;
    font-weight: 600;
  }

  small {
    margin: 0.4em 0;
    width: 80%;
  }
}

.counter {
  @include flex-custom(flex-end);
  margin: 0.6em 1em;
}

.counter-ok {
  color: #4f61ff;
}

.submit-buttons {
  width: 100%;
  display: flex;
  @include flex-custom(space-between);
}
</style>
