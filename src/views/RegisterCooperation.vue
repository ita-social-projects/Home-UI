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
            maxlength="320"
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
    <transition name="success">
      <BaseSuccessPopup v-show="isLetterSent">
        На пошту <span class="bold"> {{ this.email }} </span> було вислано лист з кодом активації
      </BaseSuccessPopup>
    </transition>
    <transition name="error">
      <BaseErrorPopup v-show="check.error">
        Під час перевірки даних виникла помилка. Будь ласка спробуйте пізніше
      </BaseErrorPopup>
    </transition>
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

import BaseSuccessPopup from '@/components/base/BaseSuccessPopup.vue';
import BaseErrorPopup from '@/components/base/BaseErrorPopup.vue';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

export default defineComponent({
  name: 'RegisterCooperation',
  components: {
    BaseSuccessPopup,
    BaseErrorPopup,
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
        error: false,
      },
      isLetterSent: false,
    };
  },
  computed: {
    isFormValid(): boolean {
      const fieldsValid = this.check.email.valid && this.check.edrpou.valid;
      const nameAvailable = !this.check.email.registered && !this.check.edrpou.registered;
      const noError = !this.check.error;
      return fieldsValid && noError && nameAvailable;
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
        .get('/usersы', { params: { email: this.email } })
        .then((r) => {
          this.check.email.registered = r.data.length !== 0;
        })
        .catch(this.showError);
    },
    checkEdrpouRegistered() {
      this.$http
        .get('/cooperation', { params: { usreo: this.edrpou } })
        .then((r) => {
          this.check.edrpou.registered = r.data.length !== 0;
        })
        .catch(this.showError);
    },
    showSuccess() {
      this.isLetterSent = true;
      setTimeout(() => {
        this.isLetterSent = false;
      }, 10000);
    },
    showError() {
      this.check.error = true;
      setTimeout(() => {
        this.check.error = false;
      }, 3000);
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
        emailLastCharsValidator,
        emailValidator,
        emailMaxLength,
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
  },
});
</script>

<style scoped lang="scss">
.cooperation-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 2em;
}

.form-wrap {
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  background-color: #f2fbff;
  border-radius: 1em;
  padding: 2em;

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
  display: flex;
  justify-content: flex-end;
  margin: 0.6em 1em;
}

.counter-ok {
  color: #4f61ff;
}

.submit-buttons {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
</style>
