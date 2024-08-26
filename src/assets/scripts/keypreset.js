const Win = [
  {
    name: "窗口切换",
    value: "Alt + Tab",
  },
  {
    name: "复制",
    value: "Ctrl + C",
  },
  {
    name: "粘贴",
    value: "Ctrl + V",
  },
  {
    name: "剪切",
    value: "Ctrl + X",
  },
  {
    name: "全选",
    value: "Ctrl + A",
  },
  {
    name: "撤销",
    value: "Ctrl + Z",
  },
  {
    name: "剪贴板",
    value: "Meta + V",
  },
  {
    name: "截图",
    value: "Meta + Shift + S",
  },
];

const Mac = [
  {
    name: "窗口切换",
    value: "Meta + Tab",
  },
  {
    name: "复制",
    value: "Meta + C",
  },
  {
    name: "粘贴",
    value: "Meta + V",
  },
  {
    name: "剪切",
    value: "Meta + X",
  },
  {
    name: "全选",
    value: "Meta + A",
  },
  {
    name: "撤销",
    value: "Meta + Z",
  },
  {
    name: "锁屏",
    value: "Ctrl + Meta + Q",
  },
];

export function getKeyPreset() {
  if (navigator.userAgent.indexOf("Windows") !== -1) {
    return Win;
  } else if (navigator.userAgent.indexOf("Mac") !== -1) {
    return Mac;
  }
}
