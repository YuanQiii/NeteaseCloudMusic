<template>
  <div class="newest">
    <music-head :headcat="headcat" :headwidth="689" class="musichead" :headPath="'album'">
      <span slot="head">
        <img src="../../../../assets/hothead/point.png" class="redpoint" />
        新碟上架
      </span>
      <span slot="more">
        更多
        <img src="../../../../assets/hothead/more.png" class="moreimg" />
      </span>
    </music-head>
    <newest-list />
  </div>
</template>

<script>
import NewestList from "./NewestList";
import MusicHead from "../../../Operate/MusicHead";
export default {
  name: "NewestAlbum",
  components: {
    NewestList,
    MusicHead,
  },
};
</script>

<style scoped>
.newest {
  border: 1px solid #d3d3d3;
  border-bottom: none;
  border-top: none;
  width: 36%;
  padding: 0 30px 0 14px;
  margin-left: 25%;
  background-color: #fff;
  border-right: none;
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