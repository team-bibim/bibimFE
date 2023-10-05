import { createStore } from 'vuex'
import axios from 'axios';

export default createStore({
  state: {
    message: 'Hello Vue.js',
    // --------------------- routine-write.vue -------------------------------
    titleInput: '', // 제목 데이터 저장
    expInput: '',
    // 동적으로 생성되는 운동 정보를 저장하는 객체
    dayExercises: {},

    usebodyData: [], // 'usebody_name' 데이터를 저장
    exerciseData: [], // 부위에 따른 데이터 저장
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
    // 날짜와 운동 정보를 업데이트
    updateDayExercises(state, { day, exercises }) {
      state.dayExercises[day] = exercises;
    },
    // 'usebody_name'(부위 이름) 데이터 설정
    SET_USEBODY_DATA(state, data) {
      state.usebodyData = data;
    },
    // 부위에 따른 운동 데이터 설정
    SET_EXERCISE_DATA(state, { index, data }) {
      state.exerciseData[index] = data;
    },
  },
  actions: {
    // 'usebody_name' 데이터를 가져오기
    async fetchUsebodyData({ commit }) {
      try {
        const response = await axios.get('http://52.78.77.1:8000/usebody/');
        const usebodyNames = response.data.map(item => item.usebody_name); // usebody_name만 추출
        commit('SET_USEBODY_DATA', usebodyNames); // 추출한 데이터를 저장
        console.log('Usebody Data:', usebodyNames);
      } catch (error) {
        console.error('usebody_name 데이터 가져오기 오류:', error);
      }
    },
    // 부위별 운동 데이터 가져오기
    async fetchExerciseData({ commit }) {
      try {
        // 1부터 9까지 반복하여 /exercise/body/01/부터 /exercise/body/09/까지 데이터 가져오기
        for (let i = 1; i <= 9; i++) {
          const response = await axios.get(`http://52.78.77.1:8000/exercise/body/0${i}/`);
          commit('SET_EXERCISE_DATA', { index: i - 1, data: response.data });
          console.log(`Exercise Data for 0${i}:`, response.data);
        }
      } catch (error) {
        // 여기서 오류 처리하기
        console.error('운동 데이터 가져오기 오류:', error);
      }
    },
  },
  modules: {
  }
})
