<template>
  <div id="watch-outer">
    <div class="watch">
      <div class="watch-box">
        <div class="box-video">
          <div class="video-layer">
            <video
              v-if="mvUrl.length > 0"
              class="my-video"
              controls
              autoplay
              :src="mvUrl"
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
            <span class="video-title">{{ mv?.name }}</span>
          </div>
          <div class="base-info-box">
            <span class="play-times"
              >{{ $filters.internationalNumber(mv?.playCount) }}次观看 ·
              {{ $filters.dateFormat(mv?.publishTime) }}</span
            >
            <div class="comment-zan-box">
              <span
                v-if="isLikedMv(mv?.id)"
                class="iconfont icon-zan comment-zan"
                style="color: #3260d4"
                :disabled="!isAllowLike"
                @click="unlike()"
              ></span>
              <span
                v-else
                class="iconfont icon-zan comment-zan"
                :disabled="!isAllowLike"
                @click="like()"
              ></span>

              <span class="comment-zan-count">{{
                $filters.internationalNumber(likedCount)
              }}</span>
              <span class="iconfont icon-zan comment-cai"></span>
              <span class="comment-zan-count"></span>
            </div>
          </div>
        </div>
        <div class="artist-box">
          <div class="artist-box-top">
            <img class="head" :src="artistDetail?.cover" alt="" />
            <div class="top-right">
              <div class="artist-name-box">
                <span class="artist-name">{{ artistDetail?.name }}</span>
              </div>
              <button
                v-if="isSubscription(artistDetail?.id)"
                class="sub-button"
                style="background-color: #ececec; color: #606060"
                :disabled="!isAllowSubscription"
                @click="unsubscription(artistDetail?.id)"
              >
                已订阅
              </button>
              <button
                v-else
                class="sub-button"
                :disabled="!isAllowSubscription"
                @click="subscription()"
              >
                订阅
              </button>
            </div>
          </div>
          <div class="artist-box-content">
            <div>
              <span>{{ mv?.desc }}</span>
            </div>
            <div class="artist-brief-desc" v-if="artistDetail?.briefDesc">
              <span>{{ artistDetail?.briefDesc }}</span>
            </div>
          </div>
        </div>
      </div>
      <div ref="mvList" v-show="!isSmallScreen" class="mv-list">
        <template v-for="mv of simiMvList" :key="mv.id">
          <VideoShowTempTwo :mv="mv" @click="goWatch(mv)"></VideoShowTempTwo>
          <div style="height: 8px"></div>
        </template>
        <template v-for="mv of artistMvList" :key="mv.id">
          <VideoShowTempTwo :mv="mv" @click="goWatch(mv)"></VideoShowTempTwo>
          <div style="height: 8px"></div>
        </template>
        <div
          v-show="!mvListAutoLoading.isCommand || mvListIsLoading"
          class="loading-box"
        >
          <RotateLoading />
        </div>
      </div>
      <div v-show="isSmallScreen" class="mv-list">
        <template v-for="mv of simiMvList" :key="mv.id">
          <VideoShowTempTwo :mv="mv" @click="goWatch(mv)"></VideoShowTempTwo>
          <div style="height: 8px"></div>
        </template>
        <template v-for="mv of artistMvList" :key="mv.id">
          <VideoShowTempTwo :mv="mv" @click="goWatch(mv)"></VideoShowTempTwo>
          <div style="height: 8px"></div>
        </template>
        <div class="mv-list-load-click ripple" @click="mvListLoadingForClick()">
          展开
        </div>
      </div>

      <div ref="commentList" class="comment-list">
        <div class="comment-count-box">
          <span
            >{{
              commentMv.total === 0
                ? 0
                : $filters.internationalNumber(commentMv.total)
            }}
            条评论</span
          >
        </div>
        <template
          v-for="hotComment of commentMv.hotComments"
          :key="hotComment.commentId"
        >
          <Comment :comment="hotComment"></Comment>
          <div style="height: 16px"></div>
        </template>
        <template
          v-for="comment of commentMv.comments"
          :key="comment.commentId"
        >
          <Comment :comment="comment"></Comment>
          <div style="height: 16px"></div>
        </template>
        <div v-show="commentListIsLoading" class="loading-box">
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
import { IMv } from "@/typing";
import RotateLoading from "@/share/RotateLoading.vue";
import Comment from "@/share/Comment.vue";
import { mapGetters } from "vuex";
import { titleMixin } from "@/mixins/titleMixin";
import { loadScrollEvent } from "@/share/util";

@Options({
  mixins: [titleMixin],
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
  computed: {
    ...mapGetters("Subscription", ["isSubscription"]),
    ...mapGetters("LikedMv", ["isLikedMv"]),
    ...mapGetters("WatchMv", [
      "simiMvList",
      "artistMvList",
      "likedCount",
      "mv",
      "artistDetail",
      "commentMv",
      "mvUrlErrorMsg",
      "mvUrl",
    ]),
  },
})
export default class Watch extends Vue {
  $store: any;
  commentMv: any;

  mvid!: number;
  mvListAutoLoading = { isCommand: true };
  commentListAutoLoading = { isCommand: true };
  isSmallScreen = false;
  isAllowSubscription = false;
  isAllowLike = false;
  mvListIsLoading = true;
  commentListIsLoading = false;
  isUnmounted = false;

  simiMvState = reactive<ISimiMvState>({
    curTitle: "相似 mv 列表",
    queryParams: {
      mvid: this.mvid,
    },
  });

  mvUrlState = reactive<IMvUrlState>({
    curTitle: "mv 地址",
    queryParams: {
      mvid: this.mvid,
    },
  });

  mvDetailState = reactive<IMvDetailState>({
    curTitle: "当前 mv 详情",
    queryParams: {
      mvid: this.mvid,
    },
  });

  artistDetailState = reactive<IArtistDetailState>({
    curTitle: "艺人详情",
    queryParams: {
      id: -1,
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
    hasMore: true,
  });

  commentMvLimit = 10;
  commentMvLoadMoreCount = 0;
  commentMvState = reactive<ICommentMvState>({
    curTitle: "mv 评论",
    queryParams: {
      id: this.mvid,
      limit: this.commentMvLimit,
    },
  });

  mvLikedCountState = reactive<IMvLikedCountState>({
    curTitle: "mv 点赞数量",
    queryParams: {
      mvid: this.mvid,
    },
  });

  asyncData(store: any, route: any) {
    return Promise.all([
      this.getMvUrl(store, route),
      this.getMvLikedCount(store, route),
      this.getMvDetail(store, route).then(async () => {
        await this.getArtistDetail(store, route);
        await this.getArtistMvList(store, route);
        await store.dispatch("HistoryMv/addHistoryMv", store.state.WatchMv.mv);
      }),
      this.getCommentMvList(store, route),
    ]).then();
  }

  myBeforeRouteUpdate(to: any) {
    this.simiMvState.queryParams.mvid = to.params.mvid;
    this.mvUrlState.queryParams.mvid = to.params.mvid;
    this.mvDetailState.queryParams.mvid = to.params.mvid;
    this.commentMvState.queryParams.id = to.params.mvid;
    this.mvLikedCountState.queryParams.mvid = to.params.mvid;
    this.init(false);
  }

  mounted() {
    this.init(true);

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

    loadScrollEvent(this.$refs.mvList as any, {
      value: {
        commandAutoLoading: this.mvListAutoLoading,
        autoLoading: this.mvListLoading,
      },
    });

    loadScrollEvent(this.$refs.commentList as any, {
      value: {
        commandAutoLoading: this.commentListAutoLoading,
        autoLoading: this.commentListLoading,
      },
    });
  }

  init(isMounted: boolean) {
    if ( // 如果在当前页面刷新，停止执行下面代码
      isMounted &&
      this.$store.state.WatchMv.mvUrl.length > 0 &&
      this.$store.state.WatchMv.mv.id == this.mvid
    ) {
      return;
    }

    this.$store.dispatch("TopProgressBar/pleaseStart");
    this.isAllowSubscription = false;
    this.isAllowLike = false;
    // 可能切换 mv
    this.artistMvLoadMoreCount = 0; // 重置次数
    this.popularNowLoadMoreCount = 0;
    this.commentMvLoadMoreCount = 0;
    const element = document.getElementById("watch-outer");
    if (element) {
      element.scrollTop = 0; // 重置窗口位置
    }
    this.getMvUrl().then(() => {
      this.$store.dispatch("TopProgressBar/pleaseEnd");
    });
    this.getMvLikedCount();
    // this.getSimiMvList();
    this.getMvDetail().then(() => {
      this.isAllowLike = true;
      this.getArtistDetail().then(() => {
        this.isAllowSubscription = true;
      });
      this.getArtistMvList().then(() => {
        this.mvListIsLoading = false;
      });
      this.$store.dispatch(
        "HistoryMv/addHistoryMv",
        this.$store.state.WatchMv.mv
      );
    });

    this.commentListIsLoading = true;
    this.getCommentMvList().then(() => {
      this.commentListIsLoading = false;
    });
  }

  unmounted() {
    this.isUnmounted = true;
    this.mvListAutoLoading.isCommand = false;
    this.commentListAutoLoading.isCommand = false;
  }

  async getSimiMvList() {
    this.$store.state.WatchMv.simiMvList.splice(
      0,
      this.$store.state.WatchMv.simiMvList.length
    );
    this.$store.dispatch("WatchMv/getSimiMvListRequest", {
      mvid: this.simiMvState.queryParams.mvid,
    });
  }

  async getMvUrl(store?: any, route?: any) {
    store = store || this.$store;

    const mvid = this.mvUrlState
      ? this.mvUrlState.queryParams.mvid
      : route.value.params.mvid;

    await store.dispatch("WatchMv/getMvUrlRequest", {
      id: mvid,
    });
  }

  async getMvLikedCount(store?: any, route?: any) {
    store = store || this.$store;

    const mvid = this.mvLikedCountState
      ? this.mvLikedCountState.queryParams.mvid
      : route.value.params.mvid;

    await store.dispatch("WatchMv/getMvDetailInfoRequest", {
      mvid,
    });
  }

  async getMvDetail(store?: any, route?: any) {
    store = store || this.$store;

    const mvid = this.mvLikedCountState
      ? this.mvLikedCountState.queryParams.mvid
      : route.value.params.mvid;

    await store.dispatch("WatchMv/getMvDetailRequest", {
      mvid,
    });
  }

  async getArtistDetail(store?: any, route?: any) {
    store = store || this.$store;

    const id = store.state.WatchMv.mv?.artistId || -1;
    await store.dispatch("WatchMv/getArtistDetailRequest", {
      id,
    });
  }

  async getArtistMvList(store?: any, route?: any) {
    store = store || this.$store;

    const id = store.state.WatchMv.mv?.artistId || -1;

    store.state.WatchMv.artistMvList.splice(
      0,
      store.state.WatchMv.artistMvList.length
    );

    await store.dispatch("WatchMv/getArtistMvRequest", { id, offset: 0 });

    // 如果不足 10 条，加载 PopularNow 数据凑数
    if (store.state.WatchMv.artistMvList.length < 10) {
      await this.getPopularNowList(store);
    }
  }

  async getCommentMvList(store?: any, route?: any) {
    store = store || this.$store;

    const hotComments = store.state.WatchMv.commentMv.hotComments;
    const comments = store.state.WatchMv.commentMv.comments;
    hotComments.splice(0, hotComments.length);
    comments.splice(0, comments.length);

    const mvid = this.commentMvState
      ? this.commentMvState.queryParams.id
      : route.value.params.mvid;

    const limit = this.commentMvState
      ? this.commentMvState.queryParams.limit
      : 10;

    await store.dispatch("WatchMv/getCommentMvRequest", {
      id: mvid,
      limit,
      commentMvLoadMoreCount: 0,
    });
  }

  goWatch(mv: IMv) {
    this.$router.push({ path: `/watch/${mv.id}` });
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
      if (!this.isUnmounted) {
        this.mvListAutoLoading.isCommand = true;
      }
    }
    if (!this.isUnmounted) {
      this.mvListAutoLoading.isCommand = true;
    }
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
    const id = this.$store.state.WatchMv.mv?.artistId || -1;

    this.artistMvState.hasMore = await this.$store.dispatch(
      "WatchMv/getArtistMvRequest",
      {
        id,
        offset:
          this.artistMvState.queryParams.limit * ++this.artistMvLoadMoreCount,
      }
    );
  }

  // 当 ArtistMv 没有更多时，使用 PopularNow
  popularNowLimit = 10;
  popularNowLoadMoreCount = 0;
  async getPopularNowList(store?: any) {
    await store.dispatch("WatchMv/getPopularNowListRequestForArtistMv", {
      popularNowLimit: this.popularNowLimit,
      popularNowLoadMoreCount: this.popularNowLoadMoreCount++,
    });
  }

  commentListLoading() {
    if (this.commentMv.more) {
      this.loadMoreCommentMv();
    } else {
      console.log("commentMv 没有更多了");
    }
  }

  async loadMoreCommentMv() {
    this.commentListIsLoading = true;
    this.commentListAutoLoading.isCommand = false;
    try {
      this.$store.dispatch("WatchMv/getCommentMvRequest", {
        id: this.commentMvState.queryParams.id,
        limit: this.commentMvState.queryParams.limit,
        commentMvLoadMoreCount: ++this.commentMvLoadMoreCount,
      });
    } catch (error) {
      if (!this.isUnmounted) {
        this.commentListIsLoading = false;
        this.commentListAutoLoading.isCommand = true;
      }
    }
    if (!this.isUnmounted) {
      this.commentListIsLoading = false;
      this.commentListAutoLoading.isCommand = true;
    }
  }

  subscription() {
    this.$store.dispatch(
      "Subscription/subscriptionArtist",
      this.$store.state.WatchMv.artistDetail
    );
  }

  unsubscription(id: number) {
    this.$store.dispatch("Subscription/unsubscriptionArtist", id);
  }

  like() {
    this.$store.dispatch("LikedMv/addLikedMv", this.$store.state.WatchMv.mv);
  }

  unlike() {
    this.$store.dispatch("LikedMv/removeLikedMv", this.$store.state.WatchMv.mv);
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
  margin-bottom: 24px;
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
  color: white;
  font-size: 14px;
  background-color: #cc0000;
  padding: 10px 22px;
  border: none;
  border-radius: 2px;
  cursor: pointer;
}
.sub-button:focus {
  outline: none;
}
.mv-list {
  display: flex;
  flex-direction: column;
}
.mv-list ::v-deep() .box-img {
  width: 168px;
  min-width: 168px;
}
.mv-list ::v-deep() .content-title {
  -webkit-line-clamp: 1;
  line-height: 24px;
}
.mv-list ::v-deep() .content-detail {
  -webkit-line-clamp: 2;
}
.mv-list ::v-deep() .box-content {
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
.mv-list-load-click {
  border: 1px solid #065fd4;
  padding: 9px 15px;
  text-align: center;
  color: #065fd4;
  font-size: 14px;
  cursor: pointer;
  user-select: none;
  margin-bottom: 24px;
}
.comment-count-box {
  color: #030303;
  font-size: 16px;
  margin-bottom: 24px;
}

.ripple {
  position: relative;
  overflow: hidden;
}
.ripple:after {
  content: "";
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
  background-image: radial-gradient(circle, #666 10%, transparent 10.01%);
  background-repeat: no-repeat;
  background-position: 50%;
  transform: scale(10, 10);
  opacity: 0;
  transition: transform 0.3s, opacity 0.5s;
}
.ripple:active:after {
  transform: scale(0, 0);
  opacity: 0.3;
  transition: 0s;
}
</style>