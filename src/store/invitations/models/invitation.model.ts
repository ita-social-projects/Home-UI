import { InvitationDTOModel } from './invitationDTO.model';

export class InvitationModel {
  public id: number;
  public email: string;
  public status: string;
  public address: string;
  public invitationType: string;

  constructor(invitation: InvitationDTOModel) {
    this.id = invitation.id;
    this.email = invitation.email;
    this.status = invitation.status;
    this.address = invitation.address;
    this.invitationType = invitation.invitation_type;
  }
}
