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
            :class="{ 'p-invalid': v$.email.$error || check.email.registered }"
            @blur="emailBlur"
            maxlength="321"
          />
          <small v-if="v$.email.$error" id="email-help" class="p-error">{{ v$.email.$errors[0].$message }}</small>
          <small v-else-if="check.email.registered" id="email-registered" class="p-error">
            Ця адреса вже зареєстрована
          </small>
        </div>
        <div>
          <label for="edrpou">ЄДРПОУ <span>*</span></label>
          <InputText
            id="edrpou"
            placeholder="12345678"
            v-model="edrpou"
            :class="{ 'p-invalid': v$.edrpou.$error || check.edrpou.registered }"
            @blur="edrpouBlur"
            maxlength="8"
          />
          <small v-if="v$.edrpou.$error" id="edrpou-help" class="p-error">{{ v$.edrpou.$errors[0].$message }}</small>
          <small v-else-if="check.edrpou.registered" id="edrpou-registered" class="p-error">
            На цей ЄДРПОУ вже зареєстровано кооперацію
          </small>
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
  requiredValidator,
  edrpouValidator,
  emailValidator,
  emailMinLength,
  emailMaxLength,
  emailLastCharsValidator,
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
        email: {
          valid: false,
          registered: false,
        },
        edrpou: {
          valid: false,
          registered: false,
        },
      },
      errors: {
        checkError: false,
        submitError: false,
      },
      isLetterSent: false,
    };
  },
  computed: {
    isFormValid(): boolean {
      const fieldsValid: boolean = this.check.email.valid && this.check.edrpou.valid;
      const nameAvailable: boolean = !this.check.email.registered && !this.check.edrpou.registered;
      const noError = !this.errors.checkError;
      return fieldsValid && noError && nameAvailable;
    },
    helloWorld(): string {
      return this.$store.getters['cooperationStore/getHelloWorldTwice'];
    },
  },
  methods: {
    emailBlur() {
      this.v$.email.$touch();
      this.v$.email.$validate().then((isValid) => {
        this.check.email.valid = false;
        if (isValid) {
          this.check.email.valid = true;
          this.checkEmailRegistered();
        }
      });
    },
    edrpouBlur() {
      this.v$.edrpou.$touch();
      this.v$.edrpou.$validate().then((isValid) => {
        this.check.edrpou.valid = false;
        if (isValid) {
          this.check.edrpou.valid = true;
          this.checkEdrpouRegistered();
        }
      });
    },
    checkEmailRegistered() {
      this.$http
        .get('/users', { params: { email: this.email } })
        .then((r: AxiosResponse) => {
          this.errors.checkError = false;
          this.check.email.registered = r.data.length !== 0;
        })
        .catch(() => {
          this.errors.checkError = true;
        });
    },
    checkEdrpouRegistered() {
      const payload = {
        params: {
          edrpou: this.edrpou,
        },
        successCallback: (r: AxiosResponse): void => {
          this.errors.checkError = false;
          this.check.edrpou.registered = r.data.length !== 0;
        },
        errorCallback: (): void => {
          this.errors.checkError = true;
        },
      };

      this.$store.dispatch('cooperationStore/IS_COOPERATION_REGISTERED', payload);
    },
    showSuccess() {
      this.isLetterSent = true;
      this.$toast.add({
        severity: 'success',
        summary: 'Юхуууу!',
        detail: 'Будь ласка, перевірте пошту для завершення реєстрації',
      });
    },
    registerCooperation() {
      this.v$.$validate().then((isValid) => {
        if (isValid) {
          this.showSuccess();
        }
      });
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
        $lazy: true,
      },
      edrpou: {
        requiredValidator,
        edrpouValidator,
      },
    };
  },
  watch: {
    edrpou(newValue) {
      this.count = newValue.length;
    },
    errors: {
      handler(newValue) {
        let detail = '';
        if (newValue.checkError) {
          detail = 'Під час перевірки даних виникла помилка. Будь ласка спробуйте пізніше';
        }
        if (newValue.submitError) {
          detail = 'Під час реєстрації виникла помилка. Будь ласка спробуйте пізніше';
        }
        this.$toast.add({ severity: 'error', summary: 'Помилка', detail });
      },
      deep: true,
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
