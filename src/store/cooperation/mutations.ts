import { MutationTree } from 'vuex';
import { CooperationStateInterface, CooperationMutationTypes, Mutations } from '@/store/cooperation/types';

export const mutations: MutationTree<CooperationStateInterface> & Mutations = {
  [CooperationMutationTypes.SET_USER_COOPERATIONS]: (state, payload) => {
    state.userCooperations = payload;
  },
  [CooperationMutationTypes.SET_MODAL_DISPLAY]: (state, payload) => {
    state.displayModal = payload;
  },
  [CooperationMutationTypes.SET_SELECTED_COOPERATION]: (state) => {
    state.selectedCooperation = state.userCooperations[0];
  },
  // [CooperationMutationTypes.SET_COOPERATION_UPDATE_INFO]: (state, payload) => {
  //   console.log(payload);
  //   state = payload;
  // },
};
