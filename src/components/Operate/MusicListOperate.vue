<template>
  <div class="r3">
    <button class="play" @click="addAllMusic(true)">
      <img src="../../assets/hothead/play.png" alt />
      <span>播放</span>
    </button>
    <button class="add" @click="addAllMusic(false)">
      <img src="../../assets/playlist/add.png" alt />
    </button>
    <button>
      <img src="../../assets/search/rescollect.png" alt />
      <span v-if="musicIsPlayList">({{countFormat(musicListInfo.subscribedCount)}})</span>
      <span v-else>收藏</span>
    </button>
    <button>
      <img src="../../assets/search/resshare.png" alt />
      <span v-if="musicShareCount">({{musicListInfo.shareCount}})</span>
      <span v-else>分享</span>
    </button>
    <button>
      <img src="../../assets/search/resdownload.png" alt />
      <span>下载</span>
    </button>
    <button>
      <img src="../../assets/playlist/comment.png" alt />
      <span>({{musicListInfo.commentCount}})</span>
    </button>
  </div>
</template>
<script>
import { playCountFormat } from "../../utils/playCountFormat";
import { playTimeFormat } from "../../utils/playTimeFormat";
export default {
  name: "MusicListOperate",
  props: {
    musicListInfo: {
      type: Object,
      default: () => {
        return {}
      }
    },
    musicIsPlayList: {
      type: Boolean,
      default: true
    },
    musicShareCount: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    addAllMusic(isPlay) {
      this.$store.commit("changeValue", [
        {
          type: "musicAudioAddAllFlag",
          value: true,
        },
        {
          type: "musicAudioPlayStatus",
          value: isPlay,
        },
      ]);
    },
    createTime(time) {
      return playTimeFormat(time);
    },
    countFormat(count) {
      return playCountFormat(count);
    },
  },
};
</script>
<style scoped>
button {
  border-radius: 5px;
  height: 31px;
  border: 1px solid #c4c4c4;
  display: flex;
  align-items: center;
  font-size: 12px;
  outline: none;
  cursor: pointer;
  background: linear-gradient(0deg, #f1f1f1, #fff);
}

button:hover {
  background: linear-gradient(0deg, #f8f8f8, #fff);
  border: solid 1px #d7d6d6;
}

button > img {
  height: 15px;
  width: 15px;
}
.r3 {
  display: flex;
  margin-top: 20px;
}
.r3 > button {
  width: auto;
  padding: 0 3px 0 5px;
  display: flex;
}
.r3 > button:not(:first-of-type) {
  margin-right: 5px;
}
.r3 > button:nth-of-type(2) {
  padding: 0 3px 0 5px;
}
.r3 > button > img {
  width: 15px;
  height: 15px;
  margin-right: 5px;
}
.r3 > button:nth-of-type(3) > img {
  width: 18px;
  height: 20px;
}
.r3 > button:nth-of-type(5) > img {
  width: 13px;
  height: 13px;
}
.r3 > button:nth-of-type(6) > img {
  width: 13px;
  height: 13px;
}
.play {
  width: 66px;
  background: linear-gradient(0deg, #136cbf, #4b9ede);
  color: white;
  font-size: 12px;
  display: flex;
  padding-top: 2px;
  padding-left: 10px;
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
  border: solid 1px #428dd6;
}
.add {
  margin-left: -2px;
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
  border: solid 1px #428dd6;
  border-left: none;
  background: linear-gradient(0deg, #136cbf, #4b9ede);
}
.add:hover,
.play:hover {
  background: linear-gradient(0deg, #3383ce, #5ea3e3);
  border: solid 1px #428dd6;
}
.add {
  border-left: solid 1px #316da7;
}

.play > span {
  margin-right: 5px;
  margin-bottom: 2px;
}

.play > img:nth-of-type(1) {
  height: 18px;
  width: 18px;
  margin-left: 0px;
}
</style>