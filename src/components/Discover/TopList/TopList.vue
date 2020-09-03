<template>
  <div class="all">
    <div class="allitem">
      <div class="toplistcat">
        <div class="top1">云音乐特色榜</div>
        <div
          :class="currentIndex == index?'active catitem':'catitem'"
          v-for="(value, index) in toplistCat.list.slice(0,4)"
          :key="index"
          @click="changeList(index, value.id)"
        >
          <div class="img">
            <img :src="value.coverImgUrl" alt />
          </div>
          <div class="title">
            <div>{{value.name}}</div>
            <div>{{value.updateFrequency}}</div>
          </div>
        </div>
        <div class="top1">全球媒体榜</div>
        <div
          :class="currentIndex == index+4?'active catitem':'catitem'"
          v-for="(value, index) in toplistCat.list.slice(4)"
          :key="index+4"
          @click="changeList(index+4, value.id)"
        >
          <div class="img">
            <img :src="value.coverImgUrl" />
          </div>
          <div class="title">
            <div>{{value.name}}</div>
            <div>{{getUF(value.updateFrequency)}}</div>
          </div>
        </div>
      </div>
      <div class="toplistDetail" v-if="musicIsCompleteUpdate">
        <div class="head">
          <div class="left">
            <img :src="toplistDetail.playlist.coverImgUrl" alt />
          </div>
          <div class="info">
            <div class="name">{{toplistDetail.playlist.name}}</div>
            <div class="updateTime">
              <img src="../../../assets/artist/time.png" />
              <span>最近更新：{{updateTimeFormat(toplistDetail.playlist.updateTime)}}</span>
              <span class="uf">({{uf}})</span>
            </div>
            <music-list-operate :musicListInfo="toplistDetail.playlist" />
          </div>
        </div>
        <music-head :headwidth="670" :headPlayCount="true" class="musicheadtop">
          <span slot="head">歌曲列表</span>
          <span slot="songsNumber">{{toplistDetail.playlist.trackCount}}首歌</span>
          <span slot="playCount">{{toplistDetail.playlist.playCount}}</span>
        </music-head>
        <music-operate class="musicoperatetop" style="width: 670px">
          <div style="width: 58px"></div>
          <div style="width: 306px">标题</div>
          <div style="width: 70px">时长</div>
          <div style="width: 132px">歌手</div>
        </music-operate>
        <top-list-songs :topListSongs="toplistDetail.playlist.tracks" />
        <div class="comment">
          <comment :commentTotal="toplistComment.total" :comments="toplistComment" />
          <offset-change :musicTotal="toplistComment.total" :musicOffset="20" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { request } from "../../../network/request";
import { dateFormat } from "../../../utils/dateFormat";
import { durationFormat } from "../../../utils/durationFormat";
import { playCountFormat } from "../../../utils/playCountFormat";
import Comment from "../../Comment/Comment";
import MusicHead from "../../Operate/MusicHead";
import MusicOperate from "../../Operate/MusicOperate";
import MusicListOperate from "../../Operate/MusicListOperate";
import TopListSongs from "./TopListSongs";
import OffsetChange from "../../OffsetChange/OffsetChange";
export default {
  name: "TopList",
  components: {
    Comment,
    MusicHead,
    MusicOperate,
    MusicListOperate,
    TopListSongs,
    OffsetChange,
  },
  data() {
    return {
      toplistCat: {},
      currentIndex: 0,
      toplistDetail: {},
      uf: [],
      cIndex: null,
      topId: 0,
      toplistComment: {},
      idList: [],
    };
  },
  computed: {
    musicIsCompleteUpdate() {
      return this.$store.state.musicIsCompleteUpdate;
    },
    musicTopListCatName() {
      return this.$store.state.musicTopListCatName;
    },
    offsetNum() {
      return this.$store.state.offsetNum;
    },
  },
  watch: {
    offsetNum(newVal) {
      this.getToplistComment(this.idList[this.currentIndex], newVal);
    },
  },
  created() {
    this.getToplistCat();
    this.topListId();
    this.changeList(this.musicTopListCatName, this.topId);
  },
  methods: {
    getToplistCat() {
      return request({
        url: "/toplist",
      }).then((response) => {
        this.toplistCat = response;
        response.list.map((ele, index) => {
          this.idList.push(ele.id);
        });
      });
    },
    changeList(index, id, offset = 0) {
      this.currentIndex = index;
      this.$store.commit("changeValue", {
        type: "musicIsCompleteUpdate",
        value: false,
      });
      request({
        url: `/playlist/detail?id=${id}`,
      }).then((response) => {
        this.toplistDetail = response;
        this.$store.commit("changeValue", {
          type: "musicIsCompleteUpdate",
          value: true,
        });
        this.getToplistComment(id);
      });
    },
    getToplistComment(id, offset = 0) {
      return request({
        url: `/comment/playlist?id=${id}&offset=${offset}`,
      }).then((response) => {
        this.toplistComment = response;
      });
    },
    getUF(value) {
      // this.uf = value
      // console.log(2);
      // return value
    },
    topListId() {
      switch (this.musicTopListCatName) {
        case 0:
          this.topId = 19723756;
          break;
        case 1:
          this.topId = 3779629;
          break;
        case 2:
          this.topId = 2884035;
      }
    },
    updateTimeFormat(time) {
      return dateFormat(time);
    },
    countFormat(count) {
      return playCountFormat(time);
    },
    playFormat(time) {
      return durationFormat(time);
    },
  },
};
</script>
<style scoped>
.comment {
  margin-left: 40px;
  margin-top: 40px;
}
.allitem {
  display: flex;
  width: 970px;
  margin-left: 25%;
  border: solid 1px #d3d3d3;
}
.musicoperatetop,
.musicheadtop {
  margin-left: 40px;
}

.name {
  font-size: 20px;
}
.uf {
  color: #999;
}
.updateTime {
  font-size: 12px;
  margin-top: 10px;
  color: #666;
}
.updateTime > span:nth-of-type(2) {
  margin-left: 10px;
}
.updateTime > img {
  width: 13px;
  height: 13px;
  margin-right: 5px;
  opacity: 0.7;
}

.info {
  margin-top: 20px;
  margin-left: 30px;
  display: flex;
  flex-direction: column;
}
.toplistDetail {
  width: 730px;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  padding-bottom: 40px;
}
.head {
  margin-left: 40px;
  margin-top: 40px;
  width: 698px;
  height: 155px;
  display: flex;
}
.left {
  padding: 3px;
}
.left > img {
  width: 150px;
  height: 150px;
}
.all {
  background-color: #f5f5f5;
}
.top1 {
  font-size: 14px;
  font-weight: bold;
  padding: 0 10px 12px 15px;
  color: #000;
  padding-top: 10px;
  background-color: #fff;
}
.top1:first-of-type {
  padding-top: 40px;
}
.title > div:last-of-type {
  color: #999;
}
.catitem {
  padding-top: 10px;
  display: flex;
  font-size: 12px;
  cursor: pointer;
  background-color: #f9f9f9;
  padding-bottom: 10px;
  line-height: 20px;
}
.active {
  background-color: #e6e6e6;
}
.catitem:hover {
  background-color: #f2f2f2;
}
.active:hover {
  background-color: #e6e6e6;
}
.img > img {
  width: 40px;
  height: 40px;
  margin-left: 20px;
  margin-right: 10px;
}
.toplistcat {
  width: 240px;
  background-color: #f9f9f9;
  border-right: solid 1px #d5d5d5;
}
</style>