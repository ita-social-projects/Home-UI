<template>
  <div class="wrapper">
    <li>{{ todo.title }}</li>
    <button class="btn-close" @click="$emit('remove', todo)">X</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
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
  margin-left: 10px;
}
</style>
