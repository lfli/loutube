<template>
  <div>
    <span style="color: red; font-size: 24px;" class="iconfont icon-youtube"></span>
    <span class="text">LouTube</span>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  props: {},
})
export default class LouTubeLog extends Vue {}
</script>

<style scoped>
div {
    display: flex;
    align-items: center;
}
.text {
    color: black;
    font-family: fantasy;
}
</style>