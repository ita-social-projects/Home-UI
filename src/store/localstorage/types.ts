import { ActionContext } from 'vuex';
import { requestPayload, RootStateInterface } from '@/store/types';

export enum LocalStorageMutationEnum {
  SET_TOKEN = 'SET_TOKEN',
  GET_TOKEN = 'GET_TOKEN',
  REMOVE_TOKEN = 'REMOVE_TOKEN',
}

export enum LocalStorageActionEnum {
  SET = 'SET',
  GET = 'GET',
  REMOVE = 'REMOVE',
}

export interface TokenInterface {
  id: number;
  email: string;
  token: string;
}

export interface TokenStateInterface {
  token: TokenInterface | null;
}
