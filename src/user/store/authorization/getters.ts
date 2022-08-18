import { GetterTree } from 'vuex';
import { RootStateInterface } from '@/store/types';
import { AuthorizationStateInterface, Getters } from '@/user/store/authorization/types';
import { UserModel } from '../../models/user.model';

export const getters: GetterTree<AuthorizationStateInterface, RootStateInterface> & Getters = {
  loggedIn(state): boolean {
    return state.user?.id !== 0;
  },
  userData(state): UserModel {
    return state.user;
  },
};
