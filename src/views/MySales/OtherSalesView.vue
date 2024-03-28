<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const { memberId } = useRouter().route.params;
const otherUserName = ref("");

const posts = ref([]);

const fetchOtherUsersPosts = async () => {
  try {
    const response = await axios.get(
      `/members/${memberId.value}/profile/posts`
    );
    posts.value = response.data;
    console.log("posts:", posts.value); // 게시글 목록 출력
  } catch (error) {
    console.error("게시글을 가져오는 도중 에러가 발생했습니다:", error);
  }
};

onMounted(fetchOtherUsersPosts);
</script>
<template>
  <div>
    <h2>{{ otherUserName }}님의 게시글 목록</h2>
  </div>
</template>
