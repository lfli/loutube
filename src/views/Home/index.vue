<template>
  <div id="home">
    <div class="videos-box">
      <VideoShowTempOne
        @click="goWatch(mv)"
        v-for="mv in state.mvList"
        :mv="mv"
        :key="mv.id"
      />
    </div>
    <div v-show="!isAllowLoadMore || isLoading" class="loading-box">
      <RotateLoading class="home-loading" />
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import VideoShowTempOne from "@/share/VideoShowTempOne.vue";
import { reactive } from "vue";
import { getMvListRequest } from "@/apis/requests/mv";
import { IState } from "./typing";
import RotateLoading from "@/share/RotateLoading.vue";
import router from "@/router";
import { IMv } from "@/typing";
import store from "@/store";
import { titleMixin } from "@/mixins/titleMixin";

@Options({
  name: "Home",
  mixins: [titleMixin],
  components: {
    VideoShowTempOne,
    RotateLoading,
  },
})
export default class Home extends Vue {
  isLoading = true;

  limit = 24;
  state = reactive<IState>({
    curTitle: "mv列表",
    queryParams: {
      limit: this.limit,
    },
    mvList: [],
  });
  created() {
    store.dispatch("TopProgressBar/pleaseStart");
    this.getMvList().then(() => {
      this.isLoading = false;
      store.dispatch("TopProgressBar/pleaseEnd");
    });
  }
  /**
   * 获取 mv 数据
   */
  async getMvList() {
    const { data } = await getMvListRequest(this.state.queryParams.limit);
    this.state.mvList.push(...data);
  }

  isAllowLoadMore = true;
  loadMoreCount = 0;
  /**
   * 加载更多 mv
   */
  async loadMoreMv() {
    this.isAllowLoadMore = false;
    try {
      const { data } = await getMvListRequest(
        this.state.queryParams.limit,
        this.state.queryParams.limit * ++this.loadMoreCount
      );
      this.state.mvList.push(...data);
    } catch (error) {
      this.isAllowLoadMore = true;
    }
    this.isAllowLoadMore = true;
  }

  scrollTop: number | undefined;
  handleScroll() {
    const elementHome = document.getElementById("home");
    if (elementHome) {
      this.scrollTop = elementHome.scrollTop;
      if (
        window.innerHeight + this.scrollTop >=
        elementHome.scrollHeight - 100
      ) {
        // 下滑加载更多 mv
        if (this.isAllowLoadMore) {
          this.loadMoreMv();
        }
      }
    }
  }
  mounted() {
    window.addEventListener("scroll", this.handleScroll, true);
  }
  unmounted() {
    window.removeEventListener("scroll", this.handleScroll, true);
  }
  activated() {
    if (this.scrollTop) {
      const element = document.getElementById("home");
      if (element) {
        element.scrollTop = this.scrollTop;
      }
    }
    window.addEventListener("scroll", this.handleScroll, true);
  }
  deactivated() {
    window.removeEventListener("scroll", this.handleScroll, true);
  }

  goWatch(mv: IMv) {
    router.push({ path: `/watch/${mv.id}` });
  }
}
</script>

<style scoped>
.videos-box {
  display: grid;
  gap: 40px 16px;
  margin-top: 24px;
  padding: 0 24px;
}
@media screen and (max-width: 800px) {
  .videos-box {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  }
}
@media screen and (min-width: 800px) and (max-width: 2100px) {
  .videos-box {
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  }
}
@media screen and (min-width: 2100px) {
  .videos-box {
    grid-template-columns: repeat(6, minmax(320px, 1fr));
  }
}
.loading-box {
  text-align: center;
}
.home-loading {
  margin: 0 auto;
}
</style>
