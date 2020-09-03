<template>
  <div>
    <div class="d1" v-if="musicHead">
      <slot />
    </div>
    <div class="d2" v-for="(value, index) in playListInfo" :key="index">
      <div>
        <span class="tablecount" :style="{'marginRight': `${musicMargin[0]}px`, 'width': `${musicWidth[0]}px`}">{{index+1}}</span>
        <img
          src="../../assets/playlist/tableplay_active.png"
          @click="addMusic(value.id, index,true)"
          v-if="value.id === musicAudioId"
          style="opacity: 1"
        />
        <img
          src="../../assets/playlist/tableplay.png"
          @click="addMusic(value.id, index, true)"
          v-else
        />
      </div>
      <div :style="{'marginLeft': `${musicMargin[1]}px`, 'width': `${musicWidth[1]}px`}">
        <span @click="jumpPage('digitalsingle', value.id)">
          {{value.name}}
          <span
            style="color:#AEAEAE"
            :hidden="playListInfo[index].alia[0]?false:true"
          >-({{playListInfo[index].alia[0]}})</span>
        </span>
        <span class="dmv" title="播放mv" :hidden="playListInfo[index].mv?false:true" @click="jumpPage('videodetail', playListInfo[index].mv)">
          <img src="../../assets/playlist/mv.png" class="mv" />
        </span>
      </div>
        <div :style="{'marginLeft': `${musicMargin[2]}px`, 'width': `${musicWidth[3]}px`}">
        <span>{{playFormat(value.dt)}}</span>
        <div id="playtime">
            <operate
            :sendShow="sendShow"
            class="operate"
            :operateMusicInfo="[value.id, index, false]"
            :style="{'marginLeft': `${musicMargin[3]}px`, 'width': `${musicWidth[3]}px`}"
          />
        </div>
      </div>
            <div
        :style="{'marginLeft': `${musicMargin[4]}px`, 'width': `${musicWidth[4]}px`}"
        v-if="!(musicIsSinger)"
        @click="jumpPage('singerdetail', value.ar[0].id)"
      >
        <span :title="value.ar[0].name">{{value.ar[0].name}}</span>
      </div>
        <div v-if="musicIsPlayList" :style="{'marginLeft': `${musicMargin[5]}px`, 'width': `${musicWidth[5]}px`}">
        <span :title="value.al.name" @click="jumpPage('albumdetail', value.al.id)">{{value.al.name}}</span>
      </div>
    </div>
  </div>
</template>
<script>
import Operate from "./Operate";
import { request } from "../../network/request";
import { dateFormat } from "../../utils/dateFormat";
import { playCountFormat } from "../../utils/playCountFormat";
import { durationFormat } from "../../utils/durationFormat";
export default {
  name: "MusicOperate",
  components: {
    Operate,
  },
  props: {
    playlistId: {
      type: Number,
      default: 0,
    },
    playListInfo: {
      type: Array,
      default: () => {
        return [];
      },
    },
    musicMargin: {
      type: Array,
      default: () => {
        return [];
      },
    },
    musicWidth: {
      type: Array,
      default: () => {
        return [];
      },
    },
    musicIsPlayList: {
      type: Boolean,
      default: true,
    },
    musicHead: {
      type: Boolean,
      default: true,
    },
    musicIsSinger: {
      type: Boolean,
      default: false,
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
      checkResult: {},
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
        url: `/check/music?id=${id}`,
      }).then((response) => {
        this.checkResult = response.success;
      });
    },
    addMusic(addId, index, isPlay) {
      request({
        url: `/check/music?id=${addId}`,
      }).then((response) => {
        console.log(response.success);
        console.log(addId);
        if (response.success) {
          this.checkMusic(addId);
          if (this.checkResult) {
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
                ]);
              }
              this.$store.commit("addValue", {
                type: "musicAudioIdList",
                value: addId,
              });
            });
          } else {
            console.log(false);
          }
        }
      });
    },
    jumpPage(path, id) {
      this.$router.push({
        name: path,
        params: {
          id: id,
        },
      });
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
.d2 > div:nth-of-type(1) > img {
  /* width: 17px; */
  height: 17px;
  margin-top: 12px;
  margin-right: 10px;
  opacity: 0.6;
}
.d2 > div:nth-of-type(1) > img:hover {
  cursor: pointer;
  opacity: 1;
}
.tablecount {
  padding: 6px 10px;
  text-align: right;
  width: 15px;
}

.d2 > div:nth-of-type(2) {
  text-indent: 10px;
  height: 30px;
  line-height: 30px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-right: 30px;
  position: relative;
}
.d2 > div:nth-of-type(2):hover > span {
  border-bottom: solid 1px;
  cursor: pointer;
}
.d2 > div:nth-of-type(3) {
  /* width: 81px; */
  position: relative;
  margin-right: 30px;
}
.d2 > div:nth-of-type(3):hover > span {
  opacity: 0;
}
.d2 > div:nth-of-type(3):hover .operate {
  opacity: 0.7;
}
.d2 > div:nth-of-type(4) {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  /* width: 69px; */
  cursor: pointer;
  z-index: 9;
}
.d2 > div:nth-of-type(4):hover > span {
  border-bottom: solid 1px;
}

.d2 > div:nth-of-type(5) {
  /* width: 107px; */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  position: relative;
  margin-left: 20px;
  cursor: pointer;
}
.d2 > div:nth-of-type(5):hover > span {
  border-bottom: solid 1px;
}
.d2 {
  display: flex;
  height: 32px;
  color: #666;
  background-color: #f7f7f7;
  border: solid 1px #d9d9d9;
  border-top: none;
  line-height: 32px;
  font-size: 12px;
}

.d2:nth-of-type(odd) {
  background-color: #fff;
}

.d2 > div:nth-of-type(1) {
  /* width: 75px; */
  display: flex;
  margin-top: -3px;
  justify-content: space-between;
}

#playtime {
  margin-top: 5px;
  display: flex;
  justify-content: space-around;
}
.operate {
  position: absolute;
  opacity: 0;
  left: -290px;
  top: -5px;
  z-index: 9;
}

#playtime > div > img {
  height: 15px;
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