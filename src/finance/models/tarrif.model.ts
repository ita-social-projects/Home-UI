import { TarrifDTOModel } from '@/finance/models/tarrifDTO.model';
import { TarrifService } from '@/finance/store/types';

export class TarrifModel {
  // public tarrifId: number;
  public houseId: number;
  public tarrifName: string;
  public tarrifComments: string;
  public services: Array<TarrifService>;

  constructor(tarrif: TarrifDTOModel) {
    // this.tarrifId = tarrif.tarrif_id;
    this.houseId = tarrif.house_id;
    this.tarrifName = tarrif.tarrif_name;
    this.tarrifComments = tarrif.tarrif_comments;
    this.services = tarrif.services;
  }
}
