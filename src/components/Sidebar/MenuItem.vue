<template>
  <div :class="selectedClass" @click="$attrs.onClick()">
    <span class="iconfont span-icon" :class="$attrs.class"></span>
    <span :class="selectedClass" class="span-text"><slot></slot></span>
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
})
export default class MenuItem extends Vue {}
</script>

<style scoped>
div {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 14px 0;
  cursor: pointer; /** 鼠标变小手 */
  user-select: none; /** 文字不可被选中 */
}
div:hover {
  background-color: rgba(128, 128, 128, 0.1);
}
.span-icon {
  font-size: 20px;
  margin-bottom: 6px;
}
.span-text {
  font-size: 12px;
  font-family: Roboto, Arial, sans-serif;
  color: #030303;
}
.selected {
  color: red;
}
</style>