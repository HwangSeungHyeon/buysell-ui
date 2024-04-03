<template>
  <div class="container position-sticky z-index-sticky top-0">
    <div class="row">
      <div class="col-12">
        <NavbarDefault :sticky="true"/>
      </div>
    </div>
  </div>
  <div class="mysales-container" style="text-align: center">
    <h5>
      구매 내역
    </h5>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-8">
          <div class="card-columns">
            <div
                v-for="o in orderHistories"
                :key="o.id"
                class="card shadow-sm mb-4"
            >
              <div class="card-body">
                <p class="card-text">제목: {{ o.postTitle }}</p>
                <p class="card-text">이미지: {{ o.postImageUrl }}</p>
                <p class="card-text">가격: {{ o.price }}</p>
                <!-- 여기서 p.id를 o.id로 수정 -->
                <button class="btn btn-primary" @click="redirectToReviewPage(o.postId)">리뷰 작성</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router'; // Vue Router import 추가
import getUserId from "@/views/LandingPages/posts/getUserId";
import NavbarDefault from "@/examples/navbars/NavbarDefault.vue";

const orderHistories = ref({
  postId: "",
  postTitle: "",
  postImageUrl: "",
  price: ""
});

const router = useRouter(); // Vue Router 객체 생성

const fetchOrderHistories = async () => {
  try {
    const memberId = getUserId(); // 토큰에서 memberId 획득
    if (memberId) {
      const response = await axios.get(`/members/${memberId}/profile/orderHistories`);
      orderHistories.value = response.data;
    } else {
      console.error('사용자 ID를 찾을 수 없습니다.');
    }
  } catch (error) {
    console.error('구매 내역을 불러오는 중 오류가 발생했습니다:', error);
  }
};

const redirectToReviewPage = (postId) => {
  // 리뷰 작성 페이지로 이동하는 로직 추가
  console.log('리뷰 작성 페이지로 이동:', postId);
  router.push({ path: `/posts/${postId}/reviews` }); // 리뷰 작성 페이지로 이동
};

onMounted(fetchOrderHistories);
</script>
