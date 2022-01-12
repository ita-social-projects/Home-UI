import { InvitationApartModel } from '@/store/invitations/models/invitationApart.model';
import { PostInvitationDTOModel } from './post-invitation.DTOmodel';

export class PostInvitationModel {
  public type: string;
  public email: string;
  public status: string;
  public id: number;
  public role: string;
  public apartmentId: number;
  public cooperationId: number;

  constructor(invitation: PostInvitationDTOModel) {
    this.type = invitation.type;
    this.email = invitation.email;
    this.status = invitation.status;
    this.id = invitation.id;
    this.cooperationId = invitation.cooperation_id;
    this.role = invitation.role;
    this.apartmentId = invitation.apartment_id;
  }
}
