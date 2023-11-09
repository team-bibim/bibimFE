import Vue from 'vue'
import Vuex from 'vuex';
import { createStore } from 'vuex'
import axios from 'axios';

export const store = createStore({
    state: {
        message: 'Hello Vue.js',
        userData: null, // 사용자 데이터를 저장할 상태
        routineData: null, // 루틴 데이터를 저장할 상태
        authToken: null, // 새로 추가함
        token: null,
        user: null
    },
    mutations: {
        reverseMessage(state) {
            // message 상태를 역순으로 변경? : 데모로 예시 코드. 원하는 동작에 따라 달라짐
            state.message = state.message.split('').reverse().join('');
        },
        setUserData(state, data) {
            state.userData = data; // 유저데이터 상태를 설정함
        },
        setRoutineData(state, data) {
            state.routineData = data; // 루틴데이터 상태를 설정함
        },
        setToken(state, token) { // 토큰을 설정하는 뮤테이션 추가
            state.token     = token;
            state.authToken = token;
            localStorage.setItem('token', token);
        },
        clearToken(state) { // 토큰을 제거하는 뮤테이션 추가
            state.token = null;
            localStorage.removeItem('token');
        },
            setUser(state, user) { // setUser 뮤테이션 추가
            state.user = user;
        }
    },
    actions: {
        async fetchUserData({ commit }) {
            try {
                // axios를 사용해서 데이터를 가져온다.
                const response = await axios.get('http://52.78.77.1:8000/routine/box/check/');
                // 가져온 데이터를 상태에 반영함. catch문으로 에러 코드 작성
                commit('setUserData', response.data);
            } catch (error) {
                console.error(error);
            }
        },
        async fetchRoutineData({ commit }, routineId) {
            try {
                // 루틴 조회를 위한 API 호출
                const response = await axios.get(`http://52.78.77.1:8000/routine/check/${routineId}`);
                // 가져온 데이터를 상태에 반영함. catch문으로 에러 코드 작성
                commit('setRoutineData', response.data);
            } catch (error) {
                console.error(error);
            }
        },
        loginUser({ commit }, { email, password }) { // 새로운 액션 추가
            return new Promise((resolve, reject) => {
                fetch('http://52.78.77.1:8000/accounts/auth/', {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json'
                    },
                body: JSON.stringify({
                    email: email,
                    password: password
                    })
                })
                .then(response => response.json())
                .then(data => {
                    console.log('서버 응답:', data);
                    if (data.token) {
                        commit('setToken', data.token); // 토큰 저장
                        localStorage.setItem('token', data.token); // 추가한 코드
                        resolve(data);
                    } else {
                    reject(new Error('토큰이 없습니다.'));
                    }
                })
                .catch(error => {
                    console.error('에러:', error);
                    reject(error);
                });
            });
        },
        logoutUser({ commit }) { // 새로운 액션 추가
            commit('clearToken'); // 토큰 제거
        }
    }
});

/*

import { createStore } from 'vuex';
import axios from 'axios';

*/