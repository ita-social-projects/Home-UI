import { UpdateUserInterface } from '../store/authorization/types';
import { UserContactInterface } from '../store/user/types';

export class UpdateUserModel {
  public first_name: string;
  public middle_name: string;
  public last_name: string;
  public email: string;
  public password: string;
  public contacts: UserContactInterface[];

  constructor(userData: UpdateUserInterface) {
    this.first_name = userData.firstName;
    this.middle_name = userData.middleName;
    this.last_name = userData.lastName;
    this.email = userData.email;
    this.password = userData.password;
    this.contacts = userData.contacts;
  }
}
