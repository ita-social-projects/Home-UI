import { state } from './../../houses/store/index';
import { ActionContext } from 'vuex';
import { RootStateInterface } from '@/store/types';
import { TariffModel } from '@/finance/models/tariff.model';
import { TariffDTOModel } from '@/finance/models/tariffDTO.model';

export interface TariffService {
  editState: boolean;
  serviceTitle: string;
  servicePrice: number | null;
}

export interface SelectedHouse {
  adress: string;
  houseArea: number | null;
  houseId: number | string;
}
export interface TariffStateInterface {
  tariffList: Array<TariffModel> | [];
  currentTariff: TariffModel | null;
}

export enum TariffGettersEnum {
  getCurrentTariff = 'getCurrentTariff',
}

export enum TariffMutationEnum {
  SET_CURRENT_TARIFF = 'SET_CURRENT_TARIFF',
  CLEAR_CURRENT_TARIFF = 'CLEAR_CURRENT_TARIFF',
  CREATE_TARIFF = 'CREATE_TARIFF',
  SET_TARIFF_LIST = 'SET_TARIFF_LIST',
}

export enum TariffActionEnum {
  SET_CURRENT_TARIFF = 'SET_CURRENT_TARIFF',
  CLEAR_CURRENT_TARIFF = 'CLEAR_CURRENT_TARIFF',
  CREATE_TARIFF = 'CREATE_TARIFF',
  SET_TARIFF_LIST = 'SET_TARIFF_LIST',
}

export interface Actions {
  [TariffActionEnum.SET_CURRENT_TARIFF]({ commit }: AugmentedActionContext, payload: TariffDTOModel): void;
  [TariffActionEnum.CLEAR_CURRENT_TARIFF]({ commit }: AugmentedActionContext): void;
  [TariffActionEnum.CREATE_TARIFF]({ commit, getters }: AugmentedActionContext): void;
}

export type Mutations<S = TariffStateInterface> = {
  [TariffMutationEnum.SET_CURRENT_TARIFF](state: S, payload: TariffModel): void;
  [TariffMutationEnum.CLEAR_CURRENT_TARIFF](state: S, payload: string): void;
  [TariffMutationEnum.CREATE_TARIFF](state: S, payload: TariffModel | null): void;
  [TariffMutationEnum.SET_TARIFF_LIST](state: S, payload: Array<TariffModel>): void;
};

export type Getters<S = TariffStateInterface> = {
  [TariffGettersEnum.getCurrentTariff](state: S): TariffModel | null;
};

export type AugmentedActionContext = {
  commit<K extends keyof Mutations>(key: K, payload: Parameters<Mutations[K]>[1]): ReturnType<Mutations[K]>;
} & Omit<ActionContext<TariffStateInterface, RootStateInterface>, 'commit'>;
