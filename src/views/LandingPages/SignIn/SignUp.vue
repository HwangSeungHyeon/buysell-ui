<script setup>
import { onMounted } from "vue";

// example components
import Header from "@/examples/Header.vue";

//Vue Material Kit 2 components
import MaterialInput from "@/components/MaterialInput.vue";
import MaterialButton from "@/components/MaterialButton.vue";

// material-input
import setMaterialInput from "@/assets/js/material-input";
onMounted(() => {
  setMaterialInput();
});
</script>
<template>
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
                      id="email"
                      class="input-group-outline my-3"
                      :label="{ text: 'Email', class: 'form-label' }"
                      type="email"
                  />
                  <MaterialInput
                      id="password"
                      class="input-group-outline mb-3"
                      :label="{ text: 'Password', class: 'form-label' }"
                      type="password"
                  />
                                   <MaterialInput
                      id="nickName"
                      class="input-group-outline mb-3"
                      :label="{ text: 'nickName', class: 'form-label' }"
                      type="nickName"
                  />
                  <MaterialInput
                      id="gender"
                      class="input-group-outline mb-3"
                      :label="{ text: 'gender', class: 'form-label' }"
                      type="gender"
                  />
                  <MaterialInput
                      id="birthday"
                      class="input-group-outline mb-3"
                      :label="{ text: 'birthday', class: 'form-label' }"
                      type="birthday"
                  />

                  <div class="text-center">
                    <router-link to="/auth">
                      <MaterialButton
                        class="my-4 mb-2"
                        variant="gradient"
                        color="success"
                        fullWidth
                    > 이메일 인증하기 </MaterialButton>
                      </router-link>

                  </div>
                  <p class="mt-4 text-sm text-center">
                    소셜 로그인
                    <div class="row mt-3">
                      <!-- //카카오 로그인-->
                      <div class="col-2 text-center ms-auto">
                        <a class="btn btn-link px-3" href="javascript:;">
                          <i class="fa fa-facebook text-yellow text-lg"></i>
                        </a>
                      </div>
                      <!-- //네이버 로그인-->
                      <div class="col-2 text-center px-1">
                        <a class="btn btn-link px-3" href="javascript:;">
                          <i class="fa fa-github text-green text-lg"></i>
                        </a>
                      </div>
                      <!--  //구글 로그인-->
                      <div class="col-2 text-center me-auto">
                        <a class="btn btn-link px-3" href="javascript:;">
                          <i class="fa fa-google text-red text-lg"></i>
                        </a>
                      </div>
                    </div>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Header>
</template>
