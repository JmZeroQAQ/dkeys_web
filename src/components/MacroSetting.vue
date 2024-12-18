<template>
  <div>
    <div class="mb-4 flex justify-end">
      <el-button type="danger" @click="deleteMacro">删除</el-button>
      <el-button type="success" @click="addMacro">添加</el-button>
    </div>
    <div v-for="(_, idx) in macroKeySet" class="mb-4">
      <div class="flex flex-row items-center">
        <div class="basis-10">{{ idx + 1 }}.</div>
        <div class="flex-auto">
          <MacroBind v-model="macroKeySet[idx]" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import MacroBind from "./MacroBind.vue";

const macroKeySet = defineModel();

function addMacro() {
  const len = macroKeySet.value.length;
  const lastContent = macroKeySet.value.at(-1);
  if (len < 4 && lastContent !== "点击绑定组合键")
    macroKeySet.value.push("点击绑定组合键");
}

function deleteMacro() {
  if (macroKeySet.value.length > 1) macroKeySet.value.pop();
}
</script>

<style lang="scss" scoped></style>
