import { createStore } from 'vuex'

export default createStore({
  state: {
    message: 'Hello Vue.js',
  },
  getters: {
    getMessage: (state) => {
      return state.message;
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
