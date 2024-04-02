<template>
  <section>
    <div class="container" style="border: 2px solid #000000">
      <div class="row">
        <div class="col-lg-7 mx-auto d-flex justify-content-center flex-column">
          <form
              role="form"
              id="post-form"
              method="post"
              autocomplete="off"
              @submit.prevent="submitForm"
          >
            <div class="card-body py-3">
              <h3 class="text-dark" style="margin-bottom: 50px">게시글 수정</h3>
              <div class="row">
                <div class="col-md-6">
                  <h6>게시글 제목</h6>
                  <MaterialInput
                      v-model="formData.title"
                      class="input-group-dynamic"
                      id="title"
                      style="
                      border: 2px solid #000000;
                      width: 100%;
                      max-width: 400px;
                    "
                      :value="formData.title"
                      @input="formData.title = $event.target.value"
                  />
                </div>
              </div>
              <div class="row">
                <div class="mb-4 col-md-6">
                  <h6>가격</h6>
                  <MaterialInput
                      v-model="formData.price"
                      class="input-group-dynamic"
                      id="price"
                      style="
                      border: 2px solid #000000;
                      width: 100%;
                      max-width: 400px;
                    "
                      :value="formData.price"
                      @input="formData.price = $event.target.value"
                  />
                </div>
                <div class="row">
                  <div class="col-md-6">
                    <h6>이미지 선택</h6>
                    <input type="file" accept="image/*" @change="handleFileUpload">
                  </div>
                </div>
                <div class="mb-4 col-md-6">
                  <h6>카테고리</h6>
                  <select
                      v-model="formData.category"
                      class="form-select"
                      aria-label="카테고리 선택"
                  >
                    <option disabled value="">카테고리 선택</option>
                    <option
                        v-for="category in categories"
                        :key="category.value"
                        :value="category.value"
                    >
                      {{ category.label }}
                    </option>
                  </select>
                </div>
              </div>
              <!-- 제품 설명 입력란 -->
              <div class="mb-4 col-md-6">
                <h6>제품 설명</h6>
                <MaterialTextArea
                    v-model="formData.content"
                    class="input-group-static mb-4"
                    id="content"
                    style="
                    border: 2px solid #000000;
                    width: 100%;
                    max-width: 400px;
                  "
                    :rows="10"
                    :value="formData.content"
                    @input="formData.content = $event.target.value"
                />
              </div>
              <!-- 여기까지 -->
              <div class="row">
                <div class="col-md-12">
                  <section>
                    <div class="">
                      <div class="row">
                        <div class="col">
                          <div class="text-center">
                            <!-- 취소 버튼 -->
                            <button @click="cancelEdit">
                              <MaterialButton
                                  variant="gradient"
                                  color="secondary"
                              >
                                취소
                              </MaterialButton>
                            </button>
                            <!-- 수정 버튼 -->
                            <button type="submit">
                              <MaterialButton variant="gradient" color="dark">
                                수정
                              </MaterialButton>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import {onMounted, ref} from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import setMaterialInput from "@/assets/js/material-input";
import MaterialButton from "@/components/MaterialButton.vue";
import MaterialInput from "@/components/MaterialInput.vue";
import MaterialTextArea from "@/components/MaterialTextArea.vue";

const categories = [
  { value: "BEAUTY", label: "뷰티" },
  { value: "FASHION", label: "의류" },
  { value: "KITCHEN", label: "주방" },
  { value: "BOOK", label: "책" },
  { value: "CHILDCARE", label: "육아" },
  { value: "INTERIOR", label: "인테리어" },
  { value: "GAME", label: "게임" },
  { value: "CAR_SUPPLIES", label: "자동차 용품" },
  { value: "FOOD", label: "음식" },
  { value: "SPORTS", label: "스포츠" },
  { value: "DIGITAL", label: "디지털" },
  { value: "PET", label: "반려동물" },
  { value: "OTHERS", label: "기타" },
];

setMaterialInput();

const router = useRouter();

const postId = JSON.parse(localStorage.getItem("post")).id;

// 폼 데이터를 초기화합니다.
const formData = ref({
  title: "",
  content: "",
  price: null,
  category: "",
  imageUrl: ""
});

// 게시글 정보를 가져오는 함수
const fetchPostData = async () => {
  try {
    const response = await axios.get(`/posts/${postId}`);
    const postData = response.data;
    // 기존 이미지 URL을 폼 데이터에 설정합니다.
    formData.title = postData.title;
    formData.content = postData.content;
    formData.price = postData.price;
    formData.category = postData.category;
    formData.imageUrl = postData.imageUrl;
  } catch (error) {
    console.error("게시글 정보를 불러오는 데 실패했습니다:", error);
  }
};

// 수정 폼으로 이동할 때 게시글 정보를 가져옵니다.
onMounted(fetchPostData);

const submitForm = async () => {
  try {
    const token = localStorage.getItem("token");
    // console.log("token:", token);
    if (!token) {
      // 토큰이 없으면 로그인 페이지로 리디렉션
      await router.push("/login");
      return;
    }
    // 게시글 수정 요청 보내기
    const postData = {
      title: formData.value.title,
      content: formData.value.content,
      price: formData.value.price,
      category: formData.value.category,
      imageUrl: formData.value.imageUrl
    };
    const postId = JSON.parse(localStorage.getItem("post")).id;
    // console.log("postID", postId);
    // Axios를 사용하여 API 호출
    const response = await axios.put(`/posts/${postId}`, postData);
    response.data.id = postId;
    // 성공적으로 수정되면 게시글 페이지로 리디렉션
    await router.push(`/posts/${postId}`);
  } catch (error) {
    console.error("게시글 수정 실패:", error);
  }
};

const cancelEdit = () => {
  router.back(); // 이전 페이지로 이동
};

const handleFileUpload = async (event) => {
  try {
    const presignedUrlResponse = await axios.get('/images/posts', {
      params: {
        fileName: event.target.files[0].name,
      },
    });
    const presignedUrl = presignedUrlResponse.data;

    await uploadImage(presignedUrl, event.target.files[0]);
    console.log('이미지 업로드 완료');
    formData.value.imageUrl = presignedUrl.split('?')[0]; // pre-signed URL에서 쿼리 부분을 제외한 URL을 추출합니다.
  } catch (error) {
    console.error('이미지 업로드 및 URL 저장 실패:', error);
  }
};

// 이미지 PUT요청
const uploadImage = async (presignedUrl, file) => {
  try {
    console.log('presignedUrl, file:', presignedUrl, file)
    const response = await fetch(presignedUrl, {
      method: 'PUT', // 사전 서명된 URL에 대한 HTTP 메소드는 PUT입니다.
      headers: {
        'Content-Type': 'multipart/form-data' // 필요한 경우에만 Content-Type 지정
      },
      body: file, // 파일 데이터를 직접 바디에 포함
      mode: 'cors'
    })
    console.log('이미지 업로드 성공:', response);
  } catch (error) {
    console.error('이미지 업로드 실패:', error);
    throw error;
  }
};
</script>

<style scoped>
.container {
  border: 2px solid #000; /* 하단에 선을 생성 */
  max-width: 1200px;
}

.card-body {
  border: 2px solid #000000;
}

.image-preview-container {
  margin-top: 20px; /* 이미지 미리보기와의 간격 조절 */
}

.image-preview {
  max-width: 200px;
  max-height: 200px;
}
</style>
