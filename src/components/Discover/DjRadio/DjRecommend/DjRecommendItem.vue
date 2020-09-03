<template>
  <div>
    <div class="headmain">
      <div class="hotre">
        <slot name="head" />
      </div>
      <div class="more">
        <span>更多 ></span>
      </div>
    </div>
    <div class="main">
    <div class="item" v-for="(value, index) in DjRecommend.djRadios.slice(0,4)" :key="index">
      <img :src="value.picUrl" @click="jumpPage('djdetail', value.id)">
      <span @click="jumpPage('djdetail', value.id)">{{value.name}}</span>
      <span class="text">{{value.rcmdtext}}</span>
    </div>
    </div>

  </div>
</template>
<script>
import {request} from "../../../../network/request"
export default {
  name: "DjRecommendItem",
  props: {
    requestType: {
      type: Number
    },
  },
  data(){
    return {
      DjRecommend: {}
    }
  },
  created(){
    this.getDjRecommend(this.requestType)
  },
  methods: {
    getDjRecommend(type) {
      return request({
         url: `/dj/recommend/type?type=${type}`
      }).then((response) => {
        this.DjRecommend = response;
      });
    },
        jumpPage(path, id){
      this.$router.push({
        name: path,
        params: {
          id: id
        }
      })
    }
  }
};
</script>
<style scoped>
.text {
  color: #999;
  font-size: 12px;
  position: absolute;
  left: 140px;
  top: 80px;
}
.main {
  display: flex;
  flex-wrap: wrap;
}
.item {
  padding-top: 20px;
  padding-bottom: 20px;
  width: 432px;
  margin-left: 36px;
  position: relative;
}
.item:nth-of-type(1),.item:nth-of-type(2) {
  border-bottom: 1px #e7e7e7 solid;
}
.item>span:first-of-type {
  font-size: 18px;
  font-weight: bold;
  position: absolute;
  top: 40px;
  left: 140px;
  cursor: pointer;
}
.item>span:first-of-type:hover {
  border-bottom: solid 1px;
}
.item>img {
  height: 120px;
  width: 120px;
  cursor: pointer;
}
.headmain {
  width: 900px;
  height: 42px;
  display: flex;
  justify-content: space-between;
  border-bottom: 2px solid #c10d0c;
  padding: 34px 0 0 0;
  color: #333;
  margin-left: 36px;
}
.hotre {
  font-size: 24px;
}
.hotre:hover > span,
.more:hover > span {
  border-bottom: solid 2px;
  cursor: pointer;
}
.more {
  font-size: 12px;
  margin-top: 12px;
}
</style>