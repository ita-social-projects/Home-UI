<template>
  <div>
    <h1>Список завдань</h1>
    <TodoAppEdit></TodoAppEdit>
    <hr />
    <TodoAppItem v-for="task in tasks" :key="task.id" :task="task"></TodoAppItem>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';
import { StoreModuleEnum } from '@/store/types';
import { TodoAppGettersEnum, TodoAppActionEnum } from '@/todoapp/store/types';
import TodoAppEdit from '@/todoapp/components/TodoAppEdit.vue';
import TodoAppItem from '@/todoapp/components/TodoAppItem.vue';

export default defineComponent({
  name: 'TodoApp',
  components: {
    TodoAppEdit,
    TodoAppItem,
  },
  setup() {
    const store = useStore();

    const tasks = computed(() => {
      store.dispatch(`${StoreModuleEnum.TodoAppStore}/${TodoAppActionEnum.getTasksLocalStorage}`);
      return store.getters[`${StoreModuleEnum.TodoAppStore}/${TodoAppGettersEnum.getTasks}`];
    });

    return {
      tasks,
    };
  },
});
</script>

<style scoped></style>
