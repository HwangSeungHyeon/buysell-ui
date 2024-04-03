<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-lg-8">
        <div class="card shadow-sm mb-4">
          <div class="card-body">
            <h5 class="card-title">리뷰 작성</h5>
            <form @submit.prevent="submitReview">
              <div class="mb-3">
                <label for="rating" class="form-label">평점</label>
                <input type="number" class="form-control" v-model="rating" min="1" max="5" required>
              </div>
              <div class="mb-3">
                <label for="content" class="form-label">리뷰 내용</label>
                <textarea class="form-control" v-model="content" rows="4" required></textarea>
              </div>
              <button class="btn btn-primary">리뷰 작성</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRoute, useRouter } from "vue-router";

const rating = ref(1);
const content = ref('');
const route = useRoute();
const $router = useRouter();

const submitReview = async () => {
  try {
    const postId = route.params.postId; // 포스트 ID 설정
    const response = await axios.post(`/posts/${postId}/reviews`, {
      rating: rating.value,
      content: content.value
    });
    console.log(response);
    alert("리뷰가 작성되었습니다.");
    $router.push('/'); // 리뷰가 성공적으로 작성되면 페이지를 리다이렉션
  } catch (error) {
    alert("리뷰는 1회만 작성 가능합니다.");
    // 오류 처리 로직 추가
  }
};
</script>
