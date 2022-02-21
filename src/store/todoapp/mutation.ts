import { MutationTree } from 'vuex';
import { TodoAppTaskStateInterface, TodoAppMutationEnum, Mutations } from '@/store/todoapp/types';

export const mutations: MutationTree<TodoAppTaskStateInterface> & Mutations = {
  [TodoAppMutationEnum.addTask]: (state, payload) => {
    state.tasks!.push(payload);
  },
  [TodoAppMutationEnum.setTasks]: (state, payload) => {
    console.log(payload);

    state.tasks = [...payload];
  },
  [TodoAppMutationEnum.changeStateTask]: (state, payload) => {
    const index = state.tasks.findIndex((item) => item.id === payload.id);
    state.tasks![index].state = !state.tasks![index].state;
  },
};
