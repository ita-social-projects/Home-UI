import { ApartmentDTOModel } from '@/store/apartments/models/apartmentDTO.model';
import { OwnershipModel } from '@/shared/models/ownership.model';

export class ApartmentModel {
  public id: number;
  public apartmentNumber: string;
  public apartmentArea: number;
  public ownerships: Array<OwnershipModel>;

  constructor(polledApartment: ApartmentDTOModel) {
    this.id = polledApartment.id;
    this.apartmentNumber = polledApartment.apartment_number;
    this.apartmentArea = polledApartment.apartment_area;
    this.ownerships = polledApartment.ownerships.map((el) => new OwnershipModel(el));
  }
}
