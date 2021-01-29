<template>
  <div>
    <span>个人项目</span>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  props: {},
})
export default class MyProject extends Vue {}
</script>

<style scoped>
div {
  background-color: #065fd4;
  height: 100%;
  width: 10vw;
  display: flex;
  justify-content: center;
  cursor: pointer; /** 鼠标变小手 */
  user-select: none; /** 文字不可被选中 */
}
div span {
  color: white;
  align-self: center;
  font-family: cursive;
  font-size: 16px;
}
</style>