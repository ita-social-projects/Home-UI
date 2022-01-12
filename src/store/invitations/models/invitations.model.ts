import { InvitationDTOModel } from '@/store/invitations/models/invitationsDTO.model';
import { InvitationApartModel } from '@/store/invitations/models/invitationApart.model';

export class InvitationModel {
  public type: string;
  public email: string;
  public status: string;
  public id: number;
  public apartment: InvitationApartModel;

  constructor(invitation: InvitationDTOModel) {
    this.type = invitation.type;
    this.email = invitation.email;
    this.status = invitation.status;
    this.id = invitation.id;
    this.apartment = new InvitationApartModel(invitation.apartment);
  }
}
