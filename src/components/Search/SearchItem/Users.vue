<template>
  <div class="main">
    <div class="item" v-for="(value, index) in searchUser.userprofiles" :key="index">
      <img :src="value.avatarUrl" class="avatar" @click="jumpPage('profile', value.userId)"/>
      <div class="info">
        <span class="name">
          <span @click="jumpPage('profile', value.userId)">{{value.nickname}}</span>

          <img src="../../../assets/banner/singer.png" v-if="value.userType === 4" 
          class="singer">

          <img src="../../../assets/banner/v.png" v-if="value.userType === 10 || value.userType === 2" class="vip">

          <img src="../../../assets/search/male.png" class="gender" v-if="value.gender == 1" />
          <img src="../../../assets/search/female.png" class="gender" v-if="value.gender == 2" />

          
        </span>
        <span class="signature">{{value.signature}}</span>
      </div>
      <div class="focus">
        <img src="../../../assets/playlist/focusadd.png" />
        <span>关注</span>
      </div>
      <div class="playlist">歌单：{{playlist[index]}}</div>
      <div class="fans">粉丝：{{fans[index]}}</div>
    </div>
  </div>
</template>
<script>
import { request } from "../../../network/request";
export default {
  name: "Users",
  data() {
    return {
      searchUser: {},
      userId: [],
      playlist: [],
      fans: [],
    };
  },
  computed: {
    // kw() {
    //   return this.$store.state.key;
    // },
    searchCurrentCatName(){
      return this.$store.state.searchCurrentCatName
    },
    kw(){
      return this.$route.params.kw
    }
  },
  created() {
    this.getUser();
  },
  watch: {
    kw(newVal){
      this.getUser()
    }
  },
  methods: {
    getUser() {
      return request({
        url: `/search?keywords=${this.kw}&type=1002`,
      }).then((response) => {
        this.searchUser = response.result;
        console.log(response.result);
        response.result.userprofiles.forEach((element) => {
          this.userId.push(element.userId);
          return request({
            url: `/user/detail?uid=${element.userId}`,
          }).then((value) => {
            this.playlist.push(value.profile.playlistCount);
            this.fans.push(value.profile.followeds);
          });
        });
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
  },
};
</script>
<style scoped>
.vip {
  margin-right: 5px;
}
.singer {
  margin-right: 5px;
}
.focus {
  width: 64px;
  height: 27px;
  text-align: center;
  line-height: 27px;
  background: linear-gradient(0deg, #f1f1f1, #fff);
  margin-right: 50px;
  margin-top: 13px;
  border: solid 1px #c3c3c3;
  border-radius: 5px;
  cursor: pointer;
  color: #333;
  z-index: 99;
}
.focus:hover {
  border: solid 1px #c6c6c6;
  background: linear-gradient(0deg, #f6f6f6, #fff);
}
.focus > img {
  width: 10px;
  height: 10px;
  margin-right: 3px;
}
.playlist {
  width: 100px;
  margin-right: 20px;
  line-height: 52px;
  color: #999;
}
.fans {
  line-height: 52px;
  color: #999;
}
.name > span {
  cursor: pointer;
  font-size: 14px;
  margin-right: 5px;
}
.name > span:hover {
  border-bottom: solid 1px black;
}
.name {
  padding-bottom: 7px;
}

.signature {
  color: #999;
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 460px;
}
.gender {
  width: 15px;
  height: 15px;
  position: relative;
  top: 3px;
}
.info {
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  margin-right: 10px;
  margin-top: 5px;
}
.item {
  width: 900px;
  margin-left: 40px;
  margin-top: 10px;
  font-size: 12px;
  display: inline-flex;
  position: relative;
}
.item:hover,
.item:nth-of-type(even):hover {
  background-color: #f2f2f2;
}
.item:nth-of-type(even) {
  background-color: #f7f7f7;
}
.avatar {
  width: 50px;
  height: 50px;
  margin-left: 10px;
  border: solid 1px #d9d9d9;
  cursor: pointer;
}
</style>