// 상태관리.js
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

import { createStore } from 'vuex'
import axios from 'axios';

export default createStore({
  state: {
    // --------------------- routine-write.vue -------------------------------
    title: '', // 루틴 제목
    exp: '',   // 루틴 설명
    boxes: [],
    exercises: [],

    exerciseData: {}, // 부위에 따른 데이터 저장
    usebodyData: [], // 서버에서 가져온 'usebody_name' 데이터 저장

    userData: null, // 유저데이터
    token: null, // 토큰

    // --------------------- main.vue -------------------------------
    message: 'Hello Vue.js',
    routineData: null, // box/check
    routineId: null, // box/check{id}
    userData: null, // 유저데이터
    token: null, // 토큰
    selectedRoutineId: null, // 선택한 루틴
  },
  getters: {
    // --------------------- routine-write.vue -------------------------------
  },
  mutations: {
    // --------------------- routine-write.vue -------------------------------
    setTitle(state, newValue) {
      state.title = newValue;
    },
    setExp(state, newValue) {
      state.exp = newValue;
    },

    // 'usebody_name'(부위 이름) 데이터 설정
    SET_USEBODY_DATA(state, data) {
      state.usebodyData = data;
    },
    // 부위에 따른 운동 데이터 설정
    SET_EXERCISE_DATA(state, { usebodyName, data }) {
      state.exerciseData[usebodyName] = data.map(item => item.exerciseName_English);
    },

    // Day별 박스 추가
    ADD_DAY_BOX(state) {
      if (state.boxes.length < 5) {
        state.boxes.push({ exercises: [] });
      }
    },
    // 해당 인덱스의 day-routine-box를 삭제
    DELETE_DAY_BOX(state, dayindex) {
      state.boxes.splice(dayindex, 1);
    },
    addExerciseToBox(state, { boxIndex, exercise }) {
      // boxIndex는 운동을 추가할 박스의 인덱스
      // exercise는 추가할 운동 객체
      if (state.boxes[boxIndex]) {
        state.boxes[boxIndex].exercises.push(exercise);
        // 상태 업데이트 후 콘솔에 로깅
        console.log(`Box at index ${boxIndex} after adding exercise:`, state.boxes[boxIndex]);
        console.log('exercise ID : ', state.boxes[boxIndex].ExerciseID);
      } else {
        // 에러 메시지를 로그로 남기는 것도 유용할 수 있습니다.
        console.error(`Box at index ${boxIndex} does not exist.`);
      }
    },
    deleteExerciseFromBox(state, { boxIndex, exerciseIndex }) {
      state.boxes[boxIndex].exercises.splice(exerciseIndex, 1);
    },
    // --------------------- main.vue -------------------------------
    setUserData(state, data) {
      state.userData = data;
    },
    setToken(state, token) {
      state.token = token;
    },

    reverseMessage(state) {
      state.message = state.message.split('').reverse().join('');
    },
  },
  actions: {
    async loginUser({ commit }, credentials) {
      try {
        const response = await axios.post('/api/accounts/auth/', credentials, {
          withCredentials: true,
        });
        commit('setToken', response.data.token);
        commit('setUserData', response.data.user);
        localStorage.setItem('token', response.data.token);
        return response;
      } catch (error) {
        console.error('로그인 실패:', error);
        throw error;
      }
    },
    setSelectedRoutineId({ commit }, routineId) {
      commit('setSelectedRoutineId', routineId);
    },

    async fetchRoutineData({ commit, state }) {
      try {
        const response = await axios.get('/api/routine/box/check/', {
          withCredentials: true,
        });
        commit('setRoutineData', response.data);
      } catch (error) {
        console.error('루틴 데이터를 불러오는 중 에러 발생:', error);
        throw error;
      }
    },

    async fetchRoutineId({ commit }, routineId) {
      try {
        const response = await axios.get(`/api/routine/check/${routineId}/`);
        console.log(response);
        commit('setRoutineId', response.data);
        return response.data;
      } catch (error) {
        console.error('루틴 ID를 불러오는 중 에러 발생:', error);
        throw error;
      }
    },
    // 'usebody_name' 데이터를 가져오기
    async fetchUsebodyData({ commit }) {
      try {
        const response = await axios.get('/api/usebody/');
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
          const response = await axios.get(`/api/exercise/body/0${i}/`);
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

    // Day별 박스 추가
    addDayBox({ commit }) {
      commit('ADD_DAY_BOX');
    },
    deleteDayBox({ commit }) {
      commit('DELETE_DAY_BOX');
    }
  },
  modules: {
  }
});