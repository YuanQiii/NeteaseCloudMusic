<template>
  <div class="hotlistmain">
    <div v-for="(value, index) in result" :key="index" class="listre" @click="showPlayList(value.id)">
      <div class="reflective"></div>
      <img :src="value.picUrl" :title="value.name"  />
      <div class="playcount">
        <div class="count">
          <img src="../../../../../assets/hothead/headset.png" />
          <span>{{countFormat(value.playCount)}}</span>
          
        </div>
        <img src="../../../../../assets/hothead/play.png" />
      </div>
      <div class="name">{{value.name}}</div>
    </div>
  </div>
</template>

<script>
import { request } from "../../../../../network/request";
export default {
  name: "HotList",
  data() {
    return {
      result: {}
    };
  },
  mounted() {
    this.getPersonalized();
  },
  methods: {
    getPersonalized() {
      return request({
        url: "/personalized?limit=8"
      }).then(response => {
        this.result = response.result;
        console.log(response.result);
      });
    },
    showPlayList(playid) {
      this.$store.state.musicId = playid;
      this.$store.state.musicCommentPath = "/comment/playlist?id=";
      this.$router.push({
        name: "playlist",
        params: {
          id: playid
        }
      });
    },
    countFormat(count) {
      if (count > 10000) {
        return parseInt(count / 10000) + "万";
      } else {
        return count;
      }
    }
  }
};
</script>

<style scoped>
.reflective {
  position: absolute;
  border: solid 70px;
  border-color: white transparent transparent white;
  position: absolute;
  z-index: 9;
  top: 0px;
  left: 12px;
  opacity: 0.3;
  cursor: pointer;
}

.hotlistmain {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  font-size: 12px;
  margin-right: -14px;
  padding-bottom: 40px;
}

.hotlistmain > div > img {
  cursor: pointer;
}
.listre {
  position: relative;
  margin-top: 30px;
}

.listre:nth-of-type(1) {
  padding-left: 0px;
}
.listre:nth-of-type(5) {
  padding-left: 0px;
}

.listre > img {
  height: 140px;
  width: 140px;
  word-break: break-all;
  cursor: pointer;
}
.playcount {
  color: #ccc;
  background-color: #333;
  position: absolute;
  top: 115px;
  margin-left: 10px;
  width: 140px;
  height: 27px;
  display: flex;
  justify-content: space-between;
  opacity: 0.8;
  z-index: 9;
}

.playcount > img {
  cursor: pointer;
  margin-right: 10px;
  opacity: .7;
  position: relative;
  top: 3px;
}
.playcount > img:hover {
  opacity: 1;
}
.count > span{
  font-size: 12px;
height: 27px;
}
.count > img {
  position: relative;
  top: 3px;
  margin-right: 5px;
}
img {
  height: 17px;
  width: 17px;
  margin-left: 10px;
  margin-top: 2px;
  opacity: 1;
}

.name {
  margin-left: 10px;
  width: 140px;
}
</style>