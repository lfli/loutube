<template>
  <div class="header-box">
    <div class="menu-box">
      <span class="iconfont icon-caidan"></span>
    </div>
    <LouTubeLog />
    <div style="width: 10vw;"></div>
    <SearchBar />
    <div style="width: 10vw;"></div>
    <span class="iconfont icon-menu-dots"></span>
    <div style="width: 5vw;"></div>
    <span class="iconfont icon-menu-"></span>
    <MyProject />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import LouTubeLog  from "../LouTubeLog.vue";
import SearchBar from "./SearchBar.vue";
import MyProject from "./MyProject.vue";

@Options({
  props: {},
  components: {
    LouTubeLog,
    SearchBar,
    MyProject
  }
})
export default class Header extends Vue {}
</script>

<style scoped>
.header-box {
  background-color: white;
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