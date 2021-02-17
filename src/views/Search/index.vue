<template>
  <div>
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

@Options({
  props: ["keywords"],
  components: {
    VideoShowTempTwo,
  },
  beforeRouteUpdate(to, from, next) {
    this.init(to.params.keywords);
    next();
  },
})
export default class Search extends Vue {
  keywords!: string;
  isLoading = false;

  cloudsearchState = reactive<ICloudsearchState>({
    curTitle: "搜索",
    queryParams: {
      keywords: this.keywords,
    },
    mvList: [],
  });

  created() {
    this.isLoading = true;
    this.init(this.keywords)
      .then(() => {
        this.isLoading = false;
      })
      .catch(() => {
        this.isLoading = false;
      });
  }

  async init(keywords: string) {
    this.cloudsearchState.queryParams.keywords = keywords;
    const { result } = await cloudsearchRequest(
      this.cloudsearchState.queryParams.keywords
    );
    this.cloudsearchState.mvList.splice(0, this.cloudsearchState.mvList.length);
    this.cloudsearchState.mvList.push(...result.mvs);
  }

  goWatch(mv: IMv) {
    router.push({ path: `/watch/${mv.id}` });
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
</style>