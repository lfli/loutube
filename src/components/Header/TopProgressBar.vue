<template>
  <div v-show="isShow" class="top-progress-bar-box">
    <div class="back-bar"></div>
    <transition @enter="enter" @leave="leave" :css="false">
      <div v-if="isStart" class="top-progress-bar"></div>
    </transition>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { gsap } from "gsap";
import { mapGetters } from "vuex";

@Options({
  computed: {
    ...mapGetters("TopProgressBar", ["isStart"]),
  },
})
export default class TopProgressBar extends Vue {
  isShow = false;

  async enter(el: any, done: any) {
    this.isShow = true;
    await gsap.to(el, {
      duration: 3,
      width: "80vw",
      onComplete: done,
    });
    await gsap.to(el, {
      duration: 100,
      width: "81vw",
      onComplete: done,
    });
  }
  async leave(el: any, done: any) {
    await gsap.to(el, {
      duration: 0.2,
      width: "100vw",
      onComplete: done,
    });
    this.isShow = false;
  }
}
</script>

<style scoped>
.top-progress-bar-box {
  position: fixed;
  top: 0;
  left: 0;
}
.back-bar {
  height: 2px;
  width: calc(100vw - var(--scrollbarWidth));
  background-color: #f1f1f1;
  position: fixed;
  top: 0;
  left: 0;
}
.top-progress-bar {
  height: 2px;
  width: 0;
  background-color: red;
  position: fixed;
  top: 0;
  left: 0;
}
</style>