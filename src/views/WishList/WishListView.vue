<script>
import axios from "axios";

export default {
  name: "Wishlist",
  data() {
    return {
      wishlist: [],
    };
  },
  mounted() {
    this.fetchWishlist();
  },
  methods: {
    async fetchWishlist() {
      try {
        const response = await axios.get("/members/my/profile/wishlist");
        console.log(response)
        this.wishlist = response.data;
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    },
  },
};
</script>
<template>
  <div class="wishlist-container">
    <h2>My Wishlist</h2>
  </div>
  <div>
    <ul class="wishlist-list">
      <li v-for="item in wishlist" :key="item.id" class="wishlist-item">
        <div class="wishlist-item-content">
          {{ item.title }}
          <p class="item-info">작성자: {{ item.createdName }}</p>
          <p class="item-info">가격: {{ item.price }}</p>
          <img :src="item.image" alt="item image" class="item-image" />
        </div>
      </li>
    </ul>
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
