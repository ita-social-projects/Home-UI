import { ActionTree } from 'vuex';
import { RootStateInterface } from '@/store/types';
import { TariffStateInterface, TariffActionEnum, TariffMutationEnum, Actions } from '@/finance/store/types';
import { TariffDTOModel } from '@/finance/models/tariffDTO.model';
import { TariffModel } from '@/finance/models/tariff.model';
import { HTTP } from '@/core/api/http-common';
import { reactive } from 'vue';

export const actions: ActionTree<TariffStateInterface, RootStateInterface> & Actions = {
  [TariffActionEnum.SET_CURRENT_TARIFF]: ({ commit }, payload) => {
    const newTariff: TariffModel = new TariffModel(payload);
    commit(TariffMutationEnum.SET_CURRENT_TARIFF, newTariff);
  },
  [TariffActionEnum.CLEAR_CURRENT_TARIFF]: ({ commit }) => {
    commit(TariffMutationEnum.CLEAR_CURRENT_TARIFF, '');
  },
  [TariffActionEnum.CREATE_TARIFF]: ({ commit, state }) => {
    try {
      const currentTariff = state.currentTariff;
      // TODO when endpoints will exist for finance section, create request to backend -> POST axios
      commit(TariffMutationEnum.CREATE_TARIFF, currentTariff);
    } catch (error: any) {
      console.log(error);
    }
  },

  [TariffActionEnum.SET_TARIFF_LIST]: async ({ commit }, payload) => {
    try {
      // TODO when endpoints will exist for finance section, create request to backend -> GET axios
      // const response = await HTTP.get(``);
      // const tariffList: Array<TariffModel> = response.data.map((el: TariffDTOModel) => new TariffModel(el));

      // TODO when endpoints will exist for finance section and create GET request to backend, delete tariffs
      const tariffs: Array<TariffModel> = [
        {
          houseId: 1,
          tariffTitle: 'Тариф 1',
          tariffPrice: '100',
          tariffComment: '1-й коментар',
          tariffDate: new Date().toLocaleDateString('ek-UA'),
        },
        {
          houseId: 2,
          tariffTitle: 'Тариф 2',
          tariffComment: '2-й коментар',
          tariffPrice: '200',
          tariffDate: new Date().toLocaleDateString('ek-UA'),
        },
        {
          houseId: 3,
          tariffTitle: 'Тариф 3',
          tariffComment: '3-й коментар',
          tariffPrice: '300',
          tariffDate: new Date().toLocaleDateString('ek-UA'),
        },
        {
          houseId: 4,
          tariffTitle: 'Тариф 4',
          tariffComment: '4-й коментар',
          tariffPrice: '400',
          tariffDate: new Date().toLocaleDateString('ek-UA'),
        },
        {
          houseId: 5,
          tariffTitle: 'Тариф 5',
          tariffComment: '5-й коментар',
          tariffPrice: '500',
          tariffDate: new Date().toLocaleDateString('ek-UA'),
        },
      ];
      // commit(TariffMutationEnum.SET_TARIFF_LIST, tariffList);

      commit(TariffMutationEnum.SET_TARIFF_LIST, tariffs);
    } catch (err: any) {
      console.log('error SET_TARIFF_LIST', err);
    }
  },
};
