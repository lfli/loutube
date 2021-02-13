<template>
  <div class="comment">
    <img class="head" :src="comment.user.avatarUrl" alt="" />
    <div>
      <div>
        <span>{{ comment.user.nickname }}</span>
      </div>
      <div>
        <span class="hideText comment-content">{{ comment.content }}</span>
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
.comment-content {
  -webkit-line-clamp: 2;
}
</style>