import { AddressDTOModel } from '@/houses/models/addressDTO.model';

export class AddressModel {
  public region: string;
  public city: string;
  public district: string;
  public street: string;
  public houseBlock: string;
  public houseNumber: string;
  public zipCode: string;

  constructor(address: AddressDTOModel) {
    if (address) {
      this.region = address.region;
      this.city = address.city;
      this.district = address.district;
      this.street = address.street;
      this.houseBlock = address.house_block;
      this.houseNumber = address.house_number;
      this.zipCode = address.zip_code;
    } else {
      this.region = '';
      this.city = '';
      this.district = '';
      this.street = '';
      this.houseBlock = '';
      this.houseNumber = '';
      this.zipCode = '';
    }
  }
}
