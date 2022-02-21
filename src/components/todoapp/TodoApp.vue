<template>
  <div>
    <h1>Hello word</h1>
    <TodoAppEdit></TodoAppEdit>
    <hr />
    <TodoAppItem v-for="task in tasks" :key="task.id" :task="task" :class="{ 'task-done': task.state }"></TodoAppItem>
    <!-- {{ tasks }} -->
  </div>
</template>

<script lang="ts">
import TodoAppEdit from '@/components/todoapp/TodoAppEdit.vue';
import TodoAppItem from './TodoAppItem.vue';

import { defineComponent, reactive, computed, toRefs, onMounted } from 'vue';

import { useStore } from 'vuex';
import { StoreModuleEnum } from '@/store/types';
import { TodoAppGettersEnum, TodoAppActionEnum } from '@/store/todoapp/types';
export default defineComponent({
  name: 'TodoApp',
  components: {
    TodoAppEdit,
    TodoAppItem,
  },
  setup() {
    const store = useStore();

    const tasks = computed(() => {
      console.log('ojfgskld');
      store.dispatch(`${StoreModuleEnum.TodoAppStore}/${TodoAppActionEnum.getTasksLocalStorage}`);
      return store.getters[`${StoreModuleEnum.TodoAppStore}/${TodoAppGettersEnum.getTasks}`];
    });

    return {
      tasks,
    };
  },
});
</script>

<style scoped>
.task-done {
  text-decoration: line-through;
}
</style>
