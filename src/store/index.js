import { createStore } from 'vuex'

export default createStore({
  state: {
    message: 'Hello Vue.js',
    // --------------------- routine-write.vue -------------------------------
    titleInput: '', // 제목 데이터 저장
  },
  getters: {
    // --------------------- routine-write.vue -------------------------------
    getMessage: (state) => {
      return state.message;
    },
  },
  mutations: {
    setTitleInput(state, newValue) {
      state.titleInput = newValue;
    },
  },
  actions: {
  },
  modules: {
  }
})
