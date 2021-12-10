import { OwnerDTOModel } from '@/shared/models/ownerDTO.model';
import { ContactsDTOModel } from './contactsDTO.modal';
import { ContactsModel } from './contacts.modal';

export class OwnerModel {
  public id: number;
  public firstName: string;
  public middleName: string;
  public lastName: string;
  public contacts: Array<ContactsModel>;

  constructor(polledOwner: OwnerDTOModel) {
    this.id = polledOwner.id;
    this.firstName = polledOwner.first_name;
    this.middleName = polledOwner.middle_name;
    this.lastName = polledOwner.last_name;
    this.contacts = polledOwner.contacts.map((el: ContactsDTOModel) => new ContactsModel(el));
  }
}
