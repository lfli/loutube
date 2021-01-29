<template>
  <div class="sidebar-box"></div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  props: {},
})
export default class Sidebar extends Vue {}
</script>

<style scoped>
.sidebar-box {
    background-color: cornflowerblue;
}
</style>