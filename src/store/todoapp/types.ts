import { ActionContext } from 'vuex';
import { RootStateInterface } from '@/store/types';

export enum TodoAppMutationEnum {
  addTask = 'addTask',
  setTasks = 'setTasks',
  changeStateTask = 'changeStateTask',
}

export enum TodoAppActionEnum {
  getTasksLocalStorage = 'getTasksLocalStorage',
  updateTasksLocalStorage = 'updateTasksLocalStorage',
  addTask = 'addTask',
  actionChangeStateTask = 'actionChangeStateTask',
}

export enum TodoAppGettersEnum {
  getTasks = 'getTasks',
  getCoutnFinishTasks = 'getCoutnFinishTasks',
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
};

export type Getters<S = TodoAppTaskStateInterface> = {
  [TodoAppGettersEnum.getTasks](state: S): Array<TodoAppTaskInterface>;
  [TodoAppGettersEnum.getCoutnFinishTasks](state: S): number;
};

export interface Actions {
  [TodoAppActionEnum.getTasksLocalStorage]({ commit }: AugmentedActionContext): void;
  [TodoAppActionEnum.updateTasksLocalStorage]({ state }: AugmentedActionContext): void;
  [TodoAppActionEnum.addTask]({ commit }: AugmentedActionContext, payload: TodoAppTaskInterface): void;
  [TodoAppActionEnum.actionChangeStateTask]({ commit, state, dispatch }: AugmentedActionContext, payload: number): void;
}

export type AugmentedActionContext = {
  commit<K extends keyof Mutations>(key: K, payload: Parameters<Mutations[K]>[1]): ReturnType<Mutations[K]>;
} & Omit<ActionContext<TodoAppTaskStateInterface, RootStateInterface>, 'commit'>;
