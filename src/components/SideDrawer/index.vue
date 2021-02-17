<template>
  <div class="side-drawer">
    <div class="header">
      <span
        @click="$emit('close')"
        class="span-icon iconfont icon-caidan"
      ></span>
      <LouTubeLog @click="$emit('close')" />
    </div>
    <div class="box">
      <div
        v-for="(items, index) of listData"
        :key="index"
        :class="{ 'box-one': index == 0, 'box-two': index == 1 }"
      >
        <SideDrawerMenuItem
          v-for="item of items"
          :key="item.link"
          :url="item.link"
          @click="to(item.link)"
          :class="item.icon"
          >{{ item.title }}</SideDrawerMenuItem
        >
      </div>
      <div class="box-three">
        <div class="jx">
          <span>LOUTUBE 精选</span><br />
          <!-- TODO ↓ -->
          <div style="font-size: 40px; padding: 26px 0; letter-spacing: 8px">
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
import router from "@/router";
import { Options, Vue } from "vue-class-component";
import LouTubeLog from "../LouTubeLog.vue";
import SideDrawerMenuItem from "./SideDrawerMenuItem.vue";

@Options({
  props: { listData: Array },
  components: {
    LouTubeLog,
    SideDrawerMenuItem,
  },
  emits: ["close"],
  methods: {
    to(address: string) {
      router.push({ path: address });
      this.$emit("close");
    },
  },
})
export default class SideDrawer extends Vue {}
</script>

<style scoped>
.side-drawer {
  position: fixed;
  z-index: 101;
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
/* 滑动条样式 ↓ */
.box::-webkit-scrollbar {
  width: 8px;
}
.box::-webkit-scrollbar-track-piece {
  background-color: #f1f1f1;
}
.box::-webkit-scrollbar-thumb {
  background-color: #c1c1c1;
}
/* 滑动条样式 ↑ */

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