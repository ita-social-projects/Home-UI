import { GetterTree } from 'vuex';
import { RootStateInterface } from '@/store/types';
import { HousesStateInterface, Getters } from '@/store/houses/types';

export const getters: GetterTree<HousesStateInterface, RootStateInterface> & Getters = {
  getHousesData: (state) => {
    return state.houses;
  },
  getHouseInfo: (state) => {
    return state.houseInfo;
  },
  getListOfHouses: (state) => {
    return state.houses?.map((house) => {
      const houseData = `вул. ${house.address.street}, буд. ${house.address.house_number}`;
      const houseId = house.id;
      return { houseData, houseId };
    });
  },
};
