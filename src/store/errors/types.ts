import { ActionContext } from 'vuex';
import { RootStateInterface } from '@/store/types';

export interface ErrorsStateInterface {
  error: ErrorsResponse;
}

export interface ErrorsResponse {
  errorMessage: string | null;
  errorStatus: number | null;
}

export enum ErrorsGetterEnum {
  getErrorMessage = 'getErrorMessage',
}
export enum ErrorsMutationEnum {
  SET_ERROR = 'SET_ERROR',
  RESET_ERROR = 'RESET_ERROR',
}
export enum ErrorsActionEnum {
  SET_ERROR_ACTION = 'SET_ERROR_ACTION',
  RESET_ERROR_ACTION = 'RESET_ERROR_ACTION',
}

export type Getters<S = ErrorsStateInterface> = {
  [ErrorsGetterEnum.getErrorMessage](stgetErrorMessage: S): ErrorsResponse;
};

export type Mutations<S = ErrorsStateInterface> = {
  [ErrorsMutationEnum.SET_ERROR](state: S, payload: ErrorsResponse): void;
  [ErrorsMutationEnum.RESET_ERROR](state: S): void;
};

export interface Actions {
  [ErrorsActionEnum.SET_ERROR_ACTION](context: AugmentedActionContext, errorResponse: ErrorsResponse): void;
  [ErrorsActionEnum.RESET_ERROR_ACTION](context: AugmentedActionContext): void;
}

export type AugmentedActionContext = {
  commit<K extends keyof Mutations>(key: K, payload?: Parameters<Mutations[K]>[1]): ReturnType<Mutations[K]>;
} & Omit<ActionContext<ErrorsStateInterface, RootStateInterface>, 'commit'>;
