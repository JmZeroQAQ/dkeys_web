<template>
  <div class="rounded-2xl bg-white dark:bg-slate-800 shadow-sm p-8 mb-10">
    <h2 class="font-bold text-xl select-none">灯光控制</h2>
    <div class="flex justify-center py-2">
      <el-radio-group v-model="mode">
        <el-radio :value="0">固定模式</el-radio>
        <el-radio :value="1">呼吸模式</el-radio>
        <el-radio :value="2">渐变模式</el-radio>
      </el-radio-group>
    </div>
    <div class="max-w-2xl mx-auto">
      <div
        class="flex gap-2 items-center mb-4"
        v-show="mode === 0 || mode == 1"
      >
        <span>颜色</span>
        <div class="ml-2">
          <el-color-picker v-model="color" size="large" />
        </div>
      </div>

      <div class="flex items-center gap-4 mb-4">
        <span class="text-nowrap">亮度</span>
        <el-slider v-model="brightness" show-input :min="0" :max="255" />
      </div>

      <div
        class="flex items-center gap-4 mb-4"
        v-show="mode === 1 || mode === 2"
      >
        <span class="text-nowrap">间隔</span>
        <el-slider v-model="interval" show-input :min="15" :max="255" />
      </div>

      <div class="flex items-center gap-4" v-show="mode === 1 || mode === 2">
        <span class="text-nowrap">步进</span>
        <el-slider v-model="step" show-input :min="1" :max="16" show-stops />
      </div>
    </div>

    <hr class="mt-10 dark:border-gray-400 mb-6" />
    <div class="flex mt-4 justify-between">
      <div>
        <el-button
          type="info"
          @click="() => onClick({ mode: 0, brightness: 0 })"
          >关闭灯光</el-button
        >
        <el-button
          type="success"
          @click="
            () =>
              onClick({
                mode: 1,
                color: '#2dc1db',
                brightness: 255,
                step: 4,
                interval: 40,
              })
          "
          >呼吸推荐</el-button
        >
        <el-button
          type="success"
          @click="
            () => onClick({ mode: 2, brightness: 255, step: 2, interval: 55 })
          "
          >渐变推荐</el-button
        >
      </div>
      <div>
        <el-button @click="updateConfig" type="primary">应用设置</el-button>
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

const mode = ref(0);
const color = ref("#3e4aff");
const brightness = ref(255);
const step = ref(1);
const interval = ref(30);

onMounted(() => {
  const conn = useConnectionStore();

  if (conn.isConnection) {
    const config = conn.config;
    console.log(config);

    mode.value = config[configIdx.RGB_MODE];
    step.value = config[configIdx.RGB_STEP];
    interval.value = config[configIdx.RGB_INTERVAL];

    const R = config[configIdx.RGB_R].toString(16);
    const G = config[configIdx.RGB_G].toString(16);
    const B = config[configIdx.RGB_B].toString(16);

    color.value = `#${R}${G}${B}`;
    console.log(color.value);
  }
});

function onClick(obj) {
  if ("mode" in obj) mode.value = obj.mode;
  if ("color" in obj) color.value = obj.color;
  if ("brightness" in obj) brightness.value = obj.brightness;
  if ("step" in obj) step.value = obj.step;
  if ("interval" in obj) interval.value = obj.interval;
}

function getRGB() {
  const R = parseInt(color.value.substring(1, 3), 16);
  const G = parseInt(color.value.substring(3, 5), 16);
  const B = parseInt(color.value.substring(5, 7), 16);

  return {
    R,
    G,
    B,
  };
}

function updateConfig() {
  let updateConfig = "";
  updateConfig += constructConfig(configIdx.RGB_MODE, mode.value);
  updateConfig += constructConfig(configIdx.RGB_BRIGHTNESS, brightness.value);
  updateConfig += constructConfig(configIdx.RGB_STEP, step.value);
  updateConfig += constructConfig(configIdx.RGB_INTERVAL, interval.value);

  const RGB = getRGB();
  updateConfig += constructConfig(configIdx.RGB_R, RGB.R);
  updateConfig += constructConfig(configIdx.RGB_G, RGB.G);
  updateConfig += constructConfig(configIdx.RGB_B, RGB.B);

  updateConfig += constructConfig(233, 1);
  console.log(updateConfig);

  sendMessage(stringToUintArray8(updateConfig));

  ElNotification({
    title: "Success",
    message: "修改成功",
    type: "success",
    position: "bottom-right",
    duration: 3000,
  });
}
</script>

<style scoped></style>
