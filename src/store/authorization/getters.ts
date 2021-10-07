import { GetterTree } from 'vuex';
import { RootStateInterface } from '@/store/types';
import { AuthorizationStateInterface, UserInterface } from '@/store/authorization/types';

export const getters: GetterTree<AuthorizationStateInterface, RootStateInterface> = {
  loggedIn(state): boolean {
    return !!state.user;
  },
  userData(state): UserInterface | null {
    return state.user;
  },
};
