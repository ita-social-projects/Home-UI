<template>
  <h1>My ToDO!</h1>
  <todo-form @create="createTodo" />
  <todo-list :todos="todos" @remove="removeTodo" />
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
        { id: 1, title: 'Buy a car' },
        { id: 2, title: 'Buy a milk' },
      ],
    };
  },
  methods: {
    createTodo(todo: any) {
      this.todos.push(todo);
    },
    removeTodo(todo: any) {
      this.todos = this.todos.filter(t => t.id !== todo.id);
    },
  },

  name: 'TodoAppPage',
});
</script>

<style></style>
