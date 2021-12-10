import { ContactsDTOModel } from './contactsDTO.modal';

export class ContactsModel {
  public id: number;
  public type: string;
  public main: boolean;
  public phone?: string;
  public email?: string;

  constructor(contacts: ContactsDTOModel) {
    this.id = contacts.id;
    this.type = contacts.type;
    this.main = contacts.main;
    this.phone = contacts.phone;
    this.email = contacts.email;
  }
}
