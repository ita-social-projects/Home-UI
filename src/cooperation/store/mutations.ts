import { MutationTree } from 'vuex';
import { CooperationStateInterface, CooperationMutationEnum, Mutations } from '@/cooperation/store/types';

export const mutations: MutationTree<CooperationStateInterface> & Mutations = {
  [CooperationMutationEnum.SET_USER_COOPERATIONS]: (state, payload) => {
    state.userCooperations = payload;
  },
  [CooperationMutationEnum.SET_SELECTED_COOPERATION]: (state, payload) => {
    state.selectedCooperation = state.userCooperations[payload];
  },
  [CooperationMutationEnum.SET_COOPERATION_UPDATE]: (state, payload) => {
    state.selectedCooperation = payload;
  },
};
