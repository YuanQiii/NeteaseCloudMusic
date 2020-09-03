<template>
  <div class="program">
    <div class="phead">
      <div class="pleft">
        <div class="title">节目列表</div>
        <div class="total">共{{djProgram.count}}期</div>
      </div>
      <div class="pright">
        <div class="outchain">
          <img src="../../assets/playlist/outchain.png" alt />
          <span>生成外链播放器</span>
        </div>
        <div class="sort">
          <div @click="toggleAsc(false)" :class="asc?'de':'active de'">
            <img src="../../assets/playlist/descending.png" />
          </div>
          <div @click="toggleAsc(true)" :class="asc?'active as': 'as'">
            <img src="../../assets/playlist/ascending.png" />
          </div>
        </div>
      </div>
    </div>
    <div class="pmain" v-if="musicIsCompleteUpdate">
      <div class="pitem" v-for="(value, index) in djProgram.programs" :key="index">
        <div class="inx">{{getIndex(index, djProgram.count)}}</div>
        <operate :sendShow="sendShow" class="op" />
        <div class="play">
          <img src="../../assets/search/resplay.png" alt />
        </div>
        <div class="pname">
          <span>{{value.name}}</span>
        </div>
        <div class="count">
          <span>播放{{programCount(value.listenerCount)}}</span>
        </div>
        <div class="like">
          <span>赞{{programCount(value.likedCount)}}</span>
        </div>
        <div class="time">{{programDate(value.createTime)}}</div>
        <div class="duration">{{programDuration(value.duration)}}</div>
      </div>
    </div>
    <offset-change :musicTotal="djProgram.count" :musicOffset="100" />
  </div>
</template>
<script>
import { request } from "../../network/request";
import { dateFormat } from "../../utils/dateFormat";
import { durationFormat } from "../../utils/durationFormat";
import { playCountFormat } from "../../utils/playCountFormat";

import Operate from "../Operate/Operate";
import OffsetChange from "../OffsetChange/OffsetChange";
export default {
  name: "DjProgram",
  components: {
    Operate,
    OffsetChange,
  },
  data() {
    return {
      djProgram: {},
      sendShow: [true, false, true, true, false, false],
      asc: false,
    };
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
    offsetNum() {
      return this.$store.state.offsetNum;
    },
    musicIsCompleteUpdate() {
      return this.$store.state.musicIsCompleteUpdate;
    },
  },
  watch: {
    offsetNum(newVal) {
      this.$store.commit("changeValue", {
        type: "musicIsCompleteUpdate",
        value: false,
      });
      this.getDjProgram(this.id, newVal, this.asc);
    },
    asc(newVal) {
      this.$store.commit("changeValue", {
        type: "musicIsCompleteUpdate",
        value: false,
      });
      this.getDjProgram(this.id, this.offsetNum, newVal);
    },
  },
  created() {
    this.getDjProgram(this.id);
  },
  methods: {
    getDjProgram(id, offset = 0, asc = false) {
      return request({
        url: `/dj/program?rid=${id}&limit=100&offset=${offset}&asc=${asc}`,
      }).then((response) => {
        this.djProgram = response;
        console.log(response);
        this.$store.commit("changeValue", {
          type: "musicIsCompleteUpdate",
          value: true,
        });
      });
    },
    toggleAsc(flag) {
      this.asc = flag;
    },
    getIndex(index, total) {
      if (this.asc) {
        return index + this.offsetNum + 1;
      } else {
        return total - index - this.offsetNum;
      }
    },
    programDate(time) {
      return dateFormat(time);
    },
    programDuration(time) {
      return durationFormat(time);
    },
    programCount(time) {
      return playCountFormat(time);
    },
  },
};
</script>
<style scoped>
.duration {
  width: 60px;
  color: #999;
}
.time {
  width: 86px;
  color: #999;
}
.like {
  width: 90px;
}
.count {
  z-index: 99;
  width: 80px;
}
.pitem:hover > .op {
  opacity: 0.6;
}
.pitem:hover > .pname {
  width: 170px;
  margin-right: 70px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.op {
  position: absolute;
  left: -40px;
  opacity: 0;
  cursor: pointer;
  top: -7px;
}
.pname {
  margin-left: 10px;
  color: #333;
  width: 240px;
  overflow: hidden;
  cursor: pointer;
}
.pname:hover > span {
  border-bottom: solid 1px;
}
.play {
  margin-left: 20px;
}
.play > img:hover {
  opacity: 1;
}
.play > img {
  width: 18px;
  opacity: 0.6;
  position: relative;
  top: 5px;
  cursor: pointer;
}
.inx {
  color: #999;
  margin-left: 20px;
}
.pitem {
  display: flex;
  height: 55px;
  width: 640px;
  font-size: 12px;
  background-color: #fff;
  position: relative;
  line-height: 55px;
  border: solid 1px #d9d9d9;
  border-top: none;
}
.pitem:nth-of-type(even) {
  background-color: #f7f7f7;
}
.pitem:hover {
  background-color: #e6e6e6;
}
.de > img,
.as > img {
  width: 15px;
  height: 15px;
  position: relative;
  left: 5px;
  top: 3px;
}
.de,
.as {
  width: 26px;
  height: 23px;
  border: solid 1px #c4c4c4;
  position: relative;
  border-radius: 5px;
  background: linear-gradient(0deg, #f1f1f1, #fff);
  cursor: pointer;
}
.active {
  background: linear-gradient(0deg, #f4f4f4, #e0e0e0);
}
.de:hover,
.as:hover {
  background: linear-gradient(0deg, #e0e0e0, #f4f4f4);
}
.de {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
.as {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
.sort {
  display: flex;
  margin-left: 20px;
}
.outchain {
  position: relative;
  font-size: 12px;
  color: #0c73c2;
  cursor: pointer;
}
.outchain > span:hover {
  border-bottom: solid 1px;
}
.outchain > img {
  width: 16px;
  height: 16px;
  position: relative;
  top: 4px;
  left: -5px;
}
.total {
  font-size: 12px;
  color: #999;
  margin-left: 20px;
  margin-top: 10px;
}
.title {
  color: #333;
  font-size: 20px;
  line-height: 28px;
}
.pleft,
.pright {
  display: flex;
}
.pmain {
  margin-bottom: 40px;
}
.phead {
  display: flex;
  margin-top: 40px;
  border-bottom: solid 2px #c20c0c;
  width: 640px;
  justify-content: space-between;
  padding-bottom: 10px;
}
</style>