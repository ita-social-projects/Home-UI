import { CooperationContactsInterface } from '@/store/cooperation/types';
import { AddressDTOModel } from '@/houses/models/addressDTO.model';
import { CooperationModel } from './cooperation.model';
import { HouseDTOModel } from '@/houses/models/houseDTO.model';
import { HouseModel } from '@/houses/models/house.model';

export class CooperationDTOModel {
  public id: number;
  public name: string;
  public usreo: string;
  public iban: string;
  public address: AddressDTOModel;
  public houses: Array<HouseDTOModel>;
  public contacts: Array<CooperationContactsInterface>;

  constructor(data: CooperationModel) {
    this.id = data.id;
    this.name = data.name;
    this.usreo = data.edrpou;
    this.iban = data.iban;
    this.address = new AddressDTOModel(data.address);
    this.houses = data.houses.map((el: HouseModel) => new HouseDTOModel(el));
    this.contacts = data.contacts;
  }
}
