<template>
  <!-- <div>{{$store.state.DjRecommendType.djRadios[0].name}}</div> -->
  <div>
    <div class="mainnew">
      <div class="headnew">
        <div class="hotre">
          <slot name="new" />
        </div>
      </div>

      <div class="contentnew">
        <div
          v-for="(value, index) in $store.state.DjRecommendType.djRadios.slice(0,5)"
          :key="index"
          class="newitem"
        >
          <img :src="value.picUrl" alt />
          <span>
            <span>{{value.name}}</span>
          </span>
          <span>{{value.rcmdtext}}</span>
        </div>
      </div>
    </div>

    <div class="headtop">
      <div class="hotre">
        <slot name="top" />
      </div>
      <div class="more">
        <span>上升最快</span>
        |
        <span>最热电台</span>
      </div>
    </div>
    <div class="maintop">
      <div class="item" v-for="(value, index) in $store.state.DjRadioHot.djRadios" :key="index">
        <img :src="value.picUrl" alt />
        <span>{{value.name}}</span>
        <div class="artist">
          <img src="../../../../assets/search/resme.png" alt />
          <span>{{value.dj.nickname}}</span>
          <img src="../../../../assets/dj/usertype.png" alt v-if="value.dj.userType === 4" />
          <img src="../../../../assets/banner/v.png" alt v-if="value.dj.userType === 3" />
        </div>
        <span class="text">共{{value.programCount}}期 订阅{{value.subCount}}次</span>
      </div>
    </div>
  </div>
</template>
<script>
import { request } from "../../../../network/request";
export default {
  name: "DjTypeItem",
  data() {
    return {};
  },
  created() {},
  methods: {},
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
.maintop {
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
.item:nth-of-type(1),
.item:nth-of-type(2) {
  border-bottom: 1px #e7e7e7 solid;
}
.artist {
  position: absolute;
  left: 140px;
  top: 80px;
}
.artist > span {
  font-size: 12px;
  color: #333;
}
.artist > img:first-of-type {
  width: 15px;
  height: 15px;
  margin-right: 10px;
  position: relative;
  top: 3px;
}
.artist > img:last-of-type {
  width: 13px;
  height: 13px;
  position: relative;
  top: 2px;
  left: 3px;
}
.item > span:first-of-type {
  font-size: 18px;
  font-weight: bold;
  position: absolute;
  top: 40px;
  left: 140px;
  cursor: pointer;
}
.item > span:first-of-type:hover {
  border-bottom: solid 1px;
}
.item > span:last-of-type {
  position: absolute;
  top: 110px;
}
.item > img {
  height: 120px;
  width: 120px;
  cursor: pointer;
}
.contentnew {
  margin: 0 40px;
  display: flex;
  justify-content: space-between;
}
.newitem {
  display: flex;
  flex-direction: column;
  width: 150px;
  flex-wrap: wrap;
  font-size: 14px;
  color: #333;
  margin-top: 20px;
}
.newitem > span:first-of-type {
  margin: 10px 0;
  cursor: pointer;
}
.newitem > span:last-of-type {
  font-size: 12px;
  color: #999;
}
.newitem > span:first-of-type:hover > span {
  border-bottom: solid 1px;
}
.newitem > img {
  width: 150px;
  height: 150px;
}
.headnew,
.headtop {
  width: 900px;
  height: 42px;
  display: flex;
  justify-content: space-between;
  border-bottom: 2px solid #c10d0c;
  padding: 34 0 0 10px;
  color: #333;
  margin-left: 40px;
  margin-top: 40px;
}
.hotre {
  font-size: 24px;
}
.hotre:hover > span {
  cursor: pointer;
  border-bottom: solid 2px;
}
.more {
  font-size: 12px;
  margin-top: 12px;
}
.more > span:first-of-type {
  margin-right: 10px;
  cursor: pointer;
}
.more > span:first-of-type:hover {
  border-bottom: solid 2px;
}
.more > span:last-of-type {
  margin-left: 10px;
  cursor: pointer;
  color: #c20c0c;
}
.more > span:last-of-type:hover {
  border-bottom: solid 2px;
}
</style>