<template>
  <div class="catheadmain">
    <div class="headmain">
      <div class="headleft">
        <div class="hotre">{{playListCatTitle}}</div>
        <div class="choose" @click="toggleCat">
          <span>选择分类</span>
          <img src="../../../assets/arrow/downarrow.png" alt />
        </div>
      </div>

      <div class="more" @click="hotPlayList(true)">
        <span>热门</span>
      </div>
    </div>
    <div class="detailcat" v-show="isShow">
      <div class="arrow"></div>
      <div class="r1">
        <span @click="hotPlayList(false)">全部风格</span>
      </div>

      <div class="r2">
        <div class="left">
          <div class="item" v-for="(value1, index1) in categories" :key="index1">
            <div class="title">
              <img :src="imgUrl[index1]" />
              <span span>{{value1}}</span>
            </div>
          </div>
        </div>
        <div class="right">
          <div class="info" v-for="(value1, index1) in categories" :key="index1*10">
            <div v-for="(value2, index2) in catList.sub" :key="index2">
              <div
                v-if="index1 == value2.category"
                class="name"
                @click="changeItem(value2.name,false, index2)"
              >
                <span :class="currentIndex === index2?'active':''">{{value2.name}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { request } from "../../../network/request";
import emotion from "../../../assets/catlist/emotion.png";
import language from "../../../assets/catlist/language.png";
import scenes from "../../../assets/catlist/scenes.png";
import style from "../../../assets/catlist/style.png";
import theme from "../../../assets/catlist/theme.png";
export default {
  name: "PlayListCatHead",
  data() {
    return {
      catList: {},
      categories: [],
      isShow: false,
      currentIndex: 99,
      imgUrl: [language, style, scenes, emotion, theme],
      playListCatTitle: "全部",
    };
  },
  computed: {
    musicPlayListCatName() {
      return this.$store.state.musicPlayListCatName;
    },
    musicIsCompleteUpdate() {
      return this.$store.state.musicIsCompleteUpdate;
    },
    offsetNum() {
      return this.$store.state.offsetNum;
    },
  },
  watch: {
    offsetNum(newVal) {
      this.getPlayList(this.playListCatTitle, newVal)
    },
  },
  created() {
    this.getCatList();
    this.changeItem(this.musicPlayListCatName, true);
  },
  methods: {
    getCatList() {
      return request({
        url: "/playlist/catlist",
      }).then((response) => {
        this.catList = response;
        response.categories.length = 5;
        this.categories = Array.from(response.categories);
      });
    },
    toggleCat() {
      this.isShow = !this.isShow;
    },
    getPlayList(name, offset){
      this.changeMusicIsCompleteUpdate(false);
      request({
        url: `/top/playlist?limit=35&order=hot&cat=${name}&offset=${offset}`,
      }).then((response) => {
        this.$store.commit("changeValue", {
          type: "playListPageCat",
          value: response,
        });
        this.changeMusicIsCompleteUpdate(true);
      });
    },
    hotPlayList(isHot, offset = 0) {
      this.playListCatTitle = "全部";
      this.isShow = !this.isShow;
      if (isHot) {
        this.isShow = !this.isShow;
      }
      this.currentIndex = 99;
      return request({
        url: `/top/playlist?limit=35&order=hot&offset=${offset}`,
      }).then((response) => {
        this.$store.commit("changeValue", {
          type: "playListPageCat",
          value: response,
        });
      });
    },
    changeItem(name, show, index, offset=0) {
      this.isShow = show;
      this.isShow = !this.isShow;
      this.currentIndex = index;
      this.playListCatTitle = name;
      this.$store.commit('changeValue', {
        type: 'offsetNum',
        value: 0
      })
      this.getPlayList(name, offset)
    },
    changeMusicIsCompleteUpdate(flag) {
      this.$store.commit("changeValue", {
        type: "musicIsCompleteUpdate",
        value: flag,
      });
    },
  },
};
</script>
<style scoped>
.headleft {
  display: flex;
}
.active {
  background-color: #a7a7a7;
}
.arrow {
  position: absolute;
  height: 15px;
  width: 15px;
  background-color: #fff;
  border: solid 2px #eee;
  transform: rotateZ(45deg);
  left: 13%;
  top: -11px;
  border-right: none;
  border-bottom: none;
}
.info:not(:first-of-type) {
  margin-bottom: 10px;
  margin-top: 15px;
}
.name {
  color: #333;
  padding: 0 10px;
  border-right: 1px solid #e4e4e4;
}
.name > span {
  padding: 1px 1px;
}
.name > span:hover {
  cursor: pointer;
  border-bottom: 1px solid;
}
.title {
  width: 73px;
  height: 42px;
  position: relative;
  padding-left: 30px;
  border-right: 1px solid #e6e6e6;
}
.item:first-of-type {
  border-top: solid 1px #e6e6e6;
}
.item:nth-of-type(3) > .title {
  padding-top: 20px;
}
.item:last-of-type > .title {
  padding-bottom: 20px;
}
.title > img {
  width: 23px;
  height: 23px;
  position: relative;
  top: 5px;
}
.title > span {
  margin-left: 10px;
}
.info {
  display: flex;
  flex-wrap: wrap;
}
.right {
  padding-top: 10px;
  display: flex;
  flex-direction: column;
  padding-left: 20px;
  margin-top: 10px;
  border-top: solid 1px #e6e6e6;
}
.left {
  display: flex;
  flex-direction: column;
  margin-top: 10px;
}
.r2 {
  display: flex;
  font-size: 12px;
}
.r1 {
  border: solid 1px #eee;
  width: 75px;
  height: 26px;
  text-align: center;
  line-height: 26px;
  cursor: pointer;
  background-color: #f5f5f5;
  font-size: 12px;
  border-radius: 5px;
  margin-left: 25px;
  margin-top: 15px;
}
.r1:hover > span {
  border-bottom: solid 1px black;
}
.catheadmain {
  position: relative;
  width: 924px;
  left: 28px;
}
.detailcat {
  z-index: 99;
  background-color: #fff;
  top: 50px;
  position: absolute;
  width: 700px;
  border: solid 2px #eee;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
}

.headmain {
  display: flex;
  justify-content: space-between;
  border-bottom: 2px solid #c10d0c;
  padding: 34 0 0 10px;
  padding-bottom: 10px;
  color: #333;
}

.choose {
  font-size: 12px;
  padding: 6px 10px;
  text-align: center;
  cursor: pointer;
  border: solid 1px #c4c4c4;
  color: #1f7ec7;
  position: relative;
  border-radius: 5px;
  background: linear-gradient(0deg, #f1f1f1, #fff);
}
.choose:hover {
  background: linear-gradient(0deg, #f6f6f6, #fff);
  border: solid 1px #d6d6d6;
}
.choose > img {
  width: 15px;
  height: 15px;
  position: relative;
  top: 3px;
}
.hotre {
  font-size: 24px;
  margin-right: 15px;
}
.more {
  background-color: #b70a0b;
  color: #fff;
  border-radius: 5px;
  font-size: 12px;
  margin-top: 5px;
  padding: 5px 10px;
  cursor: pointer;
}
.more:hover > span {
  border-bottom: solid 1px #fff;
}
</style>