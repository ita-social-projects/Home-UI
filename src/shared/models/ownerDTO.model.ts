import { OwnerModel } from '@/shared/models/owner.model';
import { UserContactInterface } from '@/store/user/types';

export class OwnerDTOModel {
  public id: number;
  public first_name: string;
  public middle_name: string;
  public last_name: string;
  public contacts: Array<UserContactInterface>;

  constructor(polledOwner: OwnerModel) {
    this.id = polledOwner.id;
    this.first_name = polledOwner.firstName;
    this.middle_name = polledOwner.middleName;
    this.last_name = polledOwner.lastName;
    this.contacts = polledOwner.contacts;
  }
}
