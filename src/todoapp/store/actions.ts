import { ActionTree } from 'vuex';
import { TodoAppTaskStateInterface, TodoAppMutationEnum, TodoAppActionEnum, Actions } from '@/todoapp/store//types';

import { RootStateInterface } from '@/store/types';

export const actions: ActionTree<TodoAppTaskStateInterface, RootStateInterface> & Actions = {
  [TodoAppActionEnum.getTasksLocalStorage]: ({ commit }) => {
    const newTasks = localStorage.getItem('tasks');
    if (newTasks) {
      commit(TodoAppMutationEnum.setTasks, JSON.parse(newTasks));
    }
  },
  [TodoAppActionEnum.updateTasksLocalStorage]: ({ state }) => {
    localStorage.setItem('tasks', JSON.stringify(state.tasks));
  },
  [TodoAppActionEnum.addTask]: ({ commit, dispatch }, payload) => {
    commit(TodoAppMutationEnum.addTask, payload);
    dispatch(TodoAppActionEnum.updateTasksLocalStorage);
  },
  [TodoAppActionEnum.actionChangeStateTask]: ({ commit, state, dispatch }, payload) => {
    const task = state.tasks.find((item) => item.id === payload);
    commit(TodoAppMutationEnum.changeStateTask, task!);
    dispatch(TodoAppActionEnum.updateTasksLocalStorage);
  },
  [TodoAppActionEnum.deleteTask]: ({ commit, dispatch }, id) => {
    commit(TodoAppMutationEnum.deleteTask, id);
    dispatch(TodoAppActionEnum.updateTasksLocalStorage);
  },
};
