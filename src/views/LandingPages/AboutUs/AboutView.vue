<script setup>
import { onMounted, onUnmounted } from "vue";
import bg0 from "@/assets/img/bg9.jpg";
import Typed from "typed.js";
import NavbarDefault from "@/examples/navbars/NavbarDefault.vue";
import axios from "axios";

const body = document.getElementsByTagName("body")[0];

onMounted(() => {
  body.classList.add("about-us");
  body.classList.add("bg-gray-200");

  if (document.getElementById("typed")) {
    // eslint-disable-next-line no-unused-vars
    var typed = new Typed("#typed", {
      stringsElement: "#typed-strings",
      typeSpeed: 90,
      backSpeed: 90,
      backDelay: 200,
      startDelay: 500,
      loop: true,
    });
  }
});
onUnmounted(() => {
  body.classList.remove("about-us");
  body.classList.remove("bg-gray-200");
});
</script>
<template>
  <div class="container position-sticky z-index-sticky top-0">
    <div class="row">
      <div class="col-12">
        <NavbarDefault :sticky="true" />
      </div>
    </div>
  </div>
  <header class="bg-gradient-dark">
    <div
      :style="{ backgroundImage: `url(${bg0})` }"
      class="page-header min-vh-100"
    >
      <span class="mask bg-gradient-dark opacity-6"></span>
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-8 text-center mx-auto my-auto">
            <h1 class="text-white">
              ⭐ <span id="typed" class="text-white"></span>
            </h1>
            <div id="typed-strings">
              <h1>⭐</h1>
              <h1>⭐⭐</h1>
              <h1>⭐⭐⭐</h1>
              <h1>⭐⭐⭐⭐</h1>
            </div>
            <router-link to="/mysales">
              <button class="btn bg-white text-dark" type="submit">
                내가 쓴 게시글
              </button>
            </router-link>
            <div>
              <router-link to="/wishlist">
                <button class="btn bg-white text-dark" type="submit">
                  찜 목록 보기
                </button>
              </router-link>
            </div>
            <div>
              <router-link to="/four-t-pay">
                <button class="btn bg-white text-dark" type="submit">
                  Four-T Pay
                </button>
              </router-link>
            </div>
            <div>
              <router-link to="/pages/landing-pages/author">
                <button class="btn bg-white text-dark" type="submit">
                  닉네임 수정
                </button>
              </router-link>
            </div>
            <div>
              <button class="btn bg-white text-dark" type="submit">
                탈퇴하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
