<template>
  <div class="temp-box">
    <div class="temp-box-layer">
      <div class="box-img-box">
        <img class="box-img" :src="mv.cover" alt="" />
        <div class="box-duration">
          <span>{{ $filters.duration(mv.duration) }}</span>
        </div>
      </div>
      <div style="height: 12px"></div>
      <div class="box-content">
        <img
          v-if="state.head.length > 0"
          width="36"
          class="head"
          :src="state.head"
          alt=""
        />
        <img
          v-else
          width="36"
          class="head"
          src="../assets/defaultHead.jpg"
          alt=""
        />
        <div class="content-right">
          <div class="right-top">
            <span class="text hideText">{{ mv.name }}</span>
            <span class="iconfont icon-menu- item-setting"></span>
          </div>
          <div class="right-bottom">
            <span>{{ mv.artistName }}</span
            ><br />
            <span>{{ $filters.playCount(mv.playCount) }}次观看</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { getArtistDetailRequest } from "@/apis/requests/mv";
import { IMv } from "@/typing";
import { reactive } from "vue";
import { Options, Vue } from "vue-class-component";
import { IHeadState } from "./typing";

@Options({
  props: ["mv"],
})
export default class VideoShowTempOne extends Vue {
  mv!: IMv;
  state = reactive<IHeadState>({
    curTitle: "艺人头像",
    queryParams: {
      id: this.mv.artistId,
    },
    head: "",
  });
  created() {
    this.getHead();
  }
  async getHead() {
    try {
      const { data } = await getArtistDetailRequest(this.state.queryParams.id);
      if (data.artist.cover) {
        this.state.head = data.artist.cover;
      }
    } catch (error) {
      console.log(error);
    }
  }
}
</script>

<style scoped>
.temp-box {
  height: 0;
  padding-bottom: calc(56.25% + 94px); /** video 高宽比 0.5625 */
  position: relative;
}
.temp-box-layer {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  user-select: none;
}
.box-img-box {
  flex: 1;
  width: 100%;
}
.box-img {
  width: 100%;
  height: 100%;
  background-color: black;
}
.box-duration {
  position: absolute;
  top: calc(100% - 94px - 24px);
  right: 4px;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  border-radius: 2px;
  padding: 3px 4px;
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
  width: 36px;
  height: 36px;
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
  -webkit-line-clamp: 2;
}
.item-setting {
  font-size: 24px !important;
  color: #909090;
  opacity: 0;
}
.temp-box:hover .item-setting {
  opacity: 1;
}
</style>