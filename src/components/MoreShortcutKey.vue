<template>
  <el-button type="primary" @click="visible = true">更多</el-button>
  <el-dialog v-model="visible" width="64rem" top="2vh">
    <el-table height="38rem" :data="keypreset" class="w-full" stripe>
      <el-table-column label="按键" prop="value" align="center" />
      <el-table-column label="功能" prop="name" align="center" />
      <el-table-column label="操作" align="center">
        <template #default="scope">
          <el-button type="primary" plain @click="onClickSet(scope.row.value)"
            >使用</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>
</template>

<script setup>
import { ref } from "vue";

const visible = ref(false);

const props = defineProps({
  keypreset: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["setkey"]);
function onClickSet(val) {
  emit("setkey", val);
  visible.value = false;
}
</script>

<style scoped></style>
