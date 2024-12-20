<template>
  <div class="rounded-2xl bg-white dark:bg-slate-800 p-8 mb-10">
    <slot name="title"></slot>

    <div class="flex justify-center py-2 mb-6">
      <el-radio-group v-model="mode">
        <el-radio :value="0">绑定组合键</el-radio>
        <el-radio :value="1">媒体按键</el-radio>
        <el-radio :value="2">鼠标按键</el-radio>
        <el-radio :value="3">一键密码</el-radio>
        <el-radio
          v-show="conn.config[configIdx.DEVICE_VERSION + 1] >= 3"
          :value="4"
          >绑定宏</el-radio
        >
      </el-radio-group>
    </div>

    <div class="max-w-2xl mx-auto">
      <KeyBind v-show="mode === 0" v-model="keySet" />
      <el-select
        v-show="mode === 1"
        v-model="mediaKey"
        placeholder="选择媒体键"
        size="large"
      >
        <el-option
          v-for="op in mediaOptions"
          :key="op.value"
          :label="op.label"
          :value="op.value"
        />
      </el-select>
      <el-select
        v-show="mode === 2"
        v-model="mouseKey"
        placeholder="选择鼠标键"
        size="large"
      >
        <el-option
          v-for="op in mouseOptions"
          :key="op.value"
          :label="op.label"
          :value="op.value"
        />
      </el-select>
      <el-input
        v-show="mode === 3"
        show-password
        maxlength="20"
        show-word-limit
        v-model="text"
        placeholder="输入密码"
        size="large"
      />
      <MacroSetting v-show="mode === 4" v-model="macroKeySet" />
    </div>

    <hr class="mt-10 dark:border-gray-400 mb-6" />
    <div class="flex mt-4 justify-between">
      <div>
        <el-button
          v-for="i in 6"
          type="primary"
          plain
          @click="() => recommendConfig(keypreset[i - 1].value)"
          >{{ keypreset[i - 1].name }}</el-button
        >

        <MoreShortcutKey :keypreset="keypreset" @setkey="recommendConfig" />
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
import KeyBind from "./KeyBind.vue";
import { configIdx, keyMode } from "@/assets/scripts/configIdx";
import { getKeyPreset } from "@/assets/scripts/keypreset";

import {
  getKeyCode,
  getName,
  mediaOptions,
  mouseOptions,
} from "@/assets/scripts/keymap";
import {
  constructConfig,
  sendMessage,
  stringToUintArray8,
} from "@/assets/scripts/serial";
import MoreShortcutKey from "./MoreShortcutKey.vue";
import MacroSetting from "./MacroSetting.vue";

const mode = ref(0);
const keySet = ref("点击绑定组合键");
const mediaKey = ref();
const text = ref("");
const mouseKey = ref();
const keypreset = ref(getKeyPreset());
const macroKeySet = ref(["点击绑定组合键"]);

const conn = useConnectionStore();

const props = defineProps({
  idx: { type: Number, required: true },
});

onMounted(() => {
  if (conn.isConnection) {
    const modeIdx = props.idx;
    const start = props.idx + 1;
    mode.value = conn.config[modeIdx];

    if (mode.value === keyMode.NORMAL) {
      let str = "";

      for (let i = start; i < start + 6; i++) {
        if (conn.config[i] === 0xff) break;
        if (i === start) str = getName(conn.config[i]);
        else str += ` + ${getName(conn.config[i])}`;
      }

      keySet.value = str;
    } else if (mode.value === keyMode.MEDIAL) {
      const upper = conn.config[start];
      const lower = conn.config[start + 1];
      const keyCode = (upper << 8) + lower;

      mediaKey.value = keyCode;
    } else if (mode.value === keyMode.MOUSE) {
      const keyCode = conn.config[start];

      mouseKey.value = keyCode;
    } else if (mode.value === keyMode.TEXT) {
      let textEnd = 0;

      for (let i = start; i < start + 21; i++) {
        if (conn.config[i] === 0xff) {
          textEnd = i;
          break;
        }
      }

      const txt = conn.config.slice(start, textEnd);
      const decoder = new TextDecoder();
      text.value = decoder.decode(new Uint8Array(txt));
    } else if (mode.value === keyMode.MACRO) {
      // clear macroKeySet for data filling
      macroKeySet.value.pop();
      // based config to construct macroKeySet.
      for (let i = 0; i < 4; i++) {
        let str = "";
        for (let j = start + 4 * i; conn.config[j] !== 0xff; j++) {
          if (j === start + 4 * i) str = getName(conn.config[j]);
          else str += ` + ${getName(conn.config[j])}`;
        }

        if (str.length !== 0) macroKeySet.value.push(str);
      }
    }
  }
});

function recommendConfig(v) {
  mode.value = 0;
  keySet.value = v;
}

function updateConfig() {
  const modeIdx = props.idx;
  const start = props.idx + 1;
  let uConfig = constructConfig(modeIdx, mode.value);

  if (mode.value === keyMode.NORMAL) {
    let keyList = keySet.value.split(" + ");

    for (let i = 0; i < keyList.length; i++) {
      const keyCode = getKeyCode(keyList[i]);
      uConfig += constructConfig(start + i, keyCode);
    }

    uConfig += constructConfig(start + keyList.length, 0xff);
  } else if (mode.value === keyMode.MEDIAL) {
    let upper = mediaKey.value >> 8;
    let lower = mediaKey.value & (2 ** 8 - 1);

    uConfig += constructConfig(start, upper);
    uConfig += constructConfig(start + 1, lower);
  } else if (mode.value === keyMode.MOUSE) {
    uConfig += constructConfig(start, mouseKey.value);
  } else if (mode.value === keyMode.TEXT) {
    const encoder = new TextEncoder();
    const uArray = encoder.encode(text.value);

    for (let i = 0; i < uArray.length; i++) {
      uConfig += constructConfig(start + i, uArray[i]);
    }

    uConfig += constructConfig(start + uArray.length, 0xff);
  } else if (mode.value === keyMode.MACRO) {
    // console.log(macroKeySet.value);

    // the number of macro steps.
    uConfig += constructConfig(
      props.idx === configIdx.KEY1_MODE
        ? configIdx.KEY1_MACRO_LEN
        : configIdx.KEY2_MACRO_LEN,
      macroKeySet.value.length
    );

    // Reset the starting position of each step.
    for (let i = 0; i < 4; i++) uConfig += constructConfig(start + 4 * i, 0xff);

    for (const [idx, item] of macroKeySet.value.entries()) {
      const keyList = item.split(" + ");
      if (keyList[0] !== "点击绑定组合键") {
        for (let i = 0; i < keyList.length; i++) {
          const keyCode = getKeyCode(keyList[i]);
          const pos = start + i + 4 * idx;
          uConfig += constructConfig(pos, keyCode);
        }
      }

      uConfig += constructConfig(start + 4 * idx + keyList.length, 0xff);
    }

    // console.log(uConfig);
  }

  uConfig += constructConfig(233, 1);
  // console.log(uConfig);
  sendMessage(stringToUintArray8(uConfig));

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
