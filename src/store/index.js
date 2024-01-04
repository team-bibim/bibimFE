// 상태관리.js
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import createPersistedState from 'vuex-persistedstate';

export const store = new Vuex.Store({
  state: {
    message: 'Hello Vue.js',
    routineData: null, // box/check
    routineId: null, // box/check{id}
    userData: {
      id: "로그인을 해 주세요"
    }, // 유저데이터
    token: null, // 토큰
    selectedRoutineId: null, // 선택한 루틴
    // 내 코드
    hotPostings: [],
    newPostings: [],
    followPostings: [],
  },
  mutations: {
    // 내 코드
    updateLike(state, { postId, newLike }) {
      const postIndex = state.hotPostings.findIndex(post => post.id === postId);
      if (postIndex !== -1) {
        state.hotPostings[postIndex].like = newLike;
      }
    },
    // 희경누나 코드
    reverseMessage(state) {
      state.message = state.message.split('').reverse().join('');
    },
    setUserData(state, data) {
      state.userData = data;
    },
    setToken(state, token) {
      state.token = token;
    },
    setRoutineData(state, data) {
      state.routineData = data;
    },
    setRoutineId(state, data) {
      state.routineId = data.data;
    },
    setSelectedRoutineId(state, routineId) {
      state.selectedRoutineId = routineId;
    }
  },
  actions: {
    async loginUser({ commit }, credentials) {
      try {
        const response = await axios.post('/api/accounts/auth/', credentials, {
          withCredentials: true,
        });
        commit('setToken', response.data.token);
        commit('setUserData', response.data.user);
        console.log(response.data.user);
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
    }
  },
  plugins: [
    createPersistedState()
  ]
});