<template>
  <div>
    <div class="subscription">
      <div class="subscription-title">
        <span>订阅内容</span>
      </div>
<div v-for="artist of artistList" :key="artist.id">{{artist.name}}</div>
      <div class="subscription-none">
        <span>此列表中没有任何视频。</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { mapState } from "vuex";

@Options({
  components: {},
  computed: {
    ...mapState({
      artistList: (state: any) => state.Subscription.artistList,
    }),
  },
})
export default class Subscription extends Vue {}
</script>

<style scoped>
.subscription {
  padding: 22px 0 22px 5vw;
}
.subscription-title {
  font-size: 16px;
  color: #030303;
  margin-bottom: 16px;
}
.subscription-none {
  font-size: 14px;
  color: #030303;
  text-align: center;
  margin-top: 10vh;
}
</style>
