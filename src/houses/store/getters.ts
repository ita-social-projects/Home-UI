import { GetterTree } from 'vuex';
import { RootStateInterface } from '@/store/types';
import { HousesStateInterface, Getters } from '@/houses/store/types';

export const getters: GetterTree<HousesStateInterface, RootStateInterface> & Getters = {
  getHousesData: (state) => {
    return state.houses;
  },
  getHouseInfo: (state) => {
    return state.houseInfo;
  },
  getListOfHouses: (state) => {
    return state.houses?.map((house) => {
      const houseData = `вул. ${house.address.street}, будинок ${house.address.houseNumber}`;
      const houseId = house.id;
      return { houseData, houseId };
    });
  },
};
