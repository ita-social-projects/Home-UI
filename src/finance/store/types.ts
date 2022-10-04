import { ActionContext } from 'vuex';
import { RootStateInterface } from '@/store/types';
import { TarrifModel } from '../models/tarrif.model';

export interface TarrifService {
  serviceId: number;
  serviceName: string;
  servicePrice: number;
}

export interface TarrifStateInterface {
  tarrifList: Array<TarrifModel> | [];
  newTarrif: TarrifModel | null;
}
