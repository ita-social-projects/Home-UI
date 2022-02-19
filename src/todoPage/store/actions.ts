import { ActionTree } from 'vuex';
import { RootStateInterface } from '@/store/types';
import { Actions, TodoPageInterface, TodoActionsEnum, TodoMutationsEnum } from '@/todoPage/store/types';

export const actions: ActionTree<TodoPageInterface, RootStateInterface> & Actions = {
  [TodoActionsEnum.ADD_NEW_TODO]({ commit }, payload): void {
    commit(TodoMutationsEnum.ADD_TODO, payload);
  },
  [TodoActionsEnum.SET_TODO_DONE]({ commit }, payload): void {
    commit(TodoMutationsEnum.SET_DONE_TODO, payload);
  },
  [TodoActionsEnum.REMOVE_TODO]({ commit }, payload): void {
    commit(TodoMutationsEnum.REMOVE_TODO, payload);
  },
};
