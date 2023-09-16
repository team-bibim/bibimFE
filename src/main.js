import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import axios from "axios";

loadFonts()

createApp(App)
  .use(router)
  .use(store)
  .use(vuetify)
  .mount('#app')

let url = "http://192.168.8.196:8000/exercise/1/"

axios.get(url)
  .then(function(response) {
    console.log(response);
  })
  .catch(function(response) {
    console.log(response);
  })