import { AddressDTOModel } from '@/shared/models/addressDTO.model';
import { HouseModel } from '@/shared/models/house.model';

export class HouseDTOModel {
  public quantity_flat: number;
  public house_area: number;
  public adjoining_area: number;
  public id?: number;
  public address: AddressDTOModel;

  constructor(polledHouse: HouseModel) {
    this.quantity_flat = polledHouse.flatQuantity;
    this.house_area = polledHouse.houseArea;
    this.adjoining_area = polledHouse.adjoiningArea;
    this.id = polledHouse.id;
    this.address = new AddressDTOModel(polledHouse.address);
  }
}
