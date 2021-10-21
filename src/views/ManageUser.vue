<template>
  <div class="wrapper">
    <Card style="width: 25em">
      <template #header>
        <H1>SDAD</H1>
      </template>
      <template #title> П.І.Б </template>
      <template #subtitle> {{ newData }}</template>
      <template #content>
        <input-text
          v-model="myState.firstName"
          :placeholder="[[storeFirstName]]"
          :class="{ 'p-invalid': v$.firstName.$error }"
          @blur="v$.firstName.$touch"
          :disabled="myState.isDisabled"
        />
        <small v-if="v$.firstName.$error" class="p-error">{{ v$.firstName.$errors[0].$message }}</small>
        <input-text
          v-model="myState.middleName"
          :placeholder="[[storeMiddleName]]"
          :class="{ 'p-invalid': v$.firstName.$error }"
          @blur="v$.firstName.$touch"
          :disabled="myState.isDisabled"
        />
        <input-text v-model="lastName" disabled />
      </template>
      <template #footer>
        <Button @click="editData" icon="pi pi-check" label="Редагувати" />
        <Button
          @click="setFields"
          icon="pi pi-times"
          label="Cancel"
          class="p-button-secondary"
          style="margin-left: 0.5em"
        />
      </template>
    </Card>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, onMounted, reactive, ref } from 'vue';
import { mapGetters, mapState } from 'vuex';

import Card from 'primevue/card';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import useStore from '@/store';
import { state } from '@/store/authorization';
import { authorizationStore } from '@/store/authorization';
import { AuthorizationStateInterface } from '@/store/authorization/types';
import { RootStateInterface } from '@/store/types';
import store from '@/store';
import useVuelidate from '@vuelidate/core';
import { nameLenghtValidator, nameValidator, requiredValidator } from '@/utils/validators';

export default defineComponent({
  storeFirstName: 'ManageUser',
  components: { Card, Button, InputText },

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
    let newValue = ref('rrrrrrrr');
    onMounted(() => {
      //
    });
    const setFields = () => {
      const newUserDataFromStore = store.getters['authorizationStore/userData'];
      console.log(newUserDataFromStore);
    };
    setFields();

    const editData = () => {
      myState.isDisabled = false;
      console.log('edit data', myState.isDisabled);
    };

    storeFirstName = computed(() => store.state.authorizationStore.user?.first_name);
    storeMiddleName = computed(() => store.state.authorizationStore.user?.middle_name);

    console.log(myState.firstName, 'sdsaadsdaaa');

    return {
      storeFirstName,
      storeMiddleName,
      myState,
      newValue,

      v$,
      editData,
    };
  },
});
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
  height: 100%;
  display: flex;
}
</style>
