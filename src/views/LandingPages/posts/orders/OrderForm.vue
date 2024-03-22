<script setup>
import { onMounted } from "vue";

//Vue Material Kit 2 components
import MaterialInput from "@/components/MaterialInput.vue";
import MaterialTextArea from "@/components/MaterialTextArea.vue";
import MaterialButton from "@/components/MaterialButton.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
//  material-input
import setMaterialInput from "@/assets/js/material-input";
import axios from "axios";

onMounted(() => {
  setMaterialInput();
});

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  formData.value.image = file;

  // 이미지 미리보기를 위한 URL 생성
  if (file) {
    formData.value.imageSrc = URL.createObjectURL(file);
  }
};
// 폼 데이터를 위한 반응형 객체를 생성합니다.
const formData = ref({
  name: "",
  description: "",
  price: "", // 가격 추가
  image: null, // 이미지 파일
});
const router = useRouter();
// useRouter 훅을 사용하여 라우터 인스턴스를 가져옵니다.
const submitForm = async () => {
  try {
    const postData = new FormData();
    postData.append("name", formData.value.name);
    postData.append("description", formData.value.description);
    postData.append("price", formData.value.price);
    if (formData.value.image) {
      postData.append("image", formData.value.image);
    }

    // 서버로 폼 데이터를 전송합니다. Content-Type은 자동으로 설정됩니다.
    await axios.post("/posts", postData);

    // 성공적으로 등록되면 /posts로 리디렉션합니다.
    await router.push("/posts");
  } catch (error) {
    console.error("상품 등록 실패:", error);
  }
};
</script>
<template>
  <section>
    <div class="container" style="border: 2px solid #000000">
      <div class="row">
        <div class="col-lg-7 mx-auto d-flex justify-content-center flex-column">
          <form role="form" id="contact-form" method="post" autocomplete="off">
            <div class="card-body py-3">
              <h3 class="text-dark" style="margin-bottom: 50px">게시글 제목</h3>
              <div class="row">
                <div class="col-md-6">
                </div>
                <div id="app">
                  <input type="file" @change="handleFileUpload" accept="image/*">
                </div>
              </div>
              <!-- 가격 입력란 -->
              <div class="mb-4 col-md-6">
                <h6>가격</h6>
                <MaterialInput
                  class="input-group-dynamic"
                  id="price"
                  style="border: 2px solid #000000; width: 100%; max-width: 400px;"
                />
              </div>
              <!-- 제품 설명 입력란 -->
              <div class="mb-4 col-md-6">
                <h6>제품 설명</h6>
                <MaterialTextArea
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
                          <form @submit.prevent="submitForm">
                            <div class="text-center">
                              <!-- 목록으로 이동하는 버튼 -->
                              <router-link to="/" class="no-style-link" style="margin-right: 20px">
                                <MaterialButton variant="gradient" color="secondary">
                                  목록
                                </MaterialButton>
                              </router-link>
                              <!-- 등록 버튼 -->
                              <router-link to="/posts" class="no-style-link" style="margin-right: 20px">
                                <MaterialButton type="submit" variant="gradient" color="dark">
                                  등록
                                </MaterialButton>
                              </router-link>
                            </div>
                          </form>
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

.card-body{
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