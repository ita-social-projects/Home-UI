import { TariffModel } from '@/finance/models/tariff.model';
import { SelectedHouse, TariffService } from '@/finance/store/types';

export class TariffDTOModel {
  public tariff_id?: number;
  public house_id: number;
  public house?: SelectedHouse;
  public tariff_title: string;
  public tariff_comment?: string;
  public services: Array<TariffService>;
  public tariff_price: string;

  constructor(tariff: TariffModel) {
    this.tariff_id = tariff.tariffId;
    this.house_id = tariff.houseId;
    this.house = tariff.house;
    this.tariff_title = tariff.tariffTitle;
    this.tariff_comment = tariff.tariffComment;
    this.services = tariff.services;
    this.tariff_price = tariff.tariffPrice;
  }
}
