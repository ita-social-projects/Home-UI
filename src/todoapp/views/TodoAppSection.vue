<template>
  <div>
    <TodoApp></TodoApp>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TodoApp from '@/todoapp/components/TodoApp.vue';
export default defineComponent({
  name: 'TodoAppSection',
  components: {
    TodoApp,
  },
});
</script>

<style scoped></style>
