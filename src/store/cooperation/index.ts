import { Module, Store as VuexStore, CommitOptions, DispatchOptions } from 'vuex';
import { RootStateInterface } from '@/store/types';
import { Actions, CooperationInterface, Mutations, Getters } from '@/store/cooperation/types';
import { getters } from '@/store/cooperation/getters';
import { mutations } from '@/store/cooperation/mutations';
import { actions } from '@/store/cooperation/actions';

export const state: CooperationInterface = {
  erdpou: '',
  name: '',
};

export const cooperationStore: Module<CooperationInterface, RootStateInterface> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};

export { CooperationInterface };

export type CooperationStore<S = CooperationInterface> = Omit<VuexStore<S>, 'getters' | 'commit' | 'dispatch'> & {
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
