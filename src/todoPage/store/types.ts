import { ActionContext } from 'vuex';
import { RootStateInterface } from '@/store/types';

export interface TodosType {
  id: number;
  title: string;
  description: string;
  isDone: boolean;
}

export type TaskType = {
  title: string;
  description: string;
};

export interface TodoPageInterface {
  todoList: Array<TodosType>;
}
export enum TodoGettersEnum {
  getAllTodos = 'getAllTodos',
  getNotDoneTodos = 'getNotDoneTodos',
  // getTodosFromLocalStorage = 'getTodosFromLocalStorage',
}

export enum TodoMutationsEnum {
  ADD_TODO = 'ADD_TODO',
  SET_DONE_TODO = 'SET_DONE_TODO',
  REMOVE_TODO = 'REMOVE_TODO',
  // SAVE_TODO_TO_LOCALSTORAGE = 'SAVE_TODO_TO_LOCALSTORAGE',
  PARSE_LOCAL_TODOS = 'PARSE_LOCAL_TODOS',
}

export enum TodoActionsEnum {
  ADD_NEW_TODO = 'ADD_NEW_TODO',
  SET_TODO_DONE = 'SET_TODO_DONE',
  REMOVE_TODO = 'REMOVE_TODO',
  SAVE_TO_LOCAL = 'SAVE_TO_LOCAL',
  PARSE_LOCAL_TODOS = 'PARSE_LOCAL_TODOS',
}

export type Getters<S = TodoPageInterface> = {
  [TodoGettersEnum.getAllTodos](state: S): Array<TodosType> | [];
  [TodoGettersEnum.getNotDoneTodos](state: S): number;
  // [TodoGettersEnum.getTodosFromLocalStorage](): Array<TodosType>;
};

export type Mutations<S = TodoPageInterface> = {
  [TodoMutationsEnum.ADD_TODO](state: S, payload: TaskType): void;
  [TodoMutationsEnum.SET_DONE_TODO](state: S, payload: number): void;
  [TodoMutationsEnum.REMOVE_TODO](state: S, payload: number): void;
  // [TodoMutationsEnum.SAVE_TODO_TO_LOCALSTORAGE](state: S, payload: Array<TodosType>): void;
  [TodoMutationsEnum.PARSE_LOCAL_TODOS](state: S, payload: Array<TodosType>): void;
};

export interface Actions {
  [TodoActionsEnum.ADD_NEW_TODO]({ commit }: AugmentedActionContext, payload: TaskType): void;
  [TodoActionsEnum.SET_TODO_DONE]({ commit }: AugmentedActionContext, payload: number): void;
  [TodoActionsEnum.REMOVE_TODO]({ commit }: AugmentedActionContext, payload: number): void;
  [TodoActionsEnum.SAVE_TO_LOCAL]({ commit }: AugmentedActionContext, payload: Array<TodosType>): void;
  [TodoActionsEnum.PARSE_LOCAL_TODOS]({ commit }: AugmentedActionContext, payload: Array<TodosType>): void;
}

export type AugmentedActionContext = {
  commit<K extends keyof Mutations>(key: K, payload: Parameters<Mutations[K]>[1]): ReturnType<Mutations[K]>;
} & Omit<ActionContext<TodoPageInterface, RootStateInterface>, 'commit'>;
