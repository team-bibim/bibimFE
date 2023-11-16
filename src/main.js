import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import '@/assets/css/routine-write-degisn.css'
import VueCookies from "vue-cookies"; // Import VueCookies here

Vue.use(Vuetify)

loadFonts()

// 로그인 토큰을 로드하고 Vuex 스토어에 설정
const token = localStorage.getItem('token');
if (token) {
  store.commit('setToken', token); // 토큰을 Vuex store에 저장
}

createApp(App)
  .use(router)
  .use(store)
  .use(vuetify)
  .use(VueCookies) // Use VueCookies here
  .mount('#app')

// vue-cookies
VueCookies.config("7d"); // Update this line to use VueCookies
