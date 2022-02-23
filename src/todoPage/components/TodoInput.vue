<template>
  <div class="todo-form">
    <span class="p-float-label">
      <InputText
        id="taskTitle"
        type="text"
        v-model="payload.title"
        :class="{ 'p-invalid': v$.title.$error }"
        @input="v$.title.$touch"
        maxlength="35"
      />
      <label for="taskTitle">Назва завдання</label>
    </span>
    <small v-if="v$.title.$error" class="p-error">{{ v$.title.$errors[0].$message }}</small>
    <span class="p-float-label">
      <InputText
        id="description"
        type="text"
        v-model="payload.description"
        :class="{ 'p-invalid': v$.description.$error }"
        @input="v$.description.$touch"
        maxlength="35"
      />
      <label for="description">Опис завдання</label>
    </span>
    <small v-if="v$.description.$error" class="p-error description-error">{{
      v$.description.$errors[0].$message
    }}</small>
    <Button
      label="Додати завдання"
      icon="pi pi-check"
      class="p-button-lg p-button-info"
      @click="onAddTask"
      :disabled="v$.$invalid"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from 'vue';
import { TaskType, TodoActionsEnum, TodoGettersEnum } from '../store/types';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import useVuelidate from '@vuelidate/core';
import { todoValidations } from '@/todoPage/validation/todoPageValidations';
import { useStore } from 'vuex';
import { StoreModuleEnum } from '@/store/types';

export default defineComponent({
  name: 'TodoInput',
  components: {
    InputText,
    Button,
  },
  setup() {
    const payload = reactive({ title: '', description: '' } as TaskType);
    const store = useStore();
    const rules = computed(() => {
      return {
        title: todoValidations.todoTitle,
        description: todoValidations.todoDescription,
      };
    });

    const v$ = useVuelidate(rules, payload);
    const onAddTask = () => {
      store.dispatch(`${StoreModuleEnum.todoStore}/${TodoActionsEnum.ADD_NEW_TODO}`, payload);
      const updatedList = store.getters[`${StoreModuleEnum.todoStore}/${TodoGettersEnum.getAllTodos}`];

      store.dispatch(`${StoreModuleEnum.todoStore}/${TodoActionsEnum.SAVE_TO_LOCAL}`, updatedList);
      payload.title = '';
      payload.description = '';
      v$.value.$reset();
    };

    return {
      payload,
      onAddTask,
      v$,
    };
  },
});
</script>

<style lang="scss" scoped>
.todo-form {
  position: relative;
  min-width: 35%;
  padding-top: 1.2em;
}
.todo-form [type='text'] {
  width: 70%;
  padding: 1em 0;
  margin-bottom: 2em;
}
.p-error {
  position: absolute;
  top: 65px;
}
.description-error {
  top: 135px;
}
</style>
