<script setup>
import { onMounted } from "vue";

//Vue Material Kit 2 components
import MaterialAvatar from "@/components/MaterialAvatar.vue";
import MaterialButton from "@/components/MaterialButton.vue";

// image
import profilePic from "@/assets/img/bruce-mars.jpg";

// material-input
import setMaterialInput from "@/assets/js/material-input";
import MaterialInput from "@/components/MaterialInput.vue";
onMounted(() => {
  setMaterialInput();
});
</script>
<template>
  <section class="py-sm-7 py-5 position-relative">
    <div class="container">
      <div class="row">
        <div class="col-12 mx-auto">
          <div class="blur-shadow-avatar">
            <MaterialAvatar
              size="xxl"
              class="shadow-xl position-relative z-index-2"
              :image="profilePic"
              alt="Avatar"
            />
          </div>
          <MaterialButton
            variant="contained"
            color="success"
            class="w-auto me-2"
          >
            Profile Edit
          </MaterialButton>
          <div class="col-lg-4">
            <h3 class="mb-0">Hyunjoo Kim</h3>
            <MaterialInput
              class="input-group-outline mb-4"
              :label="{ text: 'NickName', class: 'form-label' }"
              type="text"
            />
            <MaterialButton
              variant="contained"
              color="success"
              class="w-auto me-2"
            >
              NickName Edit
            </MaterialButton>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
