<template>
  <div class="createmain">
    <div
      class="item"
      v-for="(value, index) in musicInfo.slice(0,showNumber)"
      :key="index"
      :style="{marginLeft: musicMargin + 'px',
             marginRight: musicMargin + 'px',}"
    >
      <div class="it">
        <div class="img">
          <img :src="value.coverImgUrl"/>
          <div class="reflective" @click="jumpPage('playlist', value.id)"></div>
        </div>
        <div class="title">
          <div>
            <span>{{value.name}}</span>
          </div>
          <div>
            <span>by</span>
            <span>{{value.creator.nickname}}</span>
            <img
              src="../../assets/banner/v.png"
              v-if="value.creator.userType === 2 || value.creator.userType === 10 "
            />
            <img src="../../assets/banner/star.png" v-if="value.creator.userType === 200" />
            <img src="../../assets/banner/singer.png" v-if="value.creator.userType === 4" />
          </div>
        </div>
        <div class="bg"></div>
        <div class="play">
          <div class="playcount">
            <img src="../../assets/hothead/headset.png" alt />
            <span>{{playCount(value.playCount)}}</span>
          </div>
          <img src="../../assets/hothead/play.png" @click="jumpPage('playlist', value.id)" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { request } from "../../network/request";
import {playCountFormat} from "../../utils/playCountFormat"
export default {
  name: "MusicPImage",
  props: {
    musicInfo: {
      type: Array,
      default: () => {
        return [];
      },
    },
    musicMargin: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      num: 40,
    };
  },
  computed: {
    showNumber() {
      let len = this.musicInfo.length;
      if (len < 40) {
        return len;
      } else {
        return this.num;
      }
    },
  },
  mounted() {
    window.addEventListener("scroll", this.imageScroll);
  },
  methods: {
    imageScroll() {
      let scrollValue =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      let offsetHeight = document.body.offsetHeight;
      if (scrollValue > offsetHeight - 1100) {
        this.num += 30;
      }
    },
    jumpPage(path, id) {
      this.$router.push({
        name: path,
        params: {
          id: id,
        },
      });
    },
    playCount(time){
      return playCountFormat(time)
    }
  },
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
  left: 0px;
  opacity: 0.3;
  cursor: pointer;
}
.bg {
  background-color: black;
  opacity: 0.5;
  width: 140px;
  height: 27px;
  position: absolute;
  top: 113px;
}
.play {
  display: flex;
  justify-content: space-between;
  position: absolute;
  width: 140px;
  height: 27px;
  color: #ccc;
  font-size: 12px;
  top: 118px;
}
.play > img {
  width: 18px;
  height: 18px;
  opacity: 0.7;
  cursor: pointer;
  margin-right: 10px;
  z-index: 9;
}
.play > img:hover {
  opacity: 1;
}
.playcount > img {
  width: 16px;
  height: 16px;
  margin-left: 10px;
  position: relative;
  top: 3px;
  margin-right: 3px;
}
.title > div:first-of-type {
  width: 140px;
  font-size: 14px;
  cursor: pointer;
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-bottom: 1px;
}
.title > div:first-of-type:hover > span {
  border-bottom: solid 1px;
}
.title {
  margin-top: 5px;
}
.title > div:last-of-type > img {
  position: relative;
  top: 2px;
  left: 5px;
}
.title > div:last-of-type > span:first-of-type {
  color: #999;
}
.title > div:last-of-type > span:last-of-type {
  cursor: pointer;
  color: #666;
  margin-left: 5px;
}
.title > div:last-of-type > span:last-of-type:hover {
  border-bottom: solid 1px;
}
.item {
  width: 140px;
  margin-top: 20px;
  position: relative;
}

.img > img {
  width: 140px;
  height: 140px;
  cursor: pointer;
}
.createmain {
  margin-bottom: 40px;
  display: flex;
  width: 980px;
  flex-wrap: wrap;
}
</style>