import { createStore } from 'vuex';
import { RootStateInterface } from '@/store/types';
import { authorizationStore } from '@/user/store/authorization';
import { cooperationStore } from '@/cooperation/store';
import { localStorageStore } from '@/user/store/localstorage';
import { housesStore } from '@/houses/store';
import { userStore } from '@/user/store/user';
import { pollsStore } from '@/poll/store';
import { invitationsStore } from '@/invitation/store';
import { apartmentsStore } from '@/apartment/store/apartments';
import { ownershipsStore } from '@/apartment/store/ownerships';
import { tariffStore } from '@/finance/store';
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
    tariffStore,
    errorsStore,
    messagesStore,
  },
});
