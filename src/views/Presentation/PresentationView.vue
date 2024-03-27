<template>
  <div class="container position-sticky z-index-sticky top-0">
    <div class="row">
      <div class="col-12">
        <NavbarDefault :sticky="true" />
      </div>
    </div>
  </div>
  <Header>
    <div
      class="page-header min-vh-35"
      :style="`background-image: url(${vueMkHeader})`"
    >
      <div class="container">
        <div class="row">
          <div class="col-lg-7 text-center mx-auto position-relative">
            <h1
              class="text-white pt-5 mt-n5 me-2"
              :style="{ display: 'inline-block ' }"
            >
              BuySell
            </h1>
            <p class="lead text-white px-5 mt-3" :style="{ fontWeight: '500' }">
              버리지마세요. 필요한 사람을 찾아보세요. 지금.
            </p>
          </div>
        </div>
      </div>
    </div>
  </Header>
  <div class="container">
    <div class="row">
      <div class="col-lg-4 mx-auto">
        <div class="nav-wrapper position-relative end-0">
          <ul class="nav nav-pills nav-fill p-1" role="tablist">
            <li class="nav-item">
              <a
                class="nav-link mb-0 px-0 py-1 active"
                :class="{ active: selectedSort === 'updatedAt,desc' }"
                data-bs-toggle="tab"
                href="#"
                role="tab"
                aria-controls="profile"
                aria-selected="true"
                @click.prevent="changeSort('updatedAt,desc')"
              >
                최신 순
              </a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link mb-0 px-0 py-1"
                :class="{ active: selectedSort === 'view,desc' }"
                data-bs-toggle="tab"
                href="#"
                role="tab"
                aria-controls="dashboard"
                aria-selected="false"
                @click.prevent="changeSort('view,desc')"
              >
                많이 본 순
              </a>
            </li>
          </ul>
        </div>
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
            @click="handlePostClick(post.id)"
          >
            <div class="card-body">
              <h5 class="card-title">{{ post.title }}</h5>
              <p class="card-text">작성자: {{ post.createdName }}</p>
              <p class="card-text">작성일: {{ formatDate(post.updatedAt) }}</p>
              <p class="card-text">조회수: {{ post.view }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <DefaultFooter />
</template>

<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import NavbarDefault from "../..//examples/navbars/NavbarDefault.vue";
import DefaultFooter from "../../examples/footers/FooterDefault.vue";
import Header from "../../examples/Header.vue";
import vueMkHeader from "@/assets/img/vue-mk-header.jpg";
import setNavPills from "@/assets/js/nav-pills.js";

const router = useRouter();
const body = document.getElementsByTagName("body")[0];

onMounted(() => {
  body.classList.add("presentation-page");
  body.classList.add("bg-gray-200");
  setNavPills();
});

onUnmounted(() => {
  body.classList.remove("presentation-page");
  body.classList.remove("bg-gray-200");
});


const selectedSort = ref('createdAt,desc');
const posts = ref([]);

//정렬 기준 변경 메서드
const changeSort = (sortCriteria) => {
  selectedSort.value = sortCriteria;
  fetchPosts();
};

const fetchPosts = async () => {
  try {
    const response = await axios.get("/posts", {
      params: {
        sort: selectedSort.value,
      },
    });
    posts.value = response.data.content;
    console.log(posts.value)
  } catch (error) {
    console.error("게시물을 불러오는데 실패했습니다:", error);
  }
};

onMounted(fetchPosts);

const navigateToDetail = (postId) => {
  router.push({ name: "posts", params: { postId } });
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
const handlePostClick = async (postId) => {
  navigateToDetail(postId);
};
</script>