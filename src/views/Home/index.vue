<template>
  <div>
    <div class="videos-box">
      <div v-for="n in 60" :key="n">
        <VideoShowTempOne />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import VideoShowTempOne from "@/share/VideoShowTempOne.vue";

@Options({
  components: {
    VideoShowTempOne,
  },
})
export default class Home extends Vue {}
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
