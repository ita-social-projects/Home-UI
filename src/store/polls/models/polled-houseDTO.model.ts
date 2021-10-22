import { AddressDTOModel } from '@/shared/models/addressDTO.model';
import { PolledHouseModel } from '@/store/polls/models/polled-house.model';

export class PolledHouseDTOModel {
  public quantity_flat: number;
  public house_area: number;
  public adjoining_area: number;
  public address: AddressDTOModel;

  constructor(polledHouse: PolledHouseModel) {
    this.quantity_flat = polledHouse.flatQuantity;
    this.house_area = polledHouse.houseArea;
    this.adjoining_area = polledHouse.adjoiningArea;
    this.address = new AddressDTOModel(polledHouse.address);
  }
}
