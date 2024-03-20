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

// useRouter 훅을 사용하여 라우터 인스턴스를 가져옵니다.
const router = useRouter();
// const submitForm = async () => {
//   try {
//     const postData = new FormData();
//     postData.append('name', formData.value.name);
//     postData.append('description', formData.value.description);
//     postData.append('price', formData.value.price);
//     if (formData.value.image) {
//       postData.append('image', formData.value.image);
//     }
//
//     // 서버로 폼 데이터를 전송합니다. Content-Type은 자동으로 설정됩니다.
//     await axios.post("/posts", postData);
//
//     // 성공적으로 등록되면 /posts로 리디렉션합니다.
//     router.push("/posts");
//   } catch (error) {
//     console.error("상품 등록 실패:", error);
//   }
// };

const submitForm = () => {
  // formData를 JSON 문자열로 변환
  const formDataJson = JSON.stringify({
    name: formData.value.name,
    description: formData.value.description,
    price: formData.value.price,
    // 이미지는 파일 그 자체를 localStorage에 저장할 수 없으므로 제외
  });

  // localStorage에 저장. 여기서는 'postsData'라는 키를 사용
  localStorage.setItem("postsData", formDataJson);

  // 저장 후 사용자에게 알림. 실제 애플리케이션에서는 사용자 친화적인 방식으로 변경 가능
  alert("글이 임시 저장되었습니다.");

  // 이후 필요한 로직 추가. 예를 들어, 홈페이지로 리디렉션
  router.push("/posts");
};
</script>
<template>
  <section>
    <div class="container py-7">
      <div class="row">
        <div class="col-lg-7 mx-auto d-flex justify-content-center flex-column">
          <h3 class="text-dark">게시글 제목</h3>
          <form role="form" id="contact-form" method="post" autocomplete="off">
            <div class="card-body">
              <div class="row">
                <div class="col-md-6">
                </div>
                <div id="app">
                  <input type="file" @change="handleFileUpload" accept="image/*">
                  <div v-if="imageSrc">
                    <img :src="imageSrc" alt="Image preview" style="max-width: 200px; max-height: 200px;">
                  </div>
                </div>
              </div>
              <div class="mb-4">
                <MaterialInput
                  class="input-group-dynamic"
                  id="price"
                  placeholder="가격"
                />
              </div>
              <MaterialTextArea
                class="input-group-static mb-4"
                id="message"
                :rows="10"
                placeholder="제품 설명"
              />
              >
            </div>
            <div class="row">
              <div class="col-md-12">
<!--                <MaterialSwitch-->
<!--                  class="mb-4 d-flex align-items-center"-->
<!--                  id="flexSwitchCheckDefault"-->
<!--                  checked-->
<!--                  labelClass="ms-3 mb-0"-->
<!--                >-->
<!--                  I agree to the-->
<!--                  <a href="javascript:;" class="text-dark"-->
<!--                    ><u>Terms and Conditions</u></a-->
<!--                  >.-->
<!--                </MaterialSwitch>-->

                <section>
                  <div class="container">
                    <div class="row">
                      <div class="col">
                        <form @submit.prevent="submitForm">
                          <div class="text-center">
                            <!-- 목록으로 이동하는 버튼 -->
                            <router-link to="/" class="no-style-link">
                              <MaterialButton variant="gradient" color="secondary">
                                목록
                              </MaterialButton>
                            </router-link>
                            <!-- 등록 버튼 -->
                            <MaterialButton type="submit" variant="gradient" color="dark">
                              등록
                            </MaterialButton>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
