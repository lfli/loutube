<template>
  <div class="sidebar-box">
    <MenuItem
      v-for="item of listData"
      :key="item.link"
      @click="to(item.link)"
      :class="item.icon"
      >{{ item.title }}</MenuItem
    >
  </div>
</template>

<script lang="ts">
import router from "@/router";
import { Options, Vue } from "vue-class-component";
import MenuItem from "./MenuItem.vue";

@Options({
  props: { listData: Array },
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