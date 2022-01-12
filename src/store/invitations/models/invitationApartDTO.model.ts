import { AddressDTOModel } from '@/shared/models/addressDTO.model';
import { InvitationApartModel } from '@/store/invitations/models/invitationApart.model';

export class InvitationApartDTOModel {
  public apartment_number: string;
  public address: AddressDTOModel;
  public id: number;

  constructor(apartment: InvitationApartModel) {
    this.apartment_number = apartment.apartmentNumber;
    this.address = new AddressDTOModel(apartment.address);
    this.id = apartment.id;
  }
}
