<template>
  <div class="main">
    <div class="singeritem">
      <div class="left">
        <div class="name">
          <span>{{singerInfo.name}}</span>
          <span>
            <span v-if="singerInfo.trans">{{singerInfo.trans}} -</span>
            {{singerInfo.alias[0]}}
          </span>
        </div>
        <div class="img">
          <div class="bg"></div>
          <img :src="singerInfo.picUrl" alt />
          <div class="collect">
            <img src="../../../assets/artist/collect.png" alt />
            <span>收藏</span>
          </div>
          <div class="userhome" v-if="singerInfo.accountId" @click="jumpPage('profile',singerInfo.accountId)">
            <img src="../../../assets/my/person.png" alt />
            <span>个人主页</span>
          </div>
        </div>
        <div class="head">
          <div
            :class="currentIndex == index?'item active':'item'"
            v-for="(value, index) in menuList"
            :key="value"
            @click="changeCat(index)"
          >{{value}}</div>
        </div>
        <router-view />
      </div>
      <div class="right">
        <music-minor></music-minor>
      </div>
    </div>
  </div>
</template>
<script>
import { request } from "../../../network/request";
import MusicMinor from "../../Operate/MusicMinor";
export default {
  name: "SingerDetail",
  components: {
    MusicMinor,
  },
  data() {
    return {
      currentIndex: 0,
      menuList: ["热门作品", "所有专辑", "相关MV", "艺人介绍", ""],
      menupath: ["popular", "allalbum", "relatedmv", "introduction", ""],
      id: this.$route.params.id,
      singerInfo: {},
      hotSongs: [],
      simiArtist: {},
    };
  },
  created() {
    this.getSingerInfo(this.id);
    this.changeCat(0);
    this.getSimiArtist();
  },
  methods: {
    changeCat(index) {
      this.$router.push(
        `/discover/singerdetail/${this.$route.params.id}/${this.menupath[index]}`
      );
      this.currentIndex = index;
    },
    getSingerInfo(id) {
      return request({
        url: `/artists?id=${id}`,
      }).then((response) => {
        this.singerInfo = response.artist;
        this.$store.commit("changeValue", {
          type: "singerHotSongs",
          value: response.hotSongs,
        });
        console.log(response);
      });
    },
    getSimiArtist(id) {
      return request({
        url: `/simi/artist?id=6452`,
      }).then((response) => {
        this.simiArtist = response;
        console.log(response);
      });
    },
    jumpPage(path, id){
      this.$router.push({
        name: path,
        params: {
          id: id
        }
      })
    }
  },
};
</script>
<style scoped>
.singeritem {
  display: flex;
  width: 980px;
  background-color: #fff;
  margin-left: 25%;
  border: solid 1px #d3d3d3;
}
.item {
  width: 640px;
  height: 39px;
  background-color: #f9f9f9;
  line-height: 39px;
  text-align: center;
  font-size: 14px;
  color: #333;
  cursor: pointer;
  padding: 2px 2px 0 0;
  border-bottom: solid 1px #ccc;
  border-top: solid 2px #ccc;
}

.item:first-of-type {
  border-left: solid 1px #ccc;
}
.item:last-of-type {
  border-right: solid 1px #ccc;
}
.item.active {
  border-top: solid 2px #d13030;
  border-left: solid 1px #ccc;
  border-right: solid 1px #ccc;
  border-bottom: none;
  background-color: #fff;
}
.item:hover {
  border-top: solid 2px #d13030;
}
.item:last-of-type:hover {
  cursor: default;
  border-top: solid 1px #ccc;
}
.head {
  display: flex;
  justify-content: space-evenly;
  width: 640px;
}
.collect,
.userhome {
  background-image: linear-gradient(
    to top,
    rgba(41, 41, 41, 0.8),
    rgba(79, 79, 79, 0.8)
  );
  width: 76px;
  height: 32px;
  position: absolute;
  top: 82%;
  left: 85%;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
  z-index: 99;
}
.userhome {
  width: 96px;
  left: 67%;
}
.collect:hover,
.userhome:hover {
  background-image: linear-gradient(
    to top,
    rgba(41, 41, 41, 0.7),
    rgba(79, 79, 79, 0.7)
  );
}
.collect > span {
  position: relative;
  left: 5px;
  top: -5px;
  font-size: 12px;
  color: #fff;
}
.userhome > span {
  font-size: 12px;
  color: #fff;
}
.userhome > img {
  margin-top: 6px;
  width: 15px;
  height: 15px;
  position: relative;
  top: 3px;
  margin-right: 5px;
}
.collect > img {
  margin-left: -4px;
  margin-top: 5px;
  height: 20px;
  width: 20px;
}
.img {
  position: relative;
  top: 4px;
}
.bg {
  width: 640px;
  height: 300px;
  position: absolute;
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.6) 1%,
    rgba(238, 231, 231, 0.1) 25%
  );
  z-index: 9;
  border: solid 1px #d4d4d4;
}
.img > img {
  width: 640px;
  height: 300px;
  object-fit: cover;
  margin-top: 5px;
  
}
.left {
  display: flex;
  flex-direction: column;
  padding: 20px 30px 40px 39px;
  border-right: solid 1px #d3d3d3;
  width: 650px;
  height: auto;
  background-color: #fff;
}
.name > span:first-of-type {
  font-size: 25px;
  margin-right: 15px;
}
.name > span:last-of-type {
  color: #999;
  font-size: 12px;
}
</style>