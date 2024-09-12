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
    name: "查找文本",
    value: "Ctrl + F",
  },
  {
    name: "查找和替换文本",
    value: "Ctrl + H",
  },
  {
    name: "打开剪贴板",
    value: "Meta + V",
  },
  {
    name: "打开任务管理器",
    value: "Ctrl + Shift + Esc",
  },
  {
    name: "截图",
    value: "Meta + Shift + S",
  },
  {
    name: "回到桌面",
    value: "Meta + D",
  },
  {
    name: "关闭活动窗口",
    value: "Alt + F4",
  },
  {
    name: "打开设置",
    value: "Meta + I",
  },
  {
    name: "打开运行命令",
    value: "Meta + R",
  },
  {
    name: "转到行首",
    value: "Home",
  },
  {
    name: "转到行尾",
    value: "End",
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
    name: "查找",
    value: "Meta + F",
  },
  {
    name: "保存",
    value: "Meta + S",
  },
  {
    name: "锁屏",
    value: "Ctrl + Meta + Q",
  },
  {
    name: "关闭最前方的窗口",
    value: "Meta + W",
  },
];

export function getKeyPreset() {
  if (navigator.userAgent.indexOf("Windows") !== -1) {
    return Win;
  } else if (navigator.userAgent.indexOf("Mac") !== -1) {
    return Mac;
  }
}
