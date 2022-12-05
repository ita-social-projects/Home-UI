import { TarrifModel } from '@/finance/models/tarrif.model';
import { SelectedHouse, TarrifService } from '@/finance/store/types';

export class TarrifDTOModel {
  public tarrif_id?: number;
  public house_id: number;
  public _house?: SelectedHouse;
  public tarrif_name: string;
  public tarrif_comments?: string;
  public services: Array<TarrifService>;

  constructor(tarrif: TarrifModel) {
    this.tarrif_id = tarrif.tarrifId;
    this.house_id = tarrif.houseId;
    this._house = tarrif.house;
    this.tarrif_name = tarrif.tarrifName;
    this.tarrif_comments = tarrif.tarrifComments;
    this.services = tarrif.services;
  }
}
