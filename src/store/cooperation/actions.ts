import { ActionTree } from 'vuex';

import { RootStateInterface } from '@/store/types';
import { CooperationInterface, CooperationMutationTypes, Actions } from '@/store/cooperation/types';
import { CooperationActionTypes } from '@/store/cooperation/types';

export const actions: ActionTree<CooperationInterface, RootStateInterface> & Actions = {
  [CooperationActionTypes.SAY_HELLO]: ({ commit }) => {
    commit(CooperationMutationTypes.SAY_HELLO, 'hello');
  },
  [CooperationActionTypes.IS_COOPERATION_REGISTERED]: ({ commit }, payload) => {
    commit(CooperationMutationTypes.IS_COOPERATION_REGISTERED, payload);
  },
};

// how to dispatch action with custom payload:
/*
 checkEdrpouRegistered() {
      const payload = {
        params: {
          edrpou: this.edrpou,
        },
        successCallback: (r: AxiosResponse): void => {
          this.errors.checkError = false;
          this.check.edrpou.registered = r.data.length !== 0;
        },
        errorCallback: (): void => {
          this.errors.checkError = true;
        },
      };

      this.$store.dispatch('cooperationStore/IS_COOPERATION_REGISTERED', payload);
    },
*/
