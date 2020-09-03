<template>
  <div>
    <div class="op white" v-if="sendShow[5]">
      <img v-if="sendShow[0]" src="../../assets/search/resadd.png" />
      <img v-if="sendShow[1]" src="../../assets/search/collect_white.png" />
      <img v-if="sendShow[2]" src="../../assets/search/share_white.png" />
      <img v-if="sendShow[3]" src="../../assets/search/download_white.png" />
      <img v-if="sendShow[4]" src="../../assets/audioimg/clear.png" />
    </div>
    <div class="op" v-else>
      <img v-if="sendShow[0]" src="../../assets/search/resadd.png" @click="addMusic(operateMusicInfo[0], operateMusicInfo[1], operateMusicInfo[2])" />
      <img v-if="sendShow[1]" src="../../assets/search/rescollect.png" alt />
      <img v-if="sendShow[2]" src="../../assets/search/resshare.png" alt />
      <img v-if="sendShow[3]" src="../../assets/search/resdownload.png" alt />
      <img v-if="sendShow[4]" src="../../assets/audioimg/clear.png" alt />
    </div>
  </div>
</template>
<script>
import { request } from "../../network/request";
export default {
  name: "Operate",
  props: {
    sendShow: {
      type: Array,
      default: () => {
        return []
      }
    },
    operateMusicInfo: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {};
  },
  computed: {
    musicAudioIdList() {
      return this.$store.state.musicAudioIdList;
    },
  },
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
  },
};
</script>
<style scoped>
.op {
  position: absolute;
  width: 150px;
  left: 290px;
  top: 10px;
}
.op > img {
  margin-right: 4px;
  width: 15px;
  height: 15px;
  opacity: 0.7;
  cursor: pointer;
}
.op > img:first-of-type {
  width: 15px;
  height: 15px;
  margin-right: 5px;
}
.op > img:nth-of-type(2){
  width: 20px;
  height: 20px;
  position: relative;
  top: 3px;
  margin-right: 5px;
}
.op >img:nth-of-type(3) {
  position: relative;
  top: 1px;
  margin-right: 7px;
}
.op > img:hover {
  opacity: 1;
}

.white {
  margin-top: -6px;
}

.white > img:first-of-type{
  position: relative;
  top: 4px;
  width: 23px;
  height: 23px;
  margin-right: 10px;
}
.white > img:nth-of-type(2) {
  width: 19px;
  height: 19px;
  margin-right: 10px;
}
.white > img:nth-of-type(3){
  position: relative;
  top: 3px;
  width: 19px;
  height: 19px;
  margin-right: 10px;
}
.white > img:last-of-type{
  width: 22px;
  height: 22px;
  margin-left: -5px;
  position: relative;
  top: 5px;
  margin-right: 10px;
}
</style>