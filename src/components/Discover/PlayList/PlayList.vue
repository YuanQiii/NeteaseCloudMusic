<template>
  <div class="playlistmain">
    <div class="playlistitem">
      <div class="left">
        <play-list-description :playListInfo="playListInfo" class="PlayListDescription" />
        <music-head :headOutChain="true" :headPlayCount="true" :headwidth="640" class="musicHead">
          <span slot="head">歌曲列表</span>
          <span slot="songsNumber">{{playListInfo.trackCount}}首歌</span>
          <span slot="playCount">{{playListInfo.playCount}}</span>
        </music-head>
        <music-operate
          :playlistId="id"
          :playListInfo="playListInfo.tracks.slice(0, 10)"
          :musicMargin="musicM"
          :musicWidth="musicW"
          class="musicoperate"
        >
          <div style="width: 60px"></div>
          <div style="width: 210px">歌曲标题</div>
          <div style="width: 90px">时长</div>
          <div style="width: 70px">歌手</div>
          <div style="width: 100px">专辑</div>
        </music-operate>
        <div class="download">
          <span class="lookmore">查看更多内容，请下载客户端</span>
          <span class="btn">立即下载</span>
        </div>

        <comment :commentTotal="playListComment.total" :comments="playListComment" />

        <offset-change
          :musicTotal="playListComment.total"
          :musicOffset="20"
        />
      </div>
      <div class="right">
        <music-minor :sub="sub" :related="related.playlists">
          <span slot="subscribers">喜欢这个歌单的人</span>
          <span slot="related">相关推荐</span>
        </music-minor>
      </div>
    </div>
  </div>
</template>

<script>
import { request } from "../../../network/request";
import MusicOperate from "../../Operate/MusicOperate";
import MusicHead from "../../Operate/MusicHead";
import PlayListDescription from "./PlayListDescription";
import MusicMinor from "../../Operate/MusicMinor";
import OffsetChange from "../../OffsetChange/OffsetChange";
import Comment from "../../Comment/Comment";
export default {
  name: "Playlist",
  components: {
    MusicOperate,
    MusicHead,
    PlayListDescription,
    MusicMinor,
    OffsetChange,
    Comment,
  },
  data() {
    return {
      playListInfo: {},
      sub: [],
      related: {},
      playListComment: {},
      musicM: [25,0,10,0,80,30],
      musicW: [10,200,111,0,59,107]
    };
  },
  computed: {
    id() {
      return Number(this.$route.params.id);
    },
    offsetNum() {
      return this.$store.state.offsetNum;
    },
  },
  created() {
    this.getMusicDetail(this.id);
    this.getSubscribers(this.id);
    this.getRelated(this.id);
    this.getComments(this.id, 0);
  },
  watch: {
    id(newAvl) {
      this.getMusicDetail(newAvl);
      this.getSubscribers(newAvl);
      this.getRelated(newAvl);
      this.getComments(this.id, 0);
    },
    offsetNum(newVal) {
      this.getComments(this.id, newVal);
    },
  },
  methods: {
    getMusicDetail(id) {
      return request({
        url: `playlist/detail?id=${id}&s=8`,
      }).then((response) => {
        this.playListInfo = response.playlist;
      });
    },
    getSubscribers(id) {
      return request({
        url: `/playlist/subscribers?id=${id}&limit=8`,
      }).then((response) => {
        this.sub = response.subscribers;
      });
    },
    getRelated(id) {
      return request({
        url: `/related/playlist?id=${id}`,
      }).then((response) => {
        this.related = response;
      });
    },
    getComments(id, offset) {
      return request({
        url: `/comment/playlist?id=${id}&offset=${offset}`,
      }).then((response) => {
        this.playListComment = response;
      });
    },
  },
};
</script>

<style scoped>
.right {
  border-left: none;
  height: 100%;
}
.playlistitem {
  display: flex;
  background-color: #fff;
  width: 980px;
  margin-left: 25%;
  border: solid 1px #d3d3d3;
}
.PlayListDescription {
  margin-left: 30px;
}
.musicoperate {
  margin-left: -1%;
  width: 640px;
}
.musicHead {
  margin-left: -1%;
}
.operate {
  position: relative;
  left: -350px;
  top: -10px;
}

.download {
  font-size: 13px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.download > span {
  margin-top: 30px;
}

.download > span:last-of-type {
  width: 120px;
  height: 30px;
  background-color: #ff281c;
  border-radius: 20px;
  color: #fff;
  text-align: center;
  line-height: 30px;
  cursor: pointer;
}

.left {
  width: 638px;
  height: auto;
  border-top: none;
  padding: 47px 30px 40px 39px;
  padding-bottom: 60px;
  background-color: #fff;
  border-right: solid 1px #e1e1e1;
}
</style>