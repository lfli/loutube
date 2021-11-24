<template>
  <div @click="goHome()">
    <span class="span-icon iconfont icon-youtube"></span>
    <span class="span-text">LouTube</span>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  props: {},
  methods: {
    goHome() {
      this.$router.push("/");
    },
  },
})
export default class LouTubeLog extends Vue {}
</script>

<style scoped>
div {
  display: flex;
  align-items: center;
  cursor: pointer; /** 鼠标变小手 */
  user-select: none; /** 文字不可被选中 */
}
.span-icon {
  color: red;
  font-size: 24px;
  margin-right: 2px;
}
.span-text {
  color: black;
  font-family: fantasy;
  font-size: 22px;
}
</style>