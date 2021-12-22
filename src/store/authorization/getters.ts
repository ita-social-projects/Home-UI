import { GetterTree } from 'vuex';
import { RootStateInterface } from '@/store/types';
import { AuthorizationStateInterface, Getters, UserInterface } from '@/store/authorization/types';
import { UserModel } from './models/user.model';

export const getters: GetterTree<AuthorizationStateInterface, RootStateInterface> & Getters = {
  loggedIn(state): boolean {
    return !!state.user;
  },
  userData(state): UserModel | null {
    return state.user;
  },
};
