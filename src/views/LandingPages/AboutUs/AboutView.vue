<script setup>
import { onMounted, onUnmounted } from "vue";

//example components
import DefaultNavbar from "../../../examples/navbars/NavbarDefault.vue";

//image
import bg0 from "@/assets/img/bg9.jpg";

//dep
import Typed from "typed.js";

//sections

const body = document.getElementsByTagName("body")[0];
//hooks
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
  <DefaultNavbar transparent />
  <header class="bg-gradient-dark">
    <div
      :style="{ backgroundImage: `url(${bg0})` }"
      class="page-header min-vh-95"
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
            <button class="btn bg-white text-dark" type="submit">
              My Itemes?
            </button>
            <div>
              <button class="btn bg-white text-dark" type="submit">
                WishList
              </button>
            </div>
            <div>
              <router-link to="/four-t-pay">
              <button
                class="btn bg-white text-dark"
                type="submit">
                Four-T Pay</button>
              </router-link>
            </div>
            <div>
              <button class="btn bg-white text-dark" type="submit">
                Profile Edit
              </button>
            </div>
            <div>
              <button class="btn bg-white text-dark" type="submit">
                Withdrawal
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
