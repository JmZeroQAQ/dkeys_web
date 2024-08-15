import { ref } from "vue";
import { defineStore } from "pinia";

export const useConnectionStore = defineStore("connection", () => {
  const isConnection = ref(false);
  const config = ref([]);

  function setIsConnection(value) {
    isConnection.value = value;
  }

  function setConfig(array) {
    config.value = array;
  }

  return { isConnection, setIsConnection, setConfig, config };
});
