<template>
  <div class="top-menu-item">
    <svg class="icon menu-item-icon" aria-hidden="true">
      <use :xlink:href="$attrs.href"></use>
    </svg>
    <div class="menu-item-text-box">
      <span><slot></slot></span>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  inheritAttrs: false,
})
export default class TopMenuItem extends Vue {}
</script>

<style scoped>
.top-menu-item {
  cursor: pointer;
  user-select: none;
}
.menu-item-icon {
  width: 80px;
  height: 80px;
  color: lightblue;
}
.menu-item-text-box {
  text-align: center;
  color: #606060;
  margin-top: 8px;
}
</style>