<template>
  <div>
    <div class="tophead">
      <img :src="sendtop.coverImgUrl" class="cimg" />
      <div class="shadow">
        <img src="../../../../assets/hothead/shadow.png" alt />
      </div>
      <span>{{sendtop.name}}</span>
      <img src="../../../../assets/playlist/topplay.png" @click="jumpPage('toplist')" class="topimg" />
      <img src="../../../../assets/playlist/collect.png" alt class="topimg" />
      <div class="reflective" @click="jumpPage('toplist')"></div>
    </div>
  </div>
</template>

<script>
import { request } from "../../../../network/request";
export default {
  name: "TopHead",
  props: {
    sendtop: {
      type: Object,
      default: {},
    },
    topListCat: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    jumpPage(path) {
      this.$router.push({
        name: path,
      });
      this.$store.commit("changeValue", {
        type: "musicTopListCatName",
        value: this.topListCat,
      });
    },
  },
};
</script>

<style scoped>
.shadow {
  position: absolute;
  top: 98px;
}
.shadow > img {
  width: 80px;
}
.reflective {
  position: absolute;
  width: 0;
  height: 0;
  border: solid 40px;
  border-color: white transparent transparent white;
  position: absolute;
  z-index: 9;
  top: 20px;
  opacity: 0.3;
  cursor: pointer;
}


.cimg {
  height: 80px;
  width: 80px;
}
.tophead {
  position: relative;
  padding: 20px 0 0 19px;
  font-size: 14px;
  color: #333;
  font-weight: 900;
  width: 209px;
  height: 98px;
  background-color: #f4f4f4;
  border: #d3d3d3 solid 1px;
}
.topimg {
  width: 22px;
  height: 22px;
  margin-left: 15px;
  opacity: 0.6;
  padding-bottom: 27px;
  cursor: pointer;
}
img:nth-of-type(2) {
  opacity: 0.4;
}
.topimg:hover {
  opacity: 1;
}
span {
  position: absolute;
  top: 20px;
  left: 110px;
  cursor: pointer;
}

span:hover {
  border-bottom: solid 1px #333;
}
</style>