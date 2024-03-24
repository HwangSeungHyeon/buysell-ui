<template>
  <section>
    <!-- 상품 정보 표시 -->
    <div class="container py-3" style="width: 60%">
      <div class="post-header text-center mb-5">
        <div class="post-title">
          <h4>상품명: {{ post.title }}</h4>
        </div>
        <div class="post-author">
          <h4>작성자: {{ post.createdName }}</h4>
        </div>
      </div>
      <div class="product-info py-6">
        <div class="product-details">
          <p style="font-weight: bold">가격: ₩{{ post.price }}</p>
          <p style="font-weight: bold; margin-right: 50px">
            내용: {{ post.content }}
          </p>
        </div>
      </div>
      <!-- 구매하기 버튼 -->
      <div class="text-sm-end mb-5">
        <material-button
          variant="gradient"
          color="primary"
          style="margin-right: 100px"
          >구매하기</material-button
        >
      </div>

      <!-- 게시글 수정, 찜하기 -->
      <div>
        <router-link :to="{ name: 'presentation' }" class="no-style-link">
          <MaterialButton
            variant="gradient"
            color="secondary"
            style="justify-content: left"
          >
            목록
          </MaterialButton>
        </router-link>
        <!-- postId를 postEdit 라우트에 전달 -->
        <router-link
          :to="{ name: 'postedit', params: { postId: post.id } }"
          class="no-style-link"
        >
          <material-button
            variant="gradient"
            color="secondary"
            style="justify-content: end"
            >게시글 수정</material-button
          >
        </router-link>
        <router-link to="/" class="no-style-link">
          <material-button variant="gradient" color="info"
            >찜하기</material-button
          >
        </router-link>
      </div>

      <!-- 댓글 작성칸 -->
      <div class="comment-form mb-5">
        <div class="input-group">
          <material-input
            v-model="newComment"
            class="material-input mb-3"
            placeholder="댓글을 입력하세요..."
            style="border: 2px solid #000000"
            :value="newComment"
            @input="newComment = $event.target.value"
          ></material-input>
          <material-button @click="addComment" variant="gradient" color="dark"
            >댓글 등록</material-button
          >
        </div>
      </div>
      <!-- 댓글 내용 -->
      <h5>전체 댓글</h5>
      <div class="comments mb-5" style="border: 2px solid #000000">
        <div
          class="comment mb-3"
          v-if="post.comment && post.comment.length === 0"
        >
          <p>댓글이 없습니다.</p>
        </div>
        <div
          class="comment mb-3"
          v-for="(comment, index) in post.comment"
          :key="index"
          style="display: flex; align-items: center; margin-top: 20px"
        >
          <p style="flex: 1; border: 2px solid #000000; margin-left: 10px">
            {{ comment.content }}
          </p>
          <div class="p-md-2">
            <material-button
              variant="text"
              color="info"
              style="margin-right: 8px"
              >좋아요</material-button
            >
            <material-button variant="text" color="danger"
              >신고</material-button
            >
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import MaterialButton from "@/components/MaterialButton.vue";
import axios from "axios";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import MaterialInput from "@/components/MaterialInput.vue";
import router from "@/router";

const route = useRoute();
const post = ref({
  title: "",
  createdName: "",
  content: "",
  price: 0,
  comment: [], // 이 부분을 추가하여 초기에 빈 배열로 설정
});

// 서버에서 해당 ID에 해당하는 데이터를 가져오는 함수
const fetchPost = async (postId) => {
  try {
    const response = await axios.get(`/posts/${postId}`);
    post.value = response.data;
    sessionStorage.setItem("post", JSON.stringify(post.value));
  } catch (error) {
    console.error("게시글을 불러오는데 실패했습니다:", error);
  }
};

// 컴포넌트가 마운트될 때 해당 게시글의 ID를 가져와서 데이터 조회
onMounted(() => {
  let postId = route.params.postId;

  if (!postId) {
    const savedPost = JSON.parse(sessionStorage.getItem("post"));
    if (savedPost) {
      postId = savedPost.id;
    }
  }

  if (postId) {
    fetchPost(postId);
  } else {
    console.error("게시글 ID를 찾을 수 없습니다.");
  }
});

const newComment = ref("");

const addComment = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      await router.push("/login");
      return;
    }

    const postId = post.value.id;
    const response = await axios.post(
      `/posts/${postId}/comments`,
      { content: newComment.value },
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );

    const addedComment = response.data;
    if (!post.value.comments) {
      post.value.comments = []; // 빈 배열로 초기화
    }
    post.value.comments.push(addedComment);
    localStorage.setItem("post", JSON.stringify(post.value));
    location.reload();
  } catch (error) {
    console.error("댓글을 등록하는데 실패했습니다:", error);
  }
};
</script>

<style>
.post-header {
  display: flex;
  justify-content: space-between; /* 양쪽으로 요소를 분산 배치 */
  align-items: center; /* 세로 축에서 중앙 정렬 */
  border: 2px solid #000000;
}
.text-center {
  text-align: center; /* 텍스트 중앙 정렬 */
}

.mb-5 {
  margin-bottom: 3rem; /* 하단 여백 */
}

.post-title,
.post-author {
  display: flex; /* Flexbox를 사용하여 요소를 가로로 나란히 배치 */
  flex-direction: column; /* 요소들을 세로로 배치 */
  justify-content: center; /* 세로 방향으로 가운데 정렬 */
}

.post-title {
  text-align: left; /* 제목을 왼쪽 정렬 */
  margin-left: 20px;
}

.post-author {
  text-align: right; /* 작성자 이름을 오른쪽 정렬 */
  margin-right: 20px;
}
.product-info {
  display: flex;
  text-align: center;
  align-items: center; /* 세로 축에서 중앙 정렬 */
  gap: 20px; /* 이미지와 텍스트 사이의 간격 */
  background-color: #e2e2e2;
}

.product-details {
  flex-grow: 1; /* 남은  공간을 모두 차지하도록 함 */
}
// 댓글 스타일
.comment-form {
  display: flex;
  flex-direction: column; /* 댓글 입력창과 버튼을 세로로 배치 */
}

.input-group {
  display: flex;
  align-items: center;
}

.material-input {
  flex: 1; /* 입력창이 남은 공간을 모두 차지하도록 설정 */
  max-width: calc(100% - 120px); /* 버튼 너비를 고려한 최대 너비 설정 */
  margin-right: 8px; /* 버튼과의 간격 조정 */
}

material-button {
  flex-shrink: 0; /* 버튼이 내용에 따라 축소되지 않도록 설정 */
}
</style>
