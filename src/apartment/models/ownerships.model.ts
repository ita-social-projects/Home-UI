import { OwnershipsDTOModel } from '@/apartment/models/ownershipsDTO.model';
import { OwnerModel } from '@/apartment/models/owner.model';

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
