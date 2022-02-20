<template>
  <div class="todo-item">
    <Fieldset :legend="model.title">
      <div class="task-wrapper">
        <p :class="{ done: model.isDone }">{{ model.description }}</p>
        <div class="btns">
          <Button :icon="!model.isDone ? 'pi pi-check' : 'pi pi-undo'" class="p-button-info" @click="onDone" />
          <Button icon="pi pi-times" class="p-button-danger" @click="onRemove" :disabled="!model.isDone" />
        </div>
      </div>
    </Fieldset>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Fieldset from 'primevue/fieldset';
import Button from 'primevue/button';
import { useStore } from 'vuex';
import { StoreModuleEnum } from '@/store/types';
import { TodoActionsEnum, TodoGettersEnum } from '../store/types';

export default defineComponent({
  name: 'TodoItem',
  components: {
    Fieldset,
    Button,
  },
  props: {
    model: {
      required: true,
      default: {
        id: 0,
        title: 'Create todo app',
        description: 'todo app using Vue 3 & Composition API',
        isDone: false,
      },
    },
  },
  setup(props) {
    const store = useStore();
    const onDone = () => {
      const payload = props.model.id;
      store.dispatch(`${StoreModuleEnum.todoStore}/${TodoActionsEnum.SET_TODO_DONE}`, payload);
      const updatedList = store.getters[`${StoreModuleEnum.todoStore}/${TodoGettersEnum.getAllTodos}`];

      store.dispatch(`${StoreModuleEnum.todoStore}/${TodoActionsEnum.SAVE_TO_LOCAL}`, updatedList);
    };
    const onRemove = () => {
      const payload = props.model.id;
      store.dispatch(`${StoreModuleEnum.todoStore}/${TodoActionsEnum.REMOVE_TODO}`, payload);

      const updatedList = store.getters[`${StoreModuleEnum.todoStore}/${TodoGettersEnum.getAllTodos}`];
      store.dispatch(`${StoreModuleEnum.todoStore}/${TodoActionsEnum.SAVE_TO_LOCAL}`, updatedList);
    };
    return {
      onDone,
      onRemove,
    };
  },
});
</script>

<style lang="scss" scoped>
.task-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2em;
}
.todo-item {
  min-width: 100%;
  margin-bottom: 0.5em;
  font-size: 1.4em;
}
.btns {
  display: flex;
  gap: 0.5em;
  flex-direction: column;
}
.done {
  text-decoration-line: line-through;
  opacity: 0.8;
}
::v-deep(.p-fieldset-content) {
  padding: 0 1em !important;
  padding-bottom: 0.5em !important;
}
</style>
