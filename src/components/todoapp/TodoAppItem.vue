<template>
  <div @click="changeStateTask">
    {{ task.title }}
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
// import { TodoAppInterface } from '@/store/todoapp/types';
import { TodoAppTaskInterface } from '@/store/todoapp/types';
// import { store } from '@/components/todoapp/StoreTodoApp'
import { useStore } from 'vuex';
import { StoreModuleEnum } from '@/store/types';
import { TodoAppActionEnum } from '@/store/todoapp/types';

export default defineComponent({
  name: 'TodoAppItem',
  props: {
    task: Object as any,
  },
  setup(props) {
    const store = useStore();
    const changeStateTask = () => {
      store.dispatch(`${StoreModuleEnum.TodoAppStore}/${TodoAppActionEnum.actionChangeStateTask}`, props.task.id);
    };
    return {
      changeStateTask,
    };
  },
});
</script>

<style scoped></style>
