import { createStore } from 'vuex';
import { RootStateInterface } from '@/store/types';
import { authorizationStore } from '@/store/authorization';
import { cooperationStore } from '@/store/cooperation';
import { localStorageStore } from '@/store/localstorage';
import { housesStore } from '@/store/houses';
import { pollsStore } from '@/store/polls';
import { userStore } from '@/store/user';

export default createStore<RootStateInterface>({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    authorizationStore,
    cooperationStore,
    userStore,
    pollsStore,
    localStorageStore,
    housesStore,
  },
});
