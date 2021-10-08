import { MutationTree } from 'vuex';
import { CooperationStateInterface, CooperationMutationEnum, Mutations } from '@/store/cooperation/types';

export const mutations: MutationTree<CooperationStateInterface> & Mutations = {
  [CooperationMutationEnum.SET_USER_COOPERATIONS]: (state, payload) => {
    state.userCooperations = payload;
  },
  [CooperationMutationEnum.SET_MODAL_DISPLAY]: (state, payload) => {
    state.displayModal = payload;
  },
  [CooperationMutationEnum.SET_SELECTED_COOPERATION]: (state) => {
    state.selectedCooperation = state.userCooperations[0];
  },
  // [CooperationMutationEnum.SET_COOPERATION_UPDATE_INFO]: (state, payload) => {
  //   console.log(payload);
  //   state = payload;
  // },
};
