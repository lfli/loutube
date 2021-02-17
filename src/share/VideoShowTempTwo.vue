<template>
  <div class="temp-box">
    <div class="box-img" @click="$attrs.onClick()">
      <div class="img-layer">
        <div class="box-img-box">
          <img class="my-img" :src="mv.cover" alt="" />
          <div class="box-duration">
            <span>{{ $filters.duration(mv.duration) }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="box-content" @click="$attrs.onClick()">
      <div class="right-top">
        <span class="content-title hideText">{{ mv.name }}</span>
        <span class="iconfont icon-menu- item-setting"></span>
      </div>
      <div class="right-bottom">
        <div class="hideText">
          <span
            >{{ mv.artistName }} ·
            {{ $filters.playCount(mv.playCount) }}次观看</span
          >
        </div>
        <div class="content-detail hideText">
          <span>{{ state.desc }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { getMvDetailRequest } from "@/apis/requests/mv";
import { IMv } from "@/typing";
import { reactive } from "vue";
import { Options, Vue } from "vue-class-component";
import { IMvDescState } from "./typing";

@Options({
  inheritAttrs: false,
  props: ["mv"],
})
export default class VideoShowTempTwo extends Vue {
  mv!: IMv;
  state = reactive<IMvDescState>({
    curTitle: "mv 描述",
    queryParams: {
      mvid: this.mv.id,
    },
    desc: "",
  });
  created() {
    this.getMvDesc();
  }
  async getMvDesc() {
    const { data } = await getMvDetailRequest(this.state.queryParams.mvid);
    this.state.desc = data.desc;
  }
}
</script>

<style scoped>
.temp-box {
  display: flex;
}
.box-img {
  width: 22%;
  min-width: 246px;
  cursor: pointer;
  user-select: none;
}
.img-layer {
  position: relative;
  height: 0;
  padding-bottom: 56.25%;
}
.box-img-box {
  position: absolute;
  height: 100%;
  width: 100%;
}
.my-img {
  height: 100%;
  width: 100%;
  background-color: black;
}
.box-duration {
  position: absolute;
  bottom: 4px;
  right: 4px;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  border-radius: 2px;
  padding: 3px 4px;
}
.box-content {
  flex: 1;
  padding-left: 16px;
  max-width: 600px;
  cursor: pointer;
  user-select: none;
}
.right-top {
  display: flex;
}
.content-title {
  color: #030303;
  font-size: 18px;
  flex: 1;
  -webkit-line-clamp: 2;
}
.item-setting {
  font-size: 24px;
  color: #909090;
  opacity: 0;
}
.temp-box:hover .item-setting {
  opacity: 1;
}
.right-bottom {
  font-size: 13px;
  color: #606060;
}
.content-detail {
  margin: 8px 0;
  -webkit-line-clamp: 4;
}
</style>