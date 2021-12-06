import { AddressModel } from '@/shared/models/address.model';
import { HouseDTOModel } from '@/shared/models/houseDTO.model';

export class HouseModel {
  public flatQuantity: number;
  public houseArea: number;
  public adjoiningArea: number;
  public id?: number;
  public address: AddressModel;

  constructor(house: HouseDTOModel) {
    this.flatQuantity = house.quantity_flat;
    this.houseArea = house.house_area;
    this.adjoiningArea = house.adjoining_area;
    this.id = house.id;
    this.address = new AddressModel(house.address);
  }
}
