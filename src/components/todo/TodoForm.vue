<template>
  <form @submit.prevent>
    <h3>Create ToDo</h3>
    <!-- <input type="text" :value="todo.title" @input="todo.title = $event.target.value" placeholder="name" /> -->
    <input type="text" v-model="todo.title" placeholder="name" />
    <button @click="createTodo">Add ToDo</button>
  </form>
</template>

<script lang="ts">
export default {
  data() {
    return {
      todo: {
        title: '',
      },
    };
  },
  methods: {
    createTodo() {
      this.todo.id = Date.now();
      this.$emit('create', this.todo);
      this.todo = {
        title: '',
      };
    },
  },
};
</script>

<style></style>
