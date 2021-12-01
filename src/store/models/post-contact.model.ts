import { ContactInterface } from '../authorization/types';
export class PostContactModel {
  public type: string;
  public main: boolean;
  public email: string;
  constructor(contacts: ContactInterface) {
    this.type = contacts.type;
    this.main = contacts.main;
    this.email = contacts.email;
  }
}
