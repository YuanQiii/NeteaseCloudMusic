<template>
  <div class="profilehead">
    <div class="s1">
      <div class="img">
        <img :src="userDetail.profile.avatarUrl" alt />
      </div>
      <div class="info">
        <div class="r1">
          <div class="dl">
            <div class="nickname">{{userDetail.profile.nickname}}</div>
            <div class="vip" v-if="userDetail.profile.vipType === 2">
              <img src="../../assets/my/vip.png" />
            </div>
            <div class="vip" v-if="userDetail.profile.vipType === 11">
              <img src="../../assets/my/vipyear.png" />
            </div>
            <div class="level">
              <img src="../../assets/my/lv.png" alt />
              <span>{{userDetail.level}}</span>
            </div>
            <div class="gender">
              <img src="../../assets/search/male.png" v-if="userDetail.profile.gender === 1 " />
              <img src="../../assets/search/female.png" v-if="userDetail.profile.gender === 2" />
            </div>
            <div class="msg">
              <img src="../../assets/my/msg.png" alt />
              <span>发私信</span>
            </div>
            <div class="follow">
              <img src="../../assets/my/add_white.png" alt />
              <span>关注</span>
            </div>
          </div>

          <div
            class="view"
            @click="jumpPage('singerdetail', userDetail.profile.artistId)"
            v-if="userDetail.profile.authStatus"
          >
            <span>查看歌手页</span>
          </div>
        </div>
        <div class="auth" v-if="userDetail.profile.authStatus">
          <img
            src="../../assets/audioimg/auth.png"
            v-if="0 < userDetail.profile.allAuthTypes[0].type < 4 "
          />
          <img
            src="../../assets/audioimg/musician.png"
            v-if="userDetail.profile.allAuthTypes[0].type === 4 "
          />
          <span>{{userDetail.profile.allAuthTypes[0].desc}}</span>
          <div
            class="tags"
            v-for="(value, index) in userDetail.profile.allAuthTypes[0].tags"
            :key="index"
          >
            <span>{{value}}</span>
          </div>
        </div>
        <div
          v-if="'allAuthTypes' in userDetail.profile &&　userDetail.profile.allAuthTypes.length > 1"
        >
          <div class="experts" v-if="userDetail.profile.allAuthTypes[1].type === 200">
            <img src="../../assets/my/talent.png" />
            <span
              v-for="(value, index) in userDetail.profile.allAuthTypes.slice(1)"
              :key="index"
            >{{value.desc}}</span>
          </div>
        </div>

        <div class="r2">
          <div class="dynamic">
            <div>{{userDetail.profile.eventCount}}</div>
            <span>动态</span>
          </div>
          <div class="attention">
            <div>{{userDetail.profile.follows}}</div>
            <span>关注</span>
          </div>
          <div class="fans">
            <div>{{userDetail.profile.followeds}}</div>
            <span>粉丝</span>
          </div>
        </div>
        <div class="r3" v-if="userDetail.profile.signature">
          <span>个人介绍：{{userDetail.profile.signature}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ProfileHead",
  data() {
    return {};
  },
  props: {
    userDetail: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  created() {},
  methods: {
    jumpPage(path, artistId) {
      this.$router.push({
        name: path,
        params: {
          id: artistId,
        },
      });
    },
  },
};
</script>
<style scoped>
.experts {
  margin-left: 40px;
  margin-top: -10px;
  position: relative;
}
.experts > span {
  color: #666;
  font-size: 14px;
  margin-left: 10px;
  position: relative;
  top: -5px;
}
.tags > span {
  opacity: 0.6;
  border: solid 1px;
  padding: 0 2px;
  margin-left: 10px;
  font-size: 12px;
}
.auth {
  font-size: 14px;
  color: #666;
  height: 20px;
  position: relative;
  margin-bottom: 15px;
  margin-top: -10px;
  display: flex;
}
.auth > span {
  line-height: 20px;
}
.auth > img {
  width: 68px;
  height: 20px;
  margin-left: 40px;
  margin-right: 10px;
}
.r3 {
  margin-left: 40px;
  font-size: 12px;
  color: #666;
  margin-top: 20px;
}
.r2 > div > div {
  margin-top: -4px;
  font-size: 24px;
  font-weight: normal;
  cursor: pointer;
}
.r2 > div > span {
  font-size: 12px;
}
.dynamic,
.attention {
  border-right: solid 1px #ddd;
}
.attention,
.fans {
  padding-left: 20px;
}

.r2 > div:hover {
  color: #0c39d4;
  cursor: pointer;
}
.r2 {
  display: flex;
  color: #666;
  border-top: solid 1px #ddd;
  padding-top: 10px;
  margin-left: 40px;
  width: 740px;
}
.r2 > div {
  width: 66px;
  height: 40px;
}
.r1 {
  display: flex;
  position: relative;
  margin-left: 40px;
  margin-bottom: 20px;
  justify-content: space-between;
}
.dl {
  display: flex;
}
.follow {
  width: 70px;
  height: 31px;
  background: linear-gradient(0deg, #1d6ebe, #4593dc);
  border-radius: 5px;
  margin-left: 15px;
  cursor: pointer;
  margin-top: 1px;
}
.follow > img {
  position: relative;
  width: 12px;
  height: 12px;
  top: 2px;
  margin-left: 10px;
}
.follow > span {
  font-size: 12px;
  color: #fff;
  line-height: 30px;
  margin-left: 10px;
}
.follow:hover {
  background: linear-gradient(0deg, #3891dc, #54aae6);
}
.msg,
.view {
  width: 75px;
  height: 31px;
  border: solid #ddd 1px;
  border-radius: 5px;
  background: linear-gradient(0deg, #f1f1f1, #fff);
  padding: 0 3px;
  cursor: pointer;
}
.view {
  width: 100px;
  text-align: center;
  line-height: 33px;
  font-size: 12px;
}
.msg:hover,
.view:hover {
  background: linear-gradient(0deg, #fdfdfd, #fff);
}
.msg > img {
  height: 12px;
  position: relative;
  top: 2px;
  margin-left: 10px;
}
.msg > span {
  color: #333;
  font-size: 12px;
  margin-left: 5px;
  line-height: 33px;
}
.gender {
  margin-right: 10px;
}
.gender > img {
  width: 20px;
  height: 20px;
  position: relative;
  top: 9px;
  opacity: 0.6;
}
.nickname {
  margin-top: 3px;
  font-size: 22px;
  line-height: 30px;
}
.vip > img {
  height: 20px;
  margin-top: 8px;
  margin-left: 10px;
}
.level > span {
  color: #e03a24;
  font-size: 14px;
  font-weight: bold;
  font-style: italic;
  position: relative;
  left: -18px;
  top: -3px;
}
.level > img {
  width: 46px;
  margin-top: 8px;
  margin-left: 10px;
}
.img {
  padding: 2px;
  border: solid 1px #d3d3d3;
}
.img > img {
  width: 188px;
  height: 188px;
}
.s1 {
  display: flex;
}
.profilehead {
  display: flex;
  flex-direction: column;
}
</style>