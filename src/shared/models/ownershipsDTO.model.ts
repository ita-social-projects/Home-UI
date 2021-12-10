import { OwnershipsModel } from '@/shared/models/ownerships.model';
import { OwnerDTOModel } from '@/shared/models/ownerDTO.model';

export class OwnershipsDTOModel {
  public id: number;
  public owner: OwnerDTOModel;
  public ownership_part: number;

  constructor(polledOwner: OwnershipsModel) {
    this.id = polledOwner.id;
    this.owner = new OwnerDTOModel(polledOwner.owner);
    this.ownership_part = polledOwner.ownershipPart;
  }
}
