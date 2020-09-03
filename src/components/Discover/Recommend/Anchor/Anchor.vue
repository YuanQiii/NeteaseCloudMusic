<template>
  <div class="anchor">
    <anchor-head />
    <anchor-item v-for="(value, index) in info" :key="index" :sendinfo="value" />
  </div>
</template>
<script>
import AnchorHead from "./AnchorHead";
import AnchorItem from "./AnchorItem";
export default {
  name: "Anchor",
  components: {
    AnchorHead,
    AnchorItem
  },
  data() {
    return {
      info: [
        {
          img:
            "http://p2.music.126.net/H3QxWdf0eUiwmhJvA4vrMQ==/1407374893913311.jpg?param=40y40",
          name: "陈立",
          desc: "心理学家、美食家陈立教授",
          id: 278438485
        },
        {
          img:
            "http://p2.music.126.net/y5-sM7tjnxnu_V9LWKgZlw==/7942872001461517.jpg?param=40y40",
          name: "DJ艳秋",
          desc: "著名音乐节目主持人",
          id: 91239965
        },
        {
          img: "http://p2.music.126.net/6cc6lgOfQTo6ovNnTHPyJg==/3427177769086282.jpg?param=40y40",
          name: "国家大剧院古典音乐频道",
          desc: "国家大剧院古典音乐官方",
          id: 324314596
        },
        {
          img: "http://p2.music.126.net/xa1Uxrrn4J0pm_PJwkGYvw==/3130309604335651.jpg?param=40y40",
          name: "谢谢收听",
          desc: "南京电台主持人王馨",
          id: 1611157
        },
        {
          img: "http://p2.music.126.net/slpd09Tf5Ju82Mv-h8MP4w==/3440371884651965.jpg?param=40y40",
          name: "DJ晓苏",
          desc: "独立DJ，CRI环球旅游广播...",
          id: 2313954
        }
      ]
    };
  }
};
</script>
<style scoped>
.anchor {
  border: 1px solid #c3c3c3;
  border-top: none;
  height: 860px;
}
</style>