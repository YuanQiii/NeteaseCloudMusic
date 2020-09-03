<template>
  <div>
    <div class="r3">
      <button class="play" @click="addAllMusic(true)">
        <img src="../../../../assets/hothead/play.png" alt />
        <span>播放</span>
      </button>
      <button class="add" @click="addAllMusic(false)">
        <img src="../../../../assets/playlist/add.png" alt />
      </button>
      <button>
        <img src="../../../../assets/search/rescollect.png" alt />
        <span>收藏热门{{singerHotSongs.length}}</span>
      </button>
      <button class="collect">
        <div>热门单曲 ∨</div>
      </button>
    </div>

    <music-operate :musicHead="false" 
    :playListInfo="singerHotSongs" 
    :musicIsSinger="true"
    :musicMargin="musicM"
    :musicWidth="musicW"
     style="width: 640px"/>
  </div>
</template>
<script>
import MusicOperate from "../../../Operate/MusicOperate";
export default {
  name: "Popular",
  components: {
    MusicOperate,
  },
  data() {
    return {
      musicM: [30,0,0,0,0,70],
      musicW: [15,289,89,0,0,108]
    };
  },
  computed: {
    singerHotSongs() {
      return this.$store.state.singerHotSongs;
    },
  },
  mounted() {},
  methods: {},
};
</script>
<style scoped>
.collect {
  margin-left: 345px;
  padding: 0 10px;
}
.collect > div {
  margin: 0 10px;
}
button {
  border-radius: 5px;
  height: 31px;
  border: 1px solid #c4c4c4;
  display: flex;
  align-items: center;
  font-size: 12px;
  cursor: pointer;
  background: linear-gradient(0deg, #f1f1f1, #fff);
}

button:hover {
  background: linear-gradient(0deg, #f3f3f3, #fff);
  border: solid 1px #dedddd;
}

button > img {
  height: 15px;
  width: 15px;
}
.r3 {
  display: flex;
  margin-top: 20px;
}
.r3 > button {
  width: auto;
  padding: 0 2px 0 2px;
  display: flex;
}
.r3 > button:not(:first-of-type) {
  margin-right: 5px;
}
.r3 > button:nth-of-type(2) {
  padding: 0 3px 0 5px;
}
.r3 > button > img {
  width: 15px;
  height: 15px;
  margin-right: 5px;
}
.play {
  width: 66px;
  background: linear-gradient(0deg, #136cbf, #4b9ede);
  color: white;
  font-size: 12px;
  display: flex;
  padding-top: 2px;
  padding-left: 10px;
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
  border: solid 1px #428dd6;
}
.add {
  margin-left: -2px;
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
  border: solid 1px #428dd6;
  background: linear-gradient(0deg, #136cbf, #4b9ede);
}
.add:hover,
.play:hover {
  background: linear-gradient(0deg, #3383ce, #5ea3e3);
  border-left: solid 1px #316da7;
}
.add {
  border-left: solid 1px #316da7;
}

.play > span {
  margin-right: 5px;
  margin-bottom: 2px;
}

.play > img:nth-of-type(1) {
  height: 18px;
  width: 18px;
  margin-left: 0px;
}
</style>