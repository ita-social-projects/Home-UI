import { AddressModel } from '@/shared/models/address.model';
import { InvitationApartDTOModel } from '@/store/invitations/models/invitationApartDTO.model';

export class InvitationApartModel {
  public apartmentNumber?: string;
  public address?: AddressModel;
  public id: number;

  constructor(apartment: InvitationApartDTOModel) {
    this.apartmentNumber = apartment.apartment_number;
    if (apartment.address) {
      this.address = new AddressModel(apartment.address);
    }
    this.id = apartment.id;
  }
}
