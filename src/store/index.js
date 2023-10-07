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
    exerciseData: {}, // 부위에 따른 데이터 저장
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
    SET_EXERCISE_DATA(state, { usebodyName, data }) {
      state.exerciseData[usebodyName] = data.map(item => item.exerciseName_Korean);
    },
  },
  actions: {
    // 'usebody_name' 데이터를 가져오기
    async fetchUsebodyData({ commit }) {
      try {
        const response = await axios.get('http://52.78.77.1:8000/usebody/');
        const usebodyNames = response.data.map(item => item.usebody_name); // usebody_name만 추출(1차원 배열 형태)
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
        const fetchedUsebodyNames = []; // 이미 가져온 usebodyName을 기록할 배열
        for (let i = 1; i <= 9; i++) {
          const response = await axios.get(`http://52.78.77.1:8000/exercise/body/0${i}/`);
          const usebodyName = response.data[0].usebody_name;  // usebody_name을 가져옴

          // 이미 가져온 usebodyName이 아니라면 데이터를 저장
          if (!fetchedUsebodyNames.includes(usebodyName)) {
            fetchedUsebodyNames.push(usebodyName);
            commit('SET_EXERCISE_DATA', { usebodyName, data: response.data });
            console.log(`Exercise Data for ${usebodyName}:`, response.data);
          }
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
