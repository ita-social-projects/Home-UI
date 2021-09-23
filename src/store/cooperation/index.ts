import { Module, Store as VuexStore, CommitOptions, DispatchOptions } from 'vuex';
import { RootStateInterface } from '@/store/types';
import { Actions, CooperationInterface, Mutations, Getters } from '@/store/cooperation/types';
import { getters } from '@/store/cooperation/getters';
import { mutations } from '@/store/cooperation/mutations';
import { actions } from '@/store/cooperation/actions';

/** state текущего модуля */
export const state: CooperationInterface = {
  helloWorld: 'hello world',
};

/** экспортируем один из модулей, из которых состоит основной стор */
export const cooperationStore: Module<CooperationInterface, RootStateInterface> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};

/**
 * экспортируется тип стейта для текущего модуля
 * в дальнейшем используется чтобы создать тип основного стора
 * тип основного стора нужно имплементировать из существующих типов стейта модулей
 * для того, чтобы основной стор был строго типизированным, в него нельзя было
 * передать
 * */
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
