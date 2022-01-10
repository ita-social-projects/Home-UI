import { OwnershipsDTOModel } from '@/shared/models/ownershipsDTO.model';
import { OwnerModel } from '@/shared/models/owner.model';

export class OwnershipsModel {
  public id: number;
  public owner: OwnerModel;
  public ownershipPart: string;

  constructor(polledOwner: OwnershipsDTOModel) {
    this.id = polledOwner.id;
    this.owner = new OwnerModel(polledOwner.owner);
    this.ownershipPart = polledOwner.ownership_part;
  }
}
