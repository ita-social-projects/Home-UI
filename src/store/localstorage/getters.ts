import { GetterTree } from 'vuex';
import { RootStateInterface } from '@/store/types';
import { TokenStateInterface, TokenInterface } from '@/store/localstorage/types';

export const getters: GetterTree<TokenStateInterface, RootStateInterface> = {
  isTokenExist(state): boolean {
    return !!state.token;
  },
  tooken(state): TokenInterface | null {
    return state.token;
  },
};
