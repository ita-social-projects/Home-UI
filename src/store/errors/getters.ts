import { GetterTree } from 'vuex';

import { RootStateInterface } from '@/store/types';
import { ErrorsStateInterface } from '@/store/errors/types';

export const getters: GetterTree<ErrorsStateInterface, RootStateInterface> = {
  getErrorMessage: (state) => {
    const errorMessage = state.error?.errorMessage;
    const errorStatus = state.error?.errorStatus;
    return { errorMessage, errorStatus };
  },
};
