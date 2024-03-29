<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-12 col-md-10 col-lg-6 col-xl-5">
        <div class="card z-index-0 fadeIn3 fadeInBottom">
          <div class="card-body">
            <!-- 구매자 정보 영역 -->
            <div class="buyer-info mb-3 mb-4">
              <h5>제품 정보</h5>
              <div class="info-content">
                <div><strong>제품 이름:</strong> {{ post.title }}</div>
                <div><strong>제품 가격:</strong> {{ post.price }}원</div>
              </div>
            </div>

            <!-- 구매자 정보 영역 -->
            <div class="buyer-info mb-3 mb-4">
              <h5>구매자 정보</h5>
              <div class="info-content">
                <div><strong>구매자 이름:</strong> 이름 표시</div>
                <MaterialInput
                    id="address"
                    class="input-group-outline my-3"
                    placeholder="배송지 주소를 입력하세요"
                />
                <MaterialInput
                    id="phone"
                    class="input-group-outline mb-3"
                    placeholder="연락처를 입력하세요"
                />
              </div>
            </div>

            <!-- 포인트 정보 영역 -->
            <div class="pay-info mb-3 mb-4">
              <h5>계좌 잔액</h5>
              <div class="info-content">
                <div>{{ accountBalance }}원</div>
              </div>
            </div>

            <!-- 결제 정보 영역 -->
            <div class="payment-info mb-3 mb-4">
              <h5>결제 정보</h5>
              <div class="info-content">
                <div><strong>결제 금액:</strong> {{ post.price }}원</div>
              </div>
            </div>
            <div class="d-flex justify-content-center mt-3">
              <MaterialButton
                  class="my-2 me-2"
                  variant="gradient"
                  color="success"
                  fullWidth>결제하기</MaterialButton>
              <MaterialButton
                  class="my-2"
                  variant="gradient"
                  color="danger"
                  fullWidth
                  @click="cancelPayment">결제 취소</MaterialButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import MaterialButton from "@/components/MaterialButton.vue";
import MaterialInput from "@/components/MaterialInput.vue";
import { useRouter } from "vue-router";
import { getAccountBalance } from "@/views/Pay/getAccountBalance";

// post 데이터를 저장할 반응형 변수
const post = ref({
  title: "",
  createdName: "",
  price: 0,
});

onMounted(() => {
  // 세션 저장소에서 post 데이터를 가져옵니다.
  const storedPost = sessionStorage.getItem('post');
  if (storedPost) {
    const parsedPost = JSON.parse(storedPost);
    post.value.title = parsedPost.title;
    post.value.price = parsedPost.price;
  }
});

const { accountBalance } = getAccountBalance();

const router = useRouter();
const cancelPayment = () => {
  router.back();
};

</script>

<style scoped>
.page-header {
  position: fixed;
  top: 200px;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.card-body {
  max-height: 100%;
  overflow-y: auto; /* 내용이 넘칠 경우 스크롤이 나타나도록 설정 */
}
</style>