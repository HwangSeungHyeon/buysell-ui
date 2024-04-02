<script setup>
import NavbarDefault from "@/examples/navbars/NavbarDefault.vue";
import { useRoute } from "vue-router";
import axios from "axios";
import { onMounted, ref } from "vue";
const review = ref({
  nickname:"",
  review:[]
});
const route = useRoute();
const memberId = route.params.memberId;
const ReviewBymemberId = async () => {
  try {
    const response = await axios.get(`/members/${memberId}/profile/reviews`);
    // console.log("Member ID:", memberId);
    review.value = response.data;
    // console.log("reviews:", review.value);
  } catch (error) {
    console.error("리뷰를 가져오는 도중 에러가 발생했습니다.", error);
  }
};
onMounted(() => {
  ReviewBymemberId();
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
    </div>
  </div>
  <div class="mysales-container">
    <div class="row">
      <div v-if="review.review.length === 0"><div class="card-body text-center">리뷰가 없어요.</div></div>
      <div v-else>
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-10">
              <div class="card shadow-sm mb-4" v-for="rev in review.review" :key="rev.id">
                <div class="card-body">
                  <p class="card-text small m-0">작성자: {{ rev.nickname }}</p>
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
</template>