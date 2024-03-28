<script setup>
import { RouterView } from "vue-router";
import {provide, ref} from "vue";

const isAccessAllowed = ref(false); // 기본적으로 false로 설정
provide('isAccessAllowed', isAccessAllowed);
</script>

<template>
  <router-view />
</template>
