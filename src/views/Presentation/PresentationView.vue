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
<!--            <p class="lead text-white px-5 mt-3" :style="{ fontWeight: '500' }">-->
<!--              버리지마세요. 필요한 사람을 찾아보세요. 지금.-->
<!--            </p>-->
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
                :class="{ active: selectedSort === 'createdAt,desc' }"
                data-bs-toggle="tab"
                href="#"
                role="tab"
                aria-controls="profile"
                aria-selected="true"
                @click.prevent="changeSort('createdAt,desc')"
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
            <div class="card shadow-sm" :class="{ 'sold-out': post.isSoldOut }">
              <div class="card-img-top-container">
                <img :src="post.imageUrl" class="card-img-top" alt="게시글 이미지">
                <div v-if="post.isSoldOut" class="overlay-text">판매완료</div>
              </div>
              <div class="card-body">
                <p class="card-title text-center" style="font-weight: bold; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                  {{ post.title }}
                </p>
                <div class="row">
<!--                  <div class="col-12">-->
<!--                    <div class="d-flex justify-content-center">-->
<!--                      <p class="card-text small m-0">{{ post.createdName }}</p>-->
<!--                    </div>-->
<!--                  </div>-->
                  <div class="col-12">
                    <div class="d-flex justify-content-center">
                      <p class="card-text m-0">{{ Number(post.price).toLocaleString() }}원</p>
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="d-flex justify-content-between">
                      <p class="card-text small m-0">조회수 {{ post.view }}</p>
                      <p class="card-text small m-0">{{ formatDate(post.createdAt) }}</p>
                    </div>
                  </div>
                </div>
              </div>
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
import {onMounted, onUnmounted, ref, nextTick, watch} from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import NavbarDefault from "../..//examples/navbars/NavbarDefault.vue";
import DefaultFooter from "../../examples/footers/FooterDefault.vue";
import Header from "../../examples/Header.vue";
import vueMkHeader from "@/assets/img/vue-mk-header.jpg";
import setNavPills from "@/assets/js/nav-pills.js";
import moment from "moment";

const router = useRouter();
const body = document.getElementsByTagName("body")[0];

const category = ref(null);
const selectedSort = ref("createdAt,desc");
const posts = ref([]);
const page = ref(0);
const observer = ref(null);
const observerTarget = ref(null);

const initIntersectionObserver = () => {
  // 기존 Observer가 있으면 해제
  if (observer.value) {
    observer.value.disconnect();
  }

  // 새 Observer 인스턴스 생성
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

  // 새 Observer로 target 관찰 시작
  if (observerTarget.value) {
    observer.value.observe(observerTarget.value);
  }
};

//정렬 기준 변경 메서드
// changeSort 함수 내에서 Observer 재초기화
const changeSort = (sortCriteria) => {
  if (selectedSort.value !== sortCriteria) {
    selectedSort.value = sortCriteria;
    posts.value = [];
    page.value = 0;
    nextTick(() => {
      fetchPosts(); // 데이터를 새로 불러온 후
      initIntersectionObserver(); // Observer를 재초기화
    });
  }
};

const fetchPosts = async (reset = false) => {
  if (reset) {
    posts.value = [];
    page.value = 0;
  }

  try {
    const response = await axios.get("/posts", {
      params: {
        category: category.value,
        page: page.value,
        size: 12,
        sort: selectedSort.value
      },
    });

    // 중복 검사 로직을 추가할 수 있습니다.
    // 예: 새로 불러온 게시글이 이미 posts.value에 있는지 검사하고, 없는 경우에만 추가합니다.
    const newPosts = response.data.content.filter(
        newPost => !posts.value.some(existingPost => existingPost.id === newPost.id)
    );

    if (page.value === 0) {
      posts.value = newPosts;
    } else {
      posts.value.push(...newPosts);
    }

    // 데이터 로딩 성공 후 페이지 번호 증가
    if (newPosts.length > 0) {
      page.value++;
    }
  } catch (error) {
    console.error("게시물을 불러오는데 실패했습니다:", error);
  }
};

watch(() => router.currentRoute.value.query, (query) => {
  category.value = query.category || null;
  fetchPosts(true); // 카테고리 변경 시 게시물 목록을 리셋하고 새로운 데이터를 불러옵니다.
}, { immediate: true });

onMounted(async () => {
  body.classList.add("presentation-page");
  setNavPills();
  await nextTick(); // DOM 업데이트 대기
  observerTarget.value = document.getElementById('observer-target');
  initIntersectionObserver();
  if (router.currentRoute.value.query.category) {
    category.value = router.currentRoute.value.query.category;
  }
});

onUnmounted(() => {
  body.classList.remove("presentation-page");
  if (observer.value) {
    observer.value.disconnect();
  }
});

const loadMore = async () => {
  if (observer.value) {
    fetchPosts();
  }
};

const navigateToDetail = (postId) => {
  router.push({ name: "posts", params: { postId } });
};

const formatDate = (dateString) => {
  return moment(dateString).fromNow();
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

.card-img-top-container::after {
  content: "";
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* 반투명 회색 오버레이 */
  opacity: 0; /* 기본 상태에서는 보이지 않음 */
}

.sold-out {
  background-color: #cccccc; /* 회색 배경 */
  color: #ffffff; /* 흰색 텍스트 */
}

.sold-out .card-img-top-container::after {
  opacity: 1; /* sold-out 클래스가 있을 때만 오버레이 표시 */
}

.overlay-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #ffffff;
  font-size: 24px;
  font-weight: bold;
}
</style>