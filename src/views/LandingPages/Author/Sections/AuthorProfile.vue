<script setup>
import { onMounted } from "vue";
import MaterialAvatar from "@/components/MaterialAvatar.vue";
import MaterialButton from "@/components/MaterialButton.vue";
import profilePic from "@/assets/img/bruce-mars.jpg";
import setMaterialInput from "@/assets/js/material-input";
import MaterialInput from "@/components/MaterialInput.vue";
import { useJwt } from "@vueuse/integrations/useJwt";
import { ref } from "vue";
import axios from "axios";
const token = localStorage.getItem("token");
const decodedToken = useJwt(token);
const currentNickname = ref(decodedToken?.payload?.value?.sub);
const newNickname = ref("");

onMounted(() => {
  setMaterialInput();
});
onMounted(async () => {
  try {
    const response = await axios.get(`/members/my/profile`);
    currentNickname.value = response.data.nickname;
  } catch (error) {
    console.error("닉네임 불러오기 중 에러 발생:", error);
  }
});
const nicknameEdit = async () => {
  if (newNickname.value.length < 2 || newNickname.value.length > 8) {
    alert("닉네임은 2자 이상 8자 이하로 입력해야 합니다.");
    return;
  }
  try {
    const response = await axios.put(`/members/my/profile`, {
      nickname: newNickname.value,
    });
    if (response.status === 200) {
      alert("닉네임 수정 성공!"); // 수정 성공 알림
      location.reload(); // 페이지 새로고침
    } else {
      console.error("닉네임 수정 실패:", response.data);
    }
  } catch (error) {
    alert("닉네임 변경에 실패하였습니다. 중복 닉네임 등");
  }
};
</script>
<template>
  <section class="py-sm-7 py-5 position-relative mx-auto">
    <div class="container">
      <div class="row">
        <div class="col-12 mx-auto text-center">
          <div class="col-lg-4">
            <div class="blur-shadow-avatar">
              <MaterialAvatar
                size="xxl"
                class="shadow-xl position-relative z-index-2"
                :image="profilePic"
                alt="Avatar"
              />
            </div>
            <p></p>
            <div class="form-group">
              <label for="nickname"></label>
              <input
                type="text"
                id="nickname"
                v-model="currentNickname"
                disabled
              />
            </div>
            <div class="form-group text-center">
              <label for="newNickname"></label>
              <MaterialInput
                class="input-group-outline mb-4 col-lg-6 px-0 mx-auto"
                v-model="newNickname"
                :label="{ text: 'newNickname', class: 'form-label' }"
                type="text"
                :value="newNickname"
                @input="newNickname = $event.target.value"
                style="width: 300px"
              />
            </div>
            <MaterialButton
              variant="text"
              color="success"
              class="w-auto me-2"
              @click="nicknameEdit"
            >
              수정
            </MaterialButton>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
