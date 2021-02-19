<template>
  <div class="header-box">
    <TopProgressBar />
    <div class="menu-box">
      <span
        @click="$emit('toggle-side-drawer')"
        class="iconfont icon-caidan"
      ></span>
    </div>
    <LouTubeLog />
    <div style="width: 10vw"></div>
    <SearchBar />
    <div style="width: 5vw"></div>
    <!-- <span class="iconfont icon-menu-dots"></span> -->
    <div style="width: 5vw"></div>
    <MyProject />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import LouTubeLog from "@/share/LouTubeLog.vue";
import SearchBar from "./SearchBar.vue";
import MyProject from "./MyProject.vue";
import TopProgressBar from "./TopProgressBar.vue";

@Options({
  props: {},
  components: {
    LouTubeLog,
    SearchBar,
    MyProject,
    TopProgressBar,
  },
  emits: ["toggle-side-drawer"],
})
export default class Header extends Vue {}
</script>

<style scoped>
.header-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.header-box .menu-box {
  width: var(--sidebar);
  display: flex;
  justify-content: center;
}
.header-box span[class~="iconfont"] {
  font-size: 20px;
}
</style>