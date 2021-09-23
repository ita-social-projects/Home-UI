import { ActionContext } from 'vuex';
import { RootStateInterface } from '@/store/types';
import { AxiosError, AxiosResponse } from 'axios';

/** mutation enums - названия для мутаций */
export enum CooperationMutationTypes {
  SAY_HELLO = 'SAY_HELLO',
  IS_COOPERATION_REGISTERED = 'IS_COOPERATION_REGISTERED',
}

/** action enums - названия для экшенов */
export enum CooperationActionTypes {
  SAY_HELLO = 'SAY_HELLO',
  IS_COOPERATION_REGISTERED = 'IS_COOPERATION_REGISTERED',
}

/**
 * интерфейс для модуля
 * использется в типах MutationTree / ActionTree / GetterTree / etc. как аргумент S
 * в нем определяются типы стейта текущего модуля
 * */
export interface CooperationInterface {
  helloWorld: string;
}

/**
 * mutation contracts
 * типы мутаций - список мутаций их принимаемые аргументы и возвращаемое значение
 */
export type Mutations<S = CooperationInterface> = {
  [CooperationMutationTypes.SAY_HELLO](state: S, payload: string): void;
  [CooperationMutationTypes.IS_COOPERATION_REGISTERED](state: S, payload: requestPayload): void;
};
/** action contracts */
export interface Actions {
  [CooperationActionTypes.SAY_HELLO]({ commit }: AugmentedActionContext): void;
  [CooperationActionTypes.IS_COOPERATION_REGISTERED]({ commit }: AugmentedActionContext, payload: requestPayload): void;
}

/** getter contracts */
export type Getters<S = CooperationInterface> = {
  getHelloWorldTwice(state: S): string;
};

type requestPayload = {
  params: { [key: string]: string | number | boolean };
  successCallback(response: AxiosResponse): void;
  errorCallback(error?: AxiosError): void;
};

/**
 * action context, переопределение
 * этот тип нужен для того, чтобы разрешить выполнение только тех экшенов, которые определены в Mutations
 * также здесь проверяется тип payload
 * компилятор подсветит, если будет вызван/передан неверный экшен/payload
 * */
export type AugmentedActionContext = {
  commit<K extends keyof Mutations>(key: K, payload: Parameters<Mutations[K]>[1]): ReturnType<Mutations[K]>;
} & Omit<ActionContext<CooperationInterface, RootStateInterface>, 'commit'>;

/* eslint-disable */
/**
 * links
 * почитать:
 * - https://dev.to/3vilarthas/vuex-typescript-m4j
 * - https://dev.to/shubhadip/vue-3-vuex-4-modules-typescript-2i2o
 * посмотреть (vue 2) - https://www.youtube.com/watch?v=wRK1EZpicD0&t
 * потыкать - https://codesandbox.io/s/using-vuex-4-modules-in-vue-3-with-typescript-7ygvy?file=/src/store/modules/documents/mutations.ts
 * проинвестигейтить - https://github.com/shubhadip/vuex-typescript
 * */
