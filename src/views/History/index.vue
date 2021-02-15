<template>
  <div class="history">
    <template v-for="mv of historyMvList" :key="mv.id">
      <div style="height: 16px"></div>
      <VideoShowTempTwo :mv="mv" @click="goWatch(mv)" />
    </template>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { mapState } from "vuex";
import VideoShowTempTwo from "@/share/VideoShowTempTwo.vue";

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
export default class History extends Vue {}
</script>

<style scoped>
.history {
}
</style>
