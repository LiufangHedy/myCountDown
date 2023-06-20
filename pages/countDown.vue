<template>
  <h2>hi this is my countdown component test!</h2>
  <my-count-down-component
    :time="options.time"
    :immediate="options.immediate"
    @finish="finish"
  >
    <template v-slot:myDefault="theProps"></template>
  </my-count-down-component>
  <my-count-down-component
    :time="71300"
    :immediate="options.immediate"
    format="HH:mm:ss"
    :clear="false"
    @finish="finish"
  >
    <template v-slot:myDefault="theProps">
      <div style="font-size: 20px">
        kkk
        <span>{{ theProps.minutes }}:{{ theProps.seconds }}</span>
      </div>
    </template>
  </my-count-down-component>
</template>
<script setup>
import MyCountDownComponent from "../components/index.vue";
let options = {
  time: 4000,
  format: undefined,
  immediate: false,
};
function finish() {
  console.log(options.time, " is over!");
}
</script>
<style></style>