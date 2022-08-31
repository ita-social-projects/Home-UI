import { ActionTree } from 'vuex';
import { RootStateInterface } from '@/store/types';
import {
  UserStateInterface,
  UserActionEnum,
  UserMutationEnum,
  Actions,
  UserDataInterface,
} from '@/user/store/user/types';
import { HTTP } from '@/core/api/http-common';
import { PostUserModel } from '@/user/models/post-user.model';

export const actions: ActionTree<UserStateInterface, RootStateInterface> & Actions = {
  [UserActionEnum.SET_USER_INFO]: async ({ commit }, userData: UserDataInterface) => {
    const payloadData = new PostUserModel(userData);
    HTTP.post('/users', payloadData)
      .then(() => {
        commit(UserMutationEnum.SET_SUCCESS, 'Користувача зареєстровано!');
      })
      .catch((e) => {
        const errorMessage = e.response.data.error_message;
        commit(UserMutationEnum.SET_ERROR, errorMessage);
      });
  },
  [UserActionEnum.RESET_ERROR_ACTION]: ({ commit }) => {
    commit(UserMutationEnum.RESET_ERROR);
  },
};
