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
    name: "复制",
    value: "Meta + C",
  },
  {
    name: "粘贴",
    value: "Meta + V",
  },
];

export function getKeyPreset() {
  console.log(navigator.userAgent);

  if (navigator.userAgent.indexOf("Windows") !== -1) {
    return Win;
  } else if (navigator.userAgent.indexOf("Mac") !== -1) {
    return Mac;
  }
}
