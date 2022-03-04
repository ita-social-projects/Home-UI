import { ActionContext } from 'vuex';
import { RootStateInterface } from '@/store/types';

export enum TodoAppMutationEnum {
  addTask = 'addTask',
  setTasks = 'setTasks',
  changeStateTask = 'changeStateTask',
  deleteTask = 'deleteTask',
}

export enum TodoAppActionEnum {
  getTasksLocalStorage = 'getTasksLocalStorage',
  updateTasksLocalStorage = 'updateTasksLocalStorage',
  addTask = 'addTask',
  actionChangeStateTask = 'actionChangeStateTask',
  deleteTask = 'deleteTask',
}

export enum TodoAppGettersEnum {
  getTasks = 'getTasks',
  getCountDoneTasks = 'getCountDoneTasks',
}

export interface TodoAppTaskInterface {
  id: number;
  title: string;
  state: boolean;
}

export interface TodoAppTaskStateInterface {
  tasks: Array<TodoAppTaskInterface>;
}

export type Mutations<S = TodoAppTaskStateInterface> = {
  [TodoAppMutationEnum.addTask](state: S, payload: TodoAppTaskInterface): void;
  [TodoAppMutationEnum.setTasks](state: S, payload: Array<TodoAppTaskInterface>): void;
  [TodoAppMutationEnum.changeStateTask](state: S, payload: TodoAppTaskInterface): void;
  [TodoAppMutationEnum.deleteTask](state: S, id: number): void;
};

export type Getters<S = TodoAppTaskStateInterface> = {
  [TodoAppGettersEnum.getTasks](state: S): Array<TodoAppTaskInterface>;
  [TodoAppGettersEnum.getCountDoneTasks](state: S): number;
};

export interface Actions {
  [TodoAppActionEnum.getTasksLocalStorage]({ commit }: AugmentedActionContext): void;
  [TodoAppActionEnum.updateTasksLocalStorage]({ state }: AugmentedActionContext): void;
  [TodoAppActionEnum.addTask]({ commit }: AugmentedActionContext, payload: TodoAppTaskInterface): void;
  [TodoAppActionEnum.actionChangeStateTask]({ commit, state, dispatch }: AugmentedActionContext, payload: number): void;
  [TodoAppActionEnum.deleteTask]({ commit, dispatch }: AugmentedActionContext, id: number): void;
}

export type AugmentedActionContext = {
  commit<K extends keyof Mutations>(key: K, payload: Parameters<Mutations[K]>[1]): ReturnType<Mutations[K]>;
} & Omit<ActionContext<TodoAppTaskStateInterface, RootStateInterface>, 'commit'>;
