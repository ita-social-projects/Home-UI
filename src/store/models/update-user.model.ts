import { UpdateUserInterface } from '../authorization/types';
export class UpdateUserModel {
  public first_name: string;
  public middle_name: string;
  public last_name: string;
  public email: string;
  public password: string;
  constructor(userData: UpdateUserInterface) {
    this.first_name = userData.first_name;
    this.middle_name = userData.middle_name;
    this.last_name = userData.last_name;
    this.email = userData.email;
    this.password = userData.password;
  }
}
