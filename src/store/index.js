import { createStore } from 'vuex'

export default createStore({
  state: {
    message: 'Hello Vue.js',
    // --------------------- routine-write.vue -------------------------------
    titleInput: '', // 제목 데이터 저장
    expInput: '',
  },
  getters: {
    // --------------------- routine-write.vue -------------------------------
    // getMessage: (state) => {
    //   return state.message;
    // },
    // getTitleInput: (state) => {
    //   return state.titleInput;
    // },
    // getExpInput: (state) => {
    //   return state.expInput;
    // },
  },
  mutations: {
    // --------------------- routine-write.vue -------------------------------
    setTitleInput(state, newValue) {
      state.titleInput = newValue;
    },
    setExpInput(state, newValue) {
      state.expInput = newValue;
    },
  },
  actions: {
  },
  modules: {
  }
})
