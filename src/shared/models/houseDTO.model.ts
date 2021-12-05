import { AddressDTOModel } from '@/shared/models/addressDTO.model';
import { HouseModel } from '@/shared/models/house.model';

export class HouseDTOModel {
  public quantity_flat: number;
  public house_area: number;
  public adjoining_area: number;
  public address: AddressDTOModel;

  constructor(house: HouseModel) {
    this.quantity_flat = house.flatQuantity;
    this.house_area = house.houseArea;
    this.adjoining_area = house.adjoiningArea;
    this.address = new AddressDTOModel(house.address);
  }
}
