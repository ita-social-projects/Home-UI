import { CooperationContactsInterface } from '@/store/cooperation/types';
import { AddressDTOModel } from '@/shared/models/addressDTO.model';
import { CooperationModel } from './request-cooperation.model';
import { PolledHouseDTOModel } from '@/store/polls/models/polled-houseDTO.model';
import { PolledHouseModel } from '@/store/polls/models/polled-house.model';

export class CooperationDTOModel {
  public id: number;
  public name: string;
  public usreo: string;
  public iban: string;
  public address: AddressDTOModel;
  public houses: Array<PolledHouseDTOModel>;
  public contacts: Array<CooperationContactsInterface>;

  // --> public zip_code: string;

  constructor(data: CooperationModel) {
    this.id = data.id;
    this.name = data.name;
    this.usreo = data.edrpou;
    this.iban = data.iban;
    this.address = new AddressDTOModel(data.address);
    this.houses = data.houses.map((el: PolledHouseModel) => new PolledHouseDTOModel(el));
    // this.contacts = data.contacts;
    this.contacts = data.contacts;

    // --> this.zip_code = address.zipCode;
  }
}
