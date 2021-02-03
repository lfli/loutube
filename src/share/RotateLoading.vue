<template>
  <div class="rotate-loading"></div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({})
export default class RotateLoading extends Vue {}
</script>

<style scoped>
.rotate-loading {
  border: 4px solid transparent;
  border-radius: 50%;
  border-top: 4px solid #909090;
  width: 3vw;
  height: 3vw;
  display: inline-block;
  animation: rotate 1s linear infinite;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>