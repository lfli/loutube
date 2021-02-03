<template>
  <div>
    <div class="popular-now">
      <div class="top-menu">
        <template v-for="item of popularNowTopMenuList" :key="item.link">
          <TopMenuItem :href="item.icon">{{ item.title }}</TopMenuItem>
          <div style="width: 80px"></div>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { popularNowTopMenuList } from "@/apis/data";
import { Options, Vue } from "vue-class-component";
import TopMenuItem from "./TopMenuItem.vue";

@Options({
  components: {
    TopMenuItem,
  },
})
export default class PopularNow extends Vue {
  popularNowTopMenuList = popularNowTopMenuList;
}
</script>

<style scoped>
.popular-now {
  padding-left: 34px;
  padding-right: 34px;
}
.top-menu {
  display: flex;
  padding: 16px 0;
  border-bottom: 1px solid #d3d3d3;
}
</style>
