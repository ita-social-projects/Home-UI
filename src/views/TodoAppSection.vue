<template>
  <div>
    <TodoApp></TodoApp>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TodoApp from '@/components/todoapp/TodoApp.vue';
export default defineComponent({
  name: 'TodoAppSection',
  components: {
    TodoApp,
  },
});
</script>

<style scoped></style>
