<template>
  <div class="main">
    <div class="head">
      <span>主播电台</span>
    </div>
    <div class="content">
      <div class="item" v-for="(value, index) in searchStation.djRadios.slice(0,10)" :key="index">
        <img :src="value.picUrl" class="pic" @click="jumpPage('djdetail', value.id)"/>
        <span class="s1"><span>{{value.name}}</span></span>
        <span class="s2">
          <span>by</span>
          <span><span @click="jumpPage('profile', value.dj.userId)">{{value.dj.nickname}}</span></span>
          <img src="../../../assets/banner/singer.png" v-if="value.dj.userType === 4">
          <img src="../../../assets/banner/star.png" v-if="value.dj.userType === 200">
          <img v-if="value.dj.gender == 1" src="../../../assets/search/male.png" class="gender"/>
          <img v-if="value.dj.gender == 2" src="../../../assets/search/female.png" class="gender" />
        </span>
      </div>
    </div>
  </div>
</template>
<script>
import { request } from "../../../network/request";
export default {
  name: "Station",
  data() {
    return {
      searchStation: {},
    };
  },
  computed: {
    kw(){
      return this.$route.params.kw
    }
  },
  watch: {
    kw(){
      this.getStation()
    }
  },
  created() {
    this.getStation();
  },
  methods: {
    getStation() {
      return request({
        url: `/search?keywords=${this.kw}&type=1009`
      }).then(response => {
        this.searchStation = response.result;
      });
    },
    jumpPage(path, id){
      this.$router.push({
        name: path,
        params: {
          id: id
        }
      })
    }
  }
};
</script>
<style scoped>
img {
  margin-left: 5px;
}
.s2 > span:nth-of-type(2):hover > span {
  border-bottom: solid 1px;
  cursor: pointer;
}
.s2 > span:nth-of-type(1){
  color: #999;
  margin-right: 5px;
}
.s1:hover>span {
  border-bottom: solid 1px;
}
.s1 {
  font-size: 14px;
  color: #333;
  margin-top: 10px;
  cursor: pointer;
}

.gender {
  width: 13px;
  height: 13px;
}
.content {
  width: 900px;
  display: flex;
  flex-wrap: wrap;
  margin-left: 40px;
  justify-content: space-between;
  font-size: 12px;
  margin-bottom: 40px;
}
.item>img {
  cursor: pointer;
}
.item {
  margin-top: 20px;
  margin-left: 10px;
  display: flex;
  flex-direction: column;
}
.head {
  width: 900px;
  height: 24px;
  font-size: 12px;
  font-weight: bold;
  margin-top: 30px;
  margin-left: 40px;
  border-bottom: solid 1px #dadada;
}
.pic {
  width: 150px;
  height: 150px;
}
</style>