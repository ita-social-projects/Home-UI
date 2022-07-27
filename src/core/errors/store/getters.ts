import { GetterTree } from 'vuex';

import { RootStateInterface } from '@/store/types';
import { ErrorsStateInterface } from '@/core/errors/store/types';

export const getters: GetterTree<ErrorsStateInterface, RootStateInterface> = {
  getErrorMessage: (state) => {
    const errorList = state.errorsList;
    return errorList;
  },
};
