import { MutationTree } from 'vuex';
import { UserStateInterface, UserMutationTypes, Mutations } from '@/store/user/types';

export const mutations: MutationTree<UserStateInterface> & Mutations = {
  // [UserMutationTypes.SET_FIRST_NAME]: (state, payload) => {
  //   state.first_name = payload;
  // },
  // [UserMutationTypes.SET_MIDLE_NAME]: (state, payload) => {
  //   state.midle_name = payload;
  // },
  // [UserMutationTypes.SET_LAST_NAME]: (state, payload) => {
  //   state.last_name = payload;
  // },
  // [UserMutationTypes.SET_EMAIL]: (state, payload) => {
  //   state.email = payload;
  // },
  // [UserMutationTypes.SET_REGISTRATION_TOKEN]: (state, payload) => {
  //   state.registration_token = payload;
  // },
  // [UserMutationTypes.SET_PASSWORD]: (state, payload) => {
  //   state.registration_token = payload;
  // },
  // [UserMutationTypes.SET_CONTACTS]: (state, payload) => {
  //   state.registration_token = payload;
  // },
};
