<template>
  <div class="rounded-2xl bg-white shadow-sm p-8 mb-10 select-none">
    <h2 class="font-bold text-xl">设备信息</h2>
    <div class="flex justify-between py-8 divide-x-2">
      <div class="flex grow justify-between px-4">
        <div class="text-gray-500 font-bold text-lg">键盘芯片</div>
        <div class="text-gray-700">CH552T</div>
      </div>
      <div class="flex grow justify-between px-4">
        <div class="text-gray-500 font-bold text-lg">固件版本</div>
        <div class="text-gray-700">V{{ version }}</div>
      </div>
    </div>
    <hr />
    <div class="mt-4 flex flex-row-reverse gap-4">
      <el-button>测试2</el-button>
      <el-button>getConfig</el-button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useConnectionStore } from "@/stores/connection";
import { configIdx } from "@/assets/scripts/configIdx";

const version = ref("0.0.0");

const conn = useConnectionStore();

onMounted(() => {
  if (conn.isConnection) {
    version.value = `${conn.config[configIdx.DEVICE_VERSION]}.${
      conn.config[configIdx.DEVICE_VERSION + 1]
    }.${conn.config[configIdx.DEVICE_VERSION + 2]}`;
  }
});
</script>

<style scoped></style>
