import { ContactInterface } from '@/store/user/types';
import { UserInterface } from '../authorization/types';
export class UpdateUserModel {
  public first_name: string;
  public middle_name: string;
  public last_name: string;
  public email: string;
  public id: number;
  public contacts: ContactInterface[];
  constructor(userData: UserInterface) {
    this.first_name = userData.firstName;
    this.middle_name = userData.middleName;
    this.last_name = userData.lastName;
    this.email = userData.email;
    this.id = userData.id;
    this.contacts = userData.contacts;
  }
}
