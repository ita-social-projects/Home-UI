import { GetterTree } from 'vuex';

import { RootStateInterface } from '@/store/types';
import { UserStateInterface, Getters } from '@/store/user/types';

export const getters: GetterTree<UserStateInterface, RootStateInterface> & Getters = {};
