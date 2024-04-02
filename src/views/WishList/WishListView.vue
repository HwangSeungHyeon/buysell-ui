<script setup>
import axios from "axios";
import { ref, onMounted } from "vue"; // Vue 3의 Composition API에서 ref와 onMounted를 가져옴
import NavbarDefault from "@/examples/navbars/NavbarDefault.vue";

const wishlist = ref([]);

const fetchWishlist = async () => {
  try {
    const response = await axios.get("/members/my/profile/wishlist");
    wishlist.value = response.data;
  } catch (error) {
    console.error("Error fetching wishlist:", error);
  }
};
onMounted(() => {
  fetchWishlist();
});

const navigateToDetail = (postId) => {
  router.push({ name: "posts", params: { postId } });
};
import { useRouter } from "vue-router";
const router = useRouter();

const handlePostClick = async (postId) => {
  navigateToDetail(postId);
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
  <div class="wishlist-container text-center">
    <h2>My Wishlist</h2>
  </div>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-lg-8">
        <div class="card-columns">
          <div
            v-for="p in wishlist"
            :key="p.id"
            class="card shadow-sm mb-4"
            @click="handlePostClick(p.id)"
          >
            <div class="card-body">
              <h5 class="card-title">{{ p.title }}</h5>
              <p class="card-text">작성자: {{ p.createdName }}</p>
              <p class="card-text">가격: {{ p.price }}</p>
              <p class="card-text">조회수: {{ p.view }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.wishlist-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}
.wishlist-list {
  list-style-type: circle;
  padding: 0;
}
.wishlist-item {
  margin-bottom: 20px;
  border: 1px solid #e1a8a8;
  border-radius: 5px;
  padding: 10px;
}
.wishlist-item-content {
  display: flex;
  flex-direction: column;
}
.item-info {
  margin: 5px 0;
}
.item-image {
  max-width: 100%;
  height: auto;
}
</style>
