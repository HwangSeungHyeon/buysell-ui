import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
// Nucleo Icons
import "./assets/css/nucleo-icons.css";
import "./assets/css/nucleo-svg.css";
import materialKit from "./material-kit";
import Header from "@/examples/Header.vue";
import store from "./store";

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

// 요청 인터셉터 설정
axios.interceptors.request.use(
  function (config) {
    // 요청을 보내기 전에 수행할 작업을 여기에 작성합니다.
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  function (error) {
    // 요청이 실패한 경우 에러 처리를 여기에 작성합니다.
    return Promise.reject(error);
  }
);

// 응답 인터셉터 설정
axios.interceptors.response.use(
  function (response) {
    // 응답을 받은 후 수행할 작업을 여기에 작성합니다.
    return response;
  },
  function (error) {
    // 응답이 실패한 경우 에러 처리를 여기에 작성합니다.
    return Promise.reject(error);
  }
);

const app = createApp(App);
// eslint-disable-next-line vue/no-reserved-component-names
app.component("Header", Header);
app.use(createPinia());
app.use(router);
app.use(materialKit);
app.use(store);
app.mount("#app");
