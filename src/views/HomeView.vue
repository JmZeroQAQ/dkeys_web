<template>
  <header>
    <NavBar></NavBar>
  </header>

  <main class="max-w-5xl mx-auto px-2" v-if="conn.isConnection">
    <DeviceInfo />
    <RGBSetting />
    <KeySetting :idx="key2Mode">
      <template v-slot:title>
        <h2 class="font-bold text-xl">左键设置</h2>
      </template>
    </KeySetting>
    <KeySetting :idx="key1Mode">
      <template v-slot:title>
        <h2 class="font-bold text-xl">右键设置</h2>
      </template>
    </KeySetting>
  </main>

  <div
    class="text-center mt-72 text-2xl text-sky-400 font-bold"
    v-if="conn.isConnection === false"
  >
    设备未连接
  </div>
</template>

<script setup>
import NavBar from "@/components/NavBar.vue";
import DeviceInfo from "@/components/DeviceInfo.vue";
import RGBSetting from "@/components/RGBSetting.vue";
import KeySetting from "@/components/KeySetting.vue";

import { useConnectionStore } from "@/stores/connection";
import { configIdx } from "@/assets/scripts/configIdx";
import { ref } from "vue";

const key1Mode = ref(configIdx.KEY1_MODE);
const key2Mode = ref(configIdx.KEY2_MODE);

const conn = useConnectionStore();
</script>

<style lang="scss" scoped></style>
