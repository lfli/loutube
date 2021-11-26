<template>
  <!-- <div v-reachTheBottom="{ reachTheBottom, commandReachTheBottom }"> -->
  <div ref="search">
    <div class="search">
      <div class="search-title">
        <span>搜索结果</span>
      </div>

      <template v-if="mvList.length > 0">
        <template v-for="mv of mvList" :key="mv.id">
          <div style="height: 16px"></div>
          <VideoShowTempTwo :mv="mv" @click="goWatch(mv)" />
        </template>
      </template>

      <div class="search-none" v-if="!isLoading && mvList.length === 0">
        <span>此列表中没有任何视频。</span>
      </div>
    </div>
    <div v-show="!isAllowLoadMore || isLoading" class="loading-box">
      <RotateLoading class="search-loading" />
    </div>
  </div>
</template>

<script lang="ts">
import { reactive } from "vue";
import { Options, Vue } from "vue-class-component";
import { ICloudsearchState } from "./typing";
import VideoShowTempTwo from "@/share/VideoShowTempTwo.vue";
import { IMv } from "@/typing";
import RotateLoading from "@/share/RotateLoading.vue";
import { titleMixin } from "@/mixins/titleMixin";
import { vReachTheBottom } from "@/share/util";
import { mapGetters } from "vuex";

@Options({
  name: "Search",
  mixins: [titleMixin],
  props: ["keywords"],
  components: {
    VideoShowTempTwo,
    RotateLoading,
  },
  beforeRouteUpdate(to, from, next) {
    this.$store.dispatch("TopProgressBar/pleaseStart");
    this.init(to.query.q).then(() => {
      this.$store.dispatch("TopProgressBar/pleaseEnd");
    });
    next();
  },
  computed: {
    ...mapGetters("CloudSearchMv", ["mvList"]),
  },
})
export default class Search extends Vue {
  $store: any;

  keywords!: string;
  tempKeywords = "";
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
  });

  asyncData(store: any, route: any) {  
    return store.dispatch("CloudSearchMv/cloudsearchRequest", {
      keywords: route.value.query.q,
      limit: 10,
      loadMoreCount: 0,
    });
  }

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

  async init(keywords: string) {
    this.hasMore = true;
    this.cloudsearchState.queryParams.keywords = keywords;

    this.$store.state.CloudSearchMv.mvList.splice(
      0,
      this.$store.state.CloudSearchMv.mvList.length
    );

    await this.$store.dispatch("CloudSearchMv/cloudsearchRequest", {
      keywords: this.cloudsearchState.queryParams.keywords,
      limit: this.cloudsearchState.queryParams.limit,
      loadMoreCount: 0,
    });
  }

  async loadMoreMv() {
    this.hasMore = await this.$store.dispatch(
      "CloudSearchMv/cloudsearchRequest",
      {
        keywords: this.cloudsearchState.queryParams.keywords,
        limit: this.cloudsearchState.queryParams.limit,
        loadMoreCount: ++this.loadMoreCount,
      }
    );
  }

  goWatch(mv: IMv) {
    this.$router.push({ path: `/watch/${mv.id}` });
  }

  mounted() {
    this.commandReachTheBottom.isCommand = true;
    if (this.tempKeywords !== this.keywords) {
      if (this.$store.state.CloudSearchMv.mvList.length === 0) {
        this.$store.dispatch("TopProgressBar/pleaseStart");
        this.init(this.keywords).then(() => {
          this.isLoading = false;
          this.$store.dispatch("TopProgressBar/pleaseEnd");
        });
      }
    }

    vReachTheBottom(this.$refs.search as any, {
      value: {
        reachTheBottom: this.reachTheBottom,
        commandReachTheBottom: this.commandReachTheBottom,
      },
    });
  }
  updated() {
    (this.$refs.search as any).scrollTop = this.commandReachTheBottom.scrollTop;
  }

  unmounted() {
    this.commandReachTheBottom.isCommand = false;
    this.tempKeywords = this.keywords;
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