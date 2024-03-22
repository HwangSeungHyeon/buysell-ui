<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import setMaterialInput from "@/assets/js/material-input";
import MaterialButton from "@/components/MaterialButton.vue";
import MaterialInput from "@/components/MaterialInput.vue";
import MaterialTextArea from "@/components/MaterialTextArea.vue";

// 카테고리 목록
const categories = [
  { value: "OTHERS", label: "기타" },
  { value: "KITCHEN", label: "주방" },
  { value: "BOOK", label: "책" },
  { value: "CHILDCARE", label: "육아" },
  { value: "INTERIOR", label: "인테리어" },
  { value: "GAME", label: "게임" },
  { value: "CAR_SUPPLIES", label: "자동차 용품" },
  { value: "BEAUTY", label: "뷰티" },
  { value: "FOOD", label: "음식" },
  { value: "SPORTS", label: "스포츠" },
  { value: "DIGITAL", label: "디지털" },
  { value: "PET", label: "애완동물" }


  // 추가적인 카테고리들을 필요에 따라 여기에 추가할 수 있습니다.
];

onMounted(() => {
  setMaterialInput();
});

// const handleFileUpload = (event) => {
//   const file = event.target.files[0];
//   formData.value.image = file;
//
//   // 이미지 미리보기를 위한 URL 생성
//   if (file) {
//     formData.value.imgUrls.push(URL.createObjectURL(file));
//   }
// };

const formData = ref({
  title: "",
  content: "",
  price: null,
  category: "" // 카테고리는 별도의 데이터 구조로 가정합니다.
});

const router = useRouter();

const submitForm = async () => {
  try {
    // 이미지가 선택되었는지 확인
    // if (!formData.value.image) {
    //   console.error("이미지를 선택해주세요.");
    //   return; // 이미지가 선택되지 않은 경우 함수 종료
    // }
    //
    // // 이미지 파일을 FormData에 추가
    // const formDataUpload = new FormData();
    // formDataUpload.append("image", formData.value.image);
    //
    // // 서버로 이미지 파일 업로드
    // const response = await axios.post("/upload-image", formDataUpload, {
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //   }
    // });
    //
    // // 업로드된 이미지의 URL을 formData에 추가
    // formData.value.imgUrls.push(response.data.imageUrl);

    // 상품 데이터를 전송할 때 이미지 URL도 함께 전송
    const postData = {
      title: formData.value.title,
      content: formData.value.content,
      // imgUrls: formData.value.imgUrls,
      price: formData.value.price,
      category: formData.value.category
    };

    // 서버로 상품 데이터를 전송합니다.
    await axios.post("/posts", postData);

    // 성공적으로 등록되면 상품 목록 페이지로 리디렉션합니다.
    await router.push("/products");
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
<!--                <div class="col-md-6">-->
<!--                  <h6>이미지 선택</h6>-->
<!--                  <input type="file" accept="image/*" @change="handleFileUpload">-->
<!--                </div>-->
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


<!--<script setup>-->
<!--import { ref } from "vue";-->
<!--import { useRouter } from "vue-router";-->
<!--import axios from "axios";-->
<!--import MaterialButton from "@/components/MaterialButton.vue";-->
<!--import MaterialTextArea from "@/components/MaterialTextArea.vue";-->
<!--import MaterialInput from "@/components/MaterialInput.vue";-->

<!--const formData = ref({-->
<!--  title: "",-->
<!--  content: "",-->
<!--  price: null,-->
<!--  category: ""-->
<!--});-->

<!--const router = useRouter();-->

<!--const submitForm = async () => {-->
<!--  try {-->
<!--    const postData = {-->
<!--      title: formData.value.title,-->
<!--      content: formData.value.content,-->
<!--      price: formData.value.price,-->
<!--      category: formData.value.category-->
<!--    };-->

<!--    // 서버로 상품 데이터를 전송합니다.-->
<!--    await axios.post("/posts", postData);-->

<!--    // 성공적으로 등록되면 상품 목록 페이지로 리디렉션합니다.-->
<!--    router.push("/products");-->
<!--  } catch (error) {-->
<!--    console.error("상품 등록 실패:", error);-->
<!--  }-->
<!--};-->
<!--</script>-->

<!--<template>-->
<!--  <section>-->
<!--    <div class="container" style="border: 2px solid #000000">-->
<!--      <div class="row">-->
<!--        <div class="col-lg-7 mx-auto d-flex justify-content-center flex-column">-->
<!--          <form role="form" id="contact-form" method="post" autocomplete="off" @submit.prevent="submitForm">-->
<!--            <div class="card-body py-3">-->
<!--              &lt;!&ndash; 제목 입력란 &ndash;&gt;-->
<!--              <div class="mb-4 col-md-6">-->
<!--                <h6>게시글 제목</h6>-->
<!--                <MaterialInput-->
<!--                  v-model="formData.title"-->
<!--                  class="input-group-dynamic"-->
<!--                  id="title"-->
<!--                  style="-->
<!--                    border: 2px solid #000000;-->
<!--                    width: 100%;-->
<!--                    max-width: 400px;-->
<!--                  "-->
<!--                />-->
<!--              </div>-->
<!--              &lt;!&ndash; 가격 입력란 &ndash;&gt;-->
<!--              <div class="mb-4 col-md-6">-->
<!--                <h6>가격</h6>-->
<!--                <MaterialInput-->
<!--                  v-model="formData.price"-->
<!--                  class="input-group-dynamic"-->
<!--                  id="price"-->
<!--                  style="border: 2px solid #000000; width: 100%; max-width: 400px;"-->
<!--                />-->
<!--              </div>-->
<!--              &lt;!&ndash; 제품 설명 입력란 &ndash;&gt;-->
<!--              <div class="mb-4 col-md-6">-->
<!--                <h6>제품 설명</h6>-->
<!--                <MaterialTextArea-->
<!--                  v-model="formData.content"-->
<!--                  class="input-group-static mb-4"-->
<!--                  id="message"-->
<!--                  style="-->
<!--                    border: 2px solid #000000;-->
<!--                    width: 100%;-->
<!--                    max-width: 400px;-->
<!--                    justify-content: right;-->
<!--                  "-->
<!--                  :rows="10"-->
<!--                />-->
<!--              </div>-->
<!--              &lt;!&ndash; 카테고리 입력란 &ndash;&gt;-->
<!--              <div class="mb-4 col-md-6">-->
<!--                &lt;!&ndash; 카테고리 선택 및 입력란 &ndash;&gt;-->
<!--                &lt;!&ndash; 이 부분은 카테고리를 선택하거나 입력하는 컴포넌트를 추가해야 합니다. &ndash;&gt;-->
<!--                <div class="mb-4 col-md-6">-->
<!--                  <h6>카테고리</h6>-->
<!--                  <select v-model="formData.category" class="form-select">-->
<!--                    <option value="electronics">전자제품</option>-->
<!--                    <option value="clothing">의류</option>-->
<!--                    <option value="books">도서</option>-->
<!--                    &lt;!&ndash; 다른 카테고리 옵션들 &ndash;&gt;-->
<!--                  </select>-->
<!--                </div>-->
<!--              </div>-->
<!--              &lt;!&ndash; 등록 버튼 &ndash;&gt;-->
<!--              <div class="row">-->
<!--                <div class="col-md-12">-->
<!--                  <section>-->
<!--                    <div class="">-->
<!--                      <div class="row">-->
<!--                        <div class="col">-->
<!--                          <div class="text-center">-->
<!--                            &lt;!&ndash; 목록으로 이동하는 버튼 &ndash;&gt;-->
<!--                            <button @click="router.push('/')">-->
<!--                              <MaterialButton variant="gradient" color="secondary">-->
<!--                                목록-->
<!--                              </MaterialButton>-->
<!--                            </button>-->
<!--                            &lt;!&ndash; 등록 버튼 &ndash;&gt;-->
<!--                            <button type="submit">-->
<!--                              <MaterialButton variant="gradient" color="dark">-->
<!--                                등록-->
<!--                              </MaterialButton>-->
<!--                            </button>-->
<!--                          </div>-->
<!--                        </div>-->
<!--                      </div>-->
<!--                    </div>-->
<!--                  </section>-->
<!--                </div>-->
<!--              </div>-->
<!--            </div>-->
<!--          </form>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--  </section>-->
<!--</template>-->

<!--<style scoped>-->
<!--.container {-->
<!--  border: 2px solid #000; /* 하단에 선을 생성 */-->
<!--  max-width: 1200px;-->
<!--}-->

<!--.card-body{-->
<!--  border: 2px solid #000000-->
<!--}-->
<!--.card-body {-->
<!--  border: 2px solid #000000;-->
<!--}-->
<!--</style>-->