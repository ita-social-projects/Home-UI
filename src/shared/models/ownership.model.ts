import { OwnershipDTOModel } from '@/shared/models/ownershipDTO.model';
import { OwnerModel } from '@/shared/models/owner.model';

export class OwnershipModel {
  public id: number;
  public owner: OwnerModel;
  public ownershipPart: number;

  constructor(polledOwner: OwnershipDTOModel) {
    this.id = polledOwner.id;
    this.owner = new OwnerModel(polledOwner.owner);
    this.ownershipPart = polledOwner.ownership_part;
  }
}
