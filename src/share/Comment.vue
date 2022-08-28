<template>
  <div class="comment">
    <img class="head" :src="comment.user.avatarUrl" alt="" />
    <div class="comment-right">
      <div>
        <span class="nickname">{{ comment.user.nickname }}</span>
      </div>
      <div class="content-box">
        <span
          class="hideText comment-content"
          :class="[isOpen ? 'comment-content-open' : 'comment-content-close']"
          >{{ comment.content }}</span
        >
      </div>
      <div>
        <!-- <div class="operation-box">
          <span v-if="!isOpen" @click="isOpen = true">展开</span>
          <span v-else @click="isOpen = false">收起</span>
        </div> -->
        <div class="zan-box">
          <span class="iconfont icon-zan comment-zan"></span>
          <span class="zan-count">{{
            $filters.internationalNumber(comment.likedCount)
          }}</span>
          <span class="iconfont icon-zan comment-cai"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { IComment } from "@/typing";
import { Options, Vue } from "vue-class-component";

@Options({
  props: ["comment"],
})
export default class Comment extends Vue {
  comment!: IComment;
  isOpen = false;
}
</script>

<style scoped>
.comment {
  display: flex;
}
.head {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.comment-right {
  margin-left: 18px;
}
.nickname {
  font-size: 13px;
  color: #030303;
}
.content-box {
  margin-top: 3px;
}
.comment-content {
  -webkit-line-clamp: 2;
  font-size: 14px;
  color: #030303;
}
.zan-box {
  padding: 14px 0 8px 0;
  display: flex;
  align-items: center;
}
.comment-zan {
  font-size: 18px;
  color: #909090;
}
.zan-count {
  font-size: 13px;
  color: #606060;
  margin: 0 16px 0 8px;
}
.comment-cai {
  font-size: 18px;
  color: #909090;
}
.comment-cai:before {
  display: inline-block;
  transform: rotate(180deg);
}
.comment-content-open {
  -webkit-line-clamp: inherit;
}
.comment-content-close {
  -webkit-line-clamp: 2;
}
.operation-box {
  cursor: pointer;
  user-select: none;
}
</style>