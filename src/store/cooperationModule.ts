import { HTTP } from '@/core/api/http-common';

export const cooperationModule = {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {
    isEmailRegistered: (payload: string) => {
      return HTTP.get('/users', {
        params: { email: payload },
      }).then((r) => {
        console.log(r);
        const isEmailRegistered = r.data.length !== 0;
        console.log(isEmailRegistered);
        return isEmailRegistered;
      });
    },
  },
  actions: {
    isEmailRegistered: ({ commit }, payload: string): void => {
      return commit('isEmailRegistered', payload);
    },
  },
};
