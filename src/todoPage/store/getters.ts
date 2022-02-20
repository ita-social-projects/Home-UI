import { GetterTree } from 'vuex';
import { RootStateInterface } from '@/store/types';
import { TodoPageInterface, TodosType, Getters } from '@/todoPage/store/types';

export const getters: GetterTree<TodoPageInterface, RootStateInterface> & Getters = {
  getAllTodos: (state: TodoPageInterface): Array<TodosType> => {
    return state.todoList;
  },
  getNotDoneTodos: (state: TodoPageInterface): number => {
    return state.todoList.filter((todo) => !todo.isDone).length;
  },
  getTodosFromLocalStorage: (): Array<TodosType> => {
    const loacalTodos = JSON.parse(localStorage.getItem('todo-list') as string);
    return loacalTodos;
  },
};
