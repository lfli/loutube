<template>
  <div
    :class="selectedClass"
    @click="$attrs.onClick()"
    class="side-drawer-menu-item"
  >
    <span class="iconfont span-icon" :class="$attrs.class"></span>
    <span class="span-text"><slot></slot></span>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  inheritAttrs: false,
  props: { url: String },
  computed: {
    selectedClass() {
      return {
        selected: this.url === this.$router.currentRoute.value.path,
      };
    },
  },
  components: {},
})
export default class SideDrawerMenuItem extends Vue {}
</script>

<style scoped>
.side-drawer-menu-item {
  padding: 0 24px;
  height: 40px;
  display: flex;
  align-items: center;
  cursor: pointer; /** 鼠标变小手 */
  user-select: none; /** 文字不可被选中 */
}
.side-drawer-menu-item:hover {
  background-color: rgba(128, 128, 128, 0.1);
}
.span-icon {
  font-size: 24px;
  margin-right: 24px;
}
.span-text {
  font-size: 14px;
  font-family: Roboto, Arial, sans-serif;
  color: #030303;
}
.selected {
  background-color: #e5e5e5;
  color: red;
}
</style>