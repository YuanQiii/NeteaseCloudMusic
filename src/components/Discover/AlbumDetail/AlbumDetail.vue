<template>
  <div class="albmain">
    <div class="albitem">
      <div class="left">
        <div class="head">
          <div class="img">
            <img :src="musicInfo.songs[0].al.picUrl" class="cir" />
            <img src="../../../assets/dj/albumpic.png" class="plate" />
            <div class="reflective"></div>
          </div>
          <div class="info">
            <div class="r1">
              <div class="tag">
                <img src="../../../assets/playlist/tag .png" />
                <span>专辑</span>
              </div>
              <div class="name">{{musicInfo.album.name}}</div>
            </div>
            <div class="r2">
              <div>
                <span>歌手：</span>
                <span
                  @click="jumpPage('singerdetail', musicInfo.album.artists[0].id)"
                >{{musicInfo.album.artists[0].name}}</span>
              </div>
              <div>发行时间：{{publishTimeFormat(musicInfo.album.publishTime)}}</div>
              <div>发行公司：{{musicInfo.album.company}}</div>
            </div>
            <music-list-operate :musicListInfo="musicInfo.album.info" :musicIsPlayList="false" />
            <div class="r4"></div>
            <div class="r5">
              <span>专辑介绍：</span>
              <pre :style="descIsOpen?'height: auto':'height: 120px'">{{musicInfo.album.description}}</pre>
            </div>
            <spread-or-close class="soc"/>
          </div>
        </div>
        <music-head class="musichead" :headOutChain="true" :headwidth="640">
          <span slot="head">包含歌曲列表</span>
          <span slot="songsNumber">{{musicInfo.album.size}}首歌</span>
        </music-head>
        <music-operate
          class="musicoperate"
          :playListInfo="musicInfo.songs"
          :musicIsSinger="false"
          :musicIsPlayList="false"
          :musicMargin="musicM"
          :musicWidth="musicW"
        >
          <div style="width: 74px"></div>
          <div style="width: 364px">歌曲标题</div>
          <div style="width: 91px">时长</div>
          <div style="width: 127px">歌手</div>
        </music-operate>

        <comment :commentTotal="albumComment.total" :comments="albumComment"/>
        <offset-change :musicTotal='albumComment.total' :musicOffset="20" />
      </div>
      <div class="right">
        <music-minor
          :sub="albumSubscriber.subscribers"
          :musicAlbum="artistAlbum.hotAlbums"
          :musicArtistId="artistId"
        >
          <span slot="subscribers">喜欢这张专辑的人</span>
          <span slot="related">Ta的其他热门专辑</span>
          <span slot="all" class="all">
            <span>全部></span>
          </span>
        </music-minor>
      </div>
    </div>
  </div>
</template>

<script>
import { request } from "../../../network/request";
import { dateFormat } from "../../../utils/dateFormat";
import MusicListOperate from "../../Operate/MusicListOperate";
import Comment from "../../Comment/Comment";
import OffsetChange from "../../OffsetChange/OffsetChange"
import MusicHead from "../../Operate/MusicHead";
import MusicOperate from "../../Operate/MusicOperate";
import MusicMinor from "../../Operate/MusicMinor";
import SpreadOrClose from "../../Operate/SpreadOrClose";
export default {
  name: "AlbumDetail",
  components: {
    Comment,
    MusicListOperate,
    MusicHead,
    MusicOperate,
    MusicMinor,
    SpreadOrClose,
    Comment,
    OffsetChange
  },
  data() {
    return {
      musicInfo: {},
      currentIndex: null,
      albumSubscriber: {},
      artistAlbum: {},
      artistId: 0,
      albumComment: {},
      musicM:[20,0,-20,0,0,0],
      musicW: [20, 326, 0, 71, 107, 0],
    };
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
    descIsOpen() {
      return this.$store.state.descIsOpen;
    },
    offsetNum(){
      return this.$store.state.offsetNum;
    },
  },
  watch: {
    id(newVal) {
      this.albumId = newVal
      this.getMusicDetail(newVal);
      this.getMusicCommentTotal(newVal);
      this.getAlbumSubscriber(newVal);
    },
    offsetNum(newVal){
      this.getMusicCommentTotal(this.id, newVal);
    }
  },
  created() {
    this.getMusicDetail(this.id);
    this.getMusicCommentTotal(this.id);
    this.getAlbumSubscriber(this.id);
    this.$store.commit('changeValue', {
      type: 'descIsOpen',
      value: false
    })
  },
  methods: {
    getMusicDetail(id) {
      return request({
        url: `/album?id=${id}`,
      }).then((response) => {
        this.musicInfo = response;
        this.getArtistAlbum(response.album.artist.id);
        this.artistId = response.album.artist.id;
      });
    },
    getMusicCommentTotal(id, offset = 0) {
      return request({
        url: `/comment/album?id=${id}&offset=${offset}`,
      }).then((response) => {
        this.albumComment = response;
      });
    },
    getAlbumSubscriber(id) {
      return request({
        url: `/playlist/subscribers?id=2829883282&limit=8`,
      }).then((response) => {
        this.albumSubscriber = response;
      });
    },
    getArtistAlbum(artistId) {
      return request({
        url: `/artist/album?id=${artistId}&limit=5`,
      }).then((response) => {
        this.artistAlbum = response;
      });
    },
    jumpPage(path, id) {
      this.$router.push({
        name: path,
        params: {
          id: id,
        },
      });
    },
    publishTimeFormat(time) {
      return dateFormat(time);
    },
    countFormat(count) {
      if (count > 10000) {
        return parseInt(count / 10000) + "万";
      } else {
        return count;
      }
    },
    playFormat(time) {
      var t1 = parseInt(time / 1000);
      var minute = parseInt(t1 / 60);
      var second = parseInt(t1 - minute * 60);
      if (second > 10) {
        return "0" + minute + ":" + second;
      } else {
        return "0" + minute + ":0" + second;
      }
    },
  },
};
</script>

<style scoped>
.reflective {
  position: absolute;
  border: solid 89px;
  border-color: white transparent transparent white;
  position: absolute;
  z-index: 9;
  top: 0px;
  left: 0px;
  opacity: 0.15;
  cursor: pointer;
}
.soc {
  margin-left: 380px;
  margin-top: 20px;
}
.albitem {
  display: flex;
  width: 980px;
  background-color: #fff;
  border: solid 1px #d3d3d3;
  margin-left: 25%;
}
.all {
  cursor: pointer;
  font-weight: 400;
}
.all:hover > span {
  border-bottom: solid 1px;
}
.right {
  background-color: brown;
  width: 270px;
  height: 100px;
}
.musicoperate {
  margin-left: -10px;
}
.musichead {
  margin-left: -10px;
}

.r5 {
  font-size: 12px;
  color: #666;
  margin-top: 40px;
  margin-left: -240px;
}
.r5 > span {
  font-weight: bold;
}

.r5 > pre {
  margin-top: 10px;
  margin-left: 2em;
  width: 640px;
  line-height: 24px;
  white-space: pre-line;
  overflow: hidden;
  text-overflow: ellipsis;
}

.r4 {
  display: flex;
  margin-top: 20px;
  font-size: 12px;
  color: #666;
}

.r2 {
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  font-size: 12px;
  line-height: 25px;
}
.r2 > div:first-of-type {
  color: #666;
}
.r2 > div:first-of-type > span:last-of-type {
  color: #0c73c2;
  cursor: pointer;
}
.r2 > div:first-of-type > span:last-of-type:hover {
  border-bottom: solid 1px;
}
.r1 {
  display: flex;
}

.ava {
  width: 34px;
  height: 34px;
}

.left {
  font-size: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 629px;
  height: auto;
  border-top: none;
  padding: 47px 30px 40px 39px;
  border: solid 1px #d3d3d3;
  border-left: none;
  border-bottom: none;
}

.head {
  display: flex;
  margin-left: -15px;
}

.img {
  position: relative;
}

.cir {
  width: 190px;
  height: 190px;
  position: absolute;
}

.plate {
  margin-left: 13px;
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
  font-size: 20px;
  margin-left: 10px;
  float: left;
}
</style>