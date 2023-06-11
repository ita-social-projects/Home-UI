import { TariffDTOModel } from '@/finance/models/tariffDTO.model';
import { SelectedHouse, TariffService } from '@/finance/store/types';

export class TariffModel {
  public tariffId?: number;
  public houseId: number;
  public house?: SelectedHouse;
  public tariffTitle: string;
  public tariffComment?: string;
  public services?: Array<TariffService>;
  public tariffPrice: string;
  public tariffDate?: Date | string;

  constructor(tariff: TariffDTOModel) {
    this.tariffId = tariff.tariff_id;
    this.houseId = tariff.house_id;
    this.house = tariff.house;
    this.tariffTitle = tariff.tariff_title;
    this.tariffComment = tariff.tariff_comment;
    this.services = tariff.services;
    this.tariffPrice = tariff.tariff_price;
    this.tariffDate = tariff.tariff_date;
  }
}
