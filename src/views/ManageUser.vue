<template>
  <div class="wrapper">
    <div class="card">
      <div class="card__header">
        <div class="card__header__title"><h1>П.І.Б.</h1></div>
        <div class="card__header__btn">
          <div>
            <Button v-if="myState.isDisabled" @click="editData" icon="pi pi-pencil" label="Редагувати" />
            <Button
              v-if="!myState.isDisabled"
              @click="showData"
              icon="pi pi-check"
              label="Підтвердити"
              type="submit"
              :disabled="v$.$invalid"
            />

            <Button
              v-if="!myState.isDisabled"
              @click="resetFields"
              icon="pi pi-times"
              label="Cancel"
              class="p-button-secondary"
              style="margin-left: 0.5em"
            />
          </div>
        </div>
      </div>

      <div class="field">
        <label for="firstName">І'мя</label>
        <input-text
          id="firstName"
          type="text"
          v-model="myState.firstName"
          :placeholder="[[storeFirstName]]"
          :class="{ 'p-invalid': v$.firstName.$error }"
          @blur="v$.firstName.$touch"
          :disabled="myState.isDisabled"
        />
        <small v-if="v$.firstName.$error" class="p-error">{{ v$.firstName.$errors[0].$message }}</small>
      </div>
      <div class="field">
        <label for="middleName">По-батькові</label>
        <input-text
          id="middleName"
          type="text"
          v-model="myState.middleName"
          :placeholder="[[storeMiddleName]]"
          :class="{ 'p-invalid': v$.middleName.$error }"
          @blur="v$.middleName.$touch"
          :disabled="myState.isDisabled"
        />
        <small v-if="v$.middleName.$error" class="p-error">{{ v$.middleName.$errors[0].$message }}</small>
      </div>
      <div class="field">
        <label for="lastName">Прізвище</label>
        <input-text
          id="lastName"
          type="text"
          v-model="myState.lastName"
          :placeholder="[[storeLastName]]"
          :class="{ 'p-invalid': v$.lastName.$error }"
          @blur="v$.lastName.$touch"
          :disabled="myState.isDisabled"
        />
        <small v-if="v$.lastName.$error" class="p-error">{{ v$.lastName.$errors[0].$message }}</small>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref } from 'vue';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import store from '@/store';
import useVuelidate from '@vuelidate/core';
import { nameLenghtValidator, nameValidator, requiredValidator } from '@/utils/validators';

export default defineComponent({
  storeFirstName: 'ManageUser',
  components: { Button, InputText },

  setup() {
    const myState = reactive({
      firstName: '',
      middleName: '',
      lastName: '',
      email: '',
      isDisabled: true,
    });
    const rules = computed(() => {
      return {
        firstName: {
          requiredValidator,
          nameValidator,
          nameLenghtValidator,
        },
        middleName: {
          requiredValidator,
          nameValidator,
          nameLenghtValidator,
        },
        lastName: {
          requiredValidator,
          nameValidator,
          nameLenghtValidator,
        },
      };
    });
    const v$ = useVuelidate(rules, myState);
    let storeFirstName = ref();
    let storeMiddleName = ref();
    let storeLastName = ref();
    const editData = () => {
      myState.isDisabled = false;
      console.log('edit data', myState.isDisabled);
    };
    const showData = () => {
      console.log('edit data', myState.firstName);
      console.error(store.getters['authorizationStore/userData']);
    };
    const resetFields = () => {
      v$.value.$reset();
      myState.firstName = '';
      myState.middleName = '';
      myState.lastName = '';
      myState.email = '';
      myState.isDisabled = true;
    };

    storeFirstName = computed(() => store.state.authorizationStore.user?.first_name);
    storeMiddleName = computed(() => store.state.authorizationStore.user?.middle_name);
    storeLastName = computed(() => store.state.authorizationStore.user?.last_name);

    console.log(myState.firstName, 'sdsaadsdaaa');

    return {
      storeFirstName,
      storeMiddleName,
      storeLastName,
      myState,

      v$,
      editData,
      showData,
      resetFields,
    };
  },
});
</script>

<style lang="scss" scoped>
h1 {
  margin: 0;
}
.wrapper {
  width: 100%;
  display: flex;
  .card {
    width: 100%;
    padding: 20px;
    height: auto;

    border-radius: 4px;
    background: #fff;
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.08), 0 0 6px rgba(0, 0, 0, 0.05);
  }
  .field {
    width: 100%;
    padding-top: 20px;

    background-color: rgb(255, 255, 255);
    .p-inputtext {
      width: 100%;
      min-width: 500px;
    }
  }
  .card__header {
    display: flex;
    justify-content: space-between;
    height: 46px;
    width: 100%;
    .card__header__title {
      vertical-align: middle;
      line-height: normal;
    }
    .card__header__btn {
      margin-left: auto;
    }
  }
}
</style>
