import { ActionTree } from 'vuex';
import { UserStateInterface, UserActionTypes, UserMutationTypes, Actions } from '@/store/sign-in/types';
import { RootStateInterface } from '@/store/types';
import { HTTP } from '@/core/api/http-common';
import { AxiosResponse } from 'axios';

export const actions: ActionTree<UserStateInterface, RootStateInterface> = {
  [UserActionTypes.IS_USER_REGISTERED]: ({ commit }, payload) => {
    HTTP.get('/users', { params: { email: payload } }).then((response) => {
      commit(UserMutationTypes.SET_USER, response.data[0]);
    });
    // .then((r: AxiosResponse) => {
    //   payload.successCallback(r);
    // })
    // .catch(() => {
    //   payload.errorCallback();
    // });
  },
  [UserActionTypes.SET_USER]: ({ commit }, payload) => {
    commit(UserMutationTypes.SET_USER, payload);
  },
};

//     return HTTP
//         .get('/users', { params: { email: payload } })
//         .then( response => {
//           commit('SET_USERS', response.data[0]);
//           return response.data.length !== 0;
//         });
//     }
//   },
