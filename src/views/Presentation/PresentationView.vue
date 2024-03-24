<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import NavbarDefault from "@/examples/navbars/NavbarDefault.vue";
import setNavPills from "@/assets/js/nav-pills";

const router = useRouter();
const body = document.getElementsByTagName("body")[0];

onMounted(() => {
  body.classList.add("presentation-page");
  body.classList.add("bg-gray-200");
});

onUnmounted(() => {
  body.classList.remove("presentation-page");
  body.classList.remove("bg-gray-200");
});

onMounted(() => {
  setNavPills();
});

const posts = ref([]);

const fetchPosts = async () => {
  try {
    const response = await axios.get("/posts");
    posts.value = response.data.content;
  } catch (error) {
    console.error("게시물을 불러오는데 실패했습니다:", error);
  }
};

onMounted(fetchPosts);

const navigateToDetail = (postId) => {
  router.push({ name: "products", params: { postId } });
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}년 ${month}월 ${day}일 ${hours}시 ${minutes}분`;
};
</script>

<template>
  <div class="container position-sticky z-index-sticky top-0">
    <div class="row">
      <div class="col-12">
        <NavbarDefault :sticky="true" />
      </div>
    </div>
  </div>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-lg-8">
        <div class="card-columns">
          <div
            v-for="post in posts"
            :key="post.id"
            class="card shadow-sm mb-4"
            @click="navigateToDetail(post.id)"
          >
            <div class="card-body">
              <h5 class="card-title">{{ post.title }}</h5>
              <p class="card-text">작성자: {{ post.createdName }}</p>
              <p class="card-text">작성일: {{ formatDate(post.createdAt) }}</p>
              <p class="card-text">조회수: {{ post.view }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>