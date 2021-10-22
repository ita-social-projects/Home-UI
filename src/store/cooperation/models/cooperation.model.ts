import { CooperationContactsInterface } from '@/store/cooperation/types';
import { CooperationDTOModel } from '@/store/cooperation/models/cooperationDTO.model';
import { AddressModel } from '@/shared/models/address.model';
import { PolledHouseModel } from '@/store/polls/models/polled-house.model';

export class CooperationModel {
  public id: number;
  public name: string;
  public edrpou: string;
  public iban: string;
  public address: AddressModel;
  public houses: Array<PolledHouseModel>;
  public contacts: Array<CooperationContactsInterface>;

  constructor(data: CooperationDTOModel) {
    this.id = data.id;
    this.name = data.name;
    this.edrpou = data.usreo;
    this.iban = data.iban;
    this.address = new AddressModel(data.address);
    this.houses = data.houses.map((el) => new PolledHouseModel(el));
    this.contacts = data.contacts;
  }
}
