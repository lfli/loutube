<template>
  <div>
    <div class="subscription">
      <div class="subscription-title" v-if="artistMvStateList.length === 0">
        <span>订阅内容</span>
      </div>

      <template
        v-for="artistMvState of artistMvStateList"
        :key="artistMvState.queryParams.id"
      >
        <div class="videos-box">
          <div class="subscription-title">
            <span>{{ artistMvState.mvList[0].artistName }}</span>
          </div>
          <template v-for="mv of artistMvState.mvList" :key="mv.id">
            <VideoShowTempOne :mv="mv" @click="goWatch(mv)" />
          </template>
        </div>
      </template>

      <div class="subscription-none" v-if="artistMvStateList.length === 0">
        <span>此列表中没有任何视频。</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { getArtistMvRequest } from "@/apis/requests/mv";
import { IArtistDetail, IArtistMv, IMv } from "@/typing";
import { reactive } from "vue";
import { Options, Vue } from "vue-class-component";
import { mapState } from "vuex";
import { IArtistMvState } from "../Watch/typing";
import VideoShowTempOne from "@/share/VideoShowTempOne.vue";
import router from "@/router";

@Options({
  components: {
    VideoShowTempOne,
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
  artistMvStateList: any[] = [];

  created() {
    this.init();
    this.getArtistMvList();
  }

  init() {
    for (const artist of this.artistList) {
      const artistMvState = reactive<IArtistMvState>({
        curTitle: "歌手 mv",
        queryParams: {
          id: artist.id,
          limit: this.artistMvLimit,
        },
        mvList: [],
        hasMore: false,
      });
      this.artistMvStateList.push(artistMvState);
    }
  }

  async getArtistMvList() {
    for (const artistMvState of this.artistMvStateList) {
      const result = await getArtistMvRequest(artistMvState.queryParams.id);
      result.mvs = result.mvs.map((mv: IArtistMv) => {
        mv.cover = mv.imgurl16v9;
        mv.artistId = mv.artist.id;
        return mv;
      });
      artistMvState.mvList.push(...result.mvs);
      artistMvState.hasMore = result.hasMore;
    }
  }

  goWatch(mv: IMv) {
    router.push({ path: `/watch/${mv.id}` });
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
</style>
