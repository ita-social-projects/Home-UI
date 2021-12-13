import { createStore } from 'vuex';
import { RootStateInterface } from '@/store/types';
import { authorizationStore } from '@/store/authorization';
import { cooperationStore } from '@/store/cooperation';
import { localStorageStore } from '@/store/localstorage';
import { housesStore } from '@/store/houses';
import { userStore } from '@/store/user';
import { pollsStore } from '@/store/polls';
import { invitationsStore } from '@/store/invitations';
import { apartmentsStore } from '@/store/apartments';

export default createStore<RootStateInterface>({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    authorizationStore,
    cooperationStore,
    userStore,
    pollsStore,
    localStorageStore,
    housesStore,
    invitationsStore,
    apartmentsStore,
  },
});
