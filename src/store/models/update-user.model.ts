import { UserDataInterface, ContactInterface } from '@/store/user/types';
export class UpdateUserModel {
  public registration_token: string;
  public first_name: string;
  //public middle_name: string;
  public last_name: string;
  public email: string;
  public password: string;
  public contacts: ContactInterface[];
  constructor(userData: UserDataInterface) {
    this.registration_token = userData.registrationToken;
    this.first_name = userData.firstName;
    this.last_name = userData.lastName;
    this.email = userData.email;
    this.password = userData.password;
    this.contacts = userData.contacts;
  }
}
