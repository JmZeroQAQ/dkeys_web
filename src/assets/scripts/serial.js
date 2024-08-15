const usbVendorId = 0x1209;
const usbProductId = 0xc550;
const baudRate = 9600;

let port;
let serialWriter;
let serialReader;
let readableStreamClosed;

export async function connectSerial() {
  const filters = [{ usbVendorId, usbProductId }];

  try {
    port = await navigator.serial.requestPort({ filters });
    await port.open({ baudRate });

    const textDecoder = new TextDecoderStream();
    readableStreamClosed = port.readable.pipeTo(textDecoder.writable);
    serialReader = textDecoder.readable.getReader();

    serialWriter = port.writable.getWriter();
  } catch (e) {
    console.log(e);
    return false;
  }

  return true;
}

export async function closeSerial() {
  if (serialReader !== null) {
    await serialReader.cancel().catch(() => {});
    serialReader = null;
  }

  if (readableStreamClosed !== null) {
    await readableStreamClosed.catch(() => {});
    readableStreamClosed = null;
  }

  if (serialWriter !== null) {
    serialWriter.releaseLock();
    serialWriter = null;
  }

  if (port !== null) {
    await port.close();
    port = null;
  }
}

export async function sendMessage(data) {
  await serialWriter.write(data);
}

export async function getConfig() {
  const data = stringToUintArray8(constructConfig(233, 0));
  sendMessage(data);
  let str = "";

  while (true) {
    const { value, done } = await serialReader.read();
    if (value) {
      str += value;
      if (str.includes("]")) {
        break;
      }
    }
    if (done) {
      console.log("read done");
      serialReader.releaseLock();
      break;
    }
  }
  // console.log(str);

  return JSON.parse(str);
}

export function constructConfig(idx, value) {
  return `{${idx}: ${value}}`;
}

export function stringToUintArray8(s) {
  const encoder = new TextEncoder();
  return encoder.encode(s);
}
