<template>
  <el-button type="info" @click="visible = true">使用说明</el-button>

  <el-dialog v-model="visible" title="键盘使用说明 " width="64rem" top="8vh">
    <div>
      <h4 class="font-bold mb-1 text-black dark:text-gray-100">功能描述：</h4>

      <ul class="list-disc pl-4">
        <li>为键盘设置不同的灯光效果。</li>
        <li>
          为键盘按键设置不同的功能，如组合键，媒体键，鼠标按键以及一键密码。
        </li>
      </ul>

      <h4 class="font-bold my-1 text-black dark:text-gray-100">灯光修改：</h4>

      <p>键盘支持三种灯光效果，分别是：常亮模式，呼吸模式，以及渐变模式。</p>
      <ul class="list-disc pl-4">
        <li>常亮模式中，灯光会保持常亮，你可以设置灯光颜色和亮度。</li>
        <li>
          呼吸模式中，灯光亮度会周期性变化，可以通过设置间隔和步进来控制变化速率。
        </li>
        <li>
          渐变模式中，颜色会周期性变化，可以通过设置间隔和步进来控制颜色变化速率。
        </li>
      </ul>
      <h4 class="font-bold mb-1 text-red-400">注意：</h4>
      <ul class="list-disc pl-4">
        <li>
          亮度的值从小到大，将这个值
          <span class="text-sky-400 mr-1">设置为0</span>就可以关闭灯光。
        </li>
        <li>
          通过修改间隔和步进可以改变呼吸模式和渐变模式的周期，这两个功能通常会搭配在一起使用，以达到更好的控制效果。
        </li>
        <li class="font-bold">
          在选择好样式后，记得点击<span class="text-red-400">应用设置</span
          >来将设置应用到键盘上。
        </li>
        <li>
          在选择完颜色的时候，记得<span class="font-bold text-red-400"
            >点击OK</span
          >来确定该颜色。
        </li>
      </ul>

      <h4 class="font-bold my-1 text-black dark:text-gray-100">按键设置：</h4>
      <p>
        按键支持四种模式，分别是组合键模式，媒体键模式，鼠标模式，以及一键密码模式。
      </p>

      <ul class="list-disc pl-4">
        <li>组合键模式最多支持6个按键。</li>
        <li>媒体键可以控制音量和亮度，也可以一键打开计算器或者浏览器。</li>
        <li>鼠标模式支持绑定左键，右键以及中键。</li>
        <li>一键密码可以实现输入一段预设好的文本。</li>
      </ul>

      <h4 class="font-bold my-1 text-red-400">注意：</h4>
      <ul class="list-disc pl-4">
        <li>
          在绑定组合键时，推荐依次按下需要绑定的按键，原因是
          <span>Ctrl + W</span>
          之类的组合键会导致页面被关闭，而依次按下就不会有这个问题。
        </li>
        <li>
          在绑定
          <span>Win</span>
          键的时候，会弹出系统的窗口导致输入框失去焦点，此时重新点击输入框，然后键入下一个要绑定的按键既可。
        </li>
        <li class="font-bold">
          当修改好配置后，记得点击<span class="text-red-400">应用设置</span
          >来将设置应用到键盘上。
        </li>
      </ul>
    </div>
  </el-dialog>
</template>

<script setup>
import { ref } from "vue";

const visible = ref(false);
</script>

<style scoped></style>
