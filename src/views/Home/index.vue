<template>
  <div>
    <div class="videos-box">
      <VideoShowTempOne v-for="mv in state.mvList" :mv="mv" :key="mv.id" />
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import VideoShowTempOne from "@/share/VideoShowTempOne.vue";
import { reactive } from "vue";
import { getMvListRequest } from "@/apis/requests/mv";
import { IState } from "./typing";

@Options({
  components: {
    VideoShowTempOne,
  },
  methods: {
    /**
     * 获取 mv 数据
     */
    async getMvList() {
      const { data } = await getMvListRequest(this.state.queryParams.limit);
      this.state.mvList = data;
    },
  },
  created() {
    this.getMvList();
  },
})
export default class Home extends Vue {
  state = reactive<IState>({
    curTitle: "mv列表",
    queryParams: {
      limit: 30,
    },
    mvList: [],
  });
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
</style>
