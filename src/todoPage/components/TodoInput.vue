<template>
  <div class="todo-form">
    <span class="p-float-label">
      <InputText id="taskTitle" type="text" v-model="payload.title" />
      <label for="taskTitle">Назва завдання</label>
    </span>
    <span class="p-float-label">
      <InputText id="description" type="text" v-model="payload.description" />
      <label for="description">Опис завдання</label>
    </span>
    <Button
      label="Додати завдання"
      icon="pi pi-check"
      class="p-button-lg p-button-info"
      @click="onAddTask"
      :disabled="!valid"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from 'vue';
import { TaskType, TodoActionsEnum, TodoGettersEnum } from '../store/types';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import { useStore } from 'vuex';
import { StoreModuleEnum } from '@/store/types';

export default defineComponent({
  name: 'TodoInput',
  components: {
    InputText,
    Button,
  },
  setup(props) {
    const payload = reactive({ title: '', description: '' } as TaskType);
    const store = useStore();

    const onAddTask = () => {
      store.dispatch(`${StoreModuleEnum.todoStore}/${TodoActionsEnum.ADD_NEW_TODO}`, payload);
      const updatedList = store.getters[`${StoreModuleEnum.todoStore}/${TodoGettersEnum.getAllTodos}`];

      store.dispatch(`${StoreModuleEnum.todoStore}/${TodoActionsEnum.SAVE_TO_LOCAL}`, updatedList);
      payload.title = '';
      payload.description = '';
    };

    const valid = computed(() => {
      return payload.title && payload.description;
    });

    return {
      payload,
      onAddTask,
      valid,
    };
  },
});
</script>

<style lang="scss" scoped>
.todo-form {
  min-width: 35%;
  padding-top: 1.2em;
}
.todo-form [type='text'] {
  width: 70%;
  margin-bottom: 1.5em;
}
</style>
