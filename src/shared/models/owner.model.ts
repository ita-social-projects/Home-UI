import { OwnerDTOModel } from '@/shared/models/ownerDTO.model';
import { CooperationContactsInterface } from '@/store/cooperation/types';

export class OwnerModel {
  public id: number;
  public firstName: string;
  public middleName: string;
  public lastName: string;
  public contacts: Array<CooperationContactsInterface>;

  constructor(polledOwner: OwnerDTOModel) {
    this.id = polledOwner.id;
    this.firstName = polledOwner.first_name;
    this.middleName = polledOwner.middle_name;
    this.lastName = polledOwner.last_name;
    this.contacts = polledOwner.contacts.map((el) => (el));
  }
}
