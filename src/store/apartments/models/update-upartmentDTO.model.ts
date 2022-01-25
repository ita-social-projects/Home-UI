export class UpdateApartmentDTOModel {
  public number: string;
  public area: number;

  constructor(polledApartment: { apartmentNumber: string; apartmentArea: number }) {
    this.number = polledApartment.apartmentNumber;
    this.area = polledApartment.apartmentArea;
  }
}
