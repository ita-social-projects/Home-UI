import { UserModel } from './user.model';
import { UserContactInterface } from './../../user/types';

export class UserDTOModel {
  public first_name: string;
  public middle_name: string;
  public last_name: string;
  public email?: string;
  public id?: number;
  public contacts?: UserContactInterface[];
  public error?: string | null;
  public success?: string;

  constructor(user: UserModel) {
    this.first_name = user.firstName;
    this.middle_name = user.middleName;
    this.last_name = user.lastName;
    this.id = user.id;
    this.email = user.email;
    this.contacts = user.contacts;
    this.error = user?.error;
    this.success = user?.success;
  }
}
