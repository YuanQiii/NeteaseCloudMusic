<template>
  <div class="topmain">
    <music-head :headwidth="689" class="musichead" :headPath="'toplist'">
      <span slot="head">
        <img src="../../../../assets/hothead/point.png" class="redpoint" />
        榜单
      </span>
      <span slot="more">
        更多
        <img src="../../../../assets/hothead/more.png" class="moreimg" />
      </span>
    </music-head>
    <div class="topItem">
      <div class="soar">
        <top-head :sendtop="soar" :topListCat="0"/>
        <top-item :sendList="soarList" :topListCat="0"/>
      </div>
      <div class="newSong">
        <top-head :sendtop="newSong" :topListCat="1"/>
        <top-item :sendList="newSongList" :topListCat="1"/>
      </div>
      <div class="original">
        <top-head :sendtop="original" :topListCat="2"/>
        <top-item :sendList="originalList" :topListCat="2"/>
      </div>
    </div>
  </div>
</template>

<script>
import TopItem from "./TopItem";
import TopHead from "./TopHead";
import MusicHead from "../../../Operate/MusicHead"
import { request } from "../../../../network/request";
export default {
  name: "Top",
  components: {
    TopItem,
    TopHead,
    MusicHead
  },
  data() {
    return {
      soar: {},
      newSong: {},
      original: {},
      soarList: [],
      newSongList: [],
      originalList: []
    };
  },
  mounted() {
    this.getToplist();
    this.getTopDetail1(19723756);
    this.getTopDetail2(3779629);
    this.getTopDetail3(2884035);
  },
  methods: {
    getToplist() {
      return request({
        url: "toplist"
      }).then(response => {
        (this.soar = response.list[0]),
          (this.newSong = response.list[1]),
          (this.original = response.list[2]);
      });
    },
    getTopDetail1(id) {
      return request({
        url: "/top/list?id=" + id
      }).then(response => {
        this.soarList = response.playlist.tracks.slice(0, 10);
      });
    },
    getTopDetail2(id) {
      return request({
        url: "/top/list?id=" + id
      }).then(response => {
        this.newSongList = response.playlist.tracks.slice(0, 10);
      });
    },
    getTopDetail3(id) {
      return request({
        url: "/top/list?id=" + id
      }).then(response => {
        this.originalList = response.playlist.tracks.slice(0, 10);
      });
    }
  }
};
</script>

<style scoped>

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

.soar,
.newSong,
.original {
  display: flex;
  flex-direction: column;
}

.topItem {
  margin-top: 40px;
  display: flex;
  margin-left: 10px;
}

.topmain {
  border: 1px solid #d3d3d3;
  border-top: none;
  width: 36%;
  padding: 0 30px 40px 14px;
  margin-left: 25%;
  background-color: #fff;
  border-right: none;
}

</style>