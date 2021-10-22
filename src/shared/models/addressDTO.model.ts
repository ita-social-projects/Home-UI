import { AddressModel } from '@/shared/models/address.model';

export class AddressDTOModel {
  public region: string;
  public city: string;
  public district: string;
  public street: string;
  public house_block: string;
  public house_number: string;
  public zip_code: string;

  constructor(address: AddressModel) {
    this.region = address.region;
    this.city = address.city;
    this.district = address.district;
    this.street = address.street;
    this.house_block = address.houseBlock;
    this.house_number = address.houseNumber;
    this.zip_code = address.zipCode;
  }
}
