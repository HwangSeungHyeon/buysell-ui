<template>
  <div class="container position-sticky z-index-sticky top-0">
    <div class="row">
      <div class="col-12">
        <NavbarDefault :sticky="true" />
      </div>
    </div>
  </div>
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-4 col-md-8 col-12 mx-auto">
        <div class="card z-index-0 fadeIn3 fadeInBottom mt-8">
          <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
            <div class="bg-gradient-success shadow-success border-radius-lg py-3 pe-1">
              <h4 class="text-white font-weight-bolder text-center mt-2 mb-0">
                출금할 금액을 입력하세요
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
                  text: '출금 금액',
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
                  출금
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
import MaterialButton from '@/components/MaterialButton.vue';
import MaterialInput from "@/components/MaterialInput.vue";
import { getAccountBalance } from "@/views/Pay/getAccountBalance";
import { withDraw } from "@/views/Pay/withDraw";
import NavbarDefault from "@/examples/navbars/NavbarDefault.vue";

const { accountBalance } = getAccountBalance();
const { formData, submitForm } = withDraw();
</script>