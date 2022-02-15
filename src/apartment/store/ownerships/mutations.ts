import { MutationTree } from 'vuex';
import { OwnershipsMutationEnum, OwnershipsStateInterface, Mutations } from '@/apartment/store/ownerships/types';
import { OwnershipsModel } from '@/apartment/models/ownerships.model';

export const mutations: MutationTree<OwnershipsStateInterface> & Mutations = {
  [OwnershipsMutationEnum.SET_OWNERSHIPS]: (state, payload) => {
    state.ownerships = payload;
  },
  [OwnershipsMutationEnum.DELETE_OWNER]: (state, id) => {
    const updateOwnerships: Array<OwnershipsModel> | null = state.ownerships?.filter(
      (el: OwnershipsModel) => el.id !== id
    );
    state.ownerships = updateOwnerships;
  },
  [OwnershipsMutationEnum.EDIT_OWNER]: (state, payload) => {
    const index = state.ownerships.findIndex((el: OwnershipsModel) => el.id === payload.id);
    state.ownerships[index] = payload;
    state.ownerships = [...state.ownerships];
  },
};
