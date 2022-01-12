import { InvitationModel } from '@/store/invitations/models/invitations.model';
import { InvitationApartDTOModel } from '@/store/invitations/models/invitationApartDTO.model';

export class InvitationDTOModel {
  public type: string;
  public email: string;
  public status: string;
  public id: number;
  public apartment: InvitationApartDTOModel;

  constructor(invitation: InvitationModel) {
    this.type = invitation.type;
    this.email = invitation.email;
    this.status = invitation.status;
    this.id = invitation.id;
    this.apartment = new InvitationApartDTOModel(invitation.apartment);
  }
}
