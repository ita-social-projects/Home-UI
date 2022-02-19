import { Module } from 'vuex';
import { RootStateInterface } from '@/store/types';
import { TodoPageInterface } from '@/todoPage/store/types';
import { getters } from '@/todoPage/store/getters';
import { actions } from '@/todoPage/store/actions';
import { mutations } from '@/todoPage/store/mutations';

export const state: TodoPageInterface = {
  todoList: [
    {
      id: 1,
      title: 'Shoping day',
      description: 'Go to grocery store to buy some food and staff',
      isDone: false,
    },
    {
      id: 2,
      title: 'Learn Vue 3',
      description: 'Practicing Vue 3 applications, Composition API concepts, Vuex...',
      isDone: false,
    },
    {
      id: 3,
      title: 'Everyday gym',
      description: 'Go to gym for everyday exercices, health care staff',
      isDone: false,
    },
  ],
};

export const todoStore: Module<TodoPageInterface, RootStateInterface> = {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
