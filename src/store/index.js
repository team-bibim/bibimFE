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
  },
  getters: {
    // --------------------- routine-write.vue -------------------------------
    boxesWithExercises: state => {
      return state.boxes.filter(box => box.exercises && box.exercises.length > 0);
    }
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
      } else {
        // 에러 메시지를 로그로 남기는 것도 유용할 수 있습니다.
        console.error(`Box at index ${boxIndex} does not exist.`);
      }
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
})
