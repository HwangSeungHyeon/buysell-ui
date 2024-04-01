<script setup>
// example components
import Header from "../../../examples/Header.vue";
// sections
import Profile from "./Sections/AuthorProfile.vue";
// image
import image from "@/assets/img/city-profile.jpg";
import NavbarDefault from "@/examples/navbars/NavbarDefault.vue";

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
      class="page-header min-height-200"
      :style="{ backgroundImage: `url(${image})` }"
      loading="lazy"
    >
      <span class="mask bg-gradient-dark opacity-8"></span>
    </div>
  </Header>
  <div class="card card-body blur shadow-blur mx-auto mt-n6 mb-4" style="max-width: 500px;">
    <Profile />
  </div>
</template>
