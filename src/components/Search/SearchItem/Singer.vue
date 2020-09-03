<template>
  <div class="main">
    <div class="item" v-for="(value, index) in searchSinger.artists" :key="index">
      <div class="reflective" @click="jumpPage('singerdetail', value.id)"></div>
        <img :src="value.img1v1Url" class="img">
      <span>
        <span class="name" @click="jumpPage('singerdetail', value.id)">{{value.name}}</span>
        <img src="../../../assets/my/personal.png" class="profile" @click="jumpPage('profile', value.accountId)" v-if="value.accountId">
        </span>
    </div>
  </div>
</template>
<script>
import {request} from '../../../network/request'
export default {
  name: 'Singer',
  data(){
    return {
      searchSinger: {},
    }
  },
  computed: {
    kw(){
      return this.$route.params.kw
    }
  },
  created(){
    this.getSinger()
  },
  methods: {
    getSinger(){
      return request({
        url: `/search?keywords=${this.kw}&type=100`
      }).then(response => {
        this.searchSinger = response.result
        console.log(this.searchSinger);
      })
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
}
</script>
<style scoped>
.reflective {
  position: absolute;
  border: solid 65px;
  border-color: white transparent transparent white;
  position: absolute;
  z-index: 9;
  top: 0px;
  left: 0px;
  opacity: 0.15;
  cursor: pointer;
}
.profile {
    float: right;
}
.item>span {
  font-size: 12px;
  cursor: pointer;
  margin-top: 5px;
}
.name:hover {
  border-bottom: solid 1px black;
}
.main {
  display: flex;
  width: 900px;
  justify-content: space-between;
  flex-wrap: wrap;
  padding-left: 40px;
}
.item {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  margin-bottom: 10px;
  position: relative;
}
.img {
  width: 130px;
  height: 130px;
  border: 1px solid #cccdce;
}
</style>