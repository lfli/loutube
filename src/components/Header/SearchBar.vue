<template>
  <div class="search">
    <input type="text" placeholder="搜索" name="" id="" value="" />
    <button><i>搜索</i></button>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  props: {},
})
export default class SearchBar extends Vue {}
</script>

<style scoped>
.search {
  width: 40vw;
  height: 30px;
  display: flex;
}
.search input {
  float: left;
  flex: 4;
  border: 1px solid #b3b3b3;
  border-top-left-radius: 2px;
  border-bottom-left-radius: 2px;
  outline-color: rgb(160, 161, 255);
  padding-left: 10px;
  box-shadow: 0px 0px 2px #cecece inset;
}
.search input::-webkit-input-placeholder {
 color: rgb(134, 134, 134);
 }
.search button {
  float: right;
  flex: 1;
  border-top-right-radius: 2px;
  border-bottom-right-radius: 2px;
  background-color: var(--themeBgColor);
  border: 1px solid #b3b3b3;
  border-left: none;
  outline: none;
}
.search button i {
  font-style: normal;
}
</style>