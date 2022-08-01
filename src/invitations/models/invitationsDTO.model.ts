import { InvitationModel } from '@/invitations/models/invitations.model';
import { InvitationApartmentDTOModel } from '@/invitations/models/invitationApartDTO.model';

export class InvitationDTOModel {
  public type: string;
  public email: string;
  public status: string;
  public id: number;
  public apartment: InvitationApartmentDTOModel;

  constructor(invitation: InvitationModel) {
    this.type = invitation.type;
    this.email = invitation.email;
    this.status = invitation.status;
    this.id = invitation.id;
    this.apartment = new InvitationApartmentDTOModel(invitation.apartment);
  }
}
