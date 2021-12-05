import { ApartmentModel } from '@/store/apartments/models/apartment.model';
import { OwnershipDTOModel } from '@/shared/models/ownershipDTO.model';

export class ApartmentDTOModel {
  public id: number;
  public apartment_number: string;
  public apartment_area: number;
  public ownerships: Array<OwnershipDTOModel>;

  constructor(polledApartment: ApartmentModel) {
    this.id = polledApartment.id;
    this.apartment_number = polledApartment.apartmentNumber;
    this.apartment_area = polledApartment.apartmentArea;
    this.ownerships = polledApartment.ownerships.map((el) => new OwnershipDTOModel(el));
  }
}
