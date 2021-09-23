import { MutationTree } from 'vuex';
import { CooperationInterface, CooperationMutationTypes, Mutations } from '@/store/cooperation/types';

/**
 * объект мутаций имеет тип MutationTree & Mutations (определен выше)
 * в объекте определены сами мутации
 * у самих мутаций название должно соответствовать названию в типе
 * объект mutations будет использован в создании CooperationStore
 * */
// mutation definition
export const mutations: MutationTree<CooperationInterface> & Mutations = {
  [CooperationMutationTypes.SAY_HELLO](state: CooperationInterface, payload: string) {
    state.helloWorld = payload;
    console.log(state.helloWorld);
  },
};
