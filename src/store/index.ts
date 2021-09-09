import { createStore } from 'vuex'
import { HTTP } from '@/core/api/http-common'

export default createStore({
  strict: process.env.NODE_ENV !== 'production',
  state: {},
  mutations: {},
  actions: {},
  modules: {},
})
