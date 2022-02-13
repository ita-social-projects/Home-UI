export class UpdateOwnershipsDTOModel {
  public ownership_part: number;

  constructor(polledOwner: any) {
    this.ownership_part = polledOwner.ownershipPart;
  }
}