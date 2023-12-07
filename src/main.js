import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import axios from "axios"
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

loadFonts()

createApp(App)
  .use(router)
  .use(store)
  .use(vuetify)
  .mount('#app')

// let url = "http://15.164.228.112:8080/exercise/1/"
let url = "http://52.78.77.1:8000/exercise/body/2/"

axios.get(url)
  .then(function(response) {
    console.log(response);
  })
  .catch(function(response) {
    console.log(response);
  })
