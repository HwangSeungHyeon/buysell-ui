<script setup>
import { ref } from "vue";
import axios from "axios";
import setMaterialInput from "@/assets/js/material-input";
import { useRouter } from "vue-router";
import MaterialInput from "@/components/MaterialInput.vue";
import MaterialButton from "@/components/MaterialButton.vue";
import Header from "@/examples/Header.vue";
import NavbarDefault from "@/examples/navbars/NavbarDefault.vue";
const email = ref("");
const password = ref("");
const errorMessage = ref("");
const router = useRouter();


setMaterialInput();
const login = async () => {
  try {
    const userData = {
      email: email.value,
      password: password.value,
    };
    // 로그인 요청 보내기
    const response = await axios.post(`/members/login`, userData);
    const token = response.headers["authorization"];
    // 토큰을 로컬 스토리지에 저장
    localStorage.setItem("token", token);
    // 로그인 성공 후 필요한 작업 수행 (예: 페이지 리디렉션 등)
    alert("로그인에 성공했습니다")
    await router.push("/"); // 로그인 후 리다이렉트할 페이지
  } catch (error) {
    alert("로그인에 실패했습니다 아이디와 비밀번호를 확인해주세요", error); // 로그인 실패 시 에러 메시지 표시
  }
};


const googleLogin = async () => {
  try {
    window.location.href = `${axios.defaults.baseURL}/oauth2/authorization/google`;
  } catch (error) {
    errorMessage.value = error.message;
  }
};

const kakaoLogin = async () => {
  try {
    window.location.href = `${axios.defaults.baseURL}/oauth2/authorization/kakao`;
  } catch (error) {
    errorMessage.value = error.message;
  }
};
const naverLogin = async () => {
  try {
    window.location.href = `${axios.defaults.baseURL}/oauth2/authorization/naver`;
  } catch (error) {
    errorMessage.value = error.message;
  }
};

</script>
<template>
  <div class="container position-sticky z-index-sticky top-0">
    <div class="row">
      <div class="col-12">
        <NavbarDefault :sticky="true" />
      </div>
    </div>
  </div>
  <Header>
    <div
      class="page-header align-items-start min-vh-100"
      :style="{
        backgroundImage:
          'url(https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80)',
      }"
    >
      <span class="mask bg-gradient-dark opacity-6"></span>
      <div class="container my-auto">
        <div class="row">
          <div class="col-lg-4 col-md-8 col-12 mx-auto">
            <div class="card z-index-0 fadeIn3 fadeInBottom">
              <div
                class="card-header p-0 position-relative mt-n4 mx-3 z-index-2"
              >
                <div
                  class="bg-gradient-success shadow-success border-radius-lg py-3 pe-1"
                >
                  <router-link to="/">
                    <h4
                      class="text-white font-weight-bolder text-center mt-2 mb-0"
                    >
                      Buysell
                    </h4>
                  </router-link>
                </div>
              </div>
              <div class="card-body">
                <form role="form" class="text-start">
                  <MaterialInput
                    id="email"
                    class="input-group-outline my-3"
                    :label="{ text: 'Email', class: 'form-label' }"
                    type="email"
                    v-model="email"
                    :value="email"
                    @input="email = $event.target.value"
                  />
                  <MaterialInput
                    id="password"
                    class="input-group-outline mb-3"
                    :label="{ text: 'Password', class: 'form-label' }"
                    type="password"
                    v-model="password"
                    :value="password"
                    @input="password = $event.target.value"
                  />

                  <div class="text-center">
                    <MaterialButton
                      class="my-4 mb-2"
                      variant="gradient"
                      color="success"
                      fullWidth
                      @click.prevent="login"
                    >
                      로그인
                    </MaterialButton>
                  </div>
                  <p class="mt-4 text-sm text-center">
                    계정이 없으신가요?
                    <a
                      href="/signup"
                      class="text-success text-gradient font-weight-bold"
                      >회원가입!</a
                    >
                  </p>
                  <p class="mt-4 text-sm text-center">
                    이메일 인증을 못하셨나요?
                    <a
                      href="/auth"
                      class="text-success text-gradient font-weight-bold"
                      >인증!</a
                    >
                  </p>
                  <div class="row mt-3">
                    <!-- //구글 로그인-->
                    <div class="col text-center">
                      <a class="btn btn-link px-3" href="javascript:" @click="googleLogin">
                        <img src="https://velog.velcdn.com/images/codekmj/post/5c277f33-efb0-4882-883d-0a563de92509/image.png" alt="Google" class="img-icon">
                      </a>
                    </div>
                    <!-- //카카오 로그인-->
                    <div class="col text-center">
                      <a class="btn btn-link px-3" href="javascript:" @click="kakaoLogin">
                        <img src="https://velog.velcdn.com/images/codekmj/post/f0388a65-8306-4850-808c-36d681145db8/image.png" alt="Kakao" class="img-icon">
                      </a>
                    </div>
                    <!-- //네이버 로그인-->
                    <div class="col text-center">
                      <a class="btn btn-link px-3" href="javascript:" @click="naverLogin">
                        <img src="https://velog.velcdn.com/images/codekmj/post/9a23db91-113c-4459-8eb7-565fa0d9756a/image.png" alt="Naver" class="img-icon">
                      </a>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Header>
</template>
