import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    authorization: '',
    adminAuthorization: ''
  },
  getters: {},
  mutations: {
    setAuthorization (state, authorization) {
      state.authorization = authorization
    },
    setAdminAuthorization (state, adminAuthorization) {
      state.adminAuthorization = adminAuthorization
    }
  },
  actions: {},
  modules: {},
  plugins: [
    createPersistedState({
      storage: window.sessionStorage
    })
  ]
})
