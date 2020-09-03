<template>
  <div class="playlistmain">
    <div class="plmain">
      <div class="left">
        <div class="head">
          <div class="img">
            <img :src="singleInfo.songs[0].al.picUrl" class="cir" />
            <img src="../../../assets/dj/plate.png" class="plate" />
          </div>
          <div class="info">
            <div class="r1">
              <div class="tag">
                <img src="../../../assets/playlist/tag .png" />
                <span>单曲</span>
              </div>
              <div class="name">{{singleInfo.songs[0].name}}</div>
            </div>
            <div class="r2">
              <div>
                <span>歌手：</span>
                <span>{{singleInfo.songs[0].ar[0].name}}</span>
              </div>
              <div>
                <span>所属专辑：</span>
                <span>{{singleInfo.songs[0].al.name}}</span>
              </div>
            </div>
            <music-list-operate
              :musicListInfo="musicTotal"
              :musicIsPlayList="false"
              :musicShareCount="false"
              class="musiclistoperate"
            />
            <div class="r5" :style="descIsOpen?'height: auto':'height: 300px'">
              <p v-for="(value, index) in allLyric" :key="index">{{value}}</p>
            </div>
            <spread-or-close />
            <div class="r7">
              <span>报错</span>
            </div>
          </div>
        </div>
        <comment :commentTotal="musicTotal.commentCount" :comments="comments" />
        <offset-change :musicTotal="musicTotal.commentCount" :musicOffset="20" />
      </div>
      <div class="right">
        <music-minor
          :musicSimiSong="simiSong"
          :related="simiPlayList"
          :musicRelated="Boolean(simiPlayList.length)"
        >
          <span slot="related">包含这首歌的歌单</span>
          <span slot="simihead">相似歌曲</span>
        </music-minor>
      </div>
    </div>
  </div>
</template>

<script>
import { request } from "../../../network/request";
import MusicMinor from "../../Operate/MusicMinor";
import MusicListOperate from "../../Operate/MusicListOperate";
import SpreadOrClose from "../../Operate/SpreadOrClose";
import Comment from "../../Comment/Comment";
import OffsetChange from "../../OffsetChange/OffsetChange";
export default {
  name: "DigitalSingle",
  components: {
    Comment,
    MusicListOperate,
    MusicMinor,
    SpreadOrClose,
    OffsetChange,
  },
  data() {
    return {
      singleInfo: {},
      lyrics: "",
      allLyric: [],
      timeExp: /\[(\d{2,}):(\d{2,3})(?:\.(\d{2,3}))?]/g,
      musicTotal: {
        commentCount: 0,
      },
      isOpen: false,
      simiSong: [],
      simiPlayList: [],
      singleComment: {},
      comments: {},
    };
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
    descIsOpen() {
      return this.$store.state.descIsOpen;
    },
    offsetNum() {
      return this.$store.state.offsetNum;
    },
  },
  watch: {
    offsetNum(newVal) {
      this.getMusicCommentTotal(this.id, newVal);
    },
    id(newVal) {
      this.getMusicDetail(this.id);
      this.getMusicLyrics(this.id);
      this.getMusicCommentTotal(this.id);
      this.getSimiSong(this.id);
      this.getSimiPlayList(this.id);
      this.$store.commit("changeValue", [
        {
          type: "descIsOpen",
          value: false,
        },
        {
          type: "offsetNum",
          value: 0,
        },
      ]);
    },
  },
  created() {
    this.getMusicDetail(this.id);
    this.getMusicLyrics(this.id);
    this.getMusicCommentTotal(this.id);
    this.getSimiSong(this.id);
    this.getSimiPlayList(this.id);
    this.$store.commit("changeValue", [
      {
        type: "descIsOpen",
        value: false,
      },
      {
        type: "offsetNum",
        value: 0,
      },
    ]);
  },
  methods: {
    getMusicDetail(id) {
      return request({
        url: `/song/detail?ids=${id}`,
      }).then((response) => {
        this.singleInfo = response;
      });
    },
    getMusicLyrics(id) {
      return request({
        url: `/lyric?id=${id}`,
      }).then((response) => {
        this.lyrics = response.lrc.lyric;
        this.totalLyric();
      });
    },
    getMusicCommentTotal(id, offset = 0) {
      return request({
        url: `/comment/music?id=${id}&offset=${offset}`,
      }).then((response) => {
        this.musicTotal.commentCount = response.total;
        this.comments = response;
      });
    },
    getSimiSong(id) {
      return request({
        url: `/simi/song?id=${id}`,
      }).then((response) => {
        this.simiSong = response.songs;
      });
    },
    getSimiPlayList(id) {
      return request({
        url: `/simi/playlist?id=${id}`,
      }).then((response) => {
        this.simiPlayList = response.playlists;
      });
    },
    totalLyric() {
      // 通过换行符，拆解歌词
      const lines = this.lyrics.split("\n");
      this.allLyric = [];
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        // 匹配时间戳
        let result = this.timeExp.exec(line);
        if (result) {
          // 去掉时间，只留下文字部分
          const txt = line.replace(this.timeExp, "").trim();
          this.allLyric.push(txt);
          this.allLyric = this.allLyric.filter((ele) => {
            return ele !== "";
          });
        }
      }
    },
  },
};
</script>

<style scoped>
.r7 > span {
  color: #999;
  font-size: 12px;
  border-bottom: solid 1px;
  cursor: pointer;
}
.r7 {
  margin-top: 50px;
  margin-left: 400px;
}
.musiclistoperate {
  margin-top: 10px;
}
.left {
  padding-top: 40px;
  margin-left: 20px;
  width: 710px;
  border-right: solid 1px #d3d3d3;
}
.plmain {
  padding-bottom: 40px;
  display: flex;
  width: 980px;
  margin-left: 25%;
  background-color: #fff;
  border: solid 1px #d3d3d3;
}
.img {
  position: relative;
}
.cir {
  width: 130px;
  height: 130px;
  border-radius: 65px;
  position: absolute;
  top: 34px;
  left: 34px;
}

.r5 {
  font-size: 12px;
  line-height: 23px;
  color: #333;
  width: 410px;
  overflow: hidden;
  margin-top: 40px;
}

.r2 {
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  font-size: 12px;
}

.r2 > div > span:last-of-type {
  color: #0c73c2;
  font-size: 12px;
  cursor: pointer;
}
.r2 > div > span:first-of-type {
  color: #999;
}
.r2 > div:last-of-type {
  margin-top: 10px;
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

.head {
  display: flex;
  margin-left: 20px;
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

.info {
  margin-left: 30px;
}

.name {
  font-size: 24px;
  margin-left: 10px;
  line-height: 24px;
  color: #333;
}
</style>