<template>
  <div
    class="rounded-2xl bg-white dark:bg-slate-800 shadow-sm p-8 mb-10 select-none"
  >
    <h2 class="font-bold text-xl mb-6">设备信息</h2>

    <div class="flex justify-between font-bold text-sm">
      <div class="flex basis-1/2 items-center justify-between px-4">
        <div class="text-gray-400 dark:text-gray-400">设备名称</div>
        <div class="font-mono text-lg text-sky-400">凉界双键</div>
      </div>
      <div
        class="flex basis-1/2 items-center justify-between px-4 dark:border-gray-400"
      >
        <div class="text-gray-400 dark:text-gray-400">固件版本</div>
        <div class="font-mono text-lg text-sky-400">V{{ version }}</div>
      </div>
    </div>

    <div class="flex justify-between font-bold mt-4 text-sm">
      <div class="flex basis-1/2 items-center justify-between px-4">
        <div class="text-gray-400 dark:text-gray-400">左键次数</div>
        <div class="font-mono text-4xl font-bold text-violet-500">
          {{ lcounter }}
        </div>
      </div>
      <div
        class="flex basis-1/2 items-center justify-between px-4 dark:border-gray-400"
      >
        <div class="text-gray-400 dark:text-gray-400">右键次数</div>
        <div class="font-mono text-4xl font-bold text-violet-500">
          {{ rcounter }}
        </div>
      </div>
    </div>

    <hr class="dark:border-gray-400 mt-6" />
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
        <Instructions />
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
import Instructions from "./Instructions.vue";

const version = ref("0.0.0");
const lcounter = ref(0);
const rcounter = ref(0);

const conn = useConnectionStore();

onMounted(() => {
  if (conn.isConnection) {
    version.value = `${conn.config[configIdx.DEVICE_VERSION]}.${
      conn.config[configIdx.DEVICE_VERSION + 1]
    }.${conn.config[configIdx.DEVICE_VERSION + 2]}`;

    lcounter.value =
      (conn.config[configIdx.KEY2_COUNTER + 1] << 8) +
      conn.config[configIdx.KEY2_COUNTER];

    rcounter.value =
      (conn.config[configIdx.KEY1_COUNTER + 1] << 8) +
      conn.config[configIdx.KEY1_COUNTER];
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
    position: "bottom-right",
    duration: 3000,
  });
}
</script>

<style scoped></style>
