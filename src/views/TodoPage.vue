<template>
  <h1>My ToDO!</h1>
  <todo-form @create="createTodo"/>
  <ol>
    <todo-list :todos="todos" />
  </ol>
  
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TodoForm from '@/components/todo/TodoForm.vue';
import TodoList from '@/components/todo/TodoList.vue';

export default defineComponent({
  components: {
    TodoForm,
    TodoList,
  },
  data() {
    return {
      todos: [
        { id: 1, title: 'Bay a car' },
        { id: 2, title: 'Bay a milk' },
      ],
    };
  },
  methods: {
    createTodo(todo) {
      this.todos.push(todo);
    },
  },

  name: 'TodoAppPage',
});
</script>

<style></style>
