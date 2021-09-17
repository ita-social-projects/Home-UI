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
            :class="{ 'p-invalid': v$.email.$error }"
            @blur="emailBlur"
            maxlength="320"
          />
          <small v-if="v$.email.$error" id="email-help" class="p-error">{{ v$.email.$errors[0].$message }}</small>
        </div>
        <div>
          <label for="edrpou">ЄДРПОУ <span>*</span></label>
          <InputText
            id="edrpou"
            placeholder="12345678"
            v-model="edrpou"
            :class="{ 'p-invalid': v$.edrpou.$error }"
            @blur="edrpouBlur"
            maxlength="8"
          />
          <small v-if="v$.edrpou.$error" id="edrpou-help" class="p-error">{{ v$.edrpou.$errors[0].$message }}</small>
          <div class="counter" :class="{ 'counter-ok': count === 8 }">
            <span>{{ count }}</span
            >/8
          </div>
        </div>
        <section class="submit-buttons">
          <Button label="Відмінити" class="p-button-outlined" type="reset" />
          <Button label="Заре'єструвати" :disabled="!isEdrpouValid" class="p-button-info" type="submit" />
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
      isEmailValid: false,
      isEdrpouValid: false,
    };
  },
  methods: {
    emailBlur() {
      this.v$.email.$touch();
      this.isEmailValid = !this.v$.email.$error;
    },
    edrpouBlur() {
      this.v$.edrpou.$touch();
      this.isEdrpouValid = !this.v$.edrpou.$error;
    },
    registerCooperation() {
      this.v$.$validate().then((isValid) => {
        if (isValid) {
          this.isEmailValid = true;
          this.isEmailValid = true;
          alert('successfully registered');
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
    isEmailValid(newValue) {
      if (newValue === true) {
        // this.isEmailRegistered();
      }
    },
  },
});
</script>

<style scoped lang="scss">
.cooperation-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2em;
}

.form-wrap {
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  background-color: #f2feff;
  border-radius: 10px;
  padding: 2em;
}

.coop-reg {
  width: 85%;
}

.form-wrap .coop-reg > div {
  display: flex;
  flex-flow: column;
  margin: 1em 0;
}

.coop-reg label {
  margin: 0.8em 0;
}

.coop-reg label span {
  color: red;
  font-weight: 600;
}

.coop-reg small {
  margin: 0.4em 0;
  width: 80%;
}

.counter {
  display: flex;
  justify-content: flex-end;
  margin: 0.6em 1em;
}

.counter-ok {
  color: #664fff;
}

.submit-buttons {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
</style>
