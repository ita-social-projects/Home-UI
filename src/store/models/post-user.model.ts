import { UserDataInterface } from '@/store/user/types';
import { UserContactInterface } from './../user/types';
export class PostUserModel {
  public registration_token: string;
  public first_name: string;
  public middle_name: string;
  public last_name: string;
  public email: string;
  public password: string;
  public contacts: UserContactInterface[];

  constructor(userData: UserDataInterface) {
    this.registration_token = userData.registrationToken;
    this.first_name = userData.firstName;
    this.middle_name = userData.middleName;
    this.last_name = userData.lastName;
    this.email = userData.email;
    this.password = userData.password;
    this.contacts = userData.contacts;
  }
}
