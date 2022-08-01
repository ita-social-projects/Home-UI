import { AddressModel } from '@/houses/models/address.model';
import { InvitationApartmentDTOModel } from '@/invitations/models/invitationApartDTO.model';

export class InvitationApartmentModel {
  public apartmentNumber?: string;
  public address?: AddressModel;
  public id: number;

  constructor(apartment: InvitationApartmentDTOModel) {
    this.apartmentNumber = apartment.apartment_number;
    if (apartment.address) {
      this.address = new AddressModel(apartment.address);
    }
    this.id = apartment.id;
  }
}
