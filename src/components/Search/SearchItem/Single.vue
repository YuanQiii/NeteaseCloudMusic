<template>
  <div class="main">
    <div class="item" v-for="(value, index) in searchSong.songs" :key="index">
      <div class="title">
        <img src="../../../assets/search/resplay.png" />
        <span>
          <span class="name" @click="jumpPage('digitalsingle', value.id)">{{value.name}}</span>
          <span v-if="value.alias[0]" class="alias">-({{value.alias[0]}})</span>
        </span>
        <div class="mv" v-if="value.mvid">
          <img src="../../../assets/playlist/mv.png" />
        </div>
      </div>
      <div class="op">
        <img src="../../../assets/search/resadd.png" alt />
        <img src="../../../assets/search/rescollect.png" alt />
        <img src="../../../assets/search/resshare.png" alt />
        <img src="../../../assets/search/resdownload.png" alt />
      </div>
      <div class="info">
        <div class="artist" @click="jumpPage('singerdetail', value.artists[0].id)">
          <span>{{value.artists[0].name}}</span>
        </div>
        <div class="album" @click="jumpPage('albumdetail',value.album.id)">
          <span>《{{value.album.name}}》</span>
        </div>
        <div class="time">
          <span>{{playFormat(value.duration)}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { request } from "../../../network/request";
import { playTimeFormat } from "../../../utils/playTimeFormat";
export default {
  name: "Single",
  data() {
    return {
      searchSong: {},
    };
  },
  computed: {
    kw() {
      return this.$route.params.kw;
    },
    searchCurrentCatName() {
      return this.$store.state.searchCurrentCatName;
    },
    musicIsCompleteUpdate() {
      return this.$store.state.musicIsCompleteUpdate;
    },
  },
  watch: {
    kw(){
      this.getSingle()
    }
  },
  created() {
    this.getSingle();
  },
  methods: {
    getSingle() {
      return request({
        url: `/search?keywords=${this.kw}&type=1`,
      }).then((response) => {
        this.searchSong = response.result;
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
    playFormat(time) {
      return playTimeFormat(time);
    },
  },
};
</script>
<style scoped>

.alias {
  color: #aeaeae;
}
.op {
  position: absolute;
  width: 100px;
  left: 390px;
  top: 20px;
  opacity: 0;
}
.op > img {
  margin-right: 10px;
  width: 15px;
  height: 15px;
  opacity: 0.6;
  cursor: pointer;
}
.op > img:hover {
  opacity: 1;
}
.op > img:last-of-type {
  opacity: 0.4;
}
.op > img:last-of-type:hover {
  opacity: 0.8;
}
.item:nth-of-type(even) {
  background-color: #f7f7f7;
}
.artist {
  width: 150px;
  cursor: pointer;
}
.artist:hover > span {
  border-bottom: solid 1px black;
}
.album {
  width: 150px;
  margin-right: 40px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
}
.album:hover > span {
  border-bottom: solid 1px black;
}
.info {
  display: flex;
  margin-top: 15px;
}
.title > img {
  width: 17px;
  height: 17px;
  cursor: pointer;
  position: absolute;
  left: 20px;
  top: 13px;
  opacity: 0.6;
}
.title > img:hover {
  opacity: 1;
}

.mv {
  width: 15px;
  height: 9px;
  display: inline-block;
  left: 2px;
  top: -2px;
  padding: 2px;
  border: solid 1px #e3e3e3;
  background-color: #f2f2f2;
  position: relative;
  cursor: pointer;
  border-radius: 3px;
}
.mv:hover {
  background-color: #fff;
}
.mv > img {
  height: 13px;
  width: 13px;
  position: relative;
  left: 1px;
  top: -2px;
}
.title {
  width: 320px;
  height: 23px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-right: 130px;
  padding-left: 50px;
  padding-top: 20px;
  position: relative;

}

.name:hover {
  border-bottom: solid 1px black;
  cursor: pointer;
}
.title > span {
  position: relative;
  top: -8px;
  margin-left: -5px;
}

.item {
  display: flex;
  position: relative;
  width: 900px;
  margin-left: 40px;
}
.item:hover {
  background-color: #f2f2f2;
}
.item:hover > .op {
  opacity: 1;
}
.main {
  font-size: 12px;
  color: #333;
}
</style>