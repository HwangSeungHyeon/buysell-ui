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
        <div class="nav-wrapper position-relative end-0 mb-3 mt-3">
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
      <div class="col-lg-10">
        <div class="row">
          <div v-for="post in posts" :key="post.id" class="col-md-3 mb-4" @click="handlePostClick(post.id)">
            <div class="card shadow-sm">
              <img :src="post.imgUrl" class="card-img-top" alt="게시글 이미지 넣는곳">
              <div class="card-body">
                <p class="card-title text-center" style="font-weight: bold; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                  {{ post.title }}
                </p>
                <div class="row">
                  <div class="col-12">
                    <div class="d-flex justify-content-between">
                      <p class="card-text small m-0">작성자: {{ post.createdName }}</p>
                      <p class="card-text m-0">{{ Number(post.price).toLocaleString() }}원</p>
<!--                      <p class="card-text small m-0">{{ formatDate(post.updatedAt) }}</p>-->
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="d-flex justify-content-between">
                      <p class="card-text small m-0">조회수 {{ post.view }}</p>
                      <p class="card-text small m-0">{{ formatDate(post.updatedAt) }}</p>
                    </div>
                  </div>
                </div>
              </div>
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
import moment from "moment";
import "moment/locale/ko"; // 한국어 로케일 import

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

const selectedSort = ref("updatedAt,desc");
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
        sort: selectedSort.value
      },
    });
    posts.value = response.data.content;
  } catch (error) {
    console.error("게시물을 불러오는데 실패했습니다:", error);
  }
};

onMounted(fetchPosts);

const navigateToDetail = (postId) => {
  router.push({ name: "posts", params: { postId } });
};

const formatDate = (dateString) => {
  // return moment(dateString).format("YYYY-MM-DD");
  return moment(dateString).fromNow();
};
const handlePostClick = async (postId) => {
  navigateToDetail(postId);
};
</script>
