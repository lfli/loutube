<template>
  <div v-reachTheBottom="reachTheBottom">
    <div class="popular-now">
      <div v-if="link === 'all'" class="top-menu">
        <template v-for="item of popularNowTopMenuList" :key="item.link">
          <TopMenuItem @click="to(item.link)" :href="item.icon">{{
            item.title
          }}</TopMenuItem>
          <div style="width: 80px"></div>
        </template>
      </div>
      <span v-else class="series-title">{{ title }}</span>
      <div class="videos-box">
        <template v-for="mv of state.mvList" :key="mv.id">
          <div style="height: 16px"></div>
          <VideoShowTempTwo :mv="mv" />
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { popularNowTopMenuList } from "@/apis/data";
import { Options, Vue } from "vue-class-component";
import TopMenuItem from "./TopMenuItem.vue";
import VideoShowTempTwo from "@/share/VideoShowTempTwo.vue";
import { reactive } from "vue";
import { IPopularNowState } from "./typing";
import { getPopularNowListRequest } from "@/apis/requests/mv";
import router from "@/router";
import { IPopularNowTopMenu } from "@/types/LocalData";

@Options({
  components: {
    TopMenuItem,
    VideoShowTempTwo,
  },
  props: ["link"],
  beforeRouteUpdate(to, from, next) {
    this.state.mvList.splice(0, this.state.mvList.length);
    const currentSeries = this.popularNowTopMenuList.filter(
      (item: IPopularNowTopMenu) => item.link === to.params.link
    );
    if (currentSeries.length > 0) {
      this.title = currentSeries[0].title;
      this.areas = currentSeries[0].areas;
      for (const area of this.areas) {
        this.getPopularNowList(area);
      }
    } else {
      // 为 all 时
      this.getPopularNowList();
    }
    next();
  },
})
export default class PopularNow extends Vue {
  link!: string;
  title!: string;
  areas = ["全部"];
  popularNowTopMenuList = popularNowTopMenuList;

  limit = 12;
  state = reactive<IPopularNowState>({
    curTitle: "时下流行列表",
    queryParams: {
      limit: this.limit,
    },
    mvList: [],
  });

  created() {
    this.getPopularNowList();
  }

  /**
   * 获取 PopularNow 数据
   */
  async getPopularNowList(area?: string) {
    const { data } = await getPopularNowListRequest(
      this.state.queryParams.limit,
      area
    );
    this.state.mvList.push(...data);
  }

  reachTheBottom() {
    if (this.isAllowLoadMore) {
      this.loadMoreMv();
    }
  }

  isAllowLoadMore = true;
  loadMoreCount = 0;
  async loadMoreMv() {
    this.isAllowLoadMore = false;
    for (const area of this.areas) {
      const { data } = await getPopularNowListRequest(
        this.state.queryParams.limit,
        area,
        this.state.queryParams.limit * ++this.loadMoreCount
      );
      this.state.mvList.push(...data);
    }
    this.isAllowLoadMore = true;
  }

  to(link: string) {
    router.push({ path: `/popular-now/${link}` });
  }
}
</script>

<style scoped>
.popular-now {
  padding-left: 34px;
  padding-right: 34px;
}
.top-menu {
  display: flex;
  padding: 16px 0;
  border-bottom: 1px solid #d3d3d3;
}
.videos-box {
  padding-top: 10px;
}
.series-title {
  display: block;
  font-size: 16px;
  color: #030303;
  margin-top: 24px;
}
</style>
