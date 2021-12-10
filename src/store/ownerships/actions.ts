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
    //   const { data } = await HTTP.get(url);
      const data: Array<OwnershipsDTOModel> = [
        {
          id: 1,
          owner: {
            id: 1,
            first_name: 'Petro',
            middle_name: 'Petrovich',
            last_name: 'Petrov',
            contacts: [
              {
                id: 1,
                type: 'email',
                main: false,
                email: 'readUserEmail@example.com',
              }
            ]
          },
          ownership_part: 0.6588,
        },
        {
          id: 2,
          owner: {
            id: 1,
            first_name: 'Ivan',
            middle_name: 'Petrovich',
            last_name: 'Petrov',
            contacts: [
              {
                id: 1,
                type: 'email',
                main: false,
                email: 'newEmail@example.com',
              },
            ],
          },
          ownership_part: 0.26,
        },
        {
          id: 3,
          owner: {
            id: 1,
            first_name: 'Ivan',
            middle_name: 'Petrovich',
            last_name: 'Petrov',
            contacts: [
              {
                id: 1,
                type: 'phone',
                main: false,
                phone: '+380985054044',
              },
            ],
          },
          ownership_part: 0.26,
        },
      ];
      const ownerships: Array<OwnershipsModel> = data.map((el: OwnershipsDTOModel) => {
        console.log(new OwnershipsModel(el));
        return new OwnershipsModel(el);
      });
      commit(OwnershipsMutationEnum.SET_OWNERSHIPS, ownerships);
    } catch (e: any) {
      console.log(e.response);
    }
  },
};
