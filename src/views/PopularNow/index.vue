<template>
  <!-- <div v-reachTheBottom="{ reachTheBottom, commandReachTheBottom }"> -->
  <div ref="popularNow">
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
        <template v-for="mv of mvList" :key="mv.id">
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
import { IPopularNowTopMenu } from "@/typing/LocalData";
import RotateLoading from "@/share/RotateLoading.vue";
import { IMv } from "@/typing";
import { titleMixin } from "@/mixins/titleMixin";
import { vReachTheBottom } from "@/share/util";
import { mapGetters } from "vuex";

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
    this.$store.dispatch("TopProgressBar/pleaseStart");
    this.myBeforeRouteUpdate(to).then(() => {
      this.isLoading = false;
      this.$store.dispatch("TopProgressBar/pleaseEnd");
    });
    next();
  },
  beforeRouteEnter(to, from, next) {
    next((vm: any) => {
      // 从地区 mv 切换到其它页面再回到此页面时，重新加载数据
      if (from.meta.depth === 1 && vm.title && vm.title.length > 0) {
        vm.$store.dispatch("TopProgressBar/pleaseStart");
        vm.commandReachTheBottom.scrollTop = 0;
        vm.myBeforeRouteUpdate(to).then(() => {
          vm.isLoading = false;
          vm.$store.dispatch("TopProgressBar/pleaseEnd");
        });
      }
    });
  },
  computed: {
    ...mapGetters("PopularNowMv", ["mvList"]),
  },
})
export default class PopularNow extends Vue {
  $store: any;

  link!: string;
  title = "";
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
  });

  asyncData(store: any, route: any) {
    const popularNowTopMenuList: Array<IPopularNowTopMenu> = [
      {
        title: "中国",
        link: "China",
        icon: "#icon-guoqi",
        areas: ["内地", "港台"],
      },
      {
        title: "日本",
        link: "Japan",
        icon: "#icon-ribenguoqi",
        areas: ["日本"],
      },
      { title: "韩国", link: "Korea", icon: "#icon-zu", areas: ["韩国"] },
      {
        title: "欧美",
        link: "Occident",
        icon: "#icon-meiguo",
        areas: ["欧美"],
      },
    ];

    const currentSeries = popularNowTopMenuList.filter(
      (item: IPopularNowTopMenu) => item.link === route.value.params.link
    );

    function asyncDataItem(store: any, area: string) {
      return store.dispatch("PopularNowMv/getPopularNowList", {
        limit: 12,
        area,
        loadMoreCount: 0,
      });
    }

    if (currentSeries.length > 0) {
      const areas = currentSeries[0].areas;
      return Promise.all(
        areas.map((area) => asyncDataItem(store, area))
      ).then();
    } else {
      // 为 all 时
      return asyncDataItem(store, "全部");
    }
  }

  async myBeforeRouteUpdate(to: any) {
    this.$store.state.PopularNowMv.mvList.splice(
      0,
      this.$store.state.PopularNowMv.mvList.length
    );
    const currentSeries = this.popularNowTopMenuList.filter(
      (item: IPopularNowTopMenu) => item.link === to.params.link
    );
    if (currentSeries.length > 0) {
      this.title = currentSeries[0].title;
      this.areas = currentSeries[0].areas;

      for (const area of this.areas) {
        this.$store.dispatch("PopularNowMv/getPopularNowList", {
          limit: this.state.queryParams.limit,
          area,
          loadMoreCount: 0,
        });
      }
    } else {
      // 为 all 时
      this.areas = ["全部"];
      this.title = "";
      this.$store.dispatch("PopularNowMv/getPopularNowList", {
        limit: this.state.queryParams.limit,
        area: "全部",
        loadMoreCount: 0,
      });
    }
  }

  // created() {
  //   this.$store.dispatch("TopProgressBar/pleaseStart");
  //   this.myBeforeRouteUpdate(this.$router.currentRoute.value).then(() => {
  //     this.isLoading = false;
  //     this.$store.dispatch("TopProgressBar/pleaseEnd");
  //   });
  // }

  mounted() {
    vReachTheBottom(this.$refs.popularNow as any, {
      value: {
        reachTheBottom: this.reachTheBottom,
        commandReachTheBottom: this.commandReachTheBottom,
      },
    });
  }
  updated() {
    (this.$refs.popularNow as any).scrollTop =
      this.commandReachTheBottom.scrollTop;
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
  // async getPopularNowList(area?: string) {
  //   const { data } = await getPopularNowListRequest(
  //     this.state.queryParams.limit,
  //     area
  //   );
  //   this.state.mvList.push(...data);
  // }

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
        this.$store.dispatch("PopularNowMv/getPopularNowList", {
          limit: this.state.queryParams.limit,
          area: area,
          loadMoreCount: ++this.loadMoreCount,
        });
      } catch (error) {
        this.isAllowLoadMore = true;
      }
    }
    this.isAllowLoadMore = true;
  }

  to(link: string) {
    this.$router.push({ path: `/popular-now/${link}` });
  }

  goWatch(mv: IMv) {
    this.$router.push({ path: `/watch/${mv.id}` });
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
