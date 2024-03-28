<!--5번째 항목 여기를 게시글 페이징 형태로 보이고 싶음 후보-->
<script setup>
import ExampleCard from "../Components/ExampleCard.vue";
import MaterialBadge from "../../../components/MaterialBadge.vue";

// images
import imgSigninCover from "@/assets/img/signin-cover.png";
</script>
<template>
  <section class="py-5">
    <div class="container">
      <div class="row">
        <div class="row text-center my-sm-5 mt-5">
          <div class="col-lg-6 mx-auto">
            <MaterialBadge color="success" class="mb-3"
              >상품 목록</MaterialBadge
            >
          </div>
        </div>
      </div>
    </div>
    <div class="container mt-5">
      <div class="row">
        <div class="col-md-8">
          <div class="row mt-4">
            <div class="col-md-6 mt-md-0 mt-5">
              <ExampleCard
                class="shadow-lg"
                title="About Us Page"
                image="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/material-design-system/presentation/pages/about-us.jpg"
                route="about"
              />
            </div>
            <div class="col-md-6 mt-md-0 mt-5">
              <ExampleCard
                class="shadow-lg"
                title="Contact Us Page"
                image="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/material-design-system/presentation/pages/contact.jpg"
                route="contactus"
              />
            </div>
          </div>
          <div class="row mt-4">
            <div class="col-md-6 mt-md-0 mt-5">
              <ExampleCard
                classes="mt-5"
                title="Sign In Page"
                :image="imgSigninCover"
                route="signin-basic"
              />
            </div>
            <div class="col-md-6 mt-md-0 mt-5">
              <ExampleCard
                classes="shadow-lg"
                title="Author Page"
                image="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/material-design-system/presentation/pages/author.jpg"
                route="author"
              />
            </div>
            <div class="col-md-6 mt-md-0 mt-5">
              <ExampleCard
                classes="shadow-lg"
                title="Author Page"
                image="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/material-design-system/presentation/pages/author.jpg"
                route="author"
              />
            </div>
            <div class="col-md-6 mt-md-0 mt-5">
              <ExampleCard
                classes="shadow-lg"
                title="Author Page"
                image="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/material-design-system/presentation/pages/author.jpg"
                route="author"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
