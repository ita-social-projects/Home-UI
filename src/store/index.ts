import { createStore } from 'vuex';
import { RootStateInterface } from '@/store/types';
import { authorizationStore } from '@/store/authorization';
import { cooperationStore } from '@/cooperation/store';
import { localStorageStore } from '@/store/localstorage';
import { housesStore } from '@/houses/store';
import { userStore } from '@/store/user';
import { pollsStore } from '@/store/polls';
import { invitationsStore } from '@/store/invitations';
import { apartmentsStore } from '@/apartment/store/apartments';
import { ownershipsStore } from '@/apartment/store/ownerships';
import { errorsStore } from '@/core/errors/store';
import { messagesStore } from '@/core/messages/store';

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
    errorsStore,
    messagesStore,
  },
});
