import { ContactInterface } from '@/store/user/types';
import { UserInterface } from '../authorization/types';
import { UpdateUserModel } from './update-user.model';

export class GetUserModel {
  public firstName: string;
  public middleName: string;
  public lastName: string;
  public email: string;
  public id: number;
  public contacts: ContactInterface[];
  constructor(userData: UpdateUserModel) {
    this.firstName = userData.first_name;
    this.middleName = userData.middle_name;
    this.lastName = userData.last_name;
    this.email = userData.email;
    this.id = userData.id;
    this.contacts = userData.contacts;
  }
}
