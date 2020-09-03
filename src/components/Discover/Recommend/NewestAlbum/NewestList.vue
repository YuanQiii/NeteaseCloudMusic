<template>
  <div class="show">
    <img src="../../../../assets/arrow/album_left.png" class="left" @click="changePage(-1)" />
    <img src="../../../../assets/arrow/album_left.png" class="right" @click="changePage(1)" />
    <div class="page">
      <div :class="current" id="main" >
        <div class="item" v-for="(value, index) in albums" :key="index" @click="jumpAlbumDetail(value.id)">
          <img :src="value.blurPicUrl" />
          <div class="reflective"></div>
          <div class="play">
           <img src="../../../../assets/hothead/play.png" /> 
          </div>
          <div class="bgc"></div>
          <div class="point"></div>
          <img src="../../../../assets/banner/record.png" class="record">
          <div :title="value.name" class="title">{{value.name}}</div>
          <span :title="value.artist.name" class="artist">{{value.artist.name}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { request } from "../../../../network/request";
export default {
  name: "NewestList",
  data() {
    return {
      albums: [],
      currentIndex: 0,
      current: "main status0",
      statusList: ["main status0", "main status1", "main status2"],

    };
  },
  mounted() {
    this.getAlbumNewest();
  },
  methods: {
    jumpAlbumDetail(albId){
      this.$router.push({
        name: 'albumdetail',
        params: {
          id: albId
        }
      })
    },
    getAlbumNewest() {
      return request({
        url: "/album/newest"
      }).then(response => {
        var temp1 = response.albums.slice(0, 5);
        var temp2 = response.albums.slice(0, 10);
        this.albums = temp2.concat(temp1);
      });
    },
    changePage(num) {
      var index = this.currentIndex;
      var status = document.querySelector("#main");
      if (num == 1) {
        if (index == 2) {
          this.currentIndex = 0;
          this.current = this.statusList[this.currentIndex];
          setTimeout(() => {
            this.current = this.statusList[(this.currentIndex += num)];
          }, 1);
        } else {
          this.current = this.statusList[(this.currentIndex += num)];
        }
      } else {
        if (index == 1) {
          status.setAttribute("class", "main status3");
          // this.currentIndex = 0;
          setTimeout(() => {
            status.setAttribute("class", "main status4");
            this.currentIndex = 2;
          }, 1200);
        } else if ((index = 2)) {
          status.setAttribute("class", "main status1");
          this.currentIndex = 1;
          // this.current = this.statusList[(this.currentIndex += num)];
          // console.log(this.current);
        }
      }
    }
  }
};
</script>
<style scoped>

.reflective {
  box-sizing: border-box;
  position: absolute;
  border: solid 70px;
  border-color: white transparent transparent white;
  z-index: 0;
  top: 0px;
  left: 0px;
  opacity: 0.2;
  cursor: pointer;
}
.reflective:hover + .play {
  z-index: 9;
}
.play:hover {
  z-index: 9;
}
.artist,.title {
  box-sizing: border-box;
}

.artist:hover,.title:hover {
  border-bottom: solid 1px black;
  cursor: pointer;
}

.record {
  height: 104px;
  position: absolute;
  left: 30px;
  top: 20px;
  z-index: -1;
  opacity: .9;
}

.bgc {
  position: absolute;
  width: 90px;
  height: 90px;
  left: 20px;
  top: 30px;
  border: 1px solid #8e8e8e;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  background-color: #fff;
  opacity: .25;
  z-index: -1;
}
.play {
  width: 10px;
  height: 20px;
  position: absolute;
  z-index: -1;
  top: 57%;
  left: 73%;
  opacity: 0.7;
  cursor: pointer;
}
.play>img {
    width: 20px;
  height: 20px;
}

.play:hover {
  opacity: 1;
}
.page > span:last-of-type {
  color: #777777;
}

.item {
  position: relative;
}

.item > div:not(.point) {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100px;
}

.main {
  display: flex;
  font-size: 12px;
}

.main.status0 {
  transform: translateX(0);
  transition: 0s ease-in-out;
}

.main.status1 {
  transform: translateX(-640px);
  transition: 1s ease-in-out;
}

.main.status2 {
  transform: translateX(-1280px);
  transition: 1s ease-in-out;
}
.main.status3 {
  transform: translateX(0);
  transition: 1s ease-in-out;
}
.main.status4 {
  transform: translateX(-1280px);
  transition: 0s ease-in-out;
}
.item {
  padding: 18px;
  padding-right: 10px;
  padding-top: 25px;
}
.item > img:first-of-type {
  width: 100px;
  height: 100px;
  cursor: pointer;
  z-index: 9;
}

.show > img {
  width: 17px;
  height: 17px;
  z-index: 9;
  cursor: pointer;
}
.left {
  position: absolute;
  top: 35%;
  left: 0%;
}
.right {
  transform: rotateZ(180deg);
  position: absolute;
  top: 35%;
  left: 97%;
}
.show {
  width: 687px;
  height: 186px;
  background-color: #f5f5f5;
  margin-top: 20px;
  border: solid 1px #d3d3d3;
  position: relative;
  margin-left: 10px;
}

.page {
  width: 645px;
  height: 180px;
  overflow: hidden;
  margin: 3px auto;
}
.point {
  height: 7px;
  width: 5px;
  border-left: solid 1px #f6f6f6;
  opacity: .6;
  background-color: #414141;
  border-radius: 5px;
  position: absolute;
  z-index: 99;
  top: 65px;
  left: 247px;

}
</style>