<template>
  <div class="todo-item">
    <Fieldset :legend="model.title">
      <div class="task-wrapper">
        <p :class="{ done: model.isDone }">{{ model.description }}</p>
        <div class="btns">
          <Button icon="pi pi-check" class="p-button-info" v-if="!model.isDone" />
          <Button icon="pi pi-undo" class="p-button-info" v-else />
          <Button icon="pi pi-times" class="p-button-danger" :disabled="!model.isDone" />
        </div>
      </div>
    </Fieldset>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Fieldset from 'primevue/fieldset';
import Button from 'primevue/button';

export default defineComponent({
  name: 'TodoItem',
  components: {
    Fieldset,
    Button,
  },
  props: {
    model: {
      required: true,
      default: {
        id: 0,
        title: 'Create todo app',
        description: 'todo app using Vue 3 & Composition API',
        isDone: false,
      },
    },
  },
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.task-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2em;
}
.todo-item {
  min-width: 100%;
  margin-bottom: 2em;
  font-size: 1.4em;
}
.btns {
  display: flex;
  gap: 1em;
  flex-direction: column;
}
.done {
  text-decoration-line: line-through;
  opacity: 0.8;
}
</style>
