import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { store } from "./store/index"; 
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from "axios";

loadFonts();

createApp(App).use(router).use(store).use(vuetify).mount("#app");