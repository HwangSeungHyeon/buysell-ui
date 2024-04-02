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
              <div class="card-img-top-container">
                <img :src="post.imageUrl" class="card-img-top" alt="게시글 이미지">
              </div>
              <div class="card-body">
                <p class="card-title text-center" style="font-weight: bold; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                  {{ post.title }}
                </p>
                <div class="row">
                  <div class="col-12">
                    <div class="d-flex justify-content-center">
<!--                      <p class="card-text small m-0">작성자: {{ post.createdName }}</p>-->
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
    <div id="observer-target"></div>
  </div>
  <DefaultFooter />
</template>

<script setup>
import { onMounted, onUnmounted, ref, nextTick, watch } from "vue";
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
const page = ref(0);
const observer = ref(null);
const observerTarget = ref(null);
const isLoading = ref(false);

watch(() => route.query.keyword, (newKeyword) => {
  if (newKeyword !== keyword.value) {
    keyword.value = newKeyword;
    resetSearchResults(); // 검색 결과를 리셋하는 함수를 호출합니다.
    fetchPosts(); // 새 키워드로 게시물을 불러옵니다.
  }
});

const resetSearchResults = () => {
  posts.value = []; // 게시물 목록을 초기화합니다.
  page.value = 0; // 페이지 번호를 초기화합니다.
  isLoading.value = false; // 로딩 상태를 초기화합니다.
};

const fetchPosts = async () => {
  if (!keyword.value || isLoading.value) {
    return; // 키워드가 없거나 로딩 중이라면 함수를 종료합니다.
  }

  isLoading.value = true;

  try {
    const response = await axios.get("/posts/search", {
      params: {
        keyword: keyword.value,
        page: page.value,
        size: 12,
      },
    });

    // 첫 페이지인 경우 현재 게시물로 대체, 그렇지 않은 경우 추가
    if (page.value === 0) {
      posts.value = response.data.content;
    } else {
      posts.value.push(...response.data.content);
    }

    page.value++;
    isLoading.value = false;
  } catch (error) {
    console.error('Error fetching posts:', error);
    isLoading.value = false;
  }
};

const loadMore = async () => {
  fetchPosts();
}

onMounted(async () => {
  await nextTick(); // DOM 업데이트 대기
  observerTarget.value = document.getElementById('observer-target');
  initIntersectionObserver();
});

const initIntersectionObserver = () => {
  observer.value = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        loadMore();
      }
    });
  }, {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  });

  if (observerTarget.value) {
    observer.value.observe(observerTarget.value);
  }
};

onUnmounted(() => {
  if (observer.value) {
    observer.value.disconnect();
  }
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

<style scoped>
.card-img-top-container {
  width: 100%;
  height: 0;
  padding-top: 100%; /* 비율 기반 높이 설정 */
  position: relative; /* 이미지를 절대 위치로 배치하기 위함 */
}

.card-img-top {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>