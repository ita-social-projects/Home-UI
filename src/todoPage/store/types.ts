import { RootStateInterface } from '@/store/types';
import { ActionContext } from 'vuex';
interface TodosType {
  id: number;
  title: string;
  description: string;
  isDone: boolean;
}

export enum ToDoMutationsEnum {
  ADD_TODO = 'ADD_TODO',
  SET_DONE_TODO = 'SET_DONE_TODO',
  REMOVE_TODO = 'REMOVE_TODO',
}

export enum ToDoActionsEnum {
  ADD_TODO = 'ADD_TODO',
  SET_DONE_TODO = 'SET_DONE_TODO',
}

export enum ToDoGettersEnum {
  getAllTodos = 'getAllTodos',
  getNotDoneTodos = 'getNotDoneTodos',
}

export interface TodoStateInterface {
  todoList: Array<TodosType>;
}

type TaskType = {
  title: string;
  description: string;
};

export interface TodoStore {
  todoList: Array<TodosType>;
}
export type Mutations<S = TodoStateInterface> = {
  [ToDoMutationsEnum.ADD_TODO](state: S, payload: any): void;
  [ToDoMutationsEnum.SET_DONE_TODO](state: S, payload: any): void;
  [ToDoMutationsEnum.REMOVE_TODO](state: S, payload: any): void;
};

export interface Actions {
  [ToDoActionsEnum.ADD_TODO]({ commit }: AugmentedActionContext, payload: any): void;
  [ToDoActionsEnum.SET_DONE_TODO]({ commit }: AugmentedActionContext, payload: any): void;
}

export type Getters<S = TodoStateInterface> = {
  ['getAllTodos'](state: S): Array<TodosType> | null;
  ['getNotDoneTodos'](state: S): number;
};

export type AugmentedActionContext = {
  commit<K extends keyof Mutations>(key: K, payload: Parameters<Mutations[K]>[1]): ReturnType<Mutations[K]>;
} & Omit<ActionContext<TodoStateInterface, RootStateInterface>, 'commit'>;

export { TodosType, TaskType };
