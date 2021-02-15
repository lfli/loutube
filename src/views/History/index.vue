<template>
  <div>
    <div class="history">
      <div class="history-title">
        <span>观看记录</span>
      </div>
      <template v-if="historyMvList.length > 0">
        <template v-for="mv of historyMvList" :key="mv.id">
          <div style="height: 16px"></div>
          <VideoShowTempTwo :mv="mv" @click="goWatch(mv)" />
        </template>
      </template>
      <div class="history-none" v-else>
        <span>此列表中没有任何视频。</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { mapState } from "vuex";
import VideoShowTempTwo from "@/share/VideoShowTempTwo.vue";
import { IMv } from "@/typing";
import router from "@/router";

@Options({
  components: {
    VideoShowTempTwo,
  },
  computed: {
    ...mapState({
      historyMvList: (state: any) => state.HistoryMv.historyMvList,
    }),
  },
})
export default class History extends Vue {
  goWatch(mv: IMv) {
    router.push({ path: `/watch/${mv.id}` });
  }
}
</script>

<style scoped>
.history {
  padding: 22px 0 22px 100px;
}
.history-title {
  font-size: 16px;
  color: #030303;
  margin-bottom: 16px;
}
.history-none {
  font-size: 14px;
  color: #030303;
  text-align: center;
  margin-top: 10vh;
}
</style>
