import { ApartmentModel } from '@/store/apartments/models/apartment.model';
import { OwnershipsDTOModel } from '@/shared/models/ownershipsDTO.model';

export class ApartmentDTOModel {
  public id: number;
  public apartment_number: string;
  public apartment_area: number;
  public ownerships: Array<OwnershipsDTOModel>;

  constructor(polledApartment: ApartmentModel) {
    this.id = polledApartment.id;
    this.apartment_number = polledApartment.apartmentNumber;
    this.apartment_area = polledApartment.apartmentArea;
    this.ownerships = polledApartment.ownerships.map((el) => new OwnershipsDTOModel(el));
  }
}
