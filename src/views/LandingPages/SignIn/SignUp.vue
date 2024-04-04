<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";

// 예시 컴포넌트
import Header from "@/examples/Header.vue";

// Vue Material Kit 2 컴포넌트
import MaterialInput from "@/components/MaterialInput.vue";
import MaterialButton from "@/components/MaterialButton.vue";

// material-input
import setMaterialInput from "@/assets/js/material-input";
import router from "@/router";
import NavbarDefault from "@/examples/navbars/NavbarDefault.vue";

onMounted(() => {
  setMaterialInput();
});
const email = ref("");
const password = ref("");
const nickname = ref("");
const gender = ref("");
const birthday = ref("");
const signUp = async () => {
  try {
    // 이메일, 비밀번호, 닉네임, 성별, 생일 값을 formData에 저장
    const formData = {
      email: email.value,
      password: password.value,
      nickname: nickname.value,
      gender: gender.value,
      birthday: birthday.value,
    };
    // 서버로 데이터 전송
    const response = await axios.post("/members/signup", formData);
   
    // /auth 경로로 이동
    await router.push("/");
    alert(
      "이메일 인증 링크 전송에 성공했습니다 이메일 확인 후 로그인을 진행해주세요", response
    );
  } catch (error) {
    alert("회원가입에 실패했습니다 입력한 내용을 확인해주세요");

  }
};

const back = async () => {
  router.back();
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
      loading="lazy"
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
                    회원가입
                  </h4>
                </div>
              </div>
              <div class="card-body">
                <form role="form" class="text-start">
                  <MaterialInput
                    v-model="email"
                    id="email"
                    class="input-group-outline my-3"
                    :label="{ text: '이메일: email 형식으로 입력 중복X', class: 'form-label' }"
                    type="email"
                    :value="email"
                    @input="email = $event.target.value"
                  />
                  <MaterialInput
                    v-model="password"
                    id="password"
                    class="input-group-outline mb-3"
                    :label="{ text: '비밀번호: 숫자+대소문자+특수문자 6이상 12이하', class: 'form-label' }"
                    type="password"
                    :value="password"
                    @input="password = $event.target.value"
                  />
                  <MaterialInput
                    v-model="nickname"
                    id="nickname"
                    class="input-group-outline mb-3"
                    :label="{ text: '닉네임: 숫자or영어or한글 2이상8이하 중복X', class: 'form-label' }"
                    type="text"
                    :value="nickname"
                    @input="nickname = $event.target.value"
                  />
                  <MaterialInput
                    v-model="gender"
                    id="gender"
                    class="input-group-outline mb-3"
                    :label="{ text: '성별: 남자 or 여자 중 선택해서 입력', class: 'form-label' }"
                    type="text"
                    :value="gender"
                    @input="gender = $event.target.value"
                  />
                  <MaterialInput
                    v-model="birthday"
                    id="birthday"
                    class="input-group-outline mb-3"
                    :label="{ text: '생일: YYYY-MM-DD 형식으로 입력', class: 'form-label' }"
                    type="text"
                    :value="birthday"
                    @input="birthday = $event.target.value"
                  />
                  <div class="text-center">
                    <MaterialButton
                      class="my-4 mb-2"
                      variant="gradient"
                      color="success"
                      type="submit"
                      style="margin-right: 30px"
                      @click.prevent="back"
                    >
                      뒤로 가기
                    </MaterialButton>
                    <MaterialButton
                      class="my-4 mb-2"
                      variant="gradient"
                      color="success"
                      type="submit"
                      @click.prevent="signUp"
                    >
                      이메일 인증
                    </MaterialButton>
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
