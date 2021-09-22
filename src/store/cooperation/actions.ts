import { ActionContext, ActionTree } from 'vuex';

import { RootStateInterface } from '@/store/types';
import { CooperationInterface, CooperationMutationTypes } from '@/store/cooperation/types';
import { CooperationActionTypes } from '@/store/cooperation/types';
import { Mutations } from '@/store/cooperation/mutations';

// action context, переопределение
// этот тип нужен для того, чтобы разрешить выполнение только тех экшенов, которые определены в Mutations
// также здесь проверяется тип payload
// компилятор подсветит, если будет вызван неверный экшен
type AugmentedActionContext = {
  commit<K extends keyof Mutations>(key: K, payload: Parameters<Mutations[K]>[1]): ReturnType<Mutations[K]>;
} & Omit<ActionContext<CooperationInterface, RootStateInterface>, 'commit'>;

// такой же тип как мутаций, только для экшенов, аргументы и возвращаемое значение
export interface Actions {
  [CooperationActionTypes.SAY_HELLO]({ commit }: AugmentedActionContext): void;
}

export const actions: ActionTree<CooperationInterface, RootStateInterface> & Actions = {
  [CooperationActionTypes.SAY_HELLO]: ({ commit }) => {
    commit(CooperationMutationTypes.SAY_HELLO, 'hello');
  },
};
