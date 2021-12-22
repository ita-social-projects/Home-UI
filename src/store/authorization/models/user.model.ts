import { UserDTOModel } from './userDTO.model';
import { ContactInterface } from '../../user/types';

export class UserModel {
  public firstName: string;
  public middleName: string;
  public lastName: string;
  public email: string;
  public id: number;
  public contacts: ContactInterface[];
  public error?: string | null;
  public success?: string;

  constructor(polledAuthorization: UserDTOModel) {
    this.firstName = polledAuthorization.first_name;
    this.middleName = polledAuthorization.middle_name;
    this.lastName = polledAuthorization.last_name;
    this.id = polledAuthorization.id;
    this.email = polledAuthorization.email;
    this.contacts = polledAuthorization.contacts;
    this.error = polledAuthorization.error;
    this.success = polledAuthorization.success;
  }
}
