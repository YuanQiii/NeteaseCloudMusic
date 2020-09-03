<template>
  <div>
    <div class="r1">
      <div class="title">
        <div class="s1"></div>
        <div class="s2">{{$store.state.musicianName}}简介</div>
      </div>
      <div class="desc">{{introduction.briefDesc}}</div>
    </div>
    <div class="r2" v-for="(value, index) in introduction.introduction" :key="index">
      <div class="title">{{value.ti}}</div>
      <div class="desc">{{value.txt}}</div>
    </div>
  </div>
</template>
<script>
import { request } from "../../../../network/request";
export default {
  name: "Introduction",
  data() {
    return {
      introduction: {}
    };
  },
  mounted() {
    this.getIntroduction(this.$route.params.id);
  },
  methods: {
    getIntroduction(id) {
      return request({
        url: `/artist/desc?id=${id}`
      }).then(response => {
        this.introduction = response;
      });
    }
  }
};
</script>
<style scoped>
.desc {
  margin-top: 10px;
  line-height: 25px;
    color: #666;
    text-indent: 2em;
    font-size: 12px;
    margin-bottom: 40px;
}
.title {
  display: flex;
  font-size: 14px;
  font-weight: bold;
  color: #333;
}
.r1 {
  display: flex;
  margin-top: 7px;
  flex-direction: column;
}
.s1 {
  margin-top: 4px;
  margin-right: 7px;
  height: 16px;
  width: 3px;
  background-color: #c10d0c;
}
</style>