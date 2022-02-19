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
import { defineComponent, ref, computed } from 'vue';
import { useStore } from 'vuex';
import TodoInput from '@/todoPage/components/TodoInput.vue';
import TodoItem from '@/todoPage/components/TodoItem.vue';
// import { TodosType } from '@/todoPage/store/types.ts';

export default defineComponent({
  name: 'TodoList',
  components: {
    TodoInput,
    TodoItem,
  },
  setup() {
    const title = ref('Список найбилжчих завдань:');
    const store = useStore();

    const todoList = computed(() => store.state.todoList);

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
