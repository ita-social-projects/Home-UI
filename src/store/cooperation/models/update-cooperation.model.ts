import {
  CooperationInterface,
  CooperationHousesInterface,
  CooperationContactsInterface,
  CooperationDTOInterface,
} from '@/store/cooperation/types';
import { AddressRequestModel } from '@/share/request-address.model';
import { ContactsUpdateModel } from '@/share/update-contacts.modal';

export class CooperationUpdateModel {
  public id: number;
  public name: string;
  public usreo: string;
  public iban: string;
  public address: AddressRequestModel;
  public houses: Array<CooperationHousesInterface>;
  public contacts: Array<ContactsUpdateModel>;

  // --> public zip_code: string;

  constructor(data: CooperationInterface) {
    this.id = data.id;
    this.name = data.name;
    this.usreo = data.edrpou;
    this.iban = data.iban;
    this.address = data.address;
    this.houses = data.houses;
    // this.contacts = data.contacts;
    this.contacts = data.contacts.map((el) => new ContactsUpdateModel(el));

    // --> this.zip_code = address.zipCode;
  }
}
