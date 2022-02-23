<template>
  <li>{{ todo.title }}</li>
</template>

<script lang="ts">
export default {
  props: {
    todo: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style></style>
