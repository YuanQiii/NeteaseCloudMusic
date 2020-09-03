<template>
  <div>
    <div class="displaytitle">
      <div v-if="!musicAudioId" class="pt">
        <img src="../../assets/audioimg/listen.png" class="smile" />
        <span>你还没有添加任何歌曲</span>
        <br />
        <span>
          去首页
          <span class="mus" @click="jumpPage()">发现音乐</span>，或在
          <span class="mus">我的音乐</span>收听自己收藏的歌单。
        </span>
      </div>
      <div v-else class="titlemain">
        <div class="bg">
          <img :src="musicAudioDetail.songs[0].al.picUrl" ref="bgimg" />
        </div>
        <div class="item" v-for="(value, index) in musicList" :key="index">
          <img
            src="../../assets/audioimg/triangle.png"
            v-show="musicAudioId === value.songs[0].id"
          />
          <div
            @click="changeCurrentIndex(value.songs[0].id, index)"
            :style="musicAudioId === value.songs[0].id?'opacity: 1':''"
          >{{value.songs[0].name}}</div>
          <div>
            <operate :sendShow="sendShow" />
          </div>
          <div :style="musicAudioId === value.songs[0].id?'opacity: 1':''">{{value.songs[0].ar[0].name}}</div>
          <div :style="musicAudioId === value.songs[0].id?'opacity: 1':''">{{playtime(value.songs[0].dt)}}</div>
          <img src="../../assets/audioimg/link.png" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { playTimeFormat } from "../../utils/playTimeFormat";
import { request } from "../../network/request";
import Operate from "../Operate/Operate";
export default {
  name: "DisplayTitle",
  data() {
    return {
      sendShow: [false, true, true, true, true, true],
    };
  },
  components: {
    Operate,
  },
  computed: {
    musicAudioId() {
      return this.$store.state.musicAudioId;
    },
    musicList() {
      return this.$store.state.musicAudioList;
    },
    musicAudioDetail() {
      return this.$store.state.musicAudioDetail;
    },
  },
  methods: {
    changeCurrentIndex(id, index) {
      this.$store.commit("changeValue", [
        {
          type: "musicAudioUrl",
          value: this.$store.state.musicAudioUrlList[index],
        },
        {
          type: "musicAudioDetail",
          value: this.$store.state.musicAudioDetailList[index],
        },
        {
          type: "musicAudioId",
          value: id,
        },
        {
          type: "musicAudioIndex",
          value: index
        },
        {
          type: 'musicAudioLyric',
          value: this.$store.state.musicAudioLyricList[index],
        }
      ]);
    },
    jumpPage(){
      this.$router.push('/')
    },
    playtime(time) {
      return playTimeFormat(time);
    },
  },
};
</script>
<style scoped>
.pt {
  margin-top: 20px;
}
img:hover {
  opacity: 1;
}
img {
  opacity: 0.7;
  cursor: pointer;
}
.titlemain {
  display: flex;
  flex-direction: column;
  color: #fff;
  margin-top: -45px;
}
.item {
  display: flex;
  height: 28px;
  font-size: 12px;
  position: relative;
}
.item > div {
  line-height: 28px;
  padding: 0 10px;
  opacity: 0.7;
}
.item:hover {
  background-color: #131211;
}
.item:hover > div {
  opacity: 1;
}
.item > div:first-of-type {
  width: 246px;
  text-align: left;
  margin-right: 50px;
  margin-left: 30px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  cursor: pointer;
}
.item > div:nth-of-type(2) {
  position: relative;
  left: -385px;
  top: -5px;
  opacity: 0;
}
.item:hover > div:nth-of-type(2) {
  opacity: 1;
}

.item > div:nth-of-type(3) {
  width: 70px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.item > div:nth-of-type(4) {
  padding-left: 0;
}
.item > img:first-of-type {
  opacity: 1;
  width: 10px;
  height: 13px;
  position: absolute;
  top: 7px;
  margin-left: 10px;
  margin-right: 10px;
}
.item > img:last-of-type {
  width: 14px;
  height: 16px;
  position: relative;
  top: 7px;
  margin-left: 10px;
  margin-right: 10px;
}
.mus {
  border-bottom: solid 1px;
  cursor: pointer;
}
.smile {
  width: 36px;
  height: 29px;
  position: relative;
  top: 10px;
  left: -5px;
  opacity: 1;
  cursor: default;
}
.displaytitle {
  text-align: center;
  padding-top: 8%;
  border-right: #0b0b0b solid 5px;
  width: 553px;
  height: 215px;
  color: #aaa;
  font-size: 12px;
  line-height: 50px;
  overflow: auto;
}
.bg > img {
  position: relative;
  top: 30px;
  height: 160px;
  width: 458px;
  opacity: 0.3;
  filter: blur(100px);
}
.bg {
  position: absolute;
  height: 260px;
  width: 558px;
}

.displaytitle::-webkit-scrollbar {
  background-color: #101010;
  width: 7px;
}
.displaytitle::-webkit-scrollbar-thumb {
  background-color: #454546;
  border-radius: 5px;
}
</style>