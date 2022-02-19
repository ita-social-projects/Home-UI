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
}

export enum TodoMutationsEnum {
  ADD_TODO = 'ADD_TODO',
  SET_DONE_TODO = 'SET_DONE_TODO',
  REMOVE_TODO = 'REMOVE_TODO',
}

export enum TodoActionsEnum {
  ADD_NEW_TODO = 'ADD_NEW_TODO',
  SET_TODO_DONE = 'SET_TODO_DONE',
  REMOVE_TODO = 'REMOVE_TODO',
}

export type Getters<S = TodoPageInterface> = {
  [TodoGettersEnum.getAllTodos](state: S): Array<TodosType> | [];
  [TodoGettersEnum.getNotDoneTodos](state: S): number;
};

export type Mutations<S = TodoPageInterface> = {
  [TodoMutationsEnum.ADD_TODO](state: S, payload: TaskType): void;
  [TodoMutationsEnum.SET_DONE_TODO](state: S, payload: number): void;
  [TodoMutationsEnum.REMOVE_TODO](state: S, payload: number): void;
};

export interface Actions {
  [TodoActionsEnum.ADD_NEW_TODO]({ commit }: AugmentedActionContext, payload: TaskType): void;
  [TodoActionsEnum.SET_TODO_DONE]({ commit }: AugmentedActionContext, payload: number): void;
  [TodoActionsEnum.REMOVE_TODO]({ commit }: AugmentedActionContext, payload: number): void;
}

export type AugmentedActionContext = {
  commit<K extends keyof Mutations>(key: K, payload: Parameters<Mutations[K]>[1]): ReturnType<Mutations[K]>;
} & Omit<ActionContext<TodoPageInterface, RootStateInterface>, 'commit'>;
