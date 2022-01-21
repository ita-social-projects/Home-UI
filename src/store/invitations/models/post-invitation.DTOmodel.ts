import { PostInvitationInterface } from '../types';

export class PostInvitationDTOModel {
  public type: string;
  public email: string;
  public cooperation_id: number;
  public role: string;
  public apartment_id: number;

  constructor(invitation: PostInvitationInterface) {
    this.type = invitation.type;
    this.email = invitation.email;
    this.cooperation_id = invitation.cooperationId;
    this.role = invitation.role;
    this.apartment_id = invitation.apartmentId;
  }
}
