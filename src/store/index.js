import Vue from 'vue'
import Vuex from 'vuex'
import api from '../stores/Api'
import auth from '../stores/Auth'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    urlAxios: process.env.VUE_APP_API_URL
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    api,
    auth
  }
})
