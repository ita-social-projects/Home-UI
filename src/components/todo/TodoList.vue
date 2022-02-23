<template>
  <li v-for="todo in todos" :key="todo.id">
    <div>{{ todo.title }}</div>
  </li>
</template>

<script lang="ts">
export default {
  props: {
    todos: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style></style>
