import { GetterTree } from 'vuex';
import { RootStateInterface } from '@/store/types';
import { TodoStateInterface, Getters } from './types';

export const getters: GetterTree<TodoStateInterface, RootStateInterface> & Getters = {
  getAllTodos: (state) => {
    return state.todoList;
  },
  getNotDoneTodos: (state) => {
    return state.todoList.filter((todo) => !todo.isDone).length;
  },
};
