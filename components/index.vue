<template>
  <div class="count-down">
    <!-- 把currentTime传递给调用该组件的父组件，通过slot插槽的形式传递,父组件通过v-slot指令接收传递的参数 -->
    <!-- 父组件得到实际时间后，可以自定义倒计时样式 -->
    <slot v-bind="currentTime" name="myDefault">
      <h1>{{ currentTime.format }}</h1>
    </slot>
    <button
      class="btn"
      :class="
        isCounting ? (isStop ? 'start-time' : 'pause-time') : 'disabled-btn'
      "
      @click="switchStopOrPause"
      :disabled="!isCounting"
    >
      {{ isStop ? "Start" : "Pause" }}
    </button>
    <button
      v-if="props.clear"
      class="btn"
      :class="isCounting ? 'clear-time' : 'disabled-btn'"
      @click="toClearTime"
      :disabled="!isCounting"
    >
      Clear Time
    </button>
    <button v-if="props.reset" class="reset-time btn" @click="resetTime">
      Reset
    </button>
  </div>
</template>
<script setup>
import { onMounted } from "vue";
import useCountDown from "./useCountDown";
const props = defineProps({
  time: {
    type: Number,
    default: 0,
  },
  format: {
    type: String,
    default: "DD:HH:mm:ss:SSS",
  },
  immediate: {
    type: Boolean,
    default: true,
  },
  reset: {
    type: Boolean,
    default: true,
  },
  clear: {
    type: Boolean,
    default: true,
  },
  //   buttons: {
  //     type: Object,
  //     default() {
  //       return {
  //         reset: true,
  //         clear: true,
  //       };
  //     },
  //   },
});
const emits = defineEmits(["finish"]);
const {
  start,
  currentTime,
  isStop,
  switchStopOrPause,
  isCounting,
  toClearTime,
  resetTime,
} = useCountDown({
  ...props,
  onFinish: () => {
    // console.log("in countdown vue com: ", emits);
    emits("finish");
  },
});
onMounted(() => {
  if (props.immediate) start();
  console.log(
    "countDown com: time: ",
    props.time,
    props.format,
    props.immediate
  );
  console.log("the stop status: ", stop);
  //   emits("finish");
});
defineExpose({
  start,
  currentTime,
});
</script>
<style>
.clear-time {
  background-color: #f56c6c;
}
.reset-time {
  background-color: #409eff;
}
.btn {
  border: none;
  border-radius: 6px;
  height: 30px;
  margin-right: 10px;
  padding: 6px 10px;
  color: aliceblue;
}
.start-time {
  background-color: #67c23a;
}
.pause-time {
  background-color: #e6a23c;
}
.disabled-btn {
  background-color: #909399;
}
</style>