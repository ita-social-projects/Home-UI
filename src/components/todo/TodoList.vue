<template>
  <ol>
    <todo-item v-for="todo in todos" :key="todo.id" :todo="todo" @remove="$emit('remove', todo)">
      <span>{{ todo.title }}</span>
    </todo-item>
  </ol>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TodoItem from '@/components/todo/TodoItem.vue';
export default defineComponent({
  name: 'TodoList',
  components: {
    TodoItem,
  },
  props: {
    todos: {
      type: Array,
      required: true,
    },
  },
});
</script>

<style></style>
