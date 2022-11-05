import { ActionContext } from 'vuex';
import { RootStateInterface } from '@/store/types';
import { TarrifModel } from '../models/tarrif.model';

export interface TarrifService {
  editState: boolean;
  serviceName: string;
  servicePrice: number | null;
}

export interface TarrifStateInterface {
  tarrifList: Array<TarrifModel> | [];
  newTarrif: TarrifModel | null;
}
