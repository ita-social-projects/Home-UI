<template>
  <div class="todo-item">
    <p :class="{ 'todo-item__is-finished-task': task.state }" class="todo-item__titile" @click="changeStateTask">
      {{ task.title }}
    </p>

    <section class="todo-item__section-bnt">
      <Button
        class="task__finished-button p-button-success p-button-text"
        icon="pi pi-check"
        @click="changeStateTask"
      ></Button>
      <Button class="task__delete-button p-button-danger p-button-text" icon="pi pi-times" @click="deleteTask"></Button>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
import Button from 'primevue/button';

import { useStore } from 'vuex';
import { StoreModuleEnum } from '@/store/types';
import { TodoAppActionEnum } from '@/todoapp/store//types';

export default defineComponent({
  name: 'TodoAppItem',
  components: {
    Button,
  },
  props: {
    task: Object as any,
  },
  setup(props) {
    const store = useStore();
    const changeStateTask = () => {
      store.dispatch(`${StoreModuleEnum.TodoAppStore}/${TodoAppActionEnum.actionChangeStateTask}`, props.task.id);
    };
    const deleteTask = () => {
      store.dispatch(`${StoreModuleEnum.TodoAppStore}/${TodoAppActionEnum.deleteTask}`, props.task.id);
    };
    return {
      changeStateTask,
      deleteTask,
    };
  },
});
</script>

<style scoped>
.todo-item {
  display: flex;
}
.todo-item__section-bnt {
  display: none;
}
.todo-item:hover .todo-item__section-bnt {
  display: inline-block;
}
.todo-item__is-finished-task {
  text-decoration: line-through;
}
</style>
