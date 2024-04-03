<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import NavbarDefault from "../..//examples/navbars/NavbarDefault.vue";

const router = useRouter();
const body = document.getElementsByTagName("body")[0];
onMounted(() => {
  body.classList.add("presentation-page");
});
onUnmounted(() => {
  body.classList.remove("presentation-page");
});
import setNavPills from "@/assets/js/nav-pills.js";
onMounted(() => {
  setNavPills();
});

const posts = ref([]);

const useMemberId = () => {
  const route = useRoute();
  const memberId = route.params.memberId;

  // if (memberId) {
  //   console.log("Current memberId:", memberId);
  // } else {
  //   console.error("MemberId not found in current route.");
  // }
  return memberId;
};

onMounted(() => {
  fetchPostsBymemberId();
});

const fetchPostsBymemberId = async () => {
  const memberId = useMemberId(); // useMemberId 함수를 setup 함수 내에서 호출
  try {
    const response = await axios.get(`/members/${memberId}/profile/posts`);
    // console.log("Member ID:", memberId);
    posts.value = response.data;
    // console.log("posts:", posts.value); // 게시글 목록 출력
  } catch (error) {
    console.error("게시글을 가져오는 도중 에러가 발생했습니다.", error);
  }
};
onMounted(fetchPostsBymemberId);
const memberId = router.currentRoute.value.params.memberId;
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
onMounted(() => {
  setNavPills();
});
onMounted(() => {
  fetchPostsBymemberId();
});
const displayRating = (rating) => {
  switch (rating) {
    case 0:
      return "☆☆☆☆☆";
    case 1:
      return "⭐☆☆☆☆";
    case 2:
      return "⭐⭐☆☆☆";
    case 3:
      return "⭐⭐⭐☆☆";
    case 4:
      return "⭐⭐⭐⭐☆";
    case 5:
      return "⭐⭐⭐⭐⭐";
    default:
      return "";
  }
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
  <div class="mysales-container" style="text-align: center">
    <h2>닉네임 : {{ posts.nickname }}</h2>
    <h2>평점 : {{ displayRating(Math.round(posts.rating)) }}</h2>
    <h5>
      <RouterLink :to="{ path: `/review/${memberId}` }"> 리뷰 보기 </RouterLink>
    </h5>
    <div v-if="posts.length === 0">
      <div class="col-12 text-center">
        <p>작성한 게시글이 없습니다.</p>
      </div>
    </div>
    <div v-else>
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-8">
            <div class="card-columns">
              <div
                v-for="p in posts.post"
                :key="p.id"
                class="card shadow-sm mb-4"
                @click="handlePostClick(p.id)"
              >
                <div class="card-body">
                  <h5 class="card-title">{{ p.title }}</h5>
                  <p class="card-text">작성자: {{ p.createdName }}</p>
                  <p class="card-text">작성일: {{ formatDate(p.createdAt) }}</p>
                  <p class="card-text">조회수: {{ p.view }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
