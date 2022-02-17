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
import { defineComponent, ref } from 'vue';
import TodoInput from '@/components/todoPage/TodoInput.vue';
import TodoItem from '@/components/todoPage/TodoItem.vue';
import { TodoListType } from '@/components/todoPage/store/types.ts';

export default defineComponent({
  name: 'TodoList',
  components: {
    TodoInput,
    TodoItem,
  },
  setup() {
    const title = ref('Список найбилжчих завдань:');
    const todoList = ref([
      {
        id: 1,
        title: 'Shoping day',
        description: 'Go to grocery store to buy some food and staff',
        isDone: false,
      },
      {
        id: 2,
        title: 'Learn Vue 3',
        description: 'Practicing Vue 3 applications, Composition API concepts, Vuex...',
        isDone: false,
      },
      {
        id: 3,
        title: 'Everyday gym',
        description: 'Go to gym for everyday exercices, health care staff',
        isDone: false,
      },
    ] as Array<TodoListType>);

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
  list-style: none;
  padding-left: 0;
}
</style>
