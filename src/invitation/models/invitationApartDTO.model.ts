import { AddressDTOModel } from '@/houses/models/addressDTO.model';
import { InvitationApartmentModel } from '@/invitation/models/invitationApart.model';

export class InvitationApartmentDTOModel {
  public apartment_number?: string;
  public address?: AddressDTOModel;
  public id: number;

  constructor(apartment: InvitationApartmentModel) {
    this.apartment_number = apartment.apartmentNumber;
    if (apartment.address) {
      this.address = new AddressDTOModel(apartment.address);
    }
    this.id = apartment.id;
  }
}
