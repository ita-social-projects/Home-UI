import { ApartmentInSelectedHouseModel } from '@/finance/models/calculation.model';

export class ApartmentInSelectedHouseDTOModel {
  public personal_account: number;
  public owner: string;
  public apartment_number: string;
  public apartment_area: number;
  public house_tariff: number;
  public accrued: number;

  constructor(apartment: ApartmentInSelectedHouseModel) {
    this.personal_account = apartment.personalAccount;
    this.owner = apartment.owner;
    this.apartment_number = apartment.apartmentNumber;
    this.apartment_area = apartment.apartmentArea;
    this.house_tariff = apartment.houseTariff;
    this.accrued = apartment.accrued;
  }
}
