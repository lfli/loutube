<template>
  <div>
    <img src="@/assets/githublog.png" alt="" />
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
  width: 140px;
  display: flex;
  justify-content: center;
  cursor: pointer; /** 鼠标变小手 */
  user-select: none; /** 文字不可被选中 */
  display: flex;
  align-items: center;
}
div span {
  color: white;
  align-self: center;
  font-family: cursive;
  font-size: 16px;
  margin-left: 6px;
}
div img {
  width: 22px;
  height: 22px;
}
</style>