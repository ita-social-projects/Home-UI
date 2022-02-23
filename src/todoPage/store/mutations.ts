import { MutationTree } from 'vuex';
import { Mutations, TodoPageInterface, TodoMutationsEnum } from '@/todoPage/store/types';

export const mutations: MutationTree<TodoPageInterface> & Mutations = {
  [TodoMutationsEnum.ADD_TODO]: (state, payload): void => {
    const lastIndex = state.todoList.length - 1;
    state.todoList = [
      ...state.todoList,
      {
        id: state.todoList.length ? state.todoList[lastIndex].id + 1 : 1,
        title: payload.title,
        description: payload.description,
        isDone: false,
      },
    ];
  },
  [TodoMutationsEnum.SET_DONE_TODO]: (state, payload): void => {
    state.todoList = state.todoList.map((todo) => {
      if (todo.id === payload) {
        todo.isDone = !todo.isDone;
      }
      return todo;
    });
  },
  [TodoMutationsEnum.REMOVE_TODO]: (state, payload): void => {
    state.todoList = state.todoList.filter((todo) => todo.id !== payload);
  },

  [TodoMutationsEnum.PARSE_LOCAL_TODOS]: (state, payload): void => {
    state.todoList = payload;
  },
};
