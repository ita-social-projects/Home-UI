import { ActionContext } from 'vuex';
import { RootStateInterface } from '@/store/types';

export interface MessagesStateInterface {
  messages: Array<MessagesI> | [];
}

export type MessageType = 'error' | 'succes';

export interface MessagesI {
  type: MessageType;
  status: number;
  message: string;
}

export enum MessagesMutationEnum {
  SET_MESSAGE = 'SET_MESSAGE',
  CUT_THE_MESSAGES_LIST = 'CUT_THE_MESSAGES_LIST',
}

export enum MessagesActionEnum {
  SET_MESSAGE_ACTION = 'SET_MESSAGE_ACTION',
  INVOKE_MESSAGES_CUT = 'INVOKE_MESSAGES_CUT',
}

export type Mutations<S = MessagesStateInterface> = {
  [MessagesMutationEnum.SET_MESSAGE](state: S, payload: MessagesI): void;
  [MessagesMutationEnum.CUT_THE_MESSAGES_LIST](state: S): void;
};

export interface Actions {
  [MessagesActionEnum.SET_MESSAGE_ACTION](context: AugmentedActionContext, payload: MessagesI): void;
  [MessagesActionEnum.INVOKE_MESSAGES_CUT](context: AugmentedActionContext): void;
}

export type AugmentedActionContext = {
  commit<K extends keyof Mutations>(key: K, payload?: Parameters<Mutations[K]>[1]): ReturnType<Mutations[K]>;
} & Omit<ActionContext<MessagesStateInterface, RootStateInterface>, 'commit'>;
