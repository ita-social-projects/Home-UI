import {
  CooperationContactsInterface,
  CooperationInterface,
  CooperationHousesInterface,
} from '@/store/cooperation/types';
import { CooperationUpdateModel } from '@/store/cooperation/models/update-cooperation.model';
import { AddressRequestModel } from '@/share/request-address.model';
import { ContactsUpdateModel } from '@/share/update-contacts.modal';

export class CooperationRequestModel {
  public id: number;
  public name: string;
  public edrpou: string;
  public iban: string;
  public address: AddressRequestModel;
  public houses: Array<CooperationHousesInterface>;
  public contacts: Array<CooperationContactsInterface>;

  // --> public zipCode: string;

  constructor(data: CooperationUpdateModel) {
    this.id = data.id;
    this.name = data.name;
    this.edrpou = data.usreo;
    this.iban = data.iban;
    this.address = data.address;
    this.houses = data.houses;
    this.contacts = data.contacts;

    // --> this.zipCode = address.zip_code;
  }
}
