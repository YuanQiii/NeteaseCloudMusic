<template>
  <div>
    <add-comment :commentTotal="commentTotal" />
    <comment-content
      :commentsArr="comments.hotComments"
      :commentTitle="`精彩评论`"
    />
    <comment-content
      :commentsArr="comments.comments"
      :commentTitle="`最新评论(${comments.total})`"
    />
  </div>
</template>
<script>
import AddComment from "./AddComment";
import CommentContent from "./CommentContent";
export default {
  name: "Comment",
  components: {
    AddComment,
    CommentContent,
  },
  props: {
    commentTotal: {
      type: Number,
      default: 0,
    },
    comments: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
};
</script>
<style scoped>
</style>