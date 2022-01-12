import { InvitationDTOModel } from './invitationDTO.model';

export class InvitationModel {
  public id?: number;
  public cooperationId?: number;
  public email: string;
  public status?: string;
  public invitationType: string;
  public role?: string;

  constructor(invitation: InvitationDTOModel) {
    this.id = invitation.id;
    this.email = invitation.email;
    this.status = invitation.status;
    this.invitationType = invitation.type;
  }
}
