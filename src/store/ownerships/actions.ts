import { ActionTree } from 'vuex';

import { RootStateInterface } from '@/store/types';
import {
  OwnershipsMutationEnum,
  OwnershipsStateInterface,
  OwnershipsActionEnum,
  Actions,
} from '@/store/ownerships/types';
import { HTTP } from '@/core/api/http-common';
import { OwnershipsModel } from '@/shared/models/ownerships.model';
import { OwnershipsDTOModel } from '@/shared/models/ownershipsDTO.model';

export const actions: ActionTree<OwnershipsStateInterface, RootStateInterface> & Actions = {
  [OwnershipsActionEnum.SET_OWNERSHIPS]: async ({ commit }, payload) => {
    try {
      const url = `/apartments/${payload}/ownerships`;
      const { data } = await HTTP.get(url);
      const ownerships: Array<OwnershipsModel> = data.map((el: OwnershipsDTOModel) => {
        return new OwnershipsModel(el);
      });
      commit(OwnershipsMutationEnum.SET_OWNERSHIPS, ownerships);
    } catch (e: any) {
      console.log('error SET_OWNERSHIPS', e.response);
    }
  },
  [OwnershipsActionEnum.DELETE_OWNER]: async ({ commit }, payload) => {
    try {
      const url = `/apartments/${payload.apartmentId}/ownerships/${payload.ownerId}`;
      await HTTP.get(url);
      commit(OwnershipsMutationEnum.DELETE_OWNER, payload);
    } catch (err: any) {
      console.log('error DELETE_OWNER', err);
    }
  },
  [OwnershipsActionEnum.EDIT_OWNER]: async ({ commit }, payload) => {
    try {
      const url = `/apartments/${payload.apartmentId}/ownerships/${payload.ownerId}`;
      const { data } = await HTTP.put(url, payload.payloadData);
      const ownership = new OwnershipsModel(data);
      commit(OwnershipsMutationEnum.EDIT_OWNER, ownership);
    } catch (err: any) {
      console.log('error EDIT_OWNER', err);
    }
  },
};
