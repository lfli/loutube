<template>
  <div>
    <div class="watch">
      <div class="watch-box">
        <div class="box-video">
          <div class="video-layer">
            <video
              v-if="mvUrlState.mvUrl.length > 0"
              class="my-video"
              controls
              autoplay
            >
              <source :src="mvUrlState.mvUrl" type="video/mp4" />
              您的浏览器不支持 video 标签。
            </video>
            <div v-else class="my-video"></div>
          </div>
        </div>
        <div class="video-infor">
          <div>
            <span class="video-title"
              >あいみょん – ハルノヒ【OFFICIAL MUSIC VIDEO】</span
            >
          </div>
          <div>
            <span class="play-times">134234323次观看 · 2019年4月3日</span>
          </div>
        </div>
        <div class="artist-box">
          <div class="artist-box-top">
            <img class="head" src="" alt="" />
            <div class="top-right">
              <div class="artist-name-box">
                <span class="artist-name">あいみょん</span>
                <span class="sub-info">132万位订阅者</span>
              </div>
              <button class="sub-button">订阅</button>
            </div>
          </div>
        </div>
      </div>
      <div class="mv-list">
        <template v-for="mv of simiMvState.mvList" :key="mv.id">
          <VideoShowTempTwo :mv="mv" @click="goWatch(mv.id)"></VideoShowTempTwo>
          <div style="height: 8px"></div>
        </template>
      </div>
      <!-- <div class="comment-list"></div> -->
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import VideoShowTempTwo from "@/share/VideoShowTempTwo.vue";
import { reactive } from "vue";
import { IMvUrlState, ISimiMvState } from "./typing";
import { getMvUrlRequest, getSimiMvListRequest } from "@/apis/requests/mv";
import router from "@/router";

@Options({
  components: {
    VideoShowTempTwo,
  },
  props: ["mvid"],
})
export default class Watch extends Vue {
  mvid!: number;
  simiMvState = reactive<ISimiMvState>({
    curTitle: "相似 mv 列表",
    queryParams: {
      mvid: this.mvid,
    },
    mvList: [],
  });

  mvUrlState = reactive<IMvUrlState>({
    curTitle: "mv 地址",
    queryParams: {
      mvid: this.mvid,
    },
    mvUrl: "",
  });

  created() {
    this.getMvUrl();
    this.getSimiMvList();
  }

  async getSimiMvList() {
    const { mvs } = await getSimiMvListRequest(
      this.simiMvState.queryParams.mvid
    );
    this.simiMvState.mvList.push(...mvs);
  }

  async getMvUrl() {
    const { data } = await getMvUrlRequest(this.mvUrlState.queryParams.mvid);
    this.mvUrlState.mvUrl = data.url;
  }

  goWatch(mvid: number) {
    router.push({ path: `/watch/${mvid}` });
  }
}
</script>

<style scoped>
.watch {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding-top: 24px;
}
.watch-box {
  width: 100%;
  padding: 0 24px;
}
.video-layer {
  position: relative;
  height: 0;
  padding-bottom: 56.25%;
}
.my-video {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: black;
}
.video-infor {
  width: 100%;
  padding: 20px 0 8px;
  border-bottom: 1px solid gray;
}
.video-title {
  font-size: 18px;
  color: #030303;
}
.play-times {
  font-size: 14px;
  color: #606060;
}
.artist-box {
  border-bottom: 1px solid gray;
}
.artist-box-top {
  display: flex;
}
.head {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: black;
}
.artist-name-box {
  display: flex;
  flex-direction: column;
}
.artist-name {
  font-size: 14px;
  color: #030303;
}
.sub-info {
  font-size: 13px;
  color: #606060;
}
.top-right {
  flex: 1;
  margin-left: 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.sub-button {
}
.mv-list {
  display: flex;
  flex-direction: column;
}
.comment-list {
  width: 100%;
  height: 100px;
  background-color: blueviolet;
}
@media screen and (max-width: 800px) {
  .box-video {
    width: 100%;
    max-width: calc(800px * 0.74);
    margin: 0 auto;
  }
  .mv-list {
    width: 100%;
    padding: 0 24px;
  }
}
@media screen and (min-width: 800px) and (max-width: 1000px) {
  .box-video {
    width: 74%;
    margin: 0 auto;
  }
  .mv-list {
    width: 100%;
    padding: 0 24px;
  }
}
@media screen and (min-width: 1000px) {
  .watch-box {
    width: 50%;
    min-width: 600px;
  }
  .mv-list {
    width: 32%;
    min-width: 307px;
    padding-right: 24px;
  }
}
</style>