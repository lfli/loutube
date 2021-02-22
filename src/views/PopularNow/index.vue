<template>
  <div v-reachTheBottom="{ reachTheBottom, commandReachTheBottom }">
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
          <VideoShowTempTwo :mv="mv" @click="goWatch(mv)" />
        </template>
      </div>
    </div>
    <div v-show="!isAllowLoadMore || isLoading" class="loading-box">
      <RotateLoading class="popular-now-loading" />
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
import { IPopularNowTopMenu } from "@/typing/LocalData";
import RotateLoading from "@/share/RotateLoading.vue";
import { IMv } from "@/typing";
import store from "@/store";
import { titleMixin } from "@/mixins/titleMixin";

@Options({
  name: "PopularNow",
  mixins: [titleMixin],
  components: {
    TopMenuItem,
    VideoShowTempTwo,
    RotateLoading,
  },
  props: ["link"],
  beforeRouteUpdate(to, from, next) {
    this.isLoading = true;
    store.dispatch("TopProgressBar/pleaseStart");
    this.myBeforeRouteUpdate(to).then(() => {
      this.isLoading = false;
      store.dispatch("TopProgressBar/pleaseEnd");
    });
    next();
  },
  beforeRouteEnter(to, from, next) {
    next((vm: any) => {
      // 从地区 mv 切换到其它页面再回到此页面时，重新加载数据
      if (from.meta.depth === 1 && vm.title && vm.title.length > 0) {
        store.dispatch("TopProgressBar/pleaseStart");
        vm.commandReachTheBottom.scrollTop = 0;
        vm.myBeforeRouteUpdate(to).then(() => {
          vm.isLoading = false;
          store.dispatch("TopProgressBar/pleaseEnd");
        });
      }
    });
  },
})
export default class PopularNow extends Vue {
  link!: string;
  title!: string;
  areas = ["全部"];
  popularNowTopMenuList = popularNowTopMenuList;
  // 控制 reachTheBottom 指令
  commandReachTheBottom = {
    isCommand: true,
    scrollTop: 0,
  };

  isLoading = true;

  limit = 12;
  state = reactive<IPopularNowState>({
    curTitle: "时下流行列表",
    queryParams: {
      limit: this.limit,
    },
    mvList: [],
  });

  async myBeforeRouteUpdate(to: any) {
    this.state.mvList.splice(0, this.state.mvList.length);
    const currentSeries = this.popularNowTopMenuList.filter(
      (item: IPopularNowTopMenu) => item.link === to.params.link
    );
    if (currentSeries.length > 0) {
      this.title = currentSeries[0].title;
      this.areas = currentSeries[0].areas;
      for (const area of this.areas) {
        await this.getPopularNowList(area);
      }
    } else {
      // 为 all 时
      this.areas = ["全部"];
      this.title = "";
      await this.getPopularNowList();
    }
  }

  created() {
    store.dispatch("TopProgressBar/pleaseStart");
    this.myBeforeRouteUpdate(router.currentRoute.value).then(() => {
      this.isLoading = false;
      store.dispatch("TopProgressBar/pleaseEnd");
    });
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
      try {
        const { data } = await getPopularNowListRequest(
          this.state.queryParams.limit,
          area,
          this.state.queryParams.limit * ++this.loadMoreCount
        );
        this.state.mvList.push(...data);
      } catch (error) {
        this.isAllowLoadMore = true;
      }
    }
    this.isAllowLoadMore = true;
  }

  to(link: string) {
    router.push({ path: `/popular-now/${link}` });
  }

  goWatch(mv: IMv) {
    router.push({ path: `/watch/${mv.id}` });
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
.loading-box {
  text-align: center;
}
.popular-now-loading {
  margin: 0 auto;
}
</style>
