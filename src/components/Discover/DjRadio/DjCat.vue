<template>
  <div class="head">
    <div class="main">
      <div
        v-for="(value, index) in DjCat.data.slice(0,-1)"
        :key="index"
        @click="changeDj(index, value.categoryId)"
        :class="currentIndex === index?'item active':'item'"
      >
        <div class="img">
          <img :src="imgUrl[index]" alt />
        </div>
        <span>{{value.categoryName}}</span>
      </div>
    </div>
  </div>
</template>
<script>
import { request } from "../../../network/request";
export default {
  name: "DjCat",
  data() {
    return {
      DjCat: {},
      imgUrl: [
        "http://p4.music.126.net/cCogGBNagepu5uAd-OuCKQ==/19119407695444318.jpg",
        "http://p3.music.126.net/BVIacbDdjw90QjU4z7mZIw==/3389794351757648.jpg",
        "http://p4.music.126.net/RuluBZUC94KRYjx0eF7aHQ==/3223768093383533.jpg",
        "http://p4.music.126.net/fNsFzMtgDByvOnpA0Kfehg==/3242459791054876.jpg",
        "http://p3.music.126.net/2jEyq6KuPUv0GgFOeDB0rA==/7731765766567381.jpg",
        "http://p3.music.126.net/jQo83vj8D0r3g0ydL1ujag==/18555358232264878.jpg",
        "http://p3.music.126.net/MkrVCkXoJ7v29QXLBluUkw==/19167786207164651.jpg",
        "http://p4.music.126.net/svlzt2aNhbHcAVRG1ae9nw==/19199672044369951.jpg",
        "http://p3.music.126.net/DZV3wnLcYoc32YLnxoVCOg==/3240260767799323.jpg",
        "http://p4.music.126.net/fxNHDWCNVvRFa_3KAsBw6w==/3242459791054879.jpg",
        "http://p3.music.126.net/QdPlGPCPc-QDdaIKuVq3RQ==/3236962232922745.jpg",
        "http://p3.music.126.net/8yoy33lYuvviDbcg1AOLUw==/3242459791054877.jpg",
        "http://p4.music.126.net/tNg9R3kjzSAvYRU439sV-A==/18996262393228947.jpg",
        "http://p4.music.126.net/OQ-1zApxCjSxieFf63irwA==/19212866183939953.jpg",
        "http://p4.music.126.net/WtEmxKotqvrOx02c7RwbdQ==/19167786207164648.jpg",
        "http://p3.music.126.net/AxVxXIdgRXcpDGlkDehsCw==/3249056862536456.jpg",
        "http://p4.music.126.net/27_UywB9VT7qTicVaUL2Ww==/19052337486286044.jpg",
        "http://p3.music.126.net/RLir9qUUGNolaxtMz-mPNA==/18896206835140215.jpg",
      ],
      currentIndex: 99,
      isShow: true,
    };
  },
  created() {
    this.getDjCat();
  },
  methods: {
    getDjCat() {
      return request({
        url: "/dj/category/recommend",
      }).then((response) => {
        this.DjCat = response;
      });
    },
    changeDj(index, catType) {
      this.currentIndex = index;
      this.isShow = false;
      this.$router.push({
        name: "djtype",
        params: {
          type: catType,
        },
      });
      this.$emit("change-type", this.isShow);
      request({
        url: `/dj/recommend/type?type=${catType}`,
      }).then((response) => {
        this.$store.commit("changeValue", {
          type: "DjRecommendType",
          value: response,
        });
      });
      request({
        url: `/dj/radio/hot?cateId=${catType}`,
      }).then((response) => {
        this.$store.commit("changeValue", {
          type: "DjRadioHot",
          value: response,
        });
      });
    },
  },
};
</script>
<style scoped>
.head {
  padding: 20px 20px;
  width: 960px;
  height: 210px;
  padding-right: 0;
}
.main {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}
.item {
  width: 66px;
  height: 66px;
  text-align: center;
  color: #888;
  cursor: pointer;
  font-size: 12px;
  border-radius: 5px;
  margin-right: 30px;
  margin-left: 10px;
  margin-top: 20px;
  box-sizing: border-box;
}
.img {
  width: 48px;
  height: 48px;
  margin: 0 auto;
  overflow: hidden;
}
.img > img {
  transform: translateX(0px);
}
.item.active {
  border: 2px solid #d35757;
}
.item:hover {
  background-color: #f6f7f7;
}
.item.active > .img > img {
  transform: translateX(-48px);
}
</style>