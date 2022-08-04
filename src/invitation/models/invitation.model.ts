import { InvitationDTOModel } from '@/invitation/models/invitationDTO.model';
import { InvitationApartmentModel } from '@/invitation/models/invitationApart.model';

export class InvitationModel {
  public type: string;
  public email: string;
  public status: string;
  public id: number;
  public apartment: InvitationApartmentModel;

  constructor(invitation: InvitationDTOModel) {
    this.type = invitation.type;
    this.email = invitation.email;
    this.status = invitation.status;
    this.id = invitation.id;
    this.apartment = new InvitationApartmentModel(invitation.apartment);
  }
}
