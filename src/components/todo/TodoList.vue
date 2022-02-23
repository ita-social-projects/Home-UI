<template>
  <ol>
    <post-item v-for="todo in todos" :key="todo.id" :todo="todo">
      <span>{{ todo.title }}</span>
    </post-item>
  </ol>
</template>

<script>
import PostItem from '@/components/todo/TodoItem.vue';
export default {
  components: {
    PostItem,
  },
  props: {
    todos: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style></style>
