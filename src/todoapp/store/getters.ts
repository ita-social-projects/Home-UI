import { GetterTree } from 'vuex';
import { RootStateInterface } from '@/store/types';
import { TodoAppTaskStateInterface, Getters } from '@/todoapp/store/types';

export const getters: GetterTree<TodoAppTaskStateInterface, RootStateInterface> & Getters = {
  getTasks(state) {
    return state.tasks;
  },

  getCountDoneTasks(state) {
    const result = state.tasks.filter((item) => item.state === false);
    return result.length;
  },
};
