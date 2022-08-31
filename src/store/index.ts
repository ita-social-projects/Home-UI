import { createStore } from 'vuex';
import { RootStateInterface } from '@/store/types';
import { authorizationStore } from '@/user/store/authorization';
import { cooperationStore } from '@/cooperation/store';
import { localStorageStore } from '@/user/store/localstorage';
import { housesStore } from '@/houses/store';
import { userStore } from '@/store/user';
import { pollsStore } from '@/polls/store';
import { invitationsStore } from '@/store/invitations';
import { apartmentsStore } from '@/apartment/store/apartments';
import { ownershipsStore } from '@/apartment/store/ownerships';

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
    ownershipsStore,
  },
});
