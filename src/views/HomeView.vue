<template>
  <header>
    <NavBar></NavBar>
  </header>

  <main class="max-w-5xl mx-auto px-2">
    <DeviceInfo />
    <RGBSetting />
    <KeySetting />
    <KeySetting />
  </main>
</template>

<script setup>
import NavBar from "@/components/NavBar.vue";
import DeviceInfo from "@/components/DeviceInfo.vue";
import RGBSetting from "@/components/RGBSetting.vue";
import KeySetting from "@/components/KeySetting.vue";
</script>

<style lang="scss" scoped></style>
