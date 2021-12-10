import { MutationTree } from 'vuex';
import { OwnershipsMutationEnum, OwnershipsStateInterface, Mutations } from '@/store/ownerships/types';

export const mutations: MutationTree<OwnershipsStateInterface> & Mutations = {
  [OwnershipsMutationEnum.SET_OWNERSHIPS]: (state, payload) => {
    state.ownerships = payload;
  },
};
