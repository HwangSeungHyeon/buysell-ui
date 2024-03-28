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
    <div class="row justify-content-center">
      <div class="col-lg-10">
        <div class="row">
          <div
            v-if="posts.length > 0"
            v-for="post in posts"
            :key="post.id"
            class="col-md-3 mb-4"
            @click="handlePostClick(post.id)"
          >
            <div class="card shadow-sm mt-3">
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
          <div v-else class="col text-center">
            <div class="alert mt-5" role="alert" style="font-size: 24px;">
              검색 결과가 없습니다. 다른 키워드로 검색해 보세요.
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <DefaultFooter />
</template>

<script setup>
import {ref, onMounted, watch} from "vue";
import axios from "axios";
import { useRoute, useRouter } from 'vue-router';
import NavbarDefault from "../..//examples/navbars/NavbarDefault.vue";
import DefaultFooter from "../../examples/footers/FooterDefault.vue";
import Header from "../../examples/Header.vue";
import vueMkHeader from "@/assets/img/vue-mk-header.jpg";
import moment from "moment/moment";

const route = useRoute();
const router = useRouter();
const keyword = ref(route.query.keyword);

const posts = ref([]);

const fetchPosts = async () => {
  if (!keyword.value) {
    console.error("No keyword provided!");
    posts.value = [];
    return;
  }
  try {
    const response = await axios.get(`/posts/search`, { params: { keyword: keyword.value } });
    posts.value = response.data.content;
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
};

onMounted(fetchPosts);

watch(() => route.query.keyword, (newKeyword) => {
  keyword.value = newKeyword;
  fetchPosts();
});

const formatDate = (dateString) => {
  // return moment(dateString).format("YYYY-MM-DD");
  return moment(dateString).fromNow();
};

const navigateToDetail = (postId) => {
  router.push({ name: "posts", params: { postId } });
};

const handlePostClick = async (postId) => {
  navigateToDetail(postId);
};
</script>