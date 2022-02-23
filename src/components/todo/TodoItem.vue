<template>
  <li>{{ todo.title }}</li>
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

<style></style>
