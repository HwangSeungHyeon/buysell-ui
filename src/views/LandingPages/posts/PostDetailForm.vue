<template>
  <section>
    <div class="container py-7">
      <!-- 여기부터 게시글 제목과 작성자 이름 -->
      <div class="post-header text-center mb-5">
        <div class="post-title">게시글 제목</div>
        <div class="post-author">작성자: 이름</div>
      </div>
      <!-- 여기까지 게시글 제목과 작성자 이름 -->
      <div class="product-info">
        <div class="product-image-container">
          <img
            src="data:image/jpeg;base64,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"
            alt="제품 이미지"
            class="product-image mb-3"
            style="max-width: 100%"
          />
        </div>
        <div class="product-details">
          <p>가격: ₩가격정보</p>
          <p>제품 설명</p>
        </div>
      </div>

      <!-- 구매하기 버튼 -->
      <div class="text-sm-end mb-5">
        <material-button variant="gradient" color="primary"
          >구매하기</material-button
        >
      </div>

      <!-- 게시글 수정, 찜하기 -->
      <div class="text-end mb-5">
        <material-button variant="gradient" color="secondary"
          >게시글 수정</material-button
        >
        <material-button variant="gradient" color="info"
          >찜하기</material-button
        >
      </div>

      <!-- 댓글 작성칸 -->
      <div class="comment-form mb-5">
        <div class="input-group">
          <material-input class="material-input mb-3" placeholder="댓글을 입력하세요..."></material-input>
          <material-button variant="gradient" color="dark">댓글 등록</material-button>
        </div>
      </div>

      <!-- 댓글 내용 -->
      <div class="comments">
        <div class="comment mb-3" v-for="comment in comments" :key="comment.id">
          <p>{{ comment.content }}</p>
          <div>
            <material-button variant="text" color="info"
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
// 필요한 컴포넌트와 데이터를 가져옵니다.
import MaterialInput from "@/components/MaterialInput.vue";
import MaterialButton from "@/components/MaterialButton.vue";

// 예시 데이터
const comments = [
  { id: 1, content: "정말 멋진 제품이네요!" },
  { id: 2, content: "가격이 조금 비싼 것 같아요." },
  // 더 많은 댓글...
];
</script>

<style>
.post-header {
  display: flex;
  justify-content: space-between; /* 양쪽으로 요소를 분산 배치 */
  align-items: center; /* 세로 축에서 중앙 정렬 */
}

.text-center {
  text-align: center; /* 텍스트 중앙 정렬 */
}

.mb-5 {
  margin-bottom: 3rem; /* 하단 여백 */
}

.post-title,
.post-author {
  flex: 1; /* 둘 다 공간을 같게 차지하도록 함 */
}

.post-title {
  text-align: left; /* 제목을 왼쪽 정렬 */
}

.post-author {
  text-align: right; /* 작성자 이름을 오른쪽 정렬 */
}
.product-info {
  display: flex;
  align-items: center; /* 세로 축에서 중앙 정렬 */
  gap: 20px; /* 이미지와 텍스트 사이의 간격 */
}

.product-image-container {
  flex-shrink: 0; /* 이미지 크기가 유지되도록 함 */
}

.product-image {
  max-width: 100%;
  height: auto;
}

.product-details {
  flex-grow: 1; /* 남은 공간을 모두 차지하도록 함 */
}
//댓글 스타일
.comment-form {
  display: flex;
  flex-direction: column; /* 댓글 입력창과 버튼을 세로로 배치 */
}

.input-group {
  display: flex; /* Flexbox 사용 */
  align-items: center; /* 높이 방향으로 중앙 정렬 */
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
