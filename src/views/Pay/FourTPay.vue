<template>
  <div class="container position-sticky z-index-sticky top-0">
    <div class="row">
      <div class="col-12">
        <NavbarDefault :sticky="true" />
      </div>
    </div>
  </div>
  <Header>
    <div
        class="page-header align-items-start min-vh-100"
        :style="{
        backgroundImage:
          'url(https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center center'
      }"
      loading="lazy"
    >
      <span class="mask bg-gradient-dark opacity-6"></span>
      <div class="container my-auto">
        <div class="row mt-n8">
          <div class="col-lg-4 col-md-8 col-12 mx-auto">
            <div class="card z-index-0 fadeIn3 fadeInBottom">
              <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                <div class="bg-gradient-success shadow-success border-radius-lg py-3 pe-1">
                  <h4 class="text-white font-weight-bolder text-center mt-2 mb-0">
                    잔액을 확인하세요.
                  </h4>
                </div>
              </div>
              <div class="card-body">
                <form role="form" class="text-start">
                  <div class="text-center">
                    <h3 class="text-center">현재 잔액 : {{ Number( accountBalance ).toLocaleString() }}원</h3>
                    <router-link to="/deposit">
                      <MaterialButton
                        class="my-4 mb-2"
                        variant="gradient"
                        color="success"
                        fullWidth
                      >
                        입금하기
                      </MaterialButton>
                    </router-link>
                  </div>
                  <div class="text-center">
                    <router-link to="/withdraw">
                      <MaterialButton
                        class="my-4 mb-2"
                        variant="gradient"
                        color="success"
                        fullWidth
                        >출금하기
                      </MaterialButton>
                    </router-link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Header>
</template>
<script setup>
import Header from "@/examples/Header.vue";
import MaterialButton from "@/components/MaterialButton.vue";
import { getAccountBalance } from "@/views/Pay/getAccountBalance";
import NavbarDefault from "@/examples/navbars/NavbarDefault.vue";
const { accountBalance } = getAccountBalance();
</script>