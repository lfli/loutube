<template>
  <div class="sidebar-box">
    <MenuItem class="icon-shouye">首页</MenuItem>
    <MenuItem class="icon-huo">时下流行</MenuItem>
    <MenuItem class="icon-subscribe">订阅内容</MenuItem>
    <MenuItem class="icon-shipinbofang">媒体库</MenuItem>
    <MenuItem class="icon-lishijilu">历史记录</MenuItem>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import MenuItem from "./MenuItem.vue";

@Options({
  props: {},
  components: {
    MenuItem,
  },
})
export default class Sidebar extends Vue {}
</script>

<style scoped>
.sidebar-box {
  background-color: white;
  padding-top: 5px;
}
</style>