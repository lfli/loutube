<template>
  <div class="search">
    <input
      v-model="keywords"
      @keyup.enter="search()"
      type="text"
      placeholder="搜索"
    />
    <button class="search-button" @click="search()">
      <span class="iconfont icon-sousuo search-icon"></span>
    </button>
  </div>
</template>

<script lang="ts">
import router from "@/router";
import { Options, Vue } from "vue-class-component";

@Options({})
export default class SearchBar extends Vue {
  keywords = "";
  search() {
    if (this.keywords.length > 0) {
      router.push({ path: "/search", query: { q: this.keywords } });
    }
  }
}
</script>

<style scoped>
.search {
  width: 46vw;
  height: 32px;
  display: flex;
}
.search input {
  flex: 1;
  border: 1px solid #b3b3b3;
  border-top-left-radius: 2px;
  border-bottom-left-radius: 2px;
  padding-left: 10px;
  box-shadow: 0px 0px 2px #cecece inset;
}
.search input:focus {
  border: 1px solid rgb(0, 0, 216);
  outline: none;
  box-shadow: 0px 0px 2px rgb(0, 0, 216) inset;
}
.search input::-webkit-input-placeholder {
  color: rgb(134, 134, 134);
  font-size: 16px;
}
.search-button {
  float: right;
  width: 65px;
  border-top-right-radius: 2px;
  border-bottom-right-radius: 2px;
  background-color: var(--themeBgColor);
  border: 1px solid #b3b3b3;
  border-left: none;
  outline: none;
  cursor: pointer; /** 鼠标变小手 */
  user-select: none; /** 文字不可被选中 */
}
.search-button i {
  font-style: normal;
}
.search-button:hover {
  background-color: #f1f1f1;
}
.search-button:hover .search-icon {
  background-color: #f1f1f1;
  color: #333333;
}
.search-icon {
  font-size: 14px;
  color: #828282;
}
</style>