import { CooperationContactsInterface } from '@/store/cooperation/types';

export class ContactsDTOModel {
  public type: string;
  public main: boolean;
  public phone: string;
  public email: string;

  constructor(contacts: CooperationContactsInterface) {
    this.type = contacts.type;
    this.main = contacts.main;
    this.phone = contacts.phone;
    this.email = contacts.email;
  }
}
