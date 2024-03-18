<script setup>
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
</template>

<style scoped></style>
