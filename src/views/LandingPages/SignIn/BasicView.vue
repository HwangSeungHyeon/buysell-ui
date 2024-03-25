<script setup>
import { ref } from "vue";
import axios from "axios";
import setMaterialInput from "@/assets/js/material-input";
import { useRouter } from "vue-router";
import MaterialInput from "@/components/MaterialInput.vue";
import MaterialButton from "@/components/MaterialButton.vue";
import Header from "@/examples/Header.vue";
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
    axios.defaults.withCredentials = true;
    // 로그인 요청 보내기
    const response = await axios.defaults.baseURL.post(
      `/members/login`,
      userData
    );
    const token = response.headers["authorization"];
    // 토큰을 로컬 스토리지에 저장
    sessionStorage.setItem("token", token);
    console.log("token2", token)
    // 로그인 성공 후 필요한 작업 수행 (예: 페이지 리디렉션 등)
    await router.push("/"); // 로그인 후 리다이렉트할 페이지
  } catch (error) {
    errorMessage.value = error.message; // 로그인 실패 시 에러 메시지 표시
  }
};
</script>
<template>
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
                  <h4
                    class="text-white font-weight-bolder text-center mt-2 mb-0"
                  >
                    로그인 하세요!
                  </h4>
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
                  <div class="row mt-3">
                    <!-- //카카오 로그인-->
                    <div class="col-2 text-center ms-auto">
                      <a class="btn btn-link px-3" href="javascript:">
                        <i class="fa fa-facebook text-yellow text-lg"></i>
                      </a>
                    </div>
                    <!-- //네이버 로그인-->
                    <div class="col-2 text-center px-1">
                      <a class="btn btn-link px-3" href="javascript:">
                        <i class="fa fa-github text-green text-lg"></i>
                      </a>
                    </div>
                    <!--  //구글 로그인-->
                    <div class="col-2 text-center me-auto">
                      <a class="btn btn-link px-3" href="javascript:">
                        <i class="fa fa-google text-red text-lg"></i>
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
