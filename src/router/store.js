import { createStore } from 'vuex';

export const store = createStore({
    state: {
        message: 'Hello Vue.js'
    },
    mutations: {
        reverseMessage(state) {
            state.message = state.message.split('').reverse().join('');
        }
    }
});