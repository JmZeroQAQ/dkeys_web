<template>
  <div
    class="rounded-2xl bg-white dark:bg-slate-800 shadow-sm p-8 mb-10 select-none"
  >
    <h2 class="font-bold text-xl">设备信息</h2>
    <div class="flex justify-between py-8 divide-x-2 text-lg">
      <div class="flex grow items-center justify-between px-4">
        <div class="text-gray-500 dark:text-gray-400 font-bold">设备名称</div>
        <div class="font-mono">DKeys</div>
      </div>
      <div
        class="flex grow items-center justify-between px-4 dark:border-gray-400"
      >
        <div class="text-gray-500 dark:text-gray-400 font-bold">固件版本</div>
        <div class="font-mono">V{{ version }}</div>
      </div>
    </div>
    <hr class="dark:border-gray-400 mt-10" />
    <div class="mt-4 flex flex-row-reverse gap-4">
      <!-- <el-button @Click="onClick">测试</el-button> -->
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

function onClick() {
  console.log("click");
  ElNotification({
    title: "Success",
    message: "This is a success message",
    type: "success",
    duration: 3000,
  });
}
</script>

<style scoped></style>
