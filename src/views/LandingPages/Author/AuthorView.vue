<script setup>
// example components
import DefaultNavbar from "../../../examples/navbars/NavbarDefault.vue";
import Header from "../../../examples/Header.vue";
// sections
import Profile from "./Sections/AuthorProfile.vue";
// image
import image from "@/assets/img/city-profile.jpg";

</script>
<template>
  <DefaultNavbar/>
  <Header>
    <div
      class="page-header min-height-200"
      :style="{ backgroundImage: `url(${image})` }"
      loading="lazy"
    >
      <span class="mask bg-gradient-dark opacity-8"></span>
    </div>
  </Header>
  <div class="card card-body blur shadow-blur mx-9 mx-md-9 mt-n6 mb-4">
    <Profile />
  </div>
</template>
