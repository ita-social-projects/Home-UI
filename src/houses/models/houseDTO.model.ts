import { AddressDTOModel } from '@/houses/models/addressDTO.model';
import { HouseModel } from './house.model';

export class HouseDTOModel {
  public quantity_flat: number | null;
  public house_area: number | null;
  public adjoining_area: number | null;
  public id: number;
  public address: AddressDTOModel;
  public cooperationId?: number;

  constructor(house: HouseModel) {
    this.quantity_flat = house.flatQuantity;
    this.house_area = house.houseArea;
    this.adjoining_area = house.adjoiningArea;
    this.id = house.id;
    this.address = new AddressDTOModel(house.address);
  }
}
