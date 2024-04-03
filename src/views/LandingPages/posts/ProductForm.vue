<template>
  <div class="container position-sticky z-index-sticky top-0">
    <div class="row">
      <div class="col-12">
        <NavbarDefault :sticky="true" />
      </div>
    </div>
  </div>
  <section>
    <!-- 상품 정보 표시 -->
    <div class="container py-3" style="width: 60%">
      <div class="post-header text-center mb-5">
        <div class="post-title">
          <h4>상품명: {{ post.title }}</h4>
        </div>
        <div class="post-author">
          <h4>
            작성자:
            <router-link :to="{ path: `/othersales/${post.memberId}` }">{{
                post.createdName
              }}</router-link>
          </h4>
        </div>
      </div>
    </div>
    <div class="container py-3" >
      <div class="card card-body blur shadow-blur" >
        <div class="product-details">
          <div style="text-align: center;">
            <img :src="post.imageUrl" :style="{ width: '60%' }" alt="Image" />
          </div>
          <div style="margin-top: 20px; width: 580px; text-align: center">
            <p style="font-weight: bold">가격: {{ post.price }}원</p>
          </div>
        </div>
        <h6 style="margin-top: 20px; width: 460px; text-align: center">
          내용:
        </h6>
        <div style="text-align: center;%">
          <MaterialTextArea
            style="
              text-align: left;
              display: inline-block;
              font-weight: bold;
              border: 2px solid #000000;
              width: 60%;
            "
          >
            {{ post.content }}
          </MaterialTextArea>
        </div>
      </div>
      <!-- 게시글 수정, 찜하기 -->
      <div style="margin-top: 20px; display: flex; justify-content: space-between; align-items: center;">
        <router-link :to="{ name: 'presentation' }">
          <MaterialButton variant="gradient" color="secondary">목록</MaterialButton>
        </router-link>
        <div>
          <router-link v-if="parseInt(userId) === parseInt(postAuthorId)" :to="{ name: 'postedit', params: { postId: post.id } }">
            <material-button variant="gradient" color="secondary">수정</material-button>
          </router-link>
          <material-button @click="deletePost" variant="gradient" color="danger" style="margin-left: 10px;" v-if="parseInt(userId) === parseInt(postAuthorId)">삭제</material-button>
        </div>
        <!-- 구매하기 버튼 -->
        <!-- 게시글 작성자는 구매하기 버튼을 볼 수 없게 표시 -->
        <div v-if="parseInt(userId) !== parseInt(postAuthorId) && !post.isSoldout"
        >
          <!--        <div v-else-if="post.isSoldout = false">-->
          <material-button
            variant="gradient"
            color="primary"
            @click="handlePurchaseSubmission">구매하기</material-button
          >
        </div>
      </div>
      <!-- 게시글 찜 버튼 -->
      <div v-if="token && !post.isSoldout" class="d-flex align-items-center">
        <img
          v-if="!post.isLiked"
          src="https://velog.velcdn.com/images/codekmj/post/6dbd31d7-e8f7-4e74-a756-4b5ab722591f/image.png"
          alt="빈 하트"
          @click="toggleLike"
          class="heart-icon mr-1"
        />
        <img
          v-else
          src="https://velog.velcdn.com/images/codekmj/post/4bbae38a-1ca5-4f6b-add4-7ead3cd70d71/image.jpg"
          alt="꽉 찬 하트"
          @click="toggleLike"
          class="heart-icon mr-1"
        />
      </div>
      <!-- 댓글 작성칸 -->
      <div class="comment-form mb-5" style="margin-top: 20px">
        <div class="input-group">
          <material-input
            v-model="newComment"
            class="material-input mb-3"
            placeholder="댓글을 입력하세요..."
            style="border: 2px solid #000000"
            :value="newComment"
            @input="newComment = $event.target.value"
          ></material-input>
          <material-button
            @click="handleCommentSubmission"
            variant="gradient"
            color="dark"
            >댓글 등록</material-button
          >
        </div>
      </div>
      <!-- 댓글 내용 -->
      <h5>전체 댓글</h5>
      <div class="comments mb-5" style="border: 2px solid #000000">
        <div
          class="comment mb-3"
          v-if="post.comment && post.comment.length === 0"
        >
          <p>댓글이 없습니다.</p>
        </div>
        <div
          class="comment mb-3"
          v-for="(comment, index) in post.comment"
          :key="index"
          style="display: flex; align-items: center; margin-top: 20px"
        >
          <div style="flex: 1; border: 2px solid #000000; margin-left: 10px">
            <h6>{{ comment.createdName }}</h6>
            <p v-if="!comment.editMode">{{ comment.content }}</p>
            <textarea
              v-else
              v-model="comment.newContent"
              style="width: 100%; height: 100px"
            ></textarea>
          </div>
          <div class="p-md-2" v-if="comment.memberId == userId">
            <material-button
              v-if="!comment.editMode"
              @click="toggleEditMode(comment)"
              variant="text"
              color="secondary"
              style="margin-right: 8px"
              >수정</material-button
            >
            <material-button
              v-else
              @click="updateComment(comment)"
              variant="text"
              color="primary"
              style="margin-right: 8px"
              >저장</material-button
            >
            <material-button
              @click="deleteComment(comment)"
              variant="text"
              color="danger"
              >삭제</material-button
            >
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import MaterialButton from "@/components/MaterialButton.vue";
import axios from "axios";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import MaterialInput from "@/components/MaterialInput.vue";
import router from "@/router";
import getUserId from "./getUserId";
import { useStore } from "vuex";
import NavbarDefault from "@/examples/navbars/NavbarDefault.vue";
import MaterialTextArea from "@/components/MaterialTextArea.vue";
const route = useRoute();
const post = ref({
  memberId: 0,
  title: "",
  createdName: "",
  content: "",
  price: 0,
  comment: [], // 이 부분을 추가하여 초기에 빈 배열로 설정
  isLiked: false, // 찜 여부를 나타내는 변수 추가
  isSoldout: Boolean,
});

const token = localStorage.getItem("token");
const userId = ref(null);
const postAuthorId = ref(null);

onMounted(async () => {
  let postId = route.params.postId;

  // 라우트에서 postId를 찾을 수 없다면, 세션 스토리지를 확인합니다.
  if (!postId) {
    const savedPost = JSON.parse(localStorage.getItem("post"));
    if (savedPost) {
      postId = savedPost.id;
    }
  }

  // 유효한 postId가 결정되면, 해당 postId로 게시물 정보를 가져옵니다.
  if (postId) {
    await fetchPost(postId); //<- 여기서 post get 요청 1번 발생
    postAuthorId.value = post.value.memberId;
    userId.value = getUserId();
  } else {
    alert("게시글 ID를 찾을 수 없습니다.");
  }
});

// 서버에서 해당 ID에 해당하는 데이터를 가져오는 함수
const fetchPost = async (postId) => {
  const response = await axios.get(`/posts/${postId}`);
  post.value = response.data;
  // 포스트를 가져온 후 찜 상태를 업데이트
  await updateLikeStatus();
  localStorage.setItem("post", JSON.stringify(post.value));
};

const updateLikeStatus = async () => {
  if (token) {
    const postId = route.params.postId;
    const response = await axios.get(`/posts/${postId}/my/wishlist`);
    const wishData = response.data;
    post.value.isLiked = wishData.id !== -9;
  }
};

const toggleLike = async () => {
  try {
    const postId = route.params.postId;
    if (token) {
      const response = await axios.get(`/posts/${postId}/my/wishlist`);
      const wishData = response.data;
      // wishData가 postId와 일치하는 경우 찜 상태가 이미 존재하므로 찜을 해제해야 함
      if (wishData.id !== -9) {
        await axios.delete(`/posts/${postId}/my/wishlist`);
        post.value.isLiked = false; // 찜 상태를 false로 변경
      } else {
        // wishData가 존재하지 않거나 postId와 일치하지 않는 경우 찜을 추가해야 함
        await axios.post(`/posts/${postId}/my/wishlist`, {});
        post.value.isLiked = true; // 찜 상태를 true로 변경
      }
    }
  } catch (error) {
    if (token) {
      alert("게시글 찜 상태를 변경하는데 실패했습니다", error);
    } else {
      alert("로그인을 해야 이용 하실 수 있습니다", error);
    }
  }
};
// Vuex 스토어 사용
const handlePurchaseSubmission = () => {
  // 로그인 여부 확인
  const isLoggedIn = localStorage.getItem("token") !== null;
  if (isLoggedIn) {
    // 로그인한 경우: 댓글을 등록하는 로직 실행
    purchase();
  } else {
    // 로그인하지 않은 경우: 메시지 표시 및 로그인 화면으로 이동
    alert("로그인 후 이용 가능합니다.");
    router.push("/login"); // 로그인 화면으로 이동
  }
};

const store = useStore();
const purchase = () => {
  store.commit("allowAccess");
  router.push({ path: `/posts/${post.value.id}/purchase` });
};

const deletePost = async () => {
  try {
    const postId = JSON.parse(localStorage.getItem("post")).id;
    const token = localStorage.getItem("token");
    if (!token) {
      await router.push("/login");
      return;
    }
    await axios.delete(`/posts/${postId}`);
    alert("게시글이 삭제되었습니다");
    await router.push("/");
  } catch (error) {
    alert("게시글 삭제에 실패했습니다:", error);
  }
};
const handleCommentSubmission = () => {
  // 로그인 여부 확인
  const isLoggedIn = localStorage.getItem("token") !== null;
  if (isLoggedIn) {
    // 로그인한 경우: 댓글을 등록하는 로직 실행
    addComment();
  } else {
    // 로그인하지 않은 경우: 메시지 표시 및 로그인 화면으로 이동
    alert("로그인 후 이용 가능합니다.");
    router.push("/login"); // 로그인 화면으로 이동
  }
};

const newComment = ref("");

const addComment = async () => {
  try {
    const postId = post.value.id;
    const response = await axios.post(`/posts/${postId}/comments`, {
      content: newComment.value,
    });
    const addedComment = response.data;
    if (!post.value.comment) {
      post.value.comments = [];
    }
    post.value.comment.push(addedComment);
    localStorage.setItem("post", JSON.stringify(post.value));
    alert("댓글이 등록되었습니다");
    await fetchPost(postId);
  } catch (error) {
    alert("댓글을 등록하는데 실패했습니다", error);
  }
};
const toggleEditMode = (comment) => {
  comment.editMode = !comment.editMode;
  // 수정 모드일 때 기존 내용을 임시로 저장
  if (comment.editMode) {
    comment.newContent = comment.content;
  }
};

const updateComment = async (comment) => {
  try {
    const postId = JSON.parse(localStorage.getItem("post")).id;
    const commentId = comment.id;
    const response = await axios.put(`/posts/${postId}/comments/${commentId}`, {
      content: comment.newContent,
    });
    // 서버에서 수정된 댓글을 받아온 후, 해당 댓글 객체를 업데이트합니다.
    const updatedComment = response.data;
    // 수정이 완료되면 수정 모드를 해제합니다.
    alert("댓글이 수정되었습니다", updatedComment);
    comment.editMode = false;
    // 수정이 완료되면 해당 게시물의 정보를 다시 불러와서 최신 정보를 반영합니다.
    await fetchPost(postId);
  } catch (error) {
    alert("댓글을 수정하는데 실패했습니다", error);
  }
};

const deleteComment = async (comment) => {
  try {
    // 서버에서 댓글을 삭제합니다.
    const postId = JSON.parse(localStorage.getItem("post")).id;
    const commentId = comment.id;
    const response = await axios.delete(
      `/posts/${postId}/comments/${commentId}`
    );
    // 삭제된 댓글을 post.value.comment 배열에서 제거합니다.
    const deleteComment = response.data;
    alert("댓글이 삭제되었습니다", deleteComment);
    await fetchPost(postId);
  } catch (error) {
    alert("댓글을 삭제하는데 실패했습니다", error);
  }
};
</script>

<style>
.post-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 2px solid #000000;
}

.text-center {
  text-align: center;
}

.mb-5 {
  margin-bottom: 3rem;
}

.post-title,
.post-author {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.post-title {
  text-align: left;
  margin-left: 20px;
}

.post-author {
  text-align: right;
  margin-right: 20px;
}

.product-info {
  display: flex;
  text-align: center;
  align-items: center;
  gap: 20px;
  background-color: #e2e2e2;
}

.product-details {
  flex-grow: 1;
}

// 댓글 스타일
.comment-form {
  display: flex;
  flex-direction: column;
}

.input-group {
  display: flex;
  align-items: center;
}

.material-input {
  flex: 1;
  max-width: calc(100% - 120px);
  margin-right: 8px;
}

material-button {
  flex-shrink: 0;
}
</style>
