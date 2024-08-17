const keymaps = new Map([
  [0x80, "Ctrl"],
  [0x81, "Shift"],
  [0x82, "Alt"],
  [0x83, "Meta"],

  [0xda, "Up"],
  [0xd9, "Down"],
  [0xd8, "Left"],
  [0xd7, "Right"],
  [0xb2, "Backspace"],
  [0xb3, "Tab"],
  [0xb0, "Enter"],
  [0xb1, "Esc"],
  [0xd1, "Insert"],
  [0xd4, "Delete"],
  [0xd3, "PageUp"],
  [0xd6, "PageDown"],
  [0xd2, "Home"],
  [0xd5, "End"],
  [0xc1, "CapsLock"],

  [0xc2, "F1"],
  [0xc3, "F2"],
  [0xc4, "F3"],
  [0xc5, "F4"],
  [0xc6, "F5"],
  [0xc7, "F6"],
  [0xc8, "F7"],
  [0xc9, "F8"],
  [0xca, "F9"],
  [0xcb, "F10"],
  [0xcc, "F11"],
  [0xcd, "F12"],

  [0x20, "Space"],
]);

export const keyToNameMap = new Map([
  ["Control", "Ctrl"],
  [" ", "Space"],
  ["ArrowUp", "Up"],
  ["ArrowDown", "Down"],
  ["ArrowLeft", "Left"],
  ["ArrowRight", "Right"],
]);

export function getName(keycode) {
  let res = "";

  if (keycode < 128) {
    const decoder = new TextDecoder();
    res = decoder.decode(new Uint8Array([keycode])).toUpperCase();

    if (res === " ") res = "Space";
  } else {
    res = keymaps.get(keycode);
  }

  if (res === undefined) {
    throw new Error(`${keycode} not found in keymaps.`);
  }

  return res;
}

// event.key's name to custom name
export function transformName(name) {
  let res = "";

  if (name === " ") return keyToNameMap.get(" ");

  if (name.length > 1) {
    res = keyToNameMap.has(name) ? keyToNameMap.get(name) : name;
  } else {
    res = name.toUpperCase();
  }

  return res;
}

export function getKeyCode(name) {
  for (const [k, v] of keymaps) {
    if (v === name) return k;
  }

  if (name.length === 1) {
    name = name.toLowerCase();
    return name.charCodeAt(0);
  }

  console.log("fault!!!!!");
}

export const mediaOptions = [
  {
    label: "上一首",
    value: 0xb6,
  },
  {
    label: "下一首",
    value: 0xb5,
  },
  {
    label: "静音",
    value: 0xe2,
  },
  {
    label: "音量+",
    value: 0xe9,
  },
  {
    label: "音量-",
    value: 0xea,
  },
  {
    label: "亮度+",
    value: 0x6f,
  },
  {
    label: "亮度-",
    value: 0x70,
  },
  {
    label: "计算器",
    value: 0x192,
  },
  {
    label: "文件管理器",
    value: 0x194,
  },
  {
    label: "浏览器",
    value: 0x223,
  },
];

export const mouseOptions = [
  {
    label: "左键",
    value: 1,
  },
  {
    label: "右键",
    value: 2,
  },
  {
    label: "中键",
    value: 4,
  },
];
