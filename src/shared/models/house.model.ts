import { AddressModel } from '@/shared/models/address.model';
import { HouseDTOModel } from '@/shared/models/houseDTO.model';

export class HouseModel {
  public flatQuantity: number | null;
  public houseArea: number | null;
  public adjoiningArea: number | null;
  public id?: number;
  public address: AddressModel;
  public cooperationId?: number;

  constructor(polledHouse: HouseDTOModel) {
    this.flatQuantity = polledHouse.quantity_flat;
    this.houseArea = polledHouse.house_area;
    this.adjoiningArea = polledHouse.adjoining_area;
    this.id = polledHouse.id;
    this.address = new AddressModel(polledHouse.address);
  }
}
