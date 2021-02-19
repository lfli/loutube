<template>
  <div v-reachTheBottom="{ commandReachTheBottom, reachTheBottom }">
    <div class="subscription">
      <div
        class="subscription-title"
        v-if="!isLoading && artistMvStateList.length === 0"
      >
        <span>订阅内容</span>
      </div>

      <template
        v-for="artistMvState of artistMvStateList"
        :key="artistMvState.queryParams.id"
      >
        <div class="videos-box">
          <div class="subscription-title">
            <span>{{ artistMvState.curTitle }}</span>
          </div>
          <template v-for="mv of artistMvState.mvList" :key="mv.id">
            <VideoShowTempOne :mv="mv" @click="goWatch(mv)" />
          </template>
        </div>
      </template>

      <div
        class="subscription-none"
        v-if="!isLoading && artistMvStateList.length === 0"
      >
        <span>此列表中没有任何视频。</span>
      </div>
    </div>
    <div v-show="!isAllowLoadMore || isLoading" class="loading-box">
      <RotateLoading class="subscription-loading" />
    </div>
  </div>
</template>

<script lang="ts">
import { getArtistMvRequest } from "@/apis/requests/mv";
import { IArtistDetail, IArtistMv, IMv } from "@/typing";
import { reactive } from "vue";
import { Options, Vue } from "vue-class-component";
import { mapState } from "vuex";
import { IArtistMvState } from "./typing";
import VideoShowTempOne from "@/share/VideoShowTempOne.vue";
import router from "@/router";
import RotateLoading from "@/share/RotateLoading.vue";
import store from "@/store";

@Options({
  name: "Subscription",
  components: {
    VideoShowTempOne,
    RotateLoading,
  },
  computed: {
    ...mapState({
      artistList: (state: any) => state.Subscription.artistList,
    }),
  },
})
export default class Subscription extends Vue {
  artistList!: IArtistDetail[];
  artistMvLimit = 10;
  artistMvLoadMoreCount = 0;
  isAllowLoadMore = true;
  artistMvStateList: any[] = [];
  isLoading = true;

  commandReachTheBottom = {
    isCommand: true,
    scrollTop: 0,
  };

  isHasMore: { [key: number]: boolean } = {};

  reachTheBottom() {
    if (this.isAllowLoadMore) {
      this.isAllowLoadMore = false;
      this.initStateList()
        .then(() => {
          this.isAllowLoadMore = true;
        })
        .catch(() => {
          this.isAllowLoadMore = true;
        });
    }
  }

  created() {
    store.dispatch("TopProgressBar/pleaseStart");
    this.initStateList().then(() => {
      this.isLoading = false;
      store.dispatch("TopProgressBar/pleaseEnd");
    });
  }

  async initStateList() {
    for (const artist of this.artistList) {
      if (
        this.isHasMore[artist.id] !== undefined &&
        !this.isHasMore[artist.id]
      ) {
        continue;
      }
      const artistMvState = reactive<IArtistMvState>({
        curTitle: artist.name,
        queryParams: {
          id: artist.id,
          offset: this.artistMvLimit * this.artistMvLoadMoreCount,
        },
        mvList: [],
      });

      const result = await getArtistMvRequest(
        artistMvState.queryParams.id,
        artistMvState.queryParams.offset
      );
      result.mvs = result.mvs.map((mv: IArtistMv) => {
        mv.cover = mv.imgurl16v9;
        mv.artistId = mv.artist.id;
        return mv;
      });
      artistMvState.mvList.push(...result.mvs);
      this.artistMvStateList.push(artistMvState);
      this.isHasMore[artist.id] = result.hasMore;
    }
    this.artistMvLoadMoreCount++;
  }

  goWatch(mv: IMv) {
    router.push({ path: `/watch/${mv.id}` });
  }

  activated() {
    this.commandReachTheBottom.isCommand = true;
  }

  deactivated() {
    this.commandReachTheBottom.isCommand = false;
  }

  beforeUnmount() {
    this.commandReachTheBottom.isCommand = false;
  }
}
</script>

<style scoped>
.subscription {
  padding: 22px 5vw;
}
.subscription-title {
  font-size: 16px;
  color: #030303;
  grid-column: c1 / c2;
}
.subscription-none {
  font-size: 14px;
  color: #030303;
  text-align: center;
  margin-top: 10vh;
}
.videos-box {
  display: grid;
  grid-template-columns: [c1] repeat(auto-fill, minmax(210px, 1fr)) [c2];
  justify-content: space-between;
  gap: 26px 4px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding-bottom: 26px;
  margin-bottom: 26px;
}
.loading-box {
  text-align: center;
}
.subscription-loading {
  margin: 0 auto;
}
</style>
