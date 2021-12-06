import { ActionTree } from 'vuex';
import { RootStateInterface } from '@/store/types';
import { HousesStateInterface, HousesMutationsEnum, HousesActionsEnum, Actions } from '@/store/houses/types';
import { HTTP } from '@/core/api/http-common';
import { HouseModel } from '@/shared/models/house.model';
import { HouseDTOModel } from './../../shared/models/houseDTO.model';
import { StoreModuleEnum } from '@/store/types';

export const actions: ActionTree<HousesStateInterface, RootStateInterface> & Actions = {
  [HousesActionsEnum.SET_HOUSES]: async ({ commit }) => {
    const { data } = await HTTP.get(`/cooperations/1/houses`);
    const houseData: Array<HouseModel> = data.map((el: HouseDTOModel) => new HouseModel(el));
    commit(HousesMutationsEnum.SET_HOUSES, houseData);
  },
  [HousesActionsEnum.SET_MODAL_DISPLAY]: ({ commit }, payload) => {
    commit(HousesMutationsEnum.SET_MODAL_DISPLAY, payload);
  },
  [HousesActionsEnum.ADD_HOUSE]: async ({ commit, dispatch }, payload) => {
    try {
      const payloadData = new HouseDTOModel(payload);
      await HTTP.post(`/cooperations/${payload.id}/houses`, payloadData).then((r) => {
        console.log('resonse', r.data);
        const houseData = new HouseModel(r.data);
        console.log('houseData', houseData);
        commit(HousesMutationsEnum.ADD_HOUSE, houseData);
      });
      // await dispatch(`${HousesActionsEnum.SET_HOUSES}`);
    } catch (e: any) {
      console.log(e.response);
      console.log(e);
    }
  },
  [HousesActionsEnum.SET_ADD_HOUSE_MODAL]: ({ commit }, payload) => {
    commit(HousesMutationsEnum.SET_ADD_HOUSE_MODAL, payload);
  },
};
