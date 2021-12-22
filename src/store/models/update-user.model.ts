import { ContactInterface, UpdateUserInterface } from '../authorization/types';

export class UpdateUserModel {
  public first_name: string;
  public middle_name: string;
  public last_name: string;
  public email: string;
  public password: string;
  public contacts: ContactInterface[];

  constructor(userData: UpdateUserInterface) {
    this.first_name = userData.firstName;
    this.middle_name = userData.middleName;
    this.last_name = userData.lastName;
    this.email = userData.email;
    this.password = 'passworD123';
    this.contacts = userData.contacts;
  }
}
