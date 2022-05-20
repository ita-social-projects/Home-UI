<template>
  <div class="wrapper">
    <input type="checkbox" v-model="checkToggle" />
    <li :class="checkToggle ? 'done' : ''">{{ todo.title }}</li>
    <button class="btn-close" @click="$emit('remove', todo)">X</button>
    
    <!-- <Button icon="pi pi-times" class="p-button-sm p-button-rounded p-button-danger p-button-outlined" /> -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Button from 'primevue/button';
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
  components: {
    Button,
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
