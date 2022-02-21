<template>
  <div>
    <InputText placeholder="Назва задачі" v-model="task"> </InputText>
    <Button label="Додати задачу" @click="addTask"></Button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';

// import { store } from '@/components/todoapp/StoreTodoApp';
import { useStore } from 'vuex';
import { StoreModuleEnum } from '@/store/types';
import { TodoAppActionEnum } from '@/store/todoapp/types';

export default defineComponent({
  name: 'TodoAppEdit',
  components: {
    Button,
    InputText,
  },
  setup() {
    const task = ref('');
    const store = useStore();
    const addTask = () => {
      const payload = {
        id: Math.round(Math.random() * 1000),
        title: task.value,
        state: false,
      };

      store.dispatch(`${StoreModuleEnum.TodoAppStore}/${TodoAppActionEnum.addTask}`, payload);
      task.value = '';
    };

    return {
      addTask,
      task,
    };
  },
});
</script>

<style scoped></style>
