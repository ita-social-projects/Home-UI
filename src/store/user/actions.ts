import { ActionTree } from 'vuex';
import { RootStateInterface } from '@/store/types';
import { UserStateInterface, UserActionTypes, UserMutationTypes, Actions } from '@/store/user/types';
import { HTTP } from '@/core/api/http-common';

export const actions: ActionTree<UserStateInterface, RootStateInterface> & Actions = {
  [UserActionTypes.SET_USER_INFO]: ({ commit }, userData) => {
    HTTP.post('/users', userData)
      .then(() => {
        commit(UserMutationTypes.SET_SUCCESS, 'Користувача зареєстровано!');
      })
      .catch((e) => {
        const errorMessage = e.response.data.error_message;
        commit(UserMutationTypes.SET_ERROR, errorMessage);
      });
  },
};
