import { InvitationModel } from './invitation.model';

export class InvitationDTOModel {
  public id?: number;
  public cooperation_id?: number;
  public email: string;
  public status?: string;
  public type: string;
  public role?: string;

  constructor(invitation: InvitationModel) {
    this.cooperation_id = invitation.cooperationId;
    this.email = invitation.email;
    this.type = invitation.invitationType;
    this.role = invitation.role;
  }
}
