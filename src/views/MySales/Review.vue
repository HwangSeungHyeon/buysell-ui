<script setup>
import NavbarDefault from "@/examples/navbars/NavbarDefault.vue";
import { useRoute } from "vue-router";
import axios from "axios";
import { onMounted, ref } from "vue";
import Typed from "typed.js";

const review = ref([]);
const route = useRoute();
const memberId = route.params.memberId;

const ReviewBymemberId = async () => {
  try {
    const response = await axios.get(`/members/${memberId}/profile/reviews`);
    console.log("Member ID:", memberId);
    review.value = response.data;
    console.log("reviews:", review.value);
  } catch (error) {
    console.error("리뷰를 가져오는 도중 에러가 발생했습니다.", error);
  }
};
onMounted(() => {
  ReviewBymemberId();
});

/*const nicknameByprofile = async () => {
  try {
    const response = await axios.get(`/members/${memberId}/profile`);
    console.log("memberId by profile", memberId);
    nickname.value = response.data.nickname;
    console.log("nickname", nickname);
  } catch (error) {
    console.error("닉네임을 가져오는 도중 에러가 발생했습니다.", error);
  }
  return nickname;
};

onMounted(() => {
  nicknameByprofile();
});*/

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
</script>
<template>
  <div class="container position-sticky z-index-sticky top-0">
    <div class="row">
      <div class="col-12">
        <NavbarDefault :sticky="true" />
      </div>
    </div>
  </div>
  <div class="mysales-container">
    <div style="text-align: center" class="mx-auto my-auto">
      <h2>닉네임 : {{ review.nickname }}</h2>
      <h2><span id="typed" class="text-white"></span></h2>
      <div id="typed-strings">
        <h2>⭐</h2>
        <h2>⭐⭐</h2>
        <h2>⭐⭐⭐</h2>
        <h2>⭐⭐⭐⭐</h2>
        <h2>⭐⭐⭐⭐⭐</h2>
      </div>
    </div>
  </div>
  <div class="mysales-container">
    <div class="row">
      <div v-if="review.length === 0">리뷰가 없어요.</div>
      <div v-else>
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-10">
              <div class="card shadow-sm">
                <div class="card-body">
                  <div
                    v-for="rev in review.review"
                    :key="rev.nickname"
                    class="col-md-3 mb-4"
                  >
                    <p class="card-text small m-0">
                      작성자: {{ rev.nickname }}
                    </p>
                    <p class="card-text small m-0">평점: {{ rev.rating }}</p>
                    <p class="card-text small m-0">{{ rev.content }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
