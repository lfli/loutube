<template>
  <div class="temp-box">
    <div class="box-img">
      <div class="img-layer">
        <img class="my-img" :src="mv.cover" alt="" />
      </div>
    </div>
    <div class="box-content">
      <div class="right-top">
        <span class="content-title"
          >{{mv.name}}</span
        >
        <span class="iconfont icon-menu- item-setting"></span>
      </div>
      <div class="right-bottom">
        <div>
          <span>{{mv.artistName}} · {{mv.playCount}}次观看</span>
        </div>
        <div class="content-detail">
          <span>冬の縁起物「自然薯」で身も心も健康に(^^) ということで本日は自然薯とろろご飯御膳でございます。 今回Amazonにて購入いたしましたが 2/2現在で...</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { IMv } from "@/types";
import { Options, Vue } from "vue-class-component";

@Options({
    props: ["mv"],
})
export default class VideoShowTempTwo extends Vue {
    mv!: IMv;
}
</script>

<style scoped>
.temp-box {
  display: flex;
}
.box-img {
  width: 22%;
  min-width: 246px;
}
.img-layer {
  position: relative;
  height: 0;
  padding-bottom: 56%;
}
.my-img {
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: black;
}
.box-content {
  flex: 1;
  padding-left: 16px;
}
.right-top {
  display: flex;
}
.content-title {
  color: #030303;
  font-size: 18px;
  flex: 1;
}
.item-setting {
  font-size: 24px;
  color: #909090;
}
.right-bottom {
  font-size: 13px;
  color: #606060;
}
.content-detail {
  margin: 8px 0;
}
</style>