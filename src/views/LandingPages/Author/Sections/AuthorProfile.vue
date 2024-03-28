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
import { useJwt } from "@vueuse/integrations/useJwt";
import { ref } from "vue";
import axios from "axios";
const token = sessionStorage.getItem("token");
const decodedToken = useJwt(token);
const currentNickname = ref(decodedToken?.payload?.value?.sub);
const newNickname = ref("");
onMounted(async () => {
  try {
    const response = await axios.get(`/members/my/profile`);
    currentNickname.value = response.data.nickname;
  } catch (error) {
    console.error("닉네임 불러오기 중 에러 발생:", error);
  }
});
const nicknameEdit = async () => {// 최소 3자 이상, 최대 10자 이하도록 검증
  if (newNickname.value.length < 3 || newNickname.value.length > 10) {
    console.error("닉네임은 3자 이상 10자 이하로 입력해야 합니다.");
    return;
  }
  try {
    const response = await axios.put(`/members/my/profile`, {
      nickname: newNickname.value,
    });
    if (response.status === 200) {
      // 닉네임 수정 성공 처리 (예: 메시지 표시)
      console.log("닉네임 수정 성공!");
    } else {
      console.error("닉네임 수정 실패:", response.data);
    }
  } catch (error) {
    console.error("닉네임 수정 중 에러 발생:", error);
  }
};
</script>
<template>
  <section class="py-sm-7 py-5 position-relative">
    <div class="container">
      <div class="row">
        <div class="col-12 mx-auto">
          <div class="blur-shadow-avatar">
            <MaterialAvatar
              size="xxl"
              class="shadow-xl position-relative z-index-2"
              :image="profilePic"
              alt="Avatar"
            />
          </div>
          <MaterialButton
            variant="contained"
            color="success"
            class="w-auto me-2"
          >
            Profile Edit
          </MaterialButton>
          <div class="col-lg-4">
            <form @submit.prevent="nicknameEdit">
              <div class="form-group">
                <label for="nickname">현재 닉네임</label>
                <input
                  type="text"
                  id="nickname"
                  v-model="currentNickname"
                  disabled
                />
              </div>
              <div class="form-group">
                <label for="newNickname">새 닉네임</label>
                <MaterialInput
                  class="input-group-outline mb-4"
                  v-model="newNickname"
                  :label="{ text: 'newNickname', class: 'form-label' }"
                  type="text"
                />
              </div>
              <MaterialButton
                variant="text"
                color="success"
                class="w-auto me-2"
                @click="nicknameEdit"
              >
                NickName Edit
              </MaterialButton>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
