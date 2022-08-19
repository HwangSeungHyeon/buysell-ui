<script setup>
/*여기가 바로 메인 페이지 입니다!*/
import { onMounted, onUnmounted } from "vue";

//example components
import NavbarDefault from "../..//examples/navbars/NavbarDefault.vue";
import DefaultFooter from "../../examples/footers/FooterDefault.vue";
import Header from "../../examples/Header.vue";

// sections
import PresentationExample from "./Sections/PresentationExample.vue";
import data from "./Sections/Data/designBlocksData";

//images
import vueMkHeader from "@/assets/img/vue-mk-header.jpg";
import { RouterLink } from "vue-router";

//hooks
const body = document.getElementsByTagName("body")[0];
onMounted(() => {
  body.classList.add("presentation-page");
  body.classList.add("bg-gray-200");
});
onUnmounted(() => {
  body.classList.remove("presentation-page");
  body.classList.remove("bg-gray-200");
});

//Vue Material Kit 2 components
import MaterialPagination from "@/components/MaterialPagination.vue";
import MaterialPaginationItem from "@/components/MaterialPaginationItem.vue";

// nav-pill
import setNavPills from "@/assets/js/nav-pills.js";
onMounted(() => {
  setNavPills();
});
</script>

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
      class="page-header min-vh-35"
      :style="`background-image: url(${vueMkHeader})`"
      loading="lazy"
    >
      <div class="container">
        <div class="row">
          <div class="col-lg-7 text-center mx-auto position-relative">
            <h1
              class="text-white pt-5 mt-n5 me-2"
              :style="{ display: 'inline-block ' }"
            >
              BuySell
            </h1>
            <p class="lead text-white px-5 mt-3" :style="{ fontWeight: '500' }">
              버리지마세요. 필요한 사람을 찾아보세요. 지금.
            </p>
          </div>
        </div>
      </div>
    </div>
  </Header>
  <div class="container">
    <div class="row">
      <div class="col-lg-4 mx-auto">
        <div class="nav-wrapper position-relative end-0">
          <ul class="nav nav-pills nav-fill p-1" role="tablist">
            <li class="nav-item">
              <a
                class="nav-link mb-0 px-0 py-1 active"
                data-bs-toggle="tab"
                href="#profile-tabs-simple"
                role="tab"
                aria-controls="profile"
                aria-selected="true"
              >
                최신 순
              </a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link mb-0 px-0 py-1"
                data-bs-toggle="tab"
                href="#dashboard-tabs-simple"
                role="tab"
                aria-controls="dashboard"
                aria-selected="false"
              >
                많이 본 순
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <div class="card card-body blur shadow-blur mx-3 mx-md-4 mt-n6">
    <PresentationExample :data="data" />
    <RouterLink
      class="dropdown-item ps-3 border-radius-md mb-1"
      :to="{ name: 'navigation-pagination' }"
    >
    </RouterLink>
    <section class="py-7">
      <div class="container">
        <div class="row justify-space-between py-2">
          <div class="col-lg-4 mx-auto">
            <MaterialPagination>
              <MaterialPaginationItem prev class="ms-auto" />
              <MaterialPaginationItem label="1" />
              <MaterialPaginationItem label="2" active />
              <MaterialPaginationItem label="3" />
              <MaterialPaginationItem label="4" />
              <MaterialPaginationItem label="5" />
              <MaterialPaginationItem next />
            </MaterialPagination>
          </div>
        </div>
      </div>
    </section>
  </div>
  <DefaultFooter />
</template>
