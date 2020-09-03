<template>
  <div class="info">
    <div class="img">
      <img :src="playListInfo.coverImgUrl" class="cir" />
    </div>
    <div class="infodes">
      <div class="r1">
        <span class="reg">&reg;</span>
        <div class="tag">
          <img src="../../../assets/playlist/tag .png" />
          <span>歌单</span>
        </div>
        <div class="name">{{playListInfo.name}}</div>
      </div>
      <div class="r2">
        <img :src="playListInfo.creator.avatarUrl" class="ava" @click="jumpPage('profile', playListInfo.creator.userId)"/>
        <a @click="jumpPage('profile', playListInfo.creator.userId)"><span>{{playListInfo.creator.nickname}}</span></a>
        <span>{{createTime(playListInfo.createTime)}} 创建</span>
      </div>
      <music-list-operate :musicListInfo="playListInfo" />
      <div class="r4">
        <span>标签：</span>
        <button v-for="value in playListInfo.tags" :key="value">{{value}}</button>
      </div>
      <div class="r5">
        <div class="desc">
          <pre :style="descIsOpen?'height: auto':'max-Height: 300px'" class="preTag">介绍：{{playListInfo.description}}</pre>
        </div>
      </div>
      <spread-or-close class="soc" />
    </div>
  </div>
</template>
<script>
import { playCountFormat } from "../../../utils/playCountFormat";
import { dateFormat } from "../../../utils/dateFormat";
import MusicListOperate from "../../Operate/MusicListOperate";
import SpreadOrClose from "../../Operate/SpreadOrClose";
export default {
  name: "PlayListDescription",
  components: {
    MusicListOperate,
    SpreadOrClose,
  },
  props: {
    playListInfo: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {};
  },
  created() {
    this.$store.commit("changeValue", {
      type: "descIsOpen",
      value: false,
    });
  },
  computed: {
    preHeight() {
      return this.$refs.preTag;
    },
    descIsOpen() {
      return this.$store.state.descIsOpen;
    },
  },
  methods: {
    addAllMusic(isPlay) {
      this.$store.commit("changeValue", [
        {
          type: "musicAudioAddAllFlag",
          value: true,
        },
        {
          type: "musicAudioPlayStatus",
          value: isPlay,
        },
      ]);
    },
    jumpPage(path, id){
      this.$router.push({
        name: path,
        params: {
          id: id
        }
      })
    },
    createTime(time) {
      return dateFormat(time);
    },
    countFormat(count) {
      return playCountFormat(count);
    },
  },
};
</script>
<style scoped>
.preTag {
  white-space: pre-line;
      overflow: hidden;
    text-overflow: ellipsis;
}
.soc {
  margin-left: 365px;
}
button {
  border-radius: 5px;
  height: 31px;
  border: 1px solid #ccc;
  display: flex;
  align-items: center;
  font-size: 12px;
  outline: none;
  cursor: pointer;
}

button:hover {
  background-color: #fff;
}

button > img {
  height: 15px;
  width: 15px;
}
.reg {
  position: absolute;
  font-size: 12px;
  text-size-adjust: none;
  z-index: 99;
  left: 815px;
  color: #fff;
}
.info {
  display: flex;
}

.infodes {
  width: 910px;
}

.name {
  font-size: 20px;
  margin-left: 10px;
  float: left;
}
.cir {
  width: 208px;
  height: 208px;
}
.ava {
  width: 34px;
  height: 34px;
  cursor: pointer;
}

.tag {
  position: relative;
  top: 2px;
  float: left;
}

.tag > img {
  width: 54px;
  height: 24px;
}

.tag > span {
  color: white;
  position: absolute;
  top: 3px;
  left: 7px;
  font-size: 13px;
}
.r2 {
  display: flex;
  margin-top: 10px;
}

.r2 > a {
  padding-top: 10px;
  margin-left: 10px;
  color: #0c73c2;
  font-size: 12px;
  cursor: pointer;
}
.r2 > a:hover > span{
  border-bottom: solid 1px;
}

.r2 > span {
  margin-top: 10px;
  margin-left: 10px;
  font-size: 12px;
  color: #999;
}

.r1 {
  display: flex;
}
.r4 {
  display: flex;
  margin-top: 20px;
  font-size: 12px;
  color: #666;
}

.r4 > button {
  color: #777;
  width: auto;
  height: auto;
  padding: 2px 13px;
  border-radius: 15px;
  margin-right: 5px;
  margin-top: -2px;
}

.r5 {
  font-size: 12px;
  color: #666;
  width: 410px;
  height: auto;
  margin-top: 10px;
}

.desc {
  margin-top: 5px;
  white-space: normal;
  word-break: break-all;
  overflow-wrap: break-word;
  color: #666;
  line-height: 18px;
}
.img {
  margin-left: -40px;
  margin-right: 20px;
}
.img > img {
  padding: 4px;
  border: solid 1px #ccc;
}
</style>