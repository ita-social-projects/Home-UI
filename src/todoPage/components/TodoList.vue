<template>
  <h1>{{ title }}</h1>
  <div class="todo-list__wrapper">
    <TodoInput />
    <ul class="todo-list">
      <li v-for="todo in todoList" :key="todo.id">
        <TodoItem :model="todo" />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import TodoInput from '@/todoPage/components/TodoInput.vue';
import TodoItem from '@/todoPage/components/TodoItem.vue';
import { StoreModuleEnum } from '@/store/types';
import { TodoActionsEnum, TodoGettersEnum } from '../store/types';

export default defineComponent({
  name: 'TodoList',
  components: {
    TodoInput,
    TodoItem,
  },
  setup() {
    const title = ref('Список найближчих завдань:');
    const store = useStore();

    onMounted(() => {
      const localTodos = store.getters[`${StoreModuleEnum.todoStore}/${TodoGettersEnum.getTodosFromLocalStorage}`];
      if (localTodos?.length) {
        store.dispatch(`${StoreModuleEnum.todoStore}/${TodoActionsEnum.PARSE_LOCAL_TODOS}`, localTodos);
      }
    });

    const todoList = computed(() => store.getters[`${StoreModuleEnum.todoStore}/${TodoGettersEnum.getAllTodos}`]);

    return { title, todoList };
  },
});
</script>

<style lang="scss" scoped>
.todo-list__wrapper {
  width: 80%;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  padding-top: 2em;
}
.todo-list {
  min-width: 60%;
  list-style: none;
  padding-left: 0;
}
@media (max-width: 1200px) {
  .todo-list__wrapper {
    flex-direction: column;
  }
}
</style>
