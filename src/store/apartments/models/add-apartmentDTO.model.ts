import { ApartmentModel } from '@/store/apartments/models/apartment.model';

export class AddApartmentDTOModel {
  public number: string;
  public area: number;
  public invitations: [];

  constructor(polledApartment: ApartmentModel) {
    this.number = polledApartment.apartmentNumber;
    this.area = Number(polledApartment.apartmentArea);
    this.invitations = [];
  }
}
