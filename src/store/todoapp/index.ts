import { Module } from 'vuex';
import { RootStateInterface } from '@/store/types';
import { TodoAppTaskStateInterface, TodoAppTaskInterface } from '@/store/todoapp/types';

import { getters } from '@/store/todoapp/getters';
import { actions } from '@/store/todoapp/actions';
import { mutations } from '@/store/todoapp/mutation';

export const state: TodoAppTaskStateInterface = {
  tasks: Array<TodoAppTaskInterface>(),
};

export const TodoAppStore: Module<TodoAppTaskStateInterface, RootStateInterface> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
