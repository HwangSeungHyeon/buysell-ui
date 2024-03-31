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
import NavbarDefault from "@/examples/navbars/NavbarDefault.vue";

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;
const domain = import.meta.env.VITE_DOMAIN;
// 요청 인터셉터 설정
axios.interceptors.request.use(
  function (config) {
    // 요청을 보내기 전에 수행할 작업을 여기에 작성합니다.
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
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
// 서버로부터 받은 응답에서 쿠키 값을 추출하는 함수
const extractCookie = (cookieName) => {
  const cookies = document.cookie.split(";");
  for (let cookie of cookies) {
    const [name, value] = cookie.trim().split("=");
    if (name === cookieName) {
      return value;
    }
  }
  return null;
};
// 쿠키에서 토큰을 삭제하는 함수
const deleteCookie = (cookieName) => {
  // 만료된 날짜를 생성합니다 (과거로 설정하여 쿠키를 삭제합니다)
  const expireDate = new Date();
  expireDate.setFullYear(expireDate.getFullYear() - 1);

  // 만료된 쿠키를 설정하여 삭제합니다
  document.cookie = `${cookieName}=; expires=${expireDate.toUTCString()}; path=/; domain=${domain}`;
};
// 쿠키에서 토큰 값을 추출합니다.
const token = extractCookie("token");

if (token) {
  // 토큰을 session storage에 저장합니다.
  localStorage.setItem("token", token);
  deleteCookie("token");
}



const app = createApp(App);
// eslint-disable-next-line vue/no-reserved-component-names
app.component("Header", Header);
app.component("NavbarDefault", NavbarDefault);
app.use(createPinia());
app.use(router);
app.use(materialKit);
app.use(store);
app.mount("#app");

