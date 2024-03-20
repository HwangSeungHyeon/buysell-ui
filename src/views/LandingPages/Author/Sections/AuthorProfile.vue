<script setup>
import { onMounted } from "vue";

//Vue Material Kit 2 components
import MaterialAvatar from "@/components/MaterialAvatar.vue";
import MaterialButton from "@/components/MaterialButton.vue";

// image
import profilePic from "@/assets/img/bruce-mars.jpg";

// material-input
import setMaterialInput from "@/assets/js/material-input";
import MaterialInput from "@/components/MaterialInput.vue";
onMounted(() => {
  setMaterialInput();
});
</script>
<template>
  <section class="py-sm-7 py-5 position-relative">
    <div class="container">
      <div class="row">
        <div class="col-12 mx-auto">
          <div class="mt-n8 mt-md-n9 text-center">
            <div class="blur-shadow-avatar">
              <MaterialAvatar
                size="xxl"
                class="shadow-xl position-relative z-index-2"
                :image="profilePic"
                alt="Avatar"
              />
            </div>
          </div>
          <div class="row py-7">
            <div
              class="col-lg-7 col-md-7 z-index-2 position-relative px-md-2 px-sm-5 mx-auto"
            >
              <MaterialButton
                variant="contained"
                color="success"
                class="w-auto me-2">
                프로필 수정
              </MaterialButton>
              <div
                class="d-flex justify-content-between align-items-center mb-2"
              >
                <h3 class="mb-0">Hyunjoo Kim</h3>
              </div>
              <div class="row mb-4">
                <div class="col-auto">
                  <span class="h6 me-1">323</span>
                  <span>Posts</span>
                </div>
                <div class="col-auto">
                  <span class="h6 me-1">399.5k</span>
                  <span>Followers</span>
                </div>
                <div class="col-auto">
                  <span class="h6 me-1">260</span>
                  <span>Following</span>
                </div>
              </div>

              <p class="text-lg mb-0">
                저는 귀엽습니다!
                현재의 주인공 김현주입니다!
                소통능력을 갖춘 인재를 원하신다면 바로 저를 데려가세요!
                <br /><a
                  href="https://hyunzoo123123.github.io/IntroduceHJ/"
                  class="text-success icon-move-right"
                  >김현주 응원하기
                  <i class="fas fa-arrow-right text-sm ms-1"></i>
                </a>
              </p>
              <section class="py-7">
                <div class="container">
                  <div class="row py-2">
                    <div class="col-lg-4 mx-auto">
                      <MaterialInput
                        class="input-group-outline mb-4"
                        :label="{ text: '닉네임', class: 'form-label' }"
                        type="text"
                      />
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
