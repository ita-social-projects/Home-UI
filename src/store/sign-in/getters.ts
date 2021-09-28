import { GetterTree } from 'vuex';
import { RootStateInterface } from '@/store/types';
import { UserStateInterface, User } from '@/store/sign-in/types';

export const getters: GetterTree<UserStateInterface, RootStateInterface> = {
  loggedIn(state): boolean {
    return !!state.user;
  },
  userData(state): User | null {
    return state.user;
  },
};
