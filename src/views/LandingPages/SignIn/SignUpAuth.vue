<script setup>
import { ref } from "vue";
import axios from "axios";
import MaterialButton from "@/components/MaterialButton.vue";
import MaterialInput from "@/components/MaterialInput.vue";
import router from "@/router";

const email = ref("");

const sendEmailVerification = async () => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    console.log("email", email.value);
    const response = await axios.post(
      `/members/sendemail`,
      email.value,
      {},
      config
    );
    console.log(response.data);
    await router.push("/login");
  } catch (error) {
    console.log(error);
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
                    이메일 인증 링크 전송
                  </h4>
                </div>
              </div>
              <div class="card-body">
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
                      인증하기
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
