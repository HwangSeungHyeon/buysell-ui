<template>
  <div class="container py-1">
    <div class="row mt-5">
      <div class="col-sm-3 col-6 mx-auto text-center ">
        <!-- Button trigger modal -->
        <MaterialButton
          variant="gradient"
          color="success"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          class="w-40"
        >
          입금하기
        </MaterialButton>
        <!-- Modal -->
        <div
          class="modal fade"
          id="exampleModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  입금 요청하기
                </h5>
                <MaterialButton
                  color="none"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                </MaterialButton>
              </div>
              <div class="modal-body">
                <p>입금하시겠습니까?</p>
              </div>
              <div class="modal-footer justify-content-between">
                <MaterialButton
                  variant="gradient"
                  color="dark"
                  data-bs-dismiss="modal"
                >
                  취소
                </MaterialButton>
                <MaterialButton
                    variant="gradient"
                    color="success"
                    class="mb-0"
                >
                  입금 신청
                </MaterialButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import MaterialButton from '@/components/MaterialButton.vue';
</script>