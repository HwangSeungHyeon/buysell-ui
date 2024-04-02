<script setup>
import {ref, onMounted} from "vue";
import {useRouter} from "vue-router";
import axios from "axios";
import setMaterialInput from "@/assets/js/material-input";
import MaterialButton from "@/components/MaterialButton.vue";
import MaterialInput from "@/components/MaterialInput.vue";
import MaterialTextArea from "@/components/MaterialTextArea.vue";
import NavbarDefault from "@/examples/navbars/NavbarDefault.vue";
// 카테고리 목록
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

onMounted(() => {
  setMaterialInput();
});

const formData = ref({
  title: "",
  content: "",
  price: null,
  category: ""
});

const router = useRouter();

const submitForm = async () => {
  try {
    const token = localStorage.getItem("token");
    // console.log("token:", token);
    if (!token) {
      // 토큰이 없으면 로그인 페이지로 리디렉션
      await router.push("/pages/landing-pages/basic");
      return;
    }

    // 게시글 등록 요청 보내기
    const postData = {
      title: formData.value.title,
      content: formData.value.content,
      price: formData.value.price,
      category: formData.value.category,
      imageUrl: imageUrl.value
    };

    await axios.post(`/posts`, postData, {
      headers: {
        Authorization: `${token}`
      },
    });

    // 성공적으로 등록되면 상품 목록 페이지로 리디렉션합니다.
    await router.push("/");
  } catch (error) {
    console.error("게시글 등록 실패:", error);
  }
};
// 이미지 업로드
const imageUrl = ref("");
//presigned url 발급
const handleFileUpload = async (event) => {
  const file = event.target.files[0];
  try {
    const presignedUrlResponse = await axios.get('/images/posts', {
      params: {
        fileName: file.name,
      },
    });
    const presignedUrl = presignedUrlResponse.data;

    await uploadImage(presignedUrl, file);
    // console.log('이미지 업로드 완료');
    imageUrl.value = presignedUrl.split('?')[0]; // pre-signed URL에서 쿼리 부분을 제외한 URL을 추출합니다.
  } catch (error) {
    console.error('이미지 업로드 및 URL 저장 실패:', error);
  }
};

// 이미지 PUT요청
const uploadImage = async (presignedUrl, file) => {
  try {
    //console.log('presignedUrl, file:', presignedUrl, file)
    const response = await fetch(presignedUrl, {
      method: 'PUT', // 사전 서명된 URL에 대한 HTTP 메소드는 PUT입니다.
      headers: {
        'Content-Type': 'multipart/form-data' // 필요한 경우에만 Content-Type 지정
      },
      body: file, // 파일 데이터를 직접 바디에 포함
      mode: 'cors'
    })
    //console.log('이미지 업로드 성공:', response);
  } catch (error) {
    console.error('이미지 업로드 실패:', error);
    throw error;
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
  <section>
    <div class="container" style="border: 2px solid #000000">
      <div class="row">
        <div class="col-lg-7 mx-auto d-flex justify-content-center flex-column">
          <form role="form" id="contact-form" method="post" autocomplete="off" @submit.prevent="submitForm">
            <div class="card-body py-3">
              <h3 class="text-dark" style="margin-bottom: 50px">게시글 제목</h3>
              <div class="row">
                <div class="col-md-6">
                  <h6>게시글 제목</h6>
                  <MaterialInput
                      v-model="formData.title"
                      :value="formData.title"
                      @input="formData.title = $event.target.value"
                      class="input-group-dynamic"
                      id="title"
                      style="
                      border: 2px solid #000000;
                      width: 100%;
                      max-width: 400px;
                    "
                  />
                </div>
                <div class="col-md-6"></div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <h6>이미지 선택</h6>
                  <input type="file" accept="image/*" @change="handleFileUpload">
                </div>
              </div>
              <div class="row">
                <div class="mb-4 col-md-6">
                  <h6>가격</h6>
                  <MaterialInput
                      v-model="formData.price"
                      :value="formData.price"
                      @input="formData.price = $event.target.value"
                      class="input-group-dynamic"
                      id="price"
                      style="
                      border: 2px solid #000000;
                      width: 100%;
                      max-width: 400px;
                    "
                  />
                </div>
                <div class="mb-4 col-md-6">
                  <h6>카테고리</h6>
                  <select v-model="formData.category" class="form-select" aria-label="카테고리 선택">
                    <option disabled value="">카테고리 선택</option>
                    <option v-for="category in categories" :key="category.value" :value="category.value">
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
                    :value="formData.content"
                    @input="formData.content = $event.target.value"
                    class="input-group-static mb-4"
                    id="message"
                    style="
                    border: 2px solid #000000;
                    width: 100%;
                    max-width: 400px;
                    justify-content: right;
                  "
                    :rows="10"
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
                            <!-- 목록으로 이동하는 버튼 -->
                            <button @click="router.push('/')">
                              <MaterialButton variant="gradient" color="secondary">
                                목록
                              </MaterialButton>
                            </button>
                            <!-- 등록 버튼 -->
                            <button type="submit">
                              <MaterialButton variant="gradient" color="dark">
                                등록
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
    <div class="image-preview-container">
      <div v-if="imageSrc" class="image-preview">
        <img :src="imageSrc" alt="Image preview">
      </div>
    </div>
  </section>
</template>


<style scoped>
.container {
  border: 2px solid #000; /* 하단에 선을 생성 */
  max-width: 1200px;
}

.card-body {
  border: 2px solid #000000
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
