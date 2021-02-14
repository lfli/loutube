<template>
  <div id="watch-outer">
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
            <div v-else class="my-video">
              <span>{{ mvUrlErrorMsg }}</span>
            </div>
          </div>
        </div>
        <div class="video-info">
          <div>
            <span class="video-title">{{ mvDetailState.mv?.name }}</span>
          </div>
          <div class="base-info-box">
            <span class="play-times"
              >{{ mvDetailState.mv?.playCount }}次观看 ·
              {{ mvDetailState.mv?.publishTime }}</span
            >
            <div class="comment-zan-box">
              <span class="iconfont icon-zan comment-zan"></span>
              <span class="comment-zan-count">{{
                mvLikedCountState.likedCount
              }}</span>
              <span class="iconfont icon-zan comment-cai"></span>
              <span class="comment-zan-count"></span>
            </div>
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
      <div
        v-show="!isSmallScreen"
        class="mv-list"
        v-autoLoading="{
          commandAutoLoading: mvListAutoLoading,
          autoLoading: mvListLoading,
        }"
      >
        <template v-for="mv of simiMvState.mvList" :key="mv.id">
          <VideoShowTempTwo :mv="mv" @click="goWatch(mv)"></VideoShowTempTwo>
          <div style="height: 8px"></div>
        </template>
        <template v-for="mv of artistMvState.mvList" :key="mv.id">
          <VideoShowTempTwo :mv="mv" @click="goWatch(mv)"></VideoShowTempTwo>
          <div style="height: 8px"></div>
        </template>
        <div v-show="mvListAutoLoading.isCommand === false" class="loading-box">
          <RotateLoading />
        </div>
      </div>
      <div v-show="isSmallScreen" class="mv-list">
        <template v-for="mv of simiMvState.mvList" :key="mv.id">
          <VideoShowTempTwo :mv="mv" @click="goWatch(mv)"></VideoShowTempTwo>
          <div style="height: 8px"></div>
        </template>
        <template v-for="mv of artistMvState.mvList" :key="mv.id">
          <VideoShowTempTwo :mv="mv" @click="goWatch(mv)"></VideoShowTempTwo>
          <div style="height: 8px"></div>
        </template>
        <div>
          <button @click="mvListLoadingForClick()">更多</button>
        </div>
      </div>

      <div
        class="comment-list"
        v-autoLoading="{
          commandAutoLoading: commentListAutoLoading,
          autoLoading: commentListLoading,
        }"
      >
        <template
          v-for="hotComment of commentMvState.hotComments"
          :key="hotComment.commentId"
        >
          <Comment :comment="hotComment"></Comment>
          <div style="height: 16px"></div>
        </template>
        <template
          v-for="comment of commentMvState.comments"
          :key="comment.commentId"
        >
          <Comment :comment="comment"></Comment>
          <div style="height: 16px"></div>
        </template>
        <div
          v-show="commentListAutoLoading.isCommand === false"
          class="loading-box"
        >
          <RotateLoading />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import VideoShowTempTwo from "@/share/VideoShowTempTwo.vue";
import { reactive } from "vue";
import {
  IArtistDetailState,
  IArtistMvState,
  ICommentMvState,
  IMvDetailState,
  IMvLikedCountState,
  IMvUrlState,
  ISimiMvState,
} from "./typing";
import {
  getArtistDetailRequest,
  getArtistMvRequest,
  getCommentMvRequest,
  getMvDetailInfoRequest,
  getMvDetailRequest,
  getMvUrlRequest,
  getPopularNowListRequest,
  getSimiMvListRequest,
} from "@/apis/requests/mv";
import router from "@/router";
import { IArtistMv, IMv } from "@/typing";
import RotateLoading from "@/share/RotateLoading.vue";
import Comment from "@/share/Comment.vue";

@Options({
  components: {
    VideoShowTempTwo,
    RotateLoading,
    Comment,
  },
  props: ["mvid"],
  beforeRouteUpdate(to, from, next) {
    this.myBeforeRouteUpdate(to);
    next();
  },
})
export default class Watch extends Vue {
  mvid!: number;
  mvListAutoLoading = { isCommand: true };
  commentListAutoLoading = { isCommand: true };
  mvUrlErrorMsg = "";
  isSmallScreen = false;

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

  artistMvLimit = 10;
  artistMvLoadMoreCount = 0;
  artistMvState = reactive<IArtistMvState>({
    curTitle: "歌手 mv",
    queryParams: {
      id: -1,
      limit: this.artistMvLimit,
    },
    mvList: [],
    hasMore: false,
  });

  commentMvLimit = 10;
  commentMvLoadMoreCount = 0;
  commentMvState = reactive<ICommentMvState>({
    curTitle: "mv 评论",
    queryParams: {
      id: this.mvid,
      limit: this.commentMvLimit,
    },
    hotComments: [],
    comments: [],
    total: 0,
    more: false,
  });

  mvLikedCountState = reactive<IMvLikedCountState>({
    curTitle: "mv 点赞数量",
    queryParams: {
      mvid: this.mvid,
    },
    likedCount: 0,
  });

  myBeforeRouteUpdate(to: any) {
    this.simiMvState.queryParams.mvid = to.params.mvid;
    this.mvUrlState.queryParams.mvid = to.params.mvid;
    this.mvDetailState.queryParams.mvid = to.params.mvid;
    this.commentMvState.queryParams.id = to.params.mvid;
    this.mvLikedCountState.queryParams.mvid = to.params.mvid;
    this.init();
  }

  created() {
    this.init();
  }

  mounted() {
    // 监听窗口大小，改变 mv-list 加载更多方式
    const element = document.getElementById("watch-outer");
    if (element) {
      if (element.offsetWidth <= 1023) {
        this.isSmallScreen = true;
        this.mvListAutoLoading.isCommand = false;
      } else {
        this.isSmallScreen = false;
        this.mvListAutoLoading.isCommand = true;
      }
      window.onresize = () => {
        if (element.offsetWidth <= 1023) {
          this.isSmallScreen = true;
          this.mvListAutoLoading.isCommand = false;
        } else {
          this.isSmallScreen = false;
          this.mvListAutoLoading.isCommand = true;
        }
      };
    }
  }

  init() {
    // 可能切换 mv
    this.artistMvLoadMoreCount = 0; // 重置次数
    this.popularNowLoadMoreCount = 0;
    this.commentMvLoadMoreCount = 0;
    const element = document.getElementById("watch-outer");
    if (element) {
      element.scrollTop = 0; // 重置窗口位置
    }
    this.getMvUrl();
    this.getMvLikedCount();
    // this.getSimiMvList();
    this.getMvDetail().then(() => {
      this.getArtistDetail();
      this.getArtistMvList();
    });
    this.getCommentMvList();
  }

  unmounted() {
    this.mvListAutoLoading.isCommand = false;
    this.commentListAutoLoading.isCommand = false;
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
    if (data.code == 200) {
      this.mvUrlState.mvUrl = data.url;
    } else {
      this.mvUrlState.mvUrl = "";
      this.mvUrlErrorMsg = data.msg;
    }
  }

  async getMvLikedCount() {
    const { likedCount } = await getMvDetailInfoRequest(
      this.mvLikedCountState.queryParams.mvid
    );
    this.mvLikedCountState.likedCount = likedCount;
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

  async getArtistMvList() {
    this.artistMvState.queryParams.id = this.mvDetailState.mv?.artistId || -1;
    const result = await getArtistMvRequest(this.artistMvState.queryParams.id);
    this.artistMvState.mvList.splice(0, this.artistMvState.mvList.length);
    result.mvs = result.mvs.map((mv: IArtistMv) => {
      mv.cover = mv.imgurl16v9;
      return mv;
    });
    this.artistMvState.mvList.push(...result.mvs);
    this.artistMvState.hasMore = result.hasMore;
    // 如果不足 10 条，加载 PopularNow 数据凑数
    if (this.artistMvState.mvList.length < 10) {
      this.getPopularNowList();
    }
  }

  async getCommentMvList() {
    const { total, more, comments, hotComments } = await getCommentMvRequest(
      this.commentMvState.queryParams.id,
      this.commentMvState.queryParams.limit
    );
    this.commentMvState.hotComments.splice(
      0,
      this.commentMvState.hotComments.length
    );
    this.commentMvState.comments.splice(0, this.commentMvState.comments.length);
    if (hotComments) {
      this.commentMvState.hotComments.push(...hotComments);
    }
    if (comments) {
      this.commentMvState.comments.push(...comments);
    }
    this.commentMvState.total = total;
    this.commentMvState.more = more;
  }

  goWatch(mv: IMv) {
    // 用于 mv 没有版权时显示 mv 名字
    const temp = this.mvDetailState.mv;
    if (temp) {
      temp.name = mv.name;
    }
    router.push({ path: `/watch/${mv.id}` });
  }

  async mvListLoading() {
    this.mvListAutoLoading.isCommand = false;
    try {
      if (this.artistMvState.hasMore) {
        await this.loadMoreArtistMv();
      } else {
        console.log("artistMv 没有更多了");
        await this.getPopularNowList();
      }
    } catch (error) {
      this.mvListAutoLoading.isCommand = true;
    }
    this.mvListAutoLoading.isCommand = true;
  }

  mvListLoadingForClick() {
    if (this.artistMvState.hasMore) {
      this.loadMoreArtistMv();
    } else {
      console.log("artistMv 没有更多了");
      this.getPopularNowList();
    }
  }

  async loadMoreArtistMv() {
    const result = await getArtistMvRequest(
      this.artistMvState.queryParams.id,
      this.artistMvState.queryParams.limit * ++this.artistMvLoadMoreCount
    );
    result.mvs = result.mvs.map((mv: IArtistMv) => {
      mv.cover = mv.imgurl16v9;
      return mv;
    });
    this.artistMvState.mvList.push(...result.mvs);
    this.artistMvState.hasMore = result.hasMore;
  }

  // 当 ArtistMv 没有更多时，使用 PopularNow
  popularNowLimit = 10;
  popularNowLoadMoreCount = 0;
  async getPopularNowList() {
    const { data } = await getPopularNowListRequest(
      this.popularNowLimit,
      "全部",
      this.popularNowLimit * this.popularNowLoadMoreCount++
    );
    this.artistMvState.mvList.push(...data);
  }

  commentListLoading() {
    if (this.commentMvState.more) {
      this.loadMoreCommentMv();
    } else {
      console.log("commentMv 没有更多了");
    }
  }

  async loadMoreCommentMv() {
    this.commentListAutoLoading.isCommand = false;
    try {
      const { total, more, comments, hotComments } = await getCommentMvRequest(
        this.commentMvState.queryParams.id,
        this.commentMvState.queryParams.limit,
        this.commentMvState.queryParams.limit * ++this.commentMvLoadMoreCount
      );
      if (hotComments) {
        this.commentMvState.hotComments.push(...hotComments);
      }
      if (comments) {
        this.commentMvState.comments.push(...comments);
      }
      this.commentMvState.total = total;
      this.commentMvState.more = more;
    } catch (error) {
      this.commentListAutoLoading.isCommand = true;
    }
    this.commentListAutoLoading.isCommand = true;
  }
}
</script>

<style scoped>
.watch {
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-rows: auto 1fr;
  padding-top: 24px;
}
.watch-box {
  padding: 0 24px;
}
.comment-list {
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
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: black;
}
.video-info {
  width: 100%;
  padding: 20px 0 8px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
.base-info-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  padding-bottom: 18px;
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
@media screen and (max-width: 830px) {
  .watch-box {
    grid-column: 1 / 3;
  }
  .box-video {
    width: 100%;
  }
  .mv-list {
    grid-column: 1 / 3;
    padding: 0 24px;
  }
  .comment-list {
    grid-column: 1 / 3;
  }
}
@media screen and (min-width: 831px) and (max-width: 1023px) {
  .watch-box {
    grid-column: 1 / 3;
  }
  .box-video {
    width: 770px;
    margin: 0 auto;
  }
  .mv-list {
    grid-column: 1 / 3;
    padding: 0 24px;
  }
  .comment-list {
    grid-column: 1 / 3;
  }
}
@media screen and (min-width: 1024px) {
  .watch-box {
    min-width: 640px;
  }
  .mv-list {
    grid-column: 2 / 3;
    grid-row: 1 / 3;
    padding-right: 24px;
    max-width: 402px;
    min-width: 300px;
  }
  .comment-list {
  }
}
.loading-box {
  display: flex;
  justify-content: center;
}
.comment-zan-box {
  display: flex;
  align-items: center;
}
.comment-zan {
  font-size: 24px;
  color: #909090;
  margin-right: 6px;
}
.comment-cai {
  font-size: 24px;
  color: #909090;
}
.comment-cai:before {
  display: inline-block;
  transform: rotate(180deg);
}
.comment-zan-count {
  font-size: 14px;
  color: #606060;
  margin-right: 3vw;
}
</style>