<script setup>
import Header from "@/examples/Header.vue";
import MaterialButton from "@/components/MaterialButton.vue";
import MaterialInput from "@/components/MaterialInput.vue";
</script>

<template>
  <Header>
    <div class="page-header justify-content-center">
      <div class="row">
        <div class="">
          <div class="card z-index-0 fadeIn3 fadeInBottom">
            <div class="card-body">
              <form role="form" class="text-start">
                <h6>배송지 주소 입력</h6>
                <MaterialInput id="address" class="input-group-outline my-3" />
                <h6>구매자 연락처 입력</h6>
                <MaterialInput id="phone" class="input-group-outline mb-3" />

                <div class="text-center">
                  <MaterialButton
                    class="my-4 mb-2"
                    variant="gradient"
                    color="success"
                    fullWidth
                    >결제하기</MaterialButton
                  >
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Header>
</template>

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
