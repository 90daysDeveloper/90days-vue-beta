import { createApp } from "vue";
import { createPinia } from "pinia";
import { VOffline } from "v-offline";
import LottieAnimation from "lottie-web-vue";
import App from "./App.vue";
import VueSocialSharing from "vue-social-sharing";
// import axios from 'axios'

import "./assets/scss/main.scss";
import "../node_modules/chart.js/dist/chart";

import "./registerServiceWorker";
// import firebaseMessaging from "./firebase.js";

import router from "./router";

const pinia = createPinia();
const app = createApp(App);

// axios.defaults.baseURL = process.env.VUE_APP_API_BASE;
// axios.defaults.headers.common[
//   "Authorization"
// ] = `Bearer ${process.env.VUE_APP_BEARER_DIRECTUS}`;

app.use(router);
app.use(pinia);
app.use(LottieAnimation);
app.use(VueSocialSharing);

app.component("VOffline", VOffline);
// app.config.globalProperties.$messaging = firebaseMessaging;

app.mount("#app");
