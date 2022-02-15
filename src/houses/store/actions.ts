import { ActionTree } from 'vuex';
import { RootStateInterface } from '@/store/types';
import { HousesStateInterface, HousesMutationsEnum, HousesActionsEnum, Actions } from '@/houses/store/types';
import { HTTP } from '@/core/api/http-common';
import { HouseModel } from '../models/house.model';
import { HouseDTOModel } from '../models/houseDTO.model';

export const actions: ActionTree<HousesStateInterface, RootStateInterface> & Actions = {
  [HousesActionsEnum.SET_HOUSES]: async ({ commit }, payload) => {
    const { data } = await HTTP.get(`/cooperations/${payload}/houses`);
    const houses: Array<HouseModel> = data.map((el: HouseDTOModel) => new HouseModel(el));

    commit(HousesMutationsEnum.SET_HOUSES, houses);
  },
  [HousesActionsEnum.EDIT_HOUSE]: async ({ commit }, payload) => {
    try {
      const payloadToSend: HouseDTOModel = new HouseDTOModel(payload.houseData);
      await HTTP.put(`/cooperations/${payload.houseData.cooperationId}/houses/${payload.houseData.id}`, payloadToSend);

      commit(HousesMutationsEnum.EDIT_HOUSE, payload.houseData);
    } catch (err: any) {
      console.log('error EDIT_HOUSE', err);
    }
  },
  [HousesActionsEnum.DELETE_HOUSE]: async ({ commit }, payload) => {
    try {
      await HTTP.delete(`/cooperations/${payload.cooperationId}/houses/${payload.id}`);

      commit(HousesMutationsEnum.DELETE_HOUSE, payload);
    } catch (err: any) {
      console.log('error DELETE_HOUSE', err);
    }
  },
  [HousesActionsEnum.GET_HOUSE_BY_ID]: async ({ commit }, payload) => {
    const { data } = await HTTP.get(`/cooperations/${payload.cooperationId}/houses/${payload.id}`);
    const house: HouseModel = new HouseModel(data);

    commit(HousesMutationsEnum.GET_HOUSE_BY_ID, house);
  },
  [HousesActionsEnum.ADD_HOUSE]: async ({ commit }, payload) => {
    try {
      const payloadToSend: HouseDTOModel = new HouseDTOModel(payload.houseData);
      const { data } = await HTTP.post(`/cooperations/${payload.houseData.cooperationId}/houses`, payloadToSend);
      const house: HouseModel = new HouseModel(data);

      commit(HousesMutationsEnum.ADD_HOUSE, house);
    } catch (err: any) {
      console.log('error ADD_HOUSE', err);
    }
  },
};
