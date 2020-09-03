<template>
  <div>
    <music-head :headPrompt="true" class="musichead" :headwidth="980" :headSort="true">
      <span slot="head">听歌排行</span>
      <span slot="songsNumber">累计听歌{{userDetail.listenSongs}}首</span>
    </music-head>
    <div v-if="musicIsCompleteUpdate">
      <div class="main" v-if="userRecord.length">
        <div class="item" v-for="(value, index) in userRecord.slice(0, 10)" :key="index">
          <div class="left">
            <div class="index">{{index+1}}.</div>
            <div class="play">
              <img
                src="../../assets/playlist/tableplay_active.png"
                @click="addMusic(value.song.id, index,true)"
                v-if="value.song.id === musicAudioId"
                style="opacity: 1"
              />
              <img
                src="../../assets/playlist/tableplay.png"
                @click="addMusic(value.song.id, index, true)"
                v-else
              />
            </div>
            <div class="tit">
              <span>{{value.song.name}}</span>
            </div>
            <div class="singer">
              <span>-</span>
              <span>{{value.song.ar[0].name}}</span>
            </div>
            <operate
              :sendShow="sendShow"
              :operateMusicInfo="[value.song.id, index, false]"
              class="operate"
            />
          </div>
          <div class="right">
            <div class="score">
              <div :style="{'width': scoreWidth(319, value.score)}"></div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="norecord">
        <img src="../../assets/audioimg/norecord.png" alt />
        <span></span>
      </div>
    </div>
  </div>
</template>
<script>
import { request } from "../../network/request";
import MusicHead from "../Operate/MusicHead";
import Operate from "../Operate/Operate";
export default {
  name: "ProfileSongs",
  components: {
    MusicHead,
    Operate,
  },
  computed: {
    musicAudioId() {
      return this.$store.state.musicAudioId;
    },
    musicAudioIdList() {
      return this.$store.state.musicAudioIdList;
    },
    musicIsCompleteUpdate() {
      return this.$store.state.musicIsCompleteUpdate;
    },
  },
  props: {
    userDetail: {
      type: Object,
      default: () => {
        return {};
      },
    },
    userRecord: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      sendShow: [true, true, true, true, false, false],
    };
  },
  watch: {},
  methods: {
    addMusic(addId, index, isPlay) {
      this.currentIndex = index;

      var flag = this.$store.state.musicAudioList.some((ele) => {
        if (ele.songs[0].id === addId) {
          addId = ele.songs[0].id;
          return true;
        }
      });

      var p1 = request({
        url: "/song/url?id=" + addId,
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
        url: "/song/detail?ids=" + addId,
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
        url: "/lyric?id=" + addId,
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
          this.$store.commit("changeValue", {
            type: "musicAudioId",
            value: addId,
          });
        }

        this.$store.commit("addValue", {
          type: "musicAudioIdList",
          value: addId,
        });
      });
    },
    scoreWidth(width, score) {
      return width * (score / 100) + "px";
    },
  },
};
</script>
<style scoped>
.musichead {
  margin-left: 0;
}
.main {
  width: 980px;
  border: solid 1px #e2e2e2;
}
.norecord {
  height: 279px;
  text-align: center;
}
.norecord > img {
  height: 50px;
  margin-top: 140px;
}
.operate {
  position: absolute;
  left: 270px;
  top: -7px;
  opacity: 0;
}
.score {
  width: 319px;
}
.score > div {
  background-color: #4eb4f5;
  opacity: 0.1;
  height: 36px;
}
.singer > span {
  font-size: 12px;
  color: #aeaeae;
  cursor: pointer;
}
.singer > span:last-of-type:hover {
  border-bottom: solid 1px;
}
.singer > span:first-of-type {
  margin-right: 7px;
}
.tit > span {
  font-size: 12px;
  font-weight: bold;
  margin-right: 7px;
  cursor: pointer;
}

.tit > span:hover {
  border-bottom: solid 1px;
}
.play > img {
  width: 17px;
  height: 17px;
  opacity: 0.6;
  position: relative;
  top: 3px;
  margin-left: 10px;
  cursor: pointer;
  margin-right: 10px;
}
.play > img:hover {
  opacity: 0.9;
}
.index {
  color: #666;
  font-size: 16px;
  width: 45px;
  text-align: right;
  margin-right: 5px;
}
.left {
  display: flex;
}
.item {
  height: 36px;
  display: flex;
  line-height: 36px;
  position: relative;
  justify-content: space-between;
}
.item:nth-of-type(even) {
  background-color: #f7f7f7;
}
.item:hover {
  background-color: #eee;
}
.item:hover .operate {
  opacity: 0.6;
}
</style>