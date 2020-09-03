<template>
  <div class="main">
    <div class="item" v-for="(value, index) in searchVideo.videos" :key="index">
      <img :src="value.coverUrl" class="cover" @click="jumpPage('videodetail', value.vid)"/>
      <div class="title">
        <span class="mv" v-if="value.type === 0">MV</span>
        <span class="tit">
          {{value.title}}
          </span>
      </div>
      <span class="artist">
        <span v-if="!(value.type === 0)"> by </span>
        <span @click="jumpPage(judgePath(value.type === 0), value.creator[0].userId)">{{value.creator[0].userName}}</span>
        
        </span>
      <div class="vol">
        <div>
          <img src="../../../assets/search/resvolume.png" />
          <span>{{countFormat(value.playTime)}}</span>
        </div>
      </div>
      <div class="time">{{playFormat(value.durationms)}}</div>
    </div>
  </div>
</template>
<script>
import { request } from "../../../network/request";
import { playCountFormat } from "../../../utils/playCountFormat";
import { playTimeFormat } from "../../../utils/playTimeFormat";
export default {
  name: "Video",
  data() {
    return {
      searchVideo: {},
    };
  },
  computed: {
    kw() {
      return this.$route.params.kw;
    },
  },
  watch: {
    kw() {
      this.getVideo();
    },
  },
  created() {
    this.getVideo();
  },
  methods: {
    getVideo() {
      return request({
        url: `/search?keywords=${this.kw}&type=1014`,
      }).then((response) => {
        this.searchVideo = response.result;
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
      console.log(id);
    },
    judgePath(flag){
      if(flag){
        return 'singerdetail'
      }else {
        return 'profile'
      }
    },
    countFormat(count) {
      return playCountFormat(count);
    },
    playFormat(time) {
      return playTimeFormat(time);
    },
  },
};
</script>
<style scoped>
.mv {
  display: inline-block;
  border: solid 1px #e77077;
  color: #e77077;
  padding: 1px 2px;
  font-size: 12px;
  font-weight: bold;
  margin-right: 3px;
}
.time {
  position: absolute;
  color: #fff;
  font-size: 12px;
  top: 55%;
  left: 5px;
  text-shadow: 0 0 10px #000;
}
.vol {
  width: 159px;
  height: 18px;
  color: #fff;
  font-size: 12px;
  opacity: 1;
  position: absolute;
  display: flex;
  justify-content: flex-end;
}
.vol > div {
  display: inline-block;
  background-color: rgba(0, 0, 0, .3);
}
.vol > div > img {
  width: 20px;
  position: relative;
  top: 1px;
}
.cover {
  width: 159px;
  height: 90px;
  cursor: pointer;
}
.title {
  width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 14px;
  margin-top: 10px;
}
.tit {
  cursor: pointer;
}
.tit:hover > span> span {
  border-bottom: solid 1px black;
}
.artist {
  height: 15px;
  font-size: 12px;
  color: #666;
  cursor: pointer;
  box-sizing: border-box;
  margin-top: 5px;
}
.artist:hover > span:last-of-type {
  border-bottom: solid 1px black;
}
.item {
  display: flex;
  flex-direction: column;
  width: 150px;
  margin-left: 10px;
  margin-top: 20px;
  position: relative;
}
.main {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 900px;
  padding-left: 30px;
}
</style>