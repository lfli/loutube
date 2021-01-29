<template>
  <div class="side-drawer">
    <div class="header">
      <span class="span-icon iconfont icon-caidan"></span>
      <LouTubeLog />
    </div>
    <div class="box">
      <div class="box-one">
        <SideDrawerMenuItem class="icon-shouye">首页</SideDrawerMenuItem>
        <SideDrawerMenuItem class="icon-huo">时下流行</SideDrawerMenuItem>
        <SideDrawerMenuItem class="icon-subscribe">订阅内容</SideDrawerMenuItem>
      </div>
      <div class="box-two">
        <SideDrawerMenuItem class="icon-shipinbofang"
          >媒体库</SideDrawerMenuItem
        >
        <SideDrawerMenuItem class="icon-lishijilu">历史记录</SideDrawerMenuItem>
      </div>
      <div class="box-three">
        <div class="jx">
          <span>LOUTUBE 精选</span><br />
          <!-- TODO ↓ -->
          <div style="font-size: 40px; padding: 30px 0; letter-spacing: 8px">
            <span style="writing-mode: vertical-rl">敬请期待</span>
          </div>
          <!-- TODO ↑ -->
        </div>
      </div>
      <div class="box-four">
        <div class="copyright">
          <span>© 2021 李林锋 LFLI</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import LouTubeLog from "../LouTubeLog.vue";
import SideDrawerMenuItem from "./SideDrawerMenuItem.vue";

@Options({
  props: {},
  components: {
    LouTubeLog,
    SideDrawerMenuItem,
  },
})
export default class SideDrawer extends Vue {}
</script>

<style scoped>
.side-drawer {
  position: fixed;
  top: 0;
  left: 0;
  width: var(--sideDrawerWidth);
  height: 100%;
  background-color: white;
}
span[class~="iconfont"] {
  font-size: 20px;
}
.span-icon {
  width: var(--sidebar);
  text-align: center;
}
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: var(--sideDrawerWidth);
  height: var(--headerHeight);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
}
.box {
  position: relative;
  top: var(--headerHeight);
  height: calc(100vh - var(--headerHeight));
  overflow: auto;
}
.box-one {
  padding: 12px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
.box-two {
  padding: 8px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
.box-three {
  padding: 8px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
.box-three .jx {
  color: #606060;
  padding: 8px 24px;
  font-size: 14px;
  font-family: Roboto, Arial, sans-serif;
}
.box-four .copyright {
  padding: 16px 24px;
  color: #909090;
  font-size: 13px;
  font-family: Roboto, Arial, sans-serif;
}
</style>