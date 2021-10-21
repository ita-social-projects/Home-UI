import { CooperationContactsInterface } from '@/store/cooperation/types';
import { CooperationDTOModel } from '@/store/cooperation/models/update-cooperation.model';
import { addressModel } from '@/shared/models/address.model';
import { PolledHouseModel } from '@/store/polls/models/polled-house.model';

export class CooperationModel {
  public id: number;
  public name: string;
  public edrpou: string;
  public iban: string;
  public address: addressModel;
  public houses: Array<PolledHouseModel>;
  public contacts: Array<CooperationContactsInterface>;

  // --> public zipCode: string;

  constructor(data: CooperationDTOModel) {
    this.id = data.id;
    this.name = data.name;
    this.edrpou = data.usreo;
    this.iban = data.iban;
    this.address = new addressModel(data.address);
    this.houses = data.houses.map((el) => new PolledHouseModel(el));
    this.contacts = data.contacts;

    // --> this.zipCode = address.zip_code;
  }
}
