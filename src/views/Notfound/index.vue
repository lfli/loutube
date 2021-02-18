<template>
  <div>
    <div class="not-found">
      <span class="not-found-title">404</span>
      <span class="not-found-info">抱歉，此页面不存在。</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({})
export default class NotFound extends Vue {}
</script>

<style scoped>
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.not-found-title {
  font-size: 10rem;
}
.not-found-info {
  font-size: 16px;
  color: #333333;
}
</style>