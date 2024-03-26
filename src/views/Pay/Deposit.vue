<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-4 col-md-8 col-12 mx-auto">
        <div class="card z-index-0 fadeIn3 fadeInBottom mt-8">
          <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
            <div class="bg-gradient-success shadow-success border-radius-lg py-3 pe-1">
              <h4 class="text-white font-weight-bolder text-center mt-2 mb-0">
                입금할 금액을 입력하세요
              </h4>
            </div>
          </div>
          <div class="card-body d-flex justify-content-center align-items-center" >
            <form role="form" class="text-start" style="width: 400px;" autocomplete="off" @submit.prevent="submitForm">
              <div class="text-center mt-2"> <!-- 현재 잔액을 가운데 정렬하기 위한 부분 -->
                <h4>현재 잔액 : {{ accountBalance }}원</h4>
              </div>
              <MaterialInput
                  id="deposit"
                  v-model="formData.money"
                  :value="formData.money"
                  @input="formData.money = $event.target.value"
                  class="input-group-outline my-4"
                  :label="{
                  text: '충전 금액',
                  class: 'form-label',
                }"
                  type="number"
              >
              </MaterialInput>
              <div class="text-center">
                <MaterialButton
                    variant="gradient"
                    color="success"
                    style="margin-top: 12px;"
                    type="submit"
                >
                  입금
                </MaterialButton>

                <router-link to="/four-t-pay">
                  <material-button
                      variant="gradient"
                      color="danger"
                      style="margin-left: 10px; margin-top: 12px;">
                    취소
                  </material-button>
                </router-link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
<!--  <ModalD></ModalD>-->
</template>

<script setup>
import {onMounted, ref} from 'vue';
import {useRouter} from "vue-router";
import axios from 'axios';
import MaterialButton from '@/components/MaterialButton.vue';
import MaterialInput from "@/components/MaterialInput.vue";
import { getAccountBalance } from "@/views/Pay/getAccountBalance";
import setMaterialInput from "@/assets/js/material-input";

onMounted(() => {
  setMaterialInput();
});

const formData = ref({ money: '' });
const { accountBalance } = getAccountBalance();

const router = useRouter();

const submitForm = async () => {
  const token = sessionStorage.getItem("token");
  if (!token) {
    alert("로그인 정보가 만료되었습니다. 다시 로그인을 해주세요.");
    await router.push("/login");
    return;
  }

  if(!formData.value.money || Number(formData.value.money) <= 0){
    alert("올바른 값을 입력해주세요.")
    return;
  }

  try {
    await axios.patch(`/members/my/accounts/deposit`, null, {
      params: { money: Number(formData.value.money) },
      headers: {
        Authorization: `${token}`
      },
    });
    alert("입금이 완료되었습니다.");
    await router.push("/four-t-pay");
  } catch (error) {
    console.error("입금 실패:", error);
    alert("입금 처리 중 오류가 발생했습니다.");
  }
};
</script>