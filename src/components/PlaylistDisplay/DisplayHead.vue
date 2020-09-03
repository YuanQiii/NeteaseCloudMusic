<template>
  <div class="displayhead">
    <div class="r1">
      <div class="d1">
        <span>播放列表({{$store.state.musicAudioList.length}})</span>
      </div>
      <div class="d2">
        <img src="../../assets/audioimg/musiccollect.png" alt />
        <span>收藏全部</span>
      </div>
      <div class="d3" @click="clearList">
        <img src="../../assets/audioimg/clear.png" alt />
        <span>清除</span>
      </div>
    </div>
    <div class="r2">
      <div class="d5" v-if="Number(musicAudioDetail)">{{musicAudioDetail.songs[0].name}}</div>
      <div class="d4" @click="toggleShow">&Chi;</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "DisplayHead",
  data() {
    return {
      
    };
  },
  computed: {
    musicAudioDetail() {
      return this.$store.state.musicAudioDetail;
    },
    windowShow(){
      return this.$store.state.windowShow;
    }
  },
  methods: {
    clearList() {
      this.$store.commit("changeValue", [
        {
          type: "musicAudioList",
          value: [],
        },
        {
          type: "musicAudioUrlList",
          value: [],
        },
        {
          type: 'musicAudioLyricList',
          value: []
        },
        {
          type: 'musicAudioDetailList',
          value: []
        }
      ]);
    },
    toggleShow(){
      this.$store.commit('changeValue', {
        type: 'windowShow',
        value: !this.windowShow
      })
    }
  },
};
</script>
<style scoped>
.d5 {
  line-height: 40px;
  font-size: 14px;
}
.d4 {
  position: absolute;
  color: #7c7c7c;
  cursor: pointer;
  left: 97.5%;
  top: 2%;
  opacity: 0.7;
}
.d4:hover {
  opacity: 1;
}
.d2,
.d3 {
  font-size: 12px;
  color: #ccc;
  margin-top: 5px;
  position: relative;
}
.d2:hover > span,
.d3:hover > span {
  border-bottom: solid 1px;
  cursor: pointer;
  color: #e2e2e2;
}
.d2:hover > img,
.d3:hover > img {
  opacity: 1;
}
.d2 > img,
.d3 > img {
  width: 20px;
  height: 20px;
  position: relative;
  top: 4px;
  margin-right: 3px;
  opacity: 0.7;
}
.d2 {
  margin-left: 305px;
  margin-right: 15px;
}
.d1 {
  color: #fff;
  font-size: 14px;
  margin-top: 8px;
  margin-left: 25px;
}
.r2 {
  display: flex;
  justify-content: center;
  width: 411px;
  color: #fff;
}
.r1 {
  width: 558px;
  display: flex;
}
.displayhead {
  width: 100%;
  height: 40px;
  background: #181818;
  border-radius: 5px;
  display: flex;
}
</style>