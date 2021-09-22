import { Module, Store as VuexStore, CommitOptions, DispatchOptions } from 'vuex';
import { RootStateInterface } from '@/store/types';
import { CooperationInterface } from '@/store/cooperation/types';
import { state } from '@/store/cooperation/state';
import { getters, Getters } from '@/store/cooperation/getters';
import { mutations, Mutations } from '@/store/cooperation/mutations';
import { actions, Actions } from '@/store/cooperation/actions';

// один из модулей, из которых состоит основной стор
export const cooperationStore: Module<CooperationInterface, RootStateInterface> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};

// экспортируется тип стейта для текущего модуля
// в дальнейшем используется чтобы создать тип основного стора
export { CooperationInterface };

/**
 * тип для текущего стора
 * убирает из дефолтного типа стора типы для 'getters' | 'commit' | 'dispatch'
 * заменяет их на нашу имплементацию
 * */
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
