<template>
  <div v-reachTheBottom="{ reachTheBottom, commandReachTheBottom }">
    <div class="search">
      <div class="search-title">
        <span>搜索结果</span>
      </div>

      <template v-if="cloudsearchState.mvList.length > 0">
        <template v-for="mv of cloudsearchState.mvList" :key="mv.id">
          <div style="height: 16px"></div>
          <VideoShowTempTwo :mv="mv" @click="goWatch(mv)" />
        </template>
      </template>

      <div
        class="search-none"
        v-if="!isLoading && cloudsearchState.mvList.length === 0"
      >
        <span>此列表中没有任何视频。</span>
      </div>
    </div>
    <div v-show="!isAllowLoadMore || isLoading" class="loading-box">
      <RotateLoading class="search-loading" />
    </div>
  </div>
</template>

<script lang="ts">
import { cloudsearchRequest } from "@/apis/requests/mv";
import { reactive } from "vue";
import { Options, Vue } from "vue-class-component";
import { ICloudsearchState } from "./typing";
import VideoShowTempTwo from "@/share/VideoShowTempTwo.vue";
import { IMv } from "@/typing";
import router from "@/router";
import RotateLoading from "@/share/RotateLoading.vue";
import store from "@/store";
import { titleMixin } from "@/mixins/titleMixin";

@Options({
  name: "Search",
  mixins: [titleMixin],
  props: ["keywords"],
  components: {
    VideoShowTempTwo,
    RotateLoading,
  },
  beforeRouteUpdate(to, from, next) {
    store.dispatch("TopProgressBar/pleaseStart");
    this.init(to.query.q).then(() => {
      store.dispatch("TopProgressBar/pleaseEnd");
    });
    next();
  },
})
export default class Search extends Vue {
  keywords!: string;
  isLoading = true;
  commandReachTheBottom = {
    isCommand: true,
    scrollTop: 0,
  };
  isAllowLoadMore = true;
  loadMoreCount = 0;
  hasMore = true;

  cloudsearchState = reactive<ICloudsearchState>({
    curTitle: "搜索",
    queryParams: {
      keywords: this.keywords,
      limit: 10,
    },
    mvList: [],
  });

  reachTheBottom() {
    if (this.isAllowLoadMore && this.hasMore) {
      this.isAllowLoadMore = false;
      this.loadMoreMv()
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
    this.init(this.keywords).then(() => {
      this.isLoading = false;
      store.dispatch("TopProgressBar/pleaseEnd");
    });
  }

  async init(keywords: string) {
    this.hasMore = true;
    this.cloudsearchState.queryParams.keywords = keywords;
    const { result } = await cloudsearchRequest(
      this.cloudsearchState.queryParams.keywords,
      this.cloudsearchState.queryParams.limit
    );
    this.cloudsearchState.mvList.splice(0, this.cloudsearchState.mvList.length);
    if (result.mvs) {
      this.cloudsearchState.mvList.push(...result.mvs);
    }
  }

  async loadMoreMv() {
    const { result } = await cloudsearchRequest(
      this.cloudsearchState.queryParams.keywords,
      this.cloudsearchState.queryParams.limit,
      this.cloudsearchState.queryParams.limit * ++this.loadMoreCount
    );
    if (!result.mvs) {
      this.hasMore = false;
    } else {
      this.cloudsearchState.mvList.push(...result.mvs);
    }
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
.search {
  padding: 22px 5vw;
}
.search-title {
  font-size: 16px;
  color: #030303;
  margin-bottom: 16px;
}
.search-none {
  font-size: 14px;
  color: #030303;
  text-align: center;
  margin-top: 10vh;
}
.loading-box {
  text-align: center;
}
.search-loading {
  margin: 0 auto;
}
</style>