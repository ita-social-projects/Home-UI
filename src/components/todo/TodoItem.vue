<template>
  <div class="wrapper">
    <input type="checkbox" v-model="checkToggle">
    <li v-bind:class="checkToggle ? 'done' : ''">{{ todo.title }}</li>
    <button class="btn-close" @click="$emit('remove', todo)">X</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  data() {
    return {
      checkToggle: false,
    };
  },
  props: {
    todo: {
      type: Object,
      required: true,
    },
  },
});
</script>

<style scoped>
.wrapper {
  display: flex;
}
.btn-close {
  padding: 0 3px;
  margin-left: 10px;
}
input {
  margin-right: 30px;
}
.done {
  text-decoration: line-through;
}
</style>
