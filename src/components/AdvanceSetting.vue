<template>
  <div
    v-show="isShow"
    class="rounded-2xl bg-white dark:bg-slate-800 shadow-sm p-8 mb-10"
  >
    <h2 class="font-bold text-xl select-none">高级设置</h2>
    <div class="flex justify-center py-2 mb-4">
      <el-radio-group v-model="mode">
        <el-radio :value="0">常规</el-radio>
        <el-radio :value="1">宏</el-radio>
      </el-radio-group>
    </div>

    <div v-show="mode === 0" class="max-w-2xl mx-auto">
      <div class="flex items-center gap-4 mb-4">
        <span class="text-nowrap">左键延迟</span>
        <el-slider v-model="key2Debounce" show-input :min="1" :max="10" />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <span class="text-nowrap">右键延迟</span>
        <el-slider v-model="key1Debounce" show-input :min="1" :max="10" />
      </div>
    </div>

    <div v-show="mode === 1" class="max-w-2xl mx-auto">
      <div class="flex items-center gap-4 mb-4">
        <span class="text-nowrap">长按重复</span>
        <el-switch v-model="isMacroRepeat" />
      </div>

      <div class="flex items-center gap-4 mb-4">
        <span class="text-nowrap">左键每步间隔</span>
        <el-slider v-model="key2GapTime" show-input :min="1" :max="100" />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <span class="text-nowrap">右键每步间隔</span>
        <el-slider v-model="key1GapTime" show-input :min="1" :max="100" />
      </div>

      <div class="flex items-center gap-4 mb-4">
        <span class="text-nowrap">触发重复时间</span>
        <el-slider v-model="macroActiveTime" show-input :min="1" :max="100" />
      </div>
    </div>

    <hr class="mt-10 dark:border-gray-400 mb-6" />
    <div class="flex mt-4 justify-end">
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

const isShow = ref(false);

const mode = ref(0);
const key1Debounce = ref(3); // Right key
const key2Debounce = ref(3); // Left key

const isMacroRepeat = ref(true);
const macroActiveTime = ref(30);
const key1GapTime = ref(10);
const key2GapTime = ref(10);

onMounted(() => {
  const conn = useConnectionStore();

  if (conn.isConnection) {
    const config = conn.config;

    isShow.value = config[configIdx.DEVICE_VERSION + 1] >= 3 ? true : false;

    // console.log(config);
    key1Debounce.value = config[configIdx.KEY1_DEBOUNCE_TIME];
    key2Debounce.value = config[configIdx.KEY2_DEBOUNCE_TIME];

    isMacroRepeat.value =
      config[configIdx.MACRO_REPEAT_ACTIVE] === 1 ? true : false;
    macroActiveTime.value = config[configIdx.MACRO_REPEAT_ACTIVE_TIME];
    key1GapTime.value = config[configIdx.KEY1_MACRO_GAP];
    key2GapTime.value = config[configIdx.KEY2_MACRO_GAP];
  }
});

function updateConfig() {
  let updateConfig = "";

  if (mode.value === 0) {
    updateConfig += constructConfig(
      configIdx.KEY1_DEBOUNCE_TIME,
      key1Debounce.value
    );
    updateConfig += constructConfig(
      configIdx.KEY2_DEBOUNCE_TIME,
      key2Debounce.value
    );
  } else if (mode.value === 1) {
    updateConfig += constructConfig(
      configIdx.MACRO_REPEAT_ACTIVE,
      isMacroRepeat.value ? 1 : 0
    );
    updateConfig += constructConfig(
      configIdx.MACRO_REPEAT_ACTIVE_TIME,
      macroActiveTime.value
    );
    updateConfig += constructConfig(
      configIdx.KEY1_MACRO_GAP,
      key1GapTime.value
    );
    updateConfig += constructConfig(
      configIdx.KEY2_MACRO_GAP,
      key2GapTime.value
    );
  }

  updateConfig += constructConfig(233, 1);
  //  console.log(updateConfig);

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
