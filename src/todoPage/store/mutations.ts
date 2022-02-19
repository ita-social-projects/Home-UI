import { MutationTree } from 'vuex';
import { Mutations } from '@/todoPage/store/types';
import { TodoStateInterface } from './types';

export const mutations: MutationTree<TodoStateInterface> & Mutations = {
  ADD_TODO: (state, newTodo) => {
    const lastIndex = state.todoList.length - 1;
    state.todoList = [
      ...state.todoList,
      {
        id: lastIndex + 1,
        title: newTodo.title,
        description: newTodo.description,
        isDone: false,
      },
    ];
  },
  SET_DONE_TODO: (state, id) => {
    state.todoList = state.todoList.map((todo) => {
      if (todo.id === id) {
        todo.isDone = !todo.isDone;
      }
      return todo;
    });
  },
  REMOVE_TODO: (state, id) => {
    state.todoList = state.todoList.filter((todo) => todo.id !== id);
  },
};
