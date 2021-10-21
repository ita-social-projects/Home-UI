import { addressModel } from '@/shared/models/address.model';
import { PolledHouseDTOModel } from '@/store/polls/models/polled-houseDTO.model';

export class PolledHouseModel {
  public flatQuantity: number;
  public houseArea: number;
  public adjoiningArea: number;
  public address: addressModel;

  constructor(polledHouse: PolledHouseDTOModel) {
    this.flatQuantity = polledHouse.quantity_flat;
    this.houseArea = polledHouse.house_area;
    this.adjoiningArea = polledHouse.adjoining_area;
    this.address = new addressModel(polledHouse.address);
  }
}
