import { OwnershipsModel } from '@/apartment/models/ownerships.model';
import { OwnerDTOModel } from '@/apartment/models/ownerDTO.model';

export class OwnershipsDTOModel {
  public id: number;
  public owner: OwnerDTOModel;
  public ownership_part: string;

  constructor(polledOwner: OwnershipsModel) {
    this.id = polledOwner.id;
    this.owner = new OwnerDTOModel(polledOwner.owner);
    this.ownership_part = polledOwner.ownershipPart;
  }
}
