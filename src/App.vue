<script setup>
import { onMounted } from "vue";

onMounted(() => {
  if ("serial" in navigator === false) {
    alert("当前浏览器不支持Web Serial API，请使用最新版本的Chrome或Edge浏览器");
  }
});
</script>

<template>
  <router-view></router-view>
</template>

<style scoped></style>
