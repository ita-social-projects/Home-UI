import { ApartmentInSelectedHouseDTOModel } from '@/finance/models/calculationDTO.model';

export class ApartmentInSelectedHouseModel {
  public personalAccount: number;
  public owner: string;
  public apartmentNumber: string;
  public apartmentArea: number;
  public houseTariff: number;
  public accrued: number;

  constructor(apartment: ApartmentInSelectedHouseDTOModel) {
    this.personalAccount = apartment.personal_account;
    this.owner = apartment.owner;
    this.apartmentNumber = apartment.apartment_number;
    this.apartmentArea = apartment.apartment_area;
    this.houseTariff = apartment.apartment_area;
    this.accrued = apartment.apartment_area;
  }
}
