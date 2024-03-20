<script setup>
import { onMounted } from "vue";

// example components
import Header from "@/examples/Header.vue";

//Vue Material Kit 2 components
import MaterialInput from "@/components/MaterialInput.vue";
import MaterialButton from "@/components/MaterialButton.vue";

// material-input
import setMaterialInput from "@/assets/js/material-input";
import ModalW from "@/views/Presentation/Components/ModalW.vue";
onMounted(() => {
  setMaterialInput();
});
</script>
<template>
  <Header>
    <div
      class="page-header align-items-start min-vh-65"
      :style="{
        backgroundImage:
          'url(https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80)',
      }"
      loading="lazy"
    >
      <span class="mask bg-gradient-dark opacity-6"></span>
      <div class="container my-auto">
        <div class="row">
          <div class="col-lg-4 col-md-8 col-12 mx-auto">
            <div class="card z-index-0 fadeIn3 fadeInBottom">
              <div
                class="card-header p-0 position-relative mt-n4 mx-3 z-index-2"
              >
                <div
                  class="bg-gradient-success shadow-success border-radius-lg py-3 pe-1"
                >
                  <h4
                    class="text-white font-weight-bolder text-center mt-2 mb-0"
                  >
                    출금할 금액을 입력하세요.
                  </h4>
                </div>
              </div>
              <div class="card-body">
                <form role="form" class="text-start">
                  <MaterialInput
                    id="출금액"
                    class="input-group-outline my-3"
                    :label="{ text: '숫자만 입력 하세요.', class: 'form-label' }"
                    type="출금액"
                  />
                  현재 잔액 : 0,000원
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ModalW></ModalW>
  </Header>
</template>
