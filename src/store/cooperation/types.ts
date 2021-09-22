// названия для мутаций - a.k.a mutation enums
export enum CooperationMutationTypes {
  SAY_HELLO = 'SAY_HELLO',
}

// названия для экшенов
export enum CooperationActionTypes {
  SAY_HELLO = 'SAY_HELLO',
}

/**
 * интерфейс для модуля
 * использется в типах MutationTree / ActionTree / GetterTree / etc. как аргумент S
 * в нем определяются типы стейта текущего модуля
 * */
export interface CooperationInterface {
  helloWorld: string;
}
