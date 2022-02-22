import { ApartmentDTOModel } from '@/apartment/models/apartmentDTO.model';
import { OwnershipsModel } from '@/apartment/models/ownerships.model';

export class ApartmentModel {
  public id: number;
  public apartmentNumber: string;
  public apartmentArea: number;
  public ownerships?: Array<OwnershipsModel>;

  constructor(polledApartment: ApartmentDTOModel) {
    this.id = polledApartment.id;
    this.apartmentNumber = polledApartment.apartment_number;
    this.apartmentArea = polledApartment.apartment_area;
    this.ownerships = polledApartment.ownerships?.map((el) => new OwnershipsModel(el));
  }
}
