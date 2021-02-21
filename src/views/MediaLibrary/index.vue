<template>
  <div>
    <div class="media-library">
      <div class="media-library-title" v-if="likedMvList.length === 0">
        <span>顶过的视频</span>
      </div>

      <div class="videos-box" v-if="likedMvList.length > 0">
        <div class="media-library-title">
          <span>顶过的视频</span>
        </div>

        <template v-for="mv of likedMvList" :key="mv.id">
          <VideoShowTempOne :mv="mv" @click="goWatch(mv)" />
        </template>
      </div>

      <div class="media-library-none" v-if="likedMvList.length === 0">
        <span>此列表中没有任何视频。</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { mapState } from "vuex";
import VideoShowTempOne from "@/share/VideoShowTempOne.vue";
import router from "@/router";
import { IMv } from "@/typing";
import { titleMixin } from "@/mixins/titleMixin";

@Options({
  components: {
    VideoShowTempOne,
  },
  mixins: [titleMixin],
  computed: {
    ...mapState({
      likedMvList: (state: any) => state.LikedMv.likedMvList,
    }),
  },
})
export default class MediaLibrary extends Vue {
  goWatch(mv: IMv) {
    router.push({ path: `/watch/${mv.id}` });
  }
}
</script>

<style scoped>
.media-library {
  padding: 22px 5vw;
}
.videos-box {
  display: grid;
  grid-template-columns: [c1] repeat(auto-fill, minmax(210px, 1fr)) [c2];
  justify-content: space-between;
  gap: 26px 4px;
  padding-bottom: 26px;
  margin-bottom: 26px;
}
.media-library-title {
  font-size: 16px;
  color: #030303;
  grid-column: c1 / c2;
}
.media-library-none {
  font-size: 14px;
  color: #030303;
  text-align: center;
  margin-top: 10vh;
}
</style>
