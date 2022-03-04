<template>
  <div>
    <InputText placeholder="Назва задачі" v-model="data.task" :class="{ 'p-error': v$.task.$error }"> </InputText>
    <Button label="Додати задачу" @click="addTask"></Button>
    <div v-if="v$.task.$error">{{ v$.task.$errors[0].$message }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, reactive } from 'vue';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import { useStore } from 'vuex';
import useVuelidate from '@vuelidate/core';
import { todoAppValidations } from '@/todoapp/utils/validators/todoapp-validations';
import { StoreModuleEnum } from '@/store/types';
import { TodoAppActionEnum } from '@/todoapp/store/types';

export default defineComponent({
  name: 'TodoAppEdit',
  components: {
    Button,
    InputText,
  },
  setup() {
    const data = reactive({ task: '' });
    const store = useStore();

    const v$ = useVuelidate(todoAppValidations, data);

    const addTask = () => {
      v$.value.$validate();
      if (!v$.value.$error) {
        const crypto = window.crypto;
        var array = new Uint32Array(1);
        crypto.getRandomValues(array);
        const taskId = array[0];
        const payload = {
          id: taskId,
          title: data.task,
          state: false,
        };

        store.dispatch(`${StoreModuleEnum.TodoAppStore}/${TodoAppActionEnum.addTask}`, payload);
        v$.value.$reset();
        data.task = '';
      }
    };

    return {
      addTask,
      data,
      v$,
    };
  },
});
</script>

<style scoped>
.p-error {
  border-color: red;
}
</style>
