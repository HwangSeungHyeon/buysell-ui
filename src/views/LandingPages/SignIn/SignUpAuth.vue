<script setup>
import { ref } from "vue";
import axios from "axios";
import MaterialButton from "@/components/MaterialButton.vue";
import MaterialInput from "@/components/MaterialInput.vue";
import router from "@/router";
import NavbarDefault from "@/examples/navbars/NavbarDefault.vue";

const email = ref("");

const sendEmailVerification = async () => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const data = { email: email.value }; // email.value를 객체로 래핑
    const response = await axios.post(
      `/members/sendemail?email=${data.email}`,
      data,
      config
    );
    alert(
      "이메일 인증 링크 전송에 성공했습니다 이메일 확인 후 로그인을 진행해주세요", response
    );
    await router.push("/");
  } catch (error) {
    alert("가입된 정보가 없습니다 회원가입을 먼저 진행해주세요");
    await router.push("/login");
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
                    이메일 인증 링크 재전송
                  </h4>
                </div>
              </div>
              <div class="card-body">
                <h6 >이메일 인증을 실패하거나 다시 받고 싶으 실 경우 가입에 사용하신 이메일을 입력 하신 후 전송 버튼을 눌러주세요.</h6>
                <form role="form" class="text-start">
                  <MaterialInput
                    v-model="email"
                    id="Email"
                    class="input-group-outline my-3"
                    :label="{ text: 'Email', class: 'form-label' }"
                    type="Email"
                    :value="email"
                    @input="email = $event.target.value"
                  />

                  <div class="text-center">
                    <MaterialButton
                      class="my-4 mb-2"
                      variant="gradient"
                      color="success"
                      type="submit"
                      style="margin-right: 40px"
                      @click.prevent="router.push(`/login`)"
                    >
                      로그인
                    </MaterialButton>
                    <MaterialButton
                      class="my-4 mb-2"
                      variant="gradient"
                      color="success"
                      @click.prevent="sendEmailVerification"
                    >
                      전송
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
