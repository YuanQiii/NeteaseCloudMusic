<template>
      <div class="head">
        <div class="img">
          <img :src="djDetail.picUrl" alt />
        </div>
        <div class="info">
          <div class="r1">
            <img src="../../assets/playlist/tag .png" />
            <span>电台</span>
            <div>{{djDetail.name}}</div>
          </div>
          <div class="r2">
            <img :src="djDetail.dj.avatarUrl" />
            <div>
              <span>{{djDetail.dj.nickname}}</span>
            </div>
            <img src="../../assets/banner/singer.png" v-if="djDetail.dj.userType === 4">
            <img src="../../assets/banner/star.png" v-if="djDetail.dj.userType === 200">
          </div>
          <div class="r3">
            <div class="sub">
              <img src="../../assets/banner/sub.png" alt="">
              <span>订阅（{{djDetail.subCount}}）</span>
            </div>
            <div class="playall">
              <img src="../../assets/search/resplay.png" alt="">
              <span>播放全部</span>
            </div>
            <div class="share">
              <img src="../../assets/search/resshare.png" alt="">
              <span>分享（{{djDetail.shareCount}}）</span>
            </div>
          </div>
          <div class="r4">
            <span class="cat">{{djDetail.category}}</span>
            <span class="desc">{{djDetail.desc}}</span>
          </div>
        </div>
      </div>
</template>
<script>
export default {
  name: 'DjHead',
  props: {
    djDetail: {
      type: Object,
      default: () => {
        return {}
      }
    }
  }
}
</script>
<style scoped>
.desc {
  line-height: 20px;
}
.r4 {
  font-size: 12px;
  width: 410px;
}
.cat {
  color: #cc0000;
  border: solid 1px #cc0000;
  padding: 0 5px;
  height: 18px;
  line-height: 18px;
  cursor: pointer;
  margin-right: 10px;
}
.cat:hover {
  background-color: #fbeeee;
}
.playall, .share {
  border: solid 1px #c3c3c3;
  background: linear-gradient(0deg, #f1f1f1, #fff);
  position: relative;
  color: #333;
  margin-left: 7px;
}
.playall:hover {
  background: linear-gradient(0deg, #f8f8f8, #fff);
  border: solid 1px #c7c6c6;
}
.playall>img, .share>img {
  width: 16px;
  height: 16px;
  position: relative;
  top: 4px;
  margin-right: 5px;
}
.sub {
  background: linear-gradient(0deg, #1c6dbd, #4593db);
  position: relative;
  color: #fff;
}
.sub:hover {
  background: linear-gradient(0deg, #3282cd, #5da7eb);
}
.sub > img {
  width: 18px;
  height: 18px;
  position: relative;
  top: 5px;
}
.r3 > div {
    height: 31px;
  width: auto;
  border-radius: 5px;
  line-height: 31px;
  padding: 0px 8px;
  cursor: pointer;
}
.r3 {
  display: flex;
  font-size: 12px;
  margin-top: 20px;
  margin-bottom: 20px;
}
.r2>img:nth-of-type(2){
  width: 12px;
  height: 12px;
  position: relative;
  top: 12px;
  margin-left: 5px;
}
.r2 > div {
  font-size: 12px;
  color: #0c73c2;
  height: 35px;
  line-height: 35px;
  margin-left: 10px;
}
.r2 > div:hover > span {
  border-bottom: solid 1px;
  cursor: pointer;
}
.r2 > img:first-of-type {
  width: 35px;
  height: 35px;
}
.r2 {
  display: flex;
  position: relative;
}
.r1 {
  position: relative;
  display: flex;
  margin-bottom: 10px;
}
.r1 > div {
  font-size: 20px;
  line-height: 24px;
  margin-left: 10px;
}
.r1 > span {
  position: absolute;
  font-size: 12px;
  left: 10px;
  top: 4px;
  color: #fff;
}
.info {
  display: flex;
  flex-direction: column;
  margin-left: 20px;
}
.r1 > img {
  width: 55px;
  height: 24px;
}
.head {
  display: flex;
}
.img > img {
  width: 208px;
  height: 208px;
  padding: 2px;
  border: solid 1px #d5d5d5;
}
</style>