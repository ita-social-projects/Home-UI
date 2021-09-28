import { GetterTree } from 'vuex';
import { RootStateInterface } from '@/store/types';
import { UserStateInterface } from '@/store/sign-in/types';

export const getters: GetterTree<UserStateInterface, RootStateInterface> = {
  loggedIn(state): boolean {
    return !!state.user;
  },
};
