<!--하단에 리뷰 남긴 화면-->
<script setup>
import DefaultReviewCard from "@/examples/cards/reviewCards/DefaultReviewCard.vue";
</script>
<template>
  <section class="py-7">
    <div class="container">
      <!--      <div class="row">
        <div class="col-lg-6 mx-auto text-center">
          <h2 class="mb-0">Trusted by over</h2>
          <h2 class="text-gradient text-success mb-3">
            1,679,477+ web developers
          </h2>
          <p class="lead">
            Many Fortune 500 companies, startups, universities and governmental
            institutions love Creative Tim's products.
          </p>
        </div>
      </div>-->
      <div class="row mt-6">
        <DefaultReviewCard
          name="Nick Willever"
          date="1 day ago"
          review='"새 것 사기 부담스러웠는데 좋은 가격에 구매 할 수 있었습니다. 감사합니다."'
          :rating="5.0"
        />
        <DefaultReviewCard
          class="ms-md-auto"
          color="bg-gradient-success"
          name="Shailesh Kushwaha"
          date="1 week ago"
          review='"오 레어템 건짐 ㄱㅇㄷ"'
          :rating="2.0"
        />

        <DefaultReviewCard
          name="Samuel Kamuli"
          date="3 weeks ago"
          review='"가짜물건을 팔면 어떻게 합니까!"'
          :rating="1.0"
        />
      </div>
      <hr class="horizontal dark my-5" />
      <div class="row">
        <!--        <div class="col-lg-2 col-md-4 col-6 ms-auto">
          <img
            class="w-100 opacity-6"
            src="@/assets/img/logos/gray-logos/logo-apple.svg"
            alt="Logo"
          />
        </div>
        <div class="col-lg-2 col-md-4 col-6">
          <img
            class="w-100 opacity-6"
            src="@/assets/img/logos/gray-logos/logo-facebook.svg"
            alt="Logo"
          />
        </div>
        <div class="col-lg-2 col-md-4 col-6">
          <img
            class="w-100 opacity-6"
            src="@/assets/img/logos/gray-logos/logo-nasa.svg"
            alt="Logo"
          />
        </div>
        <div class="col-lg-2 col-md-4 col-6 ms-lg-0 ms-md-auto">
          <img
            class="w-100 opacity-6"
            src="@/assets/img/logos/gray-logos/logo-vodafone.svg"
            alt="Logo"
          />
        </div>
        <div class="col-lg-2 col-md-4 col-6 me-md-auto mx-md-0 mx-auto">
          <img
            class="w-100 opacity-6"
            src="@/assets/img/logos/gray-logos/logo-digitalocean.svg"
            alt="Logo"
          />
        </div>-->
      </div>
    </div>
  </section>
</template>
