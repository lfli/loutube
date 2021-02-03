<template>
  <div>
    <div class="popular-now">
      <div class="top-menu">
        <template v-for="item of popularNowTopMenuList" :key="item.link">
          <TopMenuItem :href="item.icon">{{ item.title }}</TopMenuItem>
          <div style="width: 80px"></div>
        </template>
      </div>
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

@Options({
  components: {
    TopMenuItem,
    VideoShowTempTwo,
  },
})
export default class PopularNow extends Vue {
  popularNowTopMenuList = popularNowTopMenuList;

  limit = 24;
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
  async getPopularNowList() {
    const { data } = await getPopularNowListRequest(
      this.state.queryParams.limit
    );
    this.state.mvList = data;
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
</style>
