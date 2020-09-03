<template>
  <div class="HotMain">
    <music-head :headcat="headcat" :headwidth="689" :headPath="'playlistcat'" class="musichead">
      <span slot="head" >
        <img src="../../../../assets/hothead/point.png" class="redpoint">
        热门推荐
      </span>
      <span slot="more">
        更多
        <img src="../../../../assets/hothead/more.png" class="moreimg">
      </span>
    </music-head>
    <hot-list />
  </div>
</template>

<script>
import HotList from "./HotList/HotList"
import MusicHead from "../../../Operate/MusicHead"
export default {
  name: "Hot",
  components: {
    HotList,
    MusicHead
  },
  data(){
    return {
      headcat: ['华语','流行','摇滚','民谣','电子']
    }
  }
};
</script>

<style scoped>

.HotMain {
  width: 730px;
  border: 1px solid #D3D3D3;
  border-bottom: none;
  border-top: none;
  border-right: none;
  width: 36%;
  padding: 0 30px 0 14px;
  margin-left: 25%;
  background-color: #fff;
}
.musichead {
  margin-left: 10px;
}
.redpoint {
  width: 16px;
  height: 16px;
}
.moreimg {
  width: 12px;
  height: 12px;
}
</style>