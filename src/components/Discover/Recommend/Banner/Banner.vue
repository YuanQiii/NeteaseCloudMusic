<template>
  <div class="main">
    <div class="img">
      <img :src="value.imageUrl" alt="" v-for="(value, index) in banners" :key="index" :class="currentIndex == index?'active':''">
      <img src="../../../../assets/download/download.png" class="download" />
      <div class="left" @click="imgChange(-1)">
        <img src="../../../../assets/arrow/left.png" />
      </div>
      <div class="right" @click="imgChange(1)">
        <img src="../../../../assets/arrow/right.png" />
      </div>
    </div>
    <div class="bgc">
      <img :src="item.imageUrl" v-for="(item, ind) in banners" :key="ind" :class="currentIndex == ind?'active':''">
    </div>
    <div class="point">
      <span v-for="(value, index) in banners" :key="index" :class="currentIndex == index?'active':''"
      @click="pointChange(item)">
      </span>
    </div>
  </div>
</template>

<script>
import {request} from '../../../../network/request'
export default {
  name: "Banner",
  data() {
    return {
      currentIndex: 0,
      banners: {}
    };
  },
  mounted() {
    this.bannerChange();
    this.getBanners()
  },
  methods: {
    bannerChange() {
      setInterval(() => {
        if (this.currentIndex == 8) {
          this.currentIndex = 0;
        } else {
          this.currentIndex++;
        }
      }, 5000);
    },
    imgChange(count) {
      this.currentIndex += count;
      if (this.currentIndex < 0) {
        this.currentIndex = 8;
      }
      if (this.currentIndex > 8) {
        this.currentIndex = 0;
      }
    },
    pointChange(item){
      this.currentIndex = item
    },
    getBanners(){
      return request({
        url: 'banner'
      }).then(response => {
        console.log(response.banners);
        this.banners = response.banners
      })
    }
  }
};
</script>

<style scoped>

.point {
  height: 20px;
  width: 220px;
  position: absolute;
  top: 94%;
  z-index: 99;
  left: 41%;
  display: flex;
  justify-content: center;
}

.point>span {
  height: 6px;
  width: 6px;
  background-color: #fff;
  border-radius: 3px;
  margin-right: 15px;
  float: left;
  transition: .6s;
  cursor: pointer;
}

.point>span:hover {
   background-color: #C20C0C;
}
.point>span.active {
   background-color: #C20C0C;
}

.main {
  position: relative;
  height: 283px;
  overflow: hidden;
  width: 100%;
}
.bgc > img {
  position: absolute;
  filter: blur(60px);
  margin-left: -60px;
  height: 283px;
  width: 2400px;
  z-index: -2;
}
.bgc > img.active {
  z-index: 0;
}

.img {
  width: 100%;
  position: relative;
  z-index: 1;
}
.img > img {
  position: absolute;
  height: 283px;
  width: 730px;
  margin-left: 25%;
  opacity: 0;
  transition: 1s;
  display: flex;
}

.left {
  height: 63px;
  width: 37px;
  position: absolute;
  margin-top: 110px;
  left: 22%;
  cursor: pointer;
}
.left:hover {
  background-color: rgb(51, 51, 51);
  opacity: 0.5;
}
.left > img {
  position: absolute;
  top: 6px;
  left: -8px;
}
.right {
  height: 63px;
  width: 37px;
  position: absolute;
  margin-top: 110px;
  left: 78%;
  cursor: pointer;
}
.right:hover {
  background-color: rgb(51, 51, 51);
  opacity: 0.5;
}
.right > img {
  position: absolute;
  top: 6px;
  left: -7px;
}
.img > .download {
  height: 283px;
  width: 254px;
  opacity: 1;
  margin-left: 1205px;
  box-shadow: 0px 0px 11px 2px rgba(0, 0, 0, 0.32);
}

.img > .download:hover {
  cursor: pointer;
}

.img > .active {
  opacity: 1;
}
</style>