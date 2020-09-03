<template>
  <div class="main" :style="musicIsSinger?'width: 640px': ''">
    <div class="item" v-for="(value, index) in musicInfo" :key="index" :style="musicIsSinger?'marginLeft: 5px': ''">
      <img :src="value.picUrl" class="pic" />
      <div class="r1" @click="jumpPage('albumdetail', value.id)"><span>{{value.name}}</span></div>
      <div class="r2" @click="jumpPage('singerdetail', value.artist.id)"><span>{{value.artist.name}}</span></div>
      <img src="../../assets/banner/record.png" class="record" />
      <div class="bg"></div>
      <div class="reflective" v-if="musicReflective" @click="jumpPage('albumdetail', value.id)"></div>
      <div class="point"></div>
      <div class="play" @click="jumpPage('albumdetail', value.id)">
        <img src="../../assets/hothead/play.png" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'MusicAImage',
  props: {
    musicInfo: {
      type: Array,
      default: () => {
        return []
      }
    },
    musicReflective: {
      type: Boolean,
      default: true
    },
    musicIsSinger: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    jumpPage(path, id){
      this.$router.push({
        name: path,
        params: {
          id: id
        }
      })
    }
  }
}
</script>
<style scoped>
.reflective {
  position: absolute;
  box-sizing: border-box;
  border: solid 70px;
  border-color: white transparent transparent white;
  z-index: 9;
  top: -10px;
  left: 0px;
  opacity: 0.2;
}
.play {
  width: 28px;
  height: 28px;
  border-radius: 14px;
  position: absolute;
  z-index: 99;
  top: 95px;
  left: 95px;
  background-color: #333;
  opacity: 0;
}
.play > img {
  width: 28px;
  height: 28px;
}
.item:hover .play:hover {
  opacity: 1;
}
.item:hover .play{
  opacity: .6;
}
.r1,
.r2 {
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
  margin-top: 10px;
}
.r2 {
  color: #666;
  font-size: 12px;
}
.r1:hover>span,
.r2:hover>span {
  border-bottom: solid 1px black;
}
.main {
  width: 900px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.item {
  margin-top: 20px;
  position: relative;
  display: flex;
  flex-direction: column;
  margin-left: 40px;
  cursor: pointer;
}
.pic {
  width: 130px;
  height: 130px;
  border: 1px solid #7e7e7e;
  z-index: 9;
  position: relative;
}
.record {
  position: absolute;
  left: 30px;
}
.bg {
  position: absolute;
  width: 120px;
  height: 120px;
  left: 18px;
  top: 5px;
  border: 1px solid #000;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  background-color: #fff;
  opacity: .24;
}
.point {
  height: 15px;
  width: 15px;
  border-left: solid 3px #4c4c4c;
  background-color: #2a2a2a;
  border-radius: 7.5px;
  position: absolute;
  z-index: 99;
  top: 55px;
  left: 132px;
}
</style>