import { UserDTOModel } from './userDTO.model';
import { UserContactInterface } from './../../user/types';

export class UserModel {
  public firstName: string;
  public middleName: string;
  public lastName: string;
  public email: string;
  public id: number;
  public contacts: UserContactInterface[];
  public error?: string | null;
  public success?: string;

  constructor(user: UserDTOModel) {
    this.firstName = user.first_name;
    this.middleName = user.middle_name;
    this.lastName = user.last_name;
    this.id = user.id;
    this.email = user.email;
    this.contacts = user.contacts;
  }
}
