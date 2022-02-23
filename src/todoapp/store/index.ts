import { Module } from 'vuex';
import { RootStateInterface } from '@/store/types';
import { TodoAppTaskStateInterface, TodoAppTaskInterface } from '@/todoapp/store/types';

import { getters } from '@/todoapp/store/getters';
import { actions } from '@/todoapp/store/actions';
import { mutations } from '@/todoapp/store/mutation';

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
