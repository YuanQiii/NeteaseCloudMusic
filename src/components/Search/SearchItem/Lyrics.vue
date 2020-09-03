<template>
  <div class="main">
    <div class="item" v-for="(value, index) in searchLyric.songs" :key="index">
      <div class="head">
        <div class="left">
          <span class="img">
            <img src="../../../assets/playlist/tableplay_active.png" v-if="index === currentIndex">
            <img src="../../../assets/search/resplay.png" @click="addMusic(value.id, index, true)" v-else/>
          </span>
          <span class="c1" @click="jumpPage('digitalsingle', value.id)">{{value.name}}</span>
          <span class="ali" v-if="value.alias.length">- ({{value.alias[0]}})</span>
        </div>
        <div class="right">
          <operate class="cop" :sendShow="opShow" />
          <div>
            <span class="c2" @click="jumpPage('singerdetail', value.artists[0].id)">{{value.artists[0].name}}</span>
          </div>
          <div class="d3">
            <span class="c3" @click="jumpPage('albumdetail', value.album.id)">《{{value.album.name}}》</span>
          </div>
          <div>
            <span class="c4">{{playFormat(value.duration)}}</span>
          </div>
        </div>
      </div>
      <pre class="lyr" :style="descIsOpen?'height: auto':'height: 120px'">{{value.lyrics.txt}}</pre>
      <spread-or-close :fontBlack="true" class="soc" />
    </div>
  </div>
</template>
<script>
import Operate from "../../Operate/Operate";
import SpreadOrClose from "../../Operate/SpreadOrClose";
import { request } from "../../../network/request";
import { durationFormat } from "../../../utils/durationFormat";
export default {
  name: "Lyrics",
  components: {
    Operate,
    SpreadOrClose,
  },
  data() {
    return {
      searchLyric: {},
      opShow: [true, true, true, true],
      currentIndex: 99,
      checkResult: {},
    };
  },
  computed: {
    kw() {
      return this.$route.params.kw;
    },
    descIsOpen() {
      return this.$store.state.descIsOpen;
    },
    musicAudioList() {
      return this.$store.state.musicAudioList;
    },
    musicAudioId() {
      return this.$store.state.musicAudioId;
    },
    musicAudioIdList() {
      return this.$store.state.musicAudioIdList;
    },
  },
  watch: {
    kw() {
      this.getLyrics();
    },
  },
  created() {
    this.getLyrics();
  },
  methods: {
    getLyrics() {
      return request({
        url: `search?keywords=${this.kw}&type=1006`,
      }).then((response) => {
        this.searchLyric = response.result;
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
    playFormat(time) {
      return durationFormat(time);
    },
  },
};
</script>
<style scoped>
.ali {
  color: #aeaeae;
}
.soc {
  margin-left: 90px;
}
.lyr {
  padding: 0 90px;
  overflow: hidden;
}
.cop {
  opacity: 0;
  line-height: 34px;
  position: relative;
  left: -390px;
  top: -3px;
}
.head:hover .cop {
  opacity: 0.8;
}
.item:nth-of-type(even) > .head {
  background-color: #f7f7f7;
}
.head:hover {
  background-color: #f2f2f2;
}
.item {
  width: 900px;
  margin-left: 40px;
  height: auto;
  line-height: 43px;
}

.main {
  font-size: 12px;
}
.head {
  display: flex;
  margin-top: 30px;
  justify-content: space-between;
  position: relative;
}
.d3 {
  width: 200px;
}
.c3 {
  cursor: pointer;
  color: #666;
}
.c3:hover {
  border-bottom: solid 1px black;
}
.c4 {
  margin-right: 40px;
}
.c2 {
  margin-right: 100px;
  cursor: pointer;
  position: relative;
}
.c2:hover {
  border-bottom: solid 1px black;
}
.c1 {
  height: 18px;
  line-height: 18px;
  margin-left: 75px;
  cursor: pointer;
  color: #666;
}
.c1:hover {
  border-bottom: solid 1px black;
}
.left {
  position: relative;
}
.right {
  display: flex;
  justify-content: space-evenly;
  position: relative;
}
.img > img {
  width: 18px;
  height: 18px;
  margin-left: 50px;
  position: absolute;
  top: 12px;
  opacity: 0.6;
  cursor: pointer;
}
img:hover {
  opacity: 1;
}
</style>