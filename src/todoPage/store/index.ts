import { Module } from 'vuex';
import { RootStateInterface } from '@/store/types';
import { TodoPageInterface } from '@/todoPage/store/types';
import { getters } from '@/todoPage/store/getters';
import { actions } from '@/todoPage/store/actions';
import { mutations } from '@/todoPage/store/mutations';

export const state: TodoPageInterface = {
  todoList: [],
};

export const todoStore: Module<TodoPageInterface, RootStateInterface> = {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
