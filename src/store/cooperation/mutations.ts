import { MutationTree } from 'vuex';
import { CooperationInterface, CooperationMutationTypes } from '@/store/cooperation/types';

// типы мутаций - список мутаций их принимаемые аргументы и возвращаемое значение
// a.k.a mutation contracts
export type Mutations<S = CooperationInterface> = {
  [CooperationMutationTypes.SAY_HELLO](state: S, payload: string): void;
};

/**
 * объект мутаций имеет тип MutationTree & Mutations (определен выше)
 * в объекте определены сами мутации
 * у самих мутаций название должно соответствовать названию в типе
 * объект mutations будет использован в создании CooperationStore
 * */
// a.k.a mutation definition
export const mutations: MutationTree<CooperationInterface> & Mutations = {
  [CooperationMutationTypes.SAY_HELLO](state: CooperationInterface, payload: string) {
    state.helloWorld = payload;
    console.log(state.helloWorld);
  },
};

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
