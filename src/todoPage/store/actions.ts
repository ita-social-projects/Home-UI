import { ActionTree } from 'vuex';
import { RootStateInterface } from '@/store/types';
import { HTTP } from '@/core/api/http-common';
import { Actions, ToDoMutationsEnum, TodoStateInterface } from './types';

export const actions: ActionTree<TodoStateInterface, RootStateInterface> & Actions = {
  ADD_TODO({ commit }, newTodo) {
    commit(ToDoMutationsEnum.ADD_TODO, newTodo);
  },
  SET_DONE_TODO({ commit }, id) {
    commit(ToDoMutationsEnum.SET_DONE_TODO, id);
  },
};
