<template>
  <div class="headmain" :style="{width: headwidth+'px'}">
    <div class="left">
      <div class="hotre">
        <slot name="head" />
        <span v-if="headReg" class="reg">&reg;</span>
        <slot name="count" />
      </div>
      <div class="cat">
        <div class="catitem" v-for="value in headcat" :key="value">
          <span @click="jumpPage(headPath, value)">{{value}}</span>
        </div>
        <slot name="songsNumber" />
        <div class="headPrompt" v-if="headPrompt">
          <div class="prompt">
            <img src="../../assets/my/i.png" />
          </div>
          <div class="txt">
            <div class="point"></div>
            <span>实际播放时间过短的歌曲将不纳入计算。</span>
          </div>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="outchain" v-if="headOutChain">
        <img src="../../assets/playlist/outchain.png" alt />
        <a href="javascrpt::">生成外链播放器</a>
      </div>
      <div class="playcount" v-if="headPlayCount">
        <span>播放：</span>
        <span>
          <slot name="playCount" />
        </span>
        <span>次</span>
      </div>
      <div class="sort" v-if="headSort">
        <span :class="0 === currentIndex?'active week':'week'" @click="toggleSort(0)">最近一周</span>
        <span class="mid">|</span>
        <span :class="1 === currentIndex?'active all':'all'" @click="toggleSort(1)">所有时间</span>
      </div>
      <div class="more" @click="jumpPage(headPath)">
        <slot name="more" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "MusicHead",
  props: {
    headwidth: {
      type: Number,
      default: 720,
    },
    headcat: {
      type: Array,
      default: () => {
        return [];
      },
    },
    headOutChain: {
      type: Boolean,
      default: false,
    },
    headPlayCount: {
      type: Boolean,
      default: false,
    },
    headPrompt: {
      type: Boolean,
      default: false,
    },
    headSort: {
      type: Boolean,
      default: false,
    },
    headReg: {
      type: Boolean,
      default: false,
    },
    headPath: {
      type: String,
      default: "",
    },
    headCatName: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      currentIndex: 0,
      toggleRecordType: 1,
    };
  },
  computed: {
    userRecordList(){
      return this.$store.state.userRecordList
    }
  },
  methods: {
    toggleSort(index) {
      this.currentIndex = index;
      if (this.toggleRecordType === 0) {
        this.toggleRecordType = 1;
      } else {
        this.toggleRecordType = 0;
      }
      this.$store.commit("changeValue", [
        {
          type: "userRecordType",
          value: this.toggleRecordType,
        },
        {
          type: "musicIsCompleteUpdate",
          value: false,
        },
      ]);
    },
    jumpPage(path, catName = "全部") {
      this.$router.push({
        name: path,
      });
      this.$store.commit("changeValue", {
        type: "musicPlayListCatName",
        value: catName,
      });
    },
  },
};
</script>
<style scoped>
.headmain {
  font-size: 12px;
  width: 720px;
  height: 42px;
  display: flex;
  border-bottom: 2px solid #c10d0c;
  padding: 34px 0 0 0;
  color: #333;
  margin-left: 36px;
  justify-content: space-between;
}
.reg {
  font-size: 12px;
  position: relative;
  top: -12px;
  left: 1px;
}
.sort {
  display: flex;
  margin-top: 12px;
}
.active {
  font-weight: bold;
}
.mid {
  padding: 0 8px;
}
.all {
  cursor: pointer;
}
.week {
  cursor: pointer;
}
.prompt {
  position: relative;
  top: 1px;
  width: 18px;
  height: 18px;
  margin-left: 10px;
  border-radius: 18px;
  cursor: pointer;
}
.txt {
  width: 310px;
  height: 38px;
  border: solid 1px #c6c6c6;
  padding-left: 10px;
  border-radius: 2px;
  position: relative;
  box-shadow: 0px 0px 11px -6px #08000c;
  top: 20px;
  left: -16px;
  background-color: #fff;
  z-index: 99;
  display: none;
}
.txt > div {
  position: absolute;
  height: 12px;
  width: 12px;
  background-color: #fff;
  border: solid 1px #c6c6c6;
  border-right: none;
  border-bottom: none;
  box-shadow: 0px 0px 11px -6px #08000c;
  transform: rotateZ(45deg);
  top: -7px;
  left: 27px;
}
.txt > span {
  line-height: 38px;
  font-size: 12px;
}
.prompt:hover {
  background-color: #f7f7f7;
}
.prompt:hover + .txt {
  display: inline-block;
}
.txt:hover {
  display: inline-block;
}
.prompt > img {
  width: 18px;
  height: 18px;
}
.left {
  display: flex;
}
.right {
  display: flex;
}
.hotre {
  font-size: 24px;
}
.cat {
  margin-left: 20px;
  display: flex;
  justify-content: space-evenly;
  font-size: 12px;
  height: 25px;
  margin-top: 10px;
}

.catitem {
  border-right: 1px solid #ccc;
  padding-right: 15px;
  margin: 5px;
  cursor: pointer;
}
.catitem:last-of-type {
  border-right: none;
}
.catitem:hover > span {
  border-bottom: solid 1px;
}
.outchain,
.playcount {
  display: flex;
  margin-top: 10px;
}
.outchain {
  margin-right: 20px;
}
.outchain > a {
  color: #4996d1;
}
.playcount > span:nth-of-type(2) {
  color: #c20c0c;
  font-weight: bold;
}

.outchain > img {
  width: 16px;
  height: 16px;
}
.more:hover > span {
  border-bottom: solid 1px black;
  cursor: pointer;
}
.more {
  font-size: 12px;
  margin-top: 12px;
}
</style>