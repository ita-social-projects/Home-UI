import { OwnershipModel } from '@/shared/models/ownership.model';
import { OwnerDTOModel } from '@/shared/models/ownerDTO.model';

export class OwnershipDTOModel {
  public id: number;
  public owner: OwnerDTOModel;
  public ownership_part: number;

  constructor(polledOwner: OwnershipModel) {
    this.id = polledOwner.id;
    this.owner = new OwnerDTOModel(polledOwner.owner);
    this.ownership_part = polledOwner.ownershipPart;
  }
}
