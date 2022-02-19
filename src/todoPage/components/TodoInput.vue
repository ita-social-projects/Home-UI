<template>
  <div class="todo-form">
    <span class="p-float-label">
      <InputText id="taskTitle" type="text" />
      <label for="taskTitle">Назва завдання</label>
    </span>
    <span class="p-float-label">
      <InputText id="description" type="text" />
      <label for="description">Опис завдання</label>
    </span>
    <Button label="Додати завдання" icon="pi pi-check" class="p-button-lg p-button-info" :disabled="!valid" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

export default defineComponent({
  name: 'TodoInput',
  components: {
    InputText,
    Button,
  },
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.todo-form {
  min-width: 35%;
  padding-top: 1.2em;
}
.todo-form [type='text'] {
  width: 70%;
  margin-bottom: 1.5em;
}
</style>
