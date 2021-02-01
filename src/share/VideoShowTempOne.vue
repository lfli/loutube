<template>
  <div class="temp-box">
    <div class="temp-box-layer">
      <img class="box-img" :src="mv.cover" alt="">
      <div style="height: 12px"></div>
      <div class="box-content">
        <img
          width="36"
          class="head"
          src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1481892154,4046723754&fm=26&gp=0.jpg"
          alt=""
        />
        <div class="content-right">
          <div class="right-top">
            <span class="text"
              >{{mv.name}}</span
            >
            <span class="iconfont icon-menu- item-setting"></span>
          </div>
          <div class="right-bottom">
            <span>{{mv.artistName}}</span><br />
            <span>{{mv.playCount}}次观看</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  props: ["mv"],
})
export default class VideoShowTempOne extends Vue {}
</script>

<style scoped>
.temp-box {
  height: 0;
  padding-bottom: calc(55.8% + 94px); /** video 高宽比 0.558 */
  position: relative;
}
.temp-box-layer {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.box-img {
  flex: 1;
  width: 100%;
  background-color: black;
}
.box-content {
  width: 100%;
  height: 82px;
  display: flex;
  align-items: flex-start;
}
.head {
  border-radius: 50%;
  margin-right: 12px;
}
.content-right {
  flex: 1;
}
.content-right span {
  font-size: 14px;
  font-family: Roboto, Arial, sans-serif;
  color: #606060;
}
.right-top {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.text {
  color: #030303;
  flex: 1;
}
.item-setting {
  font-size: 24px !important;
  color: #909090;
}
</style>