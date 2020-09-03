<template>
  <div :class="sendtype" v-if="sendkey !== ''">
    <div
      @click="jumpSearchPage('/searchpage/users','1002', sendkey)"
      class="user"
    >搜索"{{sendkey}}"相关用户></div>

    <div class="song" v-if="isShow('songs')">
      <div class="title">
        <img src="../../assets/search/resmus.png" alt />
        <span>单曲</span>
      </div>
      <div class="result">
        <div
          v-for="(value1,index1) in sendres.result.songs"
          :key="index1"
          @click="jumpPage('digitalsingle', value1.id)"
        >{{value1.name}}-{{value1.artists[0].name}}</div>
      </div>
    </div>

    <div class="artist" v-if="isShow('artists')">
      <div class="title">
        <img src="../../assets/search/resme.png" alt />
        <span>歌手</span>
      </div>
      <div class="result">
        <div
          v-for="(value3,index3) in sendres.result.artists"
          :key="index3"
          @click="jumpPage('singerdetail', value3.id)"
        >{{value3.name}}</div>
      </div>
    </div>

    <div class="album" v-if="isShow('albums')">
      <div class="title">
        <img src="../../assets/search/resalb.png" alt />
        <span>专辑</span>
      </div>
      <div class="result">
        <div
          v-for="(value2, index2) in sendres.result.albums"
          :key="index2"
          @click="jumpPage('albumdetail', value2.id)"
        >{{value2.name}}-{{value2.artist.name}}</div>
      </div>
    </div>

    <div class="playlist" v-if="isShow('playlists')">
      <div class="title">
        <img src="../../assets/search/respl.png" alt />
        <span>歌单</span>
      </div>
      <div class="result">
        <div
          v-for="(value4,index4) in sendres.result.playlists"
          :key="index4"
          @click="jumpPage('playlist', value4.id)"
        >{{value4.name}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import { request } from "../../network/request";
export default {
  name: "SearchSuggest",
  props: {
    sendres: {},
    sendkey: "",
    sendtype: "",
  },
  methods: {
    isShow(item) {
      return this.sendres.result.order.some((ele) => {
        return ele == item;
      });
    },
    jumpSearchPage(path, type, kw) {
      this.$store.commit('changeValue', {
        type: 'key',
        value: kw
      })
      request({
        // url: "/search?keywords=%20" + this.sendkey + "&type=" + type,
        url: `/search?keywords=%20${this.sendkey}&type=${type}`,
      }).then((response) => {
        if (path == "/searchpage/single") {
          this.$store.commit("changeValue", {
            type: "searchIndex",
            value: 0,
          });
        }
        if (path == "/searchpage/singer") {
          this.$store.commit("changeValue", {
            type: "searchIndex",
            value: 1,
          });
        }
        if (path == "/searchpage/alb") {
          this.$store.commit("changeValue", {
            type: "searchIndex",
            value: 2,
          });
        }
        if (path == "/searchpage/playlis") {
          this.$store.commit("changeValue", {
            type: "searchIndex",
            value: 5,
          });
        }
        if (path == "/searchpage/users") {
          this.$store.commit("changeValue", {
            type: "searchIndex",
            value: 7,
          });
        }
        this.$router.push({
          name: 'users',
          params: {
            kw: kw
          }
        });
      });
    },
    jumpPage(path, id){
      this.$router.push({
        name: path,
        params: {
          id: id
        }
      })
    }, 
  },
};
</script>
<style scoped>
.result {
  font-size: 12px;
  border-bottom: solid 1px #e2e2e2;
}
.result > div {
  padding-left: 10px;
  width: 156px;
  height: auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
}
.result > div:hover {
  background-color: #e3e5e7;
}
.title {
  border-right: solid 1px #e2e2e2;
  padding-right: 10px;
  line-height: 40px;
}
.song,
.album,
.artist,
.playlist {
  line-height: 23px;
  display: flex;
}
img {
  height: 15px;
  width: 15px;
  margin-right: 5px;
  margin-left: 5px;
}
.user {
  height: 40px;
  line-height: 40px;
  font-size: 12px;
  padding-left: 10px;
  border-bottom: 1px solid #e2e2e2;
  cursor: pointer;
}
.user:hover {
  background-color: #e3e5e7;
}
.main {
  height: auto;
  width: 230px;
  background-color: #fff;
  z-index: 99;
  position: absolute;
  left: 61.5%;
  top: 60px;
  border-radius: 5px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.8);
  color: black;
}
.page {
  background-color: #fff;
  z-index: 99;
  position: absolute;
  max-width: 445px;
  border-radius: 5px;
  top: 85px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.8);
}
</style>