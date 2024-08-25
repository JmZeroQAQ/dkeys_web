<template>
  <div
    class="rounded-2xl bg-white dark:bg-slate-800 shadow-sm p-8 mb-10 select-none"
  >
    <h2 class="font-bold text-xl">设备信息</h2>
    <div class="flex justify-between py-8 divide-x-2 text-lg">
      <div class="flex grow items-center justify-between px-4">
        <div class="text-gray-500 dark:text-gray-400 font-bold">设备名称</div>
        <div class="font-mono">凉界双键</div>
      </div>
      <div
        class="flex grow items-center justify-between px-4 dark:border-gray-400"
      >
        <div class="text-gray-500 dark:text-gray-400 font-bold">固件版本</div>
        <div class="font-mono">V{{ version }}</div>
      </div>
    </div>
    <hr class="dark:border-gray-400 mt-8" />
    <div class="mt-4 flex justify-between">
      <div>
        <el-popconfirm
          @confirm="onConfirm"
          width="220"
          confirm-button-text="确定"
          cancel-button-text="取消"
          hide-icon
          title="确定恢复出厂设置吗？"
        >
          <template #reference>
            <el-button type="danger" plain>恢复出厂设置</el-button>
          </template>
        </el-popconfirm>
      </div>

      <div>
        <el-button type="info">使用说明</el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useConnectionStore } from "@/stores/connection";
import { configIdx } from "@/assets/scripts/configIdx";
import {
  constructConfig,
  sendMessage,
  stringToUintArray8,
} from "@/assets/scripts/serial";

const version = ref("0.0.0");

const conn = useConnectionStore();

onMounted(() => {
  if (conn.isConnection) {
    version.value = `${conn.config[configIdx.DEVICE_VERSION]}.${
      conn.config[configIdx.DEVICE_VERSION + 1]
    }.${conn.config[configIdx.DEVICE_VERSION + 2]}`;
  }
});

function onConfirm() {
  let uConfig = "";
  uConfig = constructConfig(configIdx.DEVICE_VERSION, 2);
  uConfig += constructConfig(233, 1);
  sendMessage(stringToUintArray8(uConfig));

  ElNotification({
    title: "Success",
    message: "恢复出厂设置成功，请重新插拔键盘",
    type: "success",
    duration: 3000,
  });
}
</script>

<style scoped></style>
