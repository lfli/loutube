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
              :src="mvUrlState.mvUrl"
            >
              您的浏览器不支持 video 标签。
            </video>
            <div v-else class="my-video"></div>
          </div>
        </div>
        <div class="video-infor">
          <div>
            <span class="video-title">{{ mvDetailState.mv?.name }}</span>
          </div>
          <div>
            <span class="play-times"
              >{{ mvDetailState.mv?.playCount }}次观看 ·
              {{ mvDetailState.mv?.publishTime }}</span
            >
          </div>
        </div>
        <div class="artist-box">
          <div class="artist-box-top">
            <img
              class="head"
              :src="artistDetailState?.artistDetail.cover"
              alt=""
            />
            <div class="top-right">
              <div class="artist-name-box">
                <span class="artist-name">{{
                  artistDetailState?.artistDetail.name
                }}</span>
                <span class="sub-info">132万位订阅者</span>
              </div>
              <button class="sub-button">订阅</button>
            </div>
          </div>
          <div class="artist-box-content">
            <div>
              <span>{{ mvDetailState.mv?.desc }}</span>
            </div>
            <div
              class="artist-brief-desc"
              v-if="artistDetailState?.artistDetail.briefDesc"
            >
              <span>{{ artistDetailState?.artistDetail.briefDesc }}</span>
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
import {
  IArtistDetailState,
  IMvDetailState,
  IMvUrlState,
  ISimiMvState,
} from "./typing";
import {
  getArtistDetailRequest,
  getMvDetailRequest,
  getMvUrlRequest,
  getSimiMvListRequest,
} from "@/apis/requests/mv";
import router from "@/router";

@Options({
  components: {
    VideoShowTempTwo,
  },
  props: ["mvid"],
  beforeRouteUpdate(to, from, next) {
    this.myBeforeRouteUpdate(to);
    next();
  },
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

  mvDetailState = reactive<IMvDetailState>({
    curTitle: "当前 mv 详情",
    queryParams: {
      mvid: this.mvid,
    },
    mv: null,
  });

  artistDetailState = reactive<IArtistDetailState>({
    curTitle: "艺人详情",
    queryParams: {
      id: -1,
    },
    artistDetail: {
      id: -1,
      name: "",
      cover: "",
      briefDesc: "",
    },
  });

  myBeforeRouteUpdate(to: any) {
    this.simiMvState.queryParams.mvid = to.params.mvid;
    this.mvUrlState.queryParams.mvid = to.params.mvid;
    this.mvDetailState.queryParams.mvid = to.params.mvid;
    this.getMvUrl();
    this.getSimiMvList();
    this.getMvDetail().then(() => {
      this.getArtistDetail();
    });
  }

  created() {
    this.getMvUrl();
    this.getSimiMvList();
    this.getMvDetail().then(() => {
      this.getArtistDetail();
    });
  }

  async getSimiMvList() {
    const { mvs } = await getSimiMvListRequest(
      this.simiMvState.queryParams.mvid
    );
    this.simiMvState.mvList.splice(0, this.simiMvState.mvList.length);
    this.simiMvState.mvList.push(...mvs);
  }

  async getMvUrl() {
    const { data } = await getMvUrlRequest(this.mvUrlState.queryParams.mvid);
    this.mvUrlState.mvUrl = data.url;
  }

  async getMvDetail() {
    const { data } = await getMvDetailRequest(
      this.mvDetailState.queryParams.mvid
    );
    this.mvDetailState.mv = data;
  }

  async getArtistDetail() {
    this.artistDetailState.queryParams.id =
      this.mvDetailState.mv?.artistId || -1;
    const { data } = await getArtistDetailRequest(
      this.artistDetailState.queryParams.id
    );
    this.artistDetailState.artistDetail.id = data.artist.id;
    this.artistDetailState.artistDetail.name = data.artist.name;
    this.artistDetailState.artistDetail.cover = data.artist.cover;
    this.artistDetailState.artistDetail.briefDesc = data.artist.briefDesc;
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
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
.video-title {
  font-size: 18px;
  color: #030303;
}
.play-times {
  font-size: 14px;
  color: #606060;
  line-height: 40px;
}
.artist-box {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  margin-bottom: 18px;
}
.artist-box-top {
  display: flex;
  margin-top: 18px;
}
.artist-box-content {
  font-size: 14px;
  color: #030303;
  white-space: pre-wrap;
  line-height: 1.4rem;
  margin: 20px 0 0 62px;
  max-width: 615px;
}
.artist-brief-desc {
  margin-top: 16px;
  margin-bottom: 16px;
  padding-top: 8px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
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
.mv-list >>> .box-img {
  width: 168px;
  min-width: 168px;
}
.mv-list >>> .content-title {
  -webkit-line-clamp: 1;
}
.mv-list >>> .content-detail {
  -webkit-line-clamp: 2;
}
.mv-list >>> .box-content {
  max-width: none;
}
.comment-list {
  width: 100%;
  height: 100px;
  background-color: blueviolet;
}
@media screen and (max-width: 830px) {
  .box-video {
    width: 100%;
    margin: 0 auto;
  }
  .mv-list {
    width: 100%;
    padding: 0 24px;
  }
}
@media screen and (min-width: 831px) and (max-width: 1023px) {
  .box-video {
    width: 770px;
    margin: 0 auto;
  }
  .mv-list {
    width: 100%;
    padding: 0 24px;
  }
}
@media screen and (min-width: 1024px) {
  .watch-box {
    width: 63%;
    min-width: 640px;
  }
  .mv-list {
    flex: 1;
    min-width: 300px;
    padding-right: 24px;
  }
}
</style>