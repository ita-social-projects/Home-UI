import { GetterTree } from 'vuex';
import { RootStateInterface } from '@/store/types';
import { UserStateInterface, UserInterface } from '@/store/authorization/types';

export const getters: GetterTree<UserStateInterface, RootStateInterface> = {
  loggedIn(state): boolean {
    return !!state.user;
  },
  userData(state): UserInterface | null {
    return state.user;
  },
};
