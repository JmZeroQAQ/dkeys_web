<template>
  <nav
    class="fixed z-50 left-0 top-0 bg-white dark:bg-slate-800 w-full border-b border-gray-300 dark:border-gray-600"
  >
    <div class="mx-auto max-w-7xl px-4 py-4 flex justify-between">
      <div
        class="text-2xl font-bold font-mono text-sky-500 select-none hover:cursor-pointer"
      >
        凉界
      </div>
      <div class="flex gap-4">
        <div>
          <el-button
            :type="conn.isConnection ? 'danger' : 'primary'"
            @click="onClick"
            :disabled="isDisable"
            >{{
              conn.isConnection === false ? "+ 连接设备" : "断开设备"
            }}</el-button
          >
        </div>

        <div class="flex items-center">
          <ThemeChange />
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { closeSerial, connectSerial, getConfig } from "@/assets/scripts/serial";
import { useConnectionStore } from "@/stores/connection";
import ThemeChange from "./ThemeChange.vue";

const conn = useConnectionStore();

function onClick() {
  if (conn.isConnection) disConnect();
  else connect();
}

async function connect() {
  let success = await connectSerial();

  if (success === true) {
    let res = await getConfig();
    if (res !== null) {
      conn.setConfig(res);
      conn.setIsConnection(true);
    }
  } else {
    ElNotification({
      title: "Error",
      message: "连接失败，请检查端口是否被占用",
      type: "error",
      position: "bottom-right",
      duration: 5000,
    });
  }
}

async function disConnect() {
  closeSerial();
  conn.setConfig([]);
  conn.setIsConnection(false);
}

onMounted(() => {
  navigator.serial.addEventListener("disconnect", disConnect);
});

onUnmounted(() => {
  navigator.serial.removeEventListener("disconnect", disConnect);
});

const isDisable = ref(false);

onMounted(() => {
  if ("serial" in navigator === false) {
    isDisable.value = true;
    alert("当前浏览器不支持Web Serial API，请使用最新版本的Chrome或Edge浏览器");
  }
});
</script>

<style scoped></style>
