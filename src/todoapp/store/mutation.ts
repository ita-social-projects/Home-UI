import { MutationTree } from 'vuex';
import { TodoAppTaskStateInterface, TodoAppMutationEnum, Mutations } from '@/todoapp/store/types';

export const mutations: MutationTree<TodoAppTaskStateInterface> & Mutations = {
  [TodoAppMutationEnum.addTask]: (state, payload) => {
    state.tasks!.push(payload);
  },
  [TodoAppMutationEnum.setTasks]: (state, payload) => {
    state.tasks = [...payload];
  },
  [TodoAppMutationEnum.changeStateTask]: (state, payload) => {
    const index = state.tasks.findIndex((item) => item.id === payload.id);
    state.tasks![index].state = !state.tasks![index].state;
  },
  [TodoAppMutationEnum.deleteTask]: (state, id) => {
    const tasks = state.tasks.filter((item) => item.id !== id);
    state.tasks = [...tasks];
  },
};
