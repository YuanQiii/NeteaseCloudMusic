<template>
  <div class="main">
    <div class="item" v-for="(value, index) in searchPlaylis.playlists" :key="index">
      <img src="../../../assets/search/resplay.png" class="play" @click="jumpPage('playlist', value.id)"/>
      <img :src="value.coverImgUrl" class="cover" @click="jumpPage('playlist', value.id)" />
      <div class="s1">
        <span @click="jumpPage('playlist', value.id)">{{value.name}}</span>
      </div>
      <operate :sendShow="sendShow" class="opa" />
      <div class="s2">
        <span>{{value.trackCount}}首</span>
      </div>
      <div class="s3">
        <span @click="jumpPage('profile', value.creator.userId)">by {{value.creator.nickname}}</span>
        <img src="../../../assets/banner/star.png" v-if="value.creator.userType === 200" />
        <img src="../../../assets/banner/singer.png" v-if="value.creator.userType === 4" />
      </div>
      <div class="s4">
        <span>收藏：{{value.bookCount}}</span>
      </div>
      <div class="s5">
        <span>收听：{{countFormat(value.playCount)}}</span>
      </div>
    </div>
  </div>
</template>
<script>
import { request } from "../../../network/request";
import { playCountFormat } from "../../../utils/playCountFormat";
import Operate from "../../Operate/Operate";
export default {
  name: "Playlis",
  components: {
    Operate,
  },
  data() {
    return {
      searchPlaylis: {},
      sendShow: [true, true, true, false],
    };
  },
  computed: {
    kw() {
      return this.$route.params.kw;
    },
  },
  created() {
    this.getPlaylis();
  },
  watch: {
    kw() {
      this.getPlaylis();
    },
  },
  methods: {
    getPlaylis() {
      return request({
        url: `/search?keywords=${this.kw}&type=1000`,
      }).then((response) => {
        this.searchPlaylis = response.result;
        console.log(response.result);
      });
    },
    countFormat(count) {
      return playCountFormat(count);
    },
    jumpPage(path, id) {
      this.$router.push({
        name: path,
        params: {
          id: id,
        },
      });
    },
  },
};
</script>
<style scoped>
.opa {
  top: 5px;
  opacity: 0;
  position: relative;
  left: -380px;
  top: -5px;
}
.item:nth-of-type(even) {
  background-color: #f7f7f7;
}
.item:hover {
  background-color: #f2f2f2;
}
.item:hover .opa {
  opacity: 0.8;
}
.item {
  margin: 0 40px;
  position: relative;
  margin-top: 20px;
  display: flex;
  position: relative;
}
.item > img {
  cursor: pointer;
}
div {
  font-size: 12px;
  color: #333;
  line-height: 50px;
}
.s1 > span:hover,
.s3 > span:hover {
  border-bottom: solid 1px black;
  cursor: pointer;
}
.s5 {
  color: #999;
}
.s4 {
  width: 120px;
  color: #999;
}
.s3 {
  padding-right: 40px;
  width: 100px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.s2 {
  width: 50px;
  color: #999;
}
.s1 {
  margin-left: 30px;
  width: 200px;
  margin-right: 160px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.play {
  padding-top: 15px;
  width: 17px;
  height: 17px;
  opacity: 0.6;
  cursor: pointer;
  margin-left: 20px;
}
.play:hover {
  opacity: 1;
}
.cover {
  width: 50px;
  height: 50px;
  margin-left: 20px;
}
</style>