import { ActionContext } from 'vuex';
import { RootStateInterface } from '@/store/types';
import { TarrifModel } from '../models/tarrif.model';
import { TarrifDTOModel } from '../models/tarrifDTO.model';

export interface TarrifService {
  editState: boolean;
  serviceName: string;
  servicePrice: number | null;
}

export interface SelectedHouse {
  adress: string;
  houseArea: number;
  houseId: number;
}

export interface TarrifStateInterface {
  tarrifList: Array<TarrifModel> | [];
  currentTarrif: TarrifModel | null;
}

export enum TarrifMutationEnum {
  SET_CURRENT_TARRIF = 'SET_CURRENT_TARRIF',
  CLEAR_CURRENT_TARRIF = 'CLEAR_CURRENT_TARRIF',
}

export enum TarrifActionEnum {
  SET_CURRENT_TARRIF = 'SET_CURRENT_TARRIF',
  CLEAR_CURRENT_TARRIF = 'CLEAR_CURRENT_TARRIF',
}

export interface Actions {
  [TarrifActionEnum.SET_CURRENT_TARRIF]({ commit }: AugmentedActionContext, payload: TarrifDTOModel): void;
  [TarrifActionEnum.CLEAR_CURRENT_TARRIF]({ commit }: AugmentedActionContext): void;
}

export type Mutations<S = TarrifStateInterface> = {
  [TarrifMutationEnum.SET_CURRENT_TARRIF](state: S, payload: TarrifModel): void;
  [TarrifMutationEnum.CLEAR_CURRENT_TARRIF](state: S, payload: string): void;
};

export type AugmentedActionContext = {
  commit<K extends keyof Mutations>(key: K, payload: Parameters<Mutations[K]>[1]): ReturnType<Mutations[K]>;
} & Omit<ActionContext<TarrifStateInterface, RootStateInterface>, 'commit'>;
