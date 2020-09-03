<template>
  <div class="main">
    <div class="item" v-for="(value, index) in relatedMV.mvs" :key="index">
      <img :src="value.imgurl" class="pic" />
      <span class="r1"><span>{{value.name}}</span></span>
      <div class="play">
        <img src="../../../../assets/hothead/play.png" alt />
      </div>
    </div>
  </div>
</template>
<script>
import {request} from '../../../../network/request'
export default {
  name: 'RelatedMV',
  data(){
    return {
      relatedMV: {}
    }
  },
  created(){
    this.getRelatedMV(this.$route.params.id)
  },
  methods: {
    getRelatedMV(id){
      return request({
        url: `/artist/mv?id=${id}&limit=12`
      }).then(response => {
        this.relatedMV = response
      })
    }
  }
}
</script>
<style scoped>
.play {
  width: 44px;
  height: 44px;
  border-radius: 22px;
  position: absolute;
  z-index: 99;
  top: 35px;
  left: 45px;
  background-color: #333;
  opacity: .6;
}
.play > img {
  width: 44px;
  height: 44px;
}
.item:hover .play:hover {
  opacity: 1;
}

.r1 {
  width: 130px;
  height: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  box-sizing: border-box;
  cursor: pointer;
}
.r1 {
  font-size: 14px;
}
.r1:hover > span{
  border-bottom: solid 1px black;
}
.main {
  width: 620px;
  height: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.item {
  margin-top: 20px;
  margin-bottom: 40px;
  position: relative;
  display: flex;
  flex-direction: column;
  cursor: pointer;
}
.pic {
  width: 137px;
  height: 103px;
  z-index: 9;
  position: relative;
  border: solid 1px #eee;
}
</style>