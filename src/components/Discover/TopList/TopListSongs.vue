<template>
  <div>
    <div class="d2" v-for="(value, index) in topListSongs" :key="index">
      <span class="tablecount" :style="index<3?'lineHeight: 70px':''">{{index+1}}</span>

      <img :src="value.al.picUrl" v-if="index < 3" @click="jumpPage('digitalsingle', value.id)"/>

      <div :style="index<3?'paddingTop: 15px': ''">
        <img
          src="../../../assets/playlist/tableplay_active.png"
          @click="addMusic(value.id, index,true)"
          v-if="value.id === musicAudioId"
          style="opacity: 1"
        />
        <img
          src="../../../assets/playlist/tableplay.png"
          @click="addMusic(value.id, index, true)"
          v-else
        />
      </div>

      <div :style="index<3?{width: '200px', paddingTop: '15px', marginRight: '30px'}: ''">
        <span @mouseenter="playtimeActive(index)" @mouseleave="playtimeNotActive(index)" @click="jumpPage('digitalsingle', value.id)">
          {{value.name}}
          <span
            style="color:#AEAEAE"
            :hidden="topListSongs[index].alia[0]?false:true"
          >-({{topListSongs[index].alia[0]}})</span>
        </span>
        <span class="dmv" title="播放mv" :hidden="topListSongs[index].mv?false:true" @click="jumpPage('videodetail', topListSongs[index].mv)">
          <img src="../../../assets/playlist/mv.png" class="mv" />
        </span>
      </div>

      <div @mouseenter="playtimeActive(index)" @mouseleave="playtimeNotActive(index)" :style="index<3?'paddingTop: 20px': ''">
        <span :hidden="currentIndex == index?true:false">{{playFormat(value.dt)}}</span>
        <div
          id="playtime"
          :hidden="currentIndex == index?true:false"
          :style="currentIndex == index?'opacity:0.6':'opacity:0'"
        >
          <operate
            :sendShow="sendShow"
            class="operate"
            :operateMusicInfo="[value.id, index, false]"
          />
        </div>
      </div>

      <div :style="index<3?'paddingTop: 20px': ''">
        <span :title="value.ar[0].name" @click="jumpPage('singerdetail', value.ar[0].id)">{{value.ar[0].name}}</span>
      </div>
    </div>
  </div>
</template>
<script>
import Operate from "../../Operate/Operate";
import { request } from "../../../network/request";
import { dateFormat } from "../../../utils/dateFormat";
import { playCountFormat } from "../../../utils/playCountFormat";
import { durationFormat } from "../../../utils/durationFormat";
export default {
  name: "TopListSongs",
  components: {
    Operate,
  },
  props: {
    topListSongs: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  computed: {
    musicAudioId() {
      return this.$store.state.musicAudioId;
    },
    musicAudioIdList() {
      return this.$store.state.musicAudioIdList;
    },
    musicAudioList() {
      return this.$store.state.musicAudioList;
    },
    musicAudioAddAllFlag() {
      return this.$store.state.musicAudioAddAllFlag;
    },
    musicAudioPlayStatus() {
      return this.$store.state.musicAudioPlayStatus;
    },
  },
  data() {
    return {
      checkResult: null,
      currentIndex: null,
      value: 0,
      sendShow: [true, true, true, true, false],
    };
  },
  watch: {
    musicAudioAddAllFlag(newVal, oldVal) {
      if (newVal === true) {
        this.playListInfo.map((ele, index) => {
          this.addMusic(ele.id, 0, false);
        });
        if (this.musicAudioPlayStatus) {
          setTimeout(() => {
            this.addMusic(this.playListInfo[0].id, 0, true);
          }, 500);
        }

        this.$store.commit("changeValue", {
          type: "musicAudioAddAllFlag",
          value: false,
        });
      }
    },
  },
  created() {
    // this.checkMusic(this.playlistId);
  },
  methods: {
    checkMusic(id) {
      return request({
        url: "/check/music?id=" + id,
      }).then((response) => {
        this.checkResult = response;
      });
    },
    addMusic(addId, index, isPlay) {
      this.currentIndex = index;

      var flag = this.musicAudioList.some((ele) => {
        if (ele.songs[0].id === addId) {
          addId = ele.songs[0].id;
          return true;
        }
      }); // 检查是否在播放列表中

      var p1 = request({
        url: `/song/url?id=${addId}`,
      }).then((response) => {
        if (this.musicAudioIdList.length === 0 || isPlay) {
          this.$store.commit("changeValue", {
            type: "musicAudioUrl",
            value: response.data[0].url,
          });
        }
        this.$store.commit("addValue", {
          type: "musicAudioUrlList",
          value: response.data[0].url,
        });
      });

      var p2 = request({
        url: `/song/detail?ids=${addId}`,
      }).then((response) => {
        if (this.musicAudioIdList.length === 0 || isPlay) {
          this.$store.commit("changeValue", {
            type: "musicAudioDetail",
            value: response,
          });
        }
        if (!flag) {
          this.$store.commit("addValue", [
            {
              type: "musicAudioList",
              value: response,
            },
            {
              type: "musicAudioDetailList",
              value: response,
            },
          ]);
        }
      });

      var p3 = request({
        url: `/lyric?id=${addId}`,
      }).then((response) => {
        if (this.musicAudioIdList.length === 0 || isPlay) {
          this.$store.commit("changeValue", {
            type: "musicAudioLyric",
            value: response,
          });
        }
        if (!flag) {
          this.$store.commit("addValue", {
            type: "musicAudioLyricList",
            value: response,
          });
        }
      });

      Promise.all([p1, p2, p3]).then((response) => {
        if (this.musicAudioIdList.length === 0 || isPlay) {
          this.$store.commit("changeValue", [
            {
              type: "musicAudioId",
              value: addId,
            },
            // {
            //   type: "musicAudioIndex",
            //   value: index,
            // },
          ]);
        }
        this.$store.commit("addValue", {
          type: "musicAudioIdList",
          value: addId,
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
    createTime(time) {
      return dateFormat(time);
    },
    countFormat(count) {
      return playCountFormat(count);
    },
    playFormat(time) {
      return durationFormat(time);
    },
    playtimeActive(index) {
      this.currentIndex = index;
    },
    playtimeNotActive(index) {
      this.currentIndex = null;
    },
  },
};
</script>
<style scoped>
.d1 {
  font-size: 12px;
  display: flex;
  height: 34px;
  color: #666;
  background-color: #f5f5f5;
  border-left: solid 1px #d9d9d9;
  border-bottom: solid 1px #d9d9d9;
  border-right: 1px solid #cdcdcd;
  background: linear-gradient(0deg, #e7e7e7, #fff);
}

.d1 > div {
  padding: 8px 10px;
  border-left: 1px solid #cdcdcd;
}
.mv {
  height: 15px;
  margin: 3px;
  position: absolute;
  left: 1px;
  top: -1px;
}

.dmv {
  top: 5px;
  margin-left: 5px;
  padding-top: 5px;
  padding-left: 24px;
  border: solid 1px #cfcfcf;
  position: relative;
  background-color: #ececec;
  border-radius: 5px;
}

.dmv:hover {
  cursor: pointer;
  background-color: transparent;
}
.d2 > div:nth-of-type(2) {
  width: 217px;
}
.d2 > div:nth-of-type(1) > img {
  width: 17px;
  height: 17px;
  margin-top: 12px;
  opacity: 0.6;
  position: relative;
  left: 10px;
}
.d2 > div:nth-of-type(1) > img:hover {
  cursor: pointer;
  opacity: 1;
}
.tablecount {
  line-height: 34px;
  text-align: right;
  width: 40px;
  margin-right: 40px;
}

.d2 > div:nth-of-type(2) {
  box-sizing: border-box;
  line-height: 38px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  position: relative;
  width: 300px;
}

.d2 > div:nth-of-type(2):hover > span:first-of-type {
  border-bottom: solid 1px;
  cursor: pointer;
}
.d2 > div:nth-of-type(3) {
  width: 111px;
  line-height: 33px;
}
.d2 > div:nth-of-type(4) {
  overflow: hidden;
  width: 150px;
  margin-left: -20px; 
  z-index: 99;
}
.d2 > div:nth-of-type(4) > span:hover {
  border-bottom: solid 1px;
  cursor: pointer;
}
.d2 {
  display: flex;
  width: 668px;
  margin-left: 40px;
  color: #666;
  background-color: #f5f5f5;
  border-left: solid 1px #d9d9d9;
  border-bottom: solid 1px #d9d9d9;
  border-right: 1px solid #cdcdcd;
  line-height: 30px;
  font-size: 12px;
}
.d2:nth-of-type(odd) {
  background-color: #fff;
}

.d2 > div:nth-of-type(1) {
  margin-right: 20px;
}
.d2 > img {
  width: 50px;
  height: 50px;
  padding: 10px 10px;
  cursor: pointer;
}
.operate {
  position: relative;
  left: -350px;
  top: -10px;
}
#playtime {
  margin-top: 5px;
  display: flex;
  justify-content: space-around;
}

#playtime > div > img {
  height: 15px;
  opacity: 0.5;
  margin-left: -15px;
}
#playtime > div > img:hover {
  opacity: 1;
  cursor: pointer;
}

#playtime > div {
  margin-right: 8px;
}

</style>