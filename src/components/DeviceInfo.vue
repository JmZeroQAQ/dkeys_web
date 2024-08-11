<template>
  <div class="rounded-2xl bg-slate-50 p-6 mb-10">
    <h2 class="font-bold text-xl">设备信息</h2>
    <div class="flex justify-between py-8 divide-x-2">
      <div class="flex grow justify-between px-4">
        <div class="text-gray-500">键盘芯片</div>
        <div class="">CH552T</div>
      </div>
      <div class="flex grow justify-between px-4">
        <div>固件版本</div>
        <div>V.0.1.1</div>
      </div>
    </div>
    <hr />
    <div class="mt-4 flex flex-row-reverse gap-4">
      <el-button>加载配置</el-button>
      <el-button>保存配置</el-button>
    </div>
  </div>
</template>

<script setup></script>

<style scoped></style>
