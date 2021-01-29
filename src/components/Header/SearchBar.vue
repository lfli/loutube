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
  width: 40%;
  display: flex;
}
.search input {
  float: left;
  flex: 4;
  height: 30px;
  border: 1px solid #b3b3b3;
  border-top-left-radius: 2px;
  border-bottom-left-radius: 2px;
  box-sizing: border-box;
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
  height: 30px;
  border-top-right-radius: 2px;
  border-bottom-right-radius: 2px;
  background-color: var(--themeBgColor);
  border-style: none;
  outline: none;
  border: 1px solid #b3b3b3;
  border-left: none;
}
.search button i {
  font-style: normal;
}
.search button:hover {
  font-size: 16px;
}
</style>