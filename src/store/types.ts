import { CommitOptions, DispatchOptions, Store as VuexStore } from 'vuex';
import { AxiosError, AxiosResponse } from 'axios';
import { UserStateInterface } from '@/store/user/types';
import { Actions, Getters, Mutations, CooperationStateInterface } from '@/store/cooperation/types';

export interface RootStateInterface {
  cooperationStore: CooperationStateInterface;
  userStore: UserStateInterface;
}

export type StoreType<S> = Omit<VuexStore<S>, 'getters' | 'commit' | 'dispatch'> & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<Mutations[K]>;
} & {
  dispatch<K extends keyof Actions>(
    key: K,
    payload: Parameters<Actions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<Actions[K]>;
} & {
  getters: {
    [K in keyof Getters]: ReturnType<Getters[K]>;
  };
};

export type requestPayload<T> = {
  data: { [key: string]: T };
  successCallback(response?: AxiosResponse): void;
  errorCallback(error?: AxiosError): void;
};
