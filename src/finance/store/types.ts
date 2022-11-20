import { ActionContext } from 'vuex';
import { RootStateInterface } from '@/store/types';
import { TarrifModel } from '../models/tarrif.model';

export interface TarrifService {
  serviceName: string;
  servicePrice: number | null;
}

export interface TarrifStateInterface {
  tarrifList: Array<TarrifModel> | [];
  newTarrif: TarrifModel | null;
}

export enum TariffActionsEnum {
  DEL_TARIFF = 'DEL_TARIFF',
}

export enum TariffMutationsEnum {
  DEL_TARIFF = 'DEL_TARIFF',
}

export enum TariffGettersEnum {
  getTriffList = 'getTariffList',
}

export type Getters<S = TarrifStateInterface> = {
  [TariffGettersEnum.getTriffList](state: S): Array<TarrifModel> | null;
};

export type Mutations<S = TarrifStateInterface> = {
  [TariffMutationsEnum.DEL_TARIFF](state: S, payload: number): void;
};
