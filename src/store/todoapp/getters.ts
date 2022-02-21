import { GetterTree } from 'vuex';
import { RootStateInterface } from '@/store/types';
import { TodoAppTaskStateInterface, Getters } from '@/store/todoapp/types';

export const getters: GetterTree<TodoAppTaskStateInterface, RootStateInterface> & Getters = {
  getTasks(state) {
    return state.tasks;
  },
  getCoutnFinishTasks(state) {
    console.log(state.tasks);
    const result = state.tasks.filter((item) => item.state === false);

    return result.length;
  },
};
