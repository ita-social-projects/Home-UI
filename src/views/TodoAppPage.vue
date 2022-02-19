<template>
  <TodoList />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TodoList from '@/todoPage/components/TodoList.vue';

export default defineComponent({
  name: 'TodoAppPage',
  components: {
    TodoList,
  },
});
</script>

<style lang="scss"></style>
