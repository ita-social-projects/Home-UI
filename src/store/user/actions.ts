import { ActionTree } from 'vuex';
import { RootStateInterface } from '@/store/types';
import { UserStateInterface, UserActionTypes, UserMutationTypes, Actions } from '@/store/user/types';
import { HTTP } from '@/core/api/http-common';

export const actions: ActionTree<UserStateInterface, RootStateInterface> & Actions = {
  [UserActionTypes.SET_USER_INFO]: async ({ commit }, userData) => {
    const bodyData = {
      registration_token: userData?.registrationToken,
      first_name: userData?.firstName,
      last_name: userData?.lastName,
      email: userData?.email,
      password: userData?.password,
      contacts: userData?.contacts,
    };
    HTTP.post('/users', bodyData)
      .then(() => {
        commit(UserMutationTypes.SET_SUCCESS, 'Користувача зареєстровано!');
      })
      .catch((e) => {
        const errorMessage = e.response.data.error_message;
        commit(UserMutationTypes.SET_ERROR, errorMessage);
      });
  },
};
