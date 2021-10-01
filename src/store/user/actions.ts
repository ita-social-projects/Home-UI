import { ActionTree } from 'vuex';

import { RootStateInterface } from '@/store/types';
import { UserStateInterface, UserActionTypes, UserMutationTypes, Actions } from '@/store/user/types';
import { HTTP } from '@/core/api/http-common';
import { AxiosResponse } from 'axios';

export const actions: ActionTree<UserStateInterface, RootStateInterface> & Actions = {
  [UserActionTypes.SET_USER_INFO]: ({ commit }, payload) => {
    HTTP.post('/users', payload)
      .then((r: AxiosResponse) => {
        console.log(r);
      })
      .catch((e) => {
        console.log(e);
      });
  },
};
