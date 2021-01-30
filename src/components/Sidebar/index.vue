<template>
  <div class="sidebar-box">
    <MenuItem @click="to('/')" class="icon-shouye">首页</MenuItem>
    <MenuItem @click="to('/popular-now')" class="icon-huo">时下流行</MenuItem>
    <MenuItem @click="to('/subscription')" class="icon-subscribe">订阅内容</MenuItem>
    <MenuItem @click="to('/mediaLibrary')" class="icon-shipinbofang">媒体库</MenuItem>
    <MenuItem @click="to('/history')" class="icon-lishijilu">历史记录</MenuItem>
  </div>
</template>

<script lang="ts">
import router from "@/router";
import { Options, Vue } from "vue-class-component";
import MenuItem from "./MenuItem.vue";

@Options({
  props: {},
  components: {
    MenuItem,
  },
  methods: {
    to(address: string) {
      router.push({ path: address });
    },
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