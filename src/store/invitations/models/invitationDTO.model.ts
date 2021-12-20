import { InvitationModel } from './invitation.model';

export class InvitationDTOModel {
  public id: number;
  public email: string;
  public status: string;
  public address: string;
  public invitation_type: string;

  constructor(invitation: InvitationModel) {
    this.id = invitation.id;
    this.email = invitation.email;
    this.status = invitation.status;
    this.address = invitation.address;
    this.invitation_type = invitation.invitationType;
  }
}
