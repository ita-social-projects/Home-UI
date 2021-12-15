export class UpdateApartmentDTOModel {
  public number: string;
  public area: number;

  constructor(polledApartment: any) {
    this.number = polledApartment.apartmentNumber;
    this.area = polledApartment.apartmentArea;
  }
}
