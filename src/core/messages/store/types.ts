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

export enum MessagesGetterEnum {
  getMessages = 'getMessages',
}

export enum MessagesMutationEnum {
  SET_MESSAGE = 'SET_MESSAGE',
}

export enum MessagesActionEnum {
  SET_MESSAGE_ACTION = 'SET_MESSAGE_ACTION',
}

export type Getters<S = MessagesStateInterface> = {
  [MessagesGetterEnum.getMessages](state: S): Array<MessagesI>;
};

export type Mutations<S = MessagesStateInterface> = {
  [MessagesMutationEnum.SET_MESSAGE](state: S, payload: MessagesI): void;
};

export interface Actions {
  [MessagesActionEnum.SET_MESSAGE_ACTION](context: AugmentedActionContext, payload: MessagesI): void;
}

export type AugmentedActionContext = {
  commit<K extends keyof Mutations>(key: K, payload?: Parameters<Mutations[K]>[1]): ReturnType<Mutations[K]>;
} & Omit<ActionContext<MessagesStateInterface, RootStateInterface>, 'commit'>;
