import { ActionContext } from 'vuex';
import { RootStateInterface } from '@/store/types';
import { AxiosError } from 'axios';

export interface ErrorsStateInterface {
  errorsList: Array<ErrorsResponse>;
}

export interface ErrorsResponse {
  errorMessage: string | null | undefined;
  errorStatus: number | null | undefined;
}

export enum ErrorsGetterEnum {
  getErrorMessages = 'getErrorMessages',
}
export enum ErrorsMutationEnum {
  SET_ERROR = 'SET_ERROR',
}
export enum ErrorsActionEnum {
  SET_ERROR_ACTION = 'SET_ERROR_ACTION',
}

export type Getters<S = ErrorsStateInterface> = {
  [ErrorsGetterEnum.getErrorMessages](state: S): ErrorsResponse;
};

export type Mutations<S = ErrorsStateInterface> = {
  [ErrorsMutationEnum.SET_ERROR](state: S, payload: AxiosError): void;
};

export interface Actions {
  [ErrorsActionEnum.SET_ERROR_ACTION](context: AugmentedActionContext, errorResponse: AxiosError): void;
}

export type AugmentedActionContext = {
  commit<K extends keyof Mutations>(key: K, payload?: Parameters<Mutations[K]>[1]): ReturnType<Mutations[K]>;
} & Omit<ActionContext<ErrorsStateInterface, RootStateInterface>, 'commit'>;
