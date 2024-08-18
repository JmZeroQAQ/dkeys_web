<template>
  <div
    class="outline-none h-10 m-auto px-3 flex items-center justify-between rounded border border-[#DCDFE6] focus:border-[#409EFF] bg-white dark:bg-slate-800 select-none hover:cursor-pointer"
    @click="onClick"
    @blur="onBlur"
    @keydown.prevent.stop="onKeydown"
    tabindex="0"
  >
    <div class="grow text-center">{{ keySet }}</div>
    <!-- <div class="grow-0 size-6"> -->
    <!-- <svg @click="keySet = ''" v-show="isFocus" viewBox="0 0 24 24">
        <g>
          <path fill="none" d="M0 0h24v24H0z" />
          <path
            d="M8 7v4L2 6l6-5v4h5a8 8 0 1 1 0 16H4v-2h9a6 6 0 1 0 0-12H8z"
          />
        </g>
      </svg> -->
    <!-- </div> -->
  </div>
</template>

<script setup>
import { transformName } from "@/assets/scripts/keymap";

const focusText = "按键盘输入组合键";

const keySet = defineModel();

let defaultValue = "";

function onKeydown(e) {
  if (e.repeat) return;
  if (keySet.value.split("+").length > 5) return;

  let keyName = transformName(e.key);
  if (keySet.value === focusText) keySet.value = keyName;
  else keySet.value += ` + ${keyName}`;
}

function onClick() {
  defaultValue = keySet.value;
  if (keySet.value === "Meta") return;
  keySet.value = focusText;
}

function onBlur() {
  if (keySet.value === focusText) keySet.value = defaultValue;
  if (keySet.value === "") keySet.value = "点击绑定组合键";
}
</script>

<style lang="scss" scoped></style>
