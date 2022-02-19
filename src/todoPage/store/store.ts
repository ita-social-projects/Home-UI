import { TaskType, TodoStore, TodosType } from './types';

export const state = (): TodoStore => ({
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
  ] as Array<TodosType>,
});

export const getters = {
  getAllTodos: (state: TodoStore): Array<TodosType> => {
    return state.todoList;
  },
  getNotDoneTodos: (state: TodoStore): number => {
    return state.todoList.filter((todo) => !todo.isDone).length;
  },
};

export const mutations = {
  ADD_TODO: (state: TodoStore, newTodo: TaskType): void => {
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
  SET_DONE_TODO: (state: TodoStore, id: number): void => {
    state.todoList = state.todoList.map((todo) => {
      if (todo.id === id) {
        todo.isDone = !todo.isDone;
      }
      return todo;
    });
  },
  REMOVE_TODO: (state: TodoStore, id: number): void => {
    state.todoList = state.todoList.filter((todo) => todo.id !== id);
  },
};

export const actions = {
  addNewTodo({ commit }, newTodo: TaskType): void {
    commit('ADD_TODO', newTodo);
  },
  done({ commit }, id: number): void {
    commit('SET_DONE_TODO', id);
  },
};
