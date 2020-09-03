<template>
  <div>
    <dj-recommend-item
      :requestType="requestType[index]"
      v-for="(value, index) in headList"
      :key="index"
    >
      <span slot="head">{{value}}·电台</span>
    </dj-recommend-item>
  </div>
</template>
<script>
import { request } from "../../../../network/request";
import DjRecommendItem from "./DjRecommendItem";
export default {
  name: "DjRecommend",
  components: {
    DjRecommendItem,
  },
  data() {
    return {
      DjRecommend: {},
      headList: [
        "音乐故事",
        "美文读物",
        "脱口秀",
        "情感调频",
        "创作|翻唱",
        "人文历史",
      ],
      requestType: [2, 6, 5, 3, 2001, 11],
    };
  },
  methods: {
  },
};
</script>
<style scoped>
</style>