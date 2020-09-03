<template>
  <div class="hotComment" v-if="commentsArr.length>0">
    <div class="title"><span v-if="offsetNum === 0">{{commentTitle}}</span></div>
    <div class="r1" v-for="(value, index) in commentsArr" :key="index">
      <img :src="value.user.avatarUrl" />
      <div class="con">
        <div class="t1">
          <span class="nickname">
            <span>{{value.user.nickname}}</span>
            <img
              src="http://p1.music.126.net/y8pM-M1mytg6B1ThedCbJA==/109951163709550847.png"
              class="cvip"
              v-if="value.user.vipRights && value.user.vipRights.redVipAnnualCount == 1"
            />
            <img
              src="http://p1.music.126.net/iOnYL-pAvH2LuQfStGOjfQ==/109951163709553273.png"
              class="vip"
              v-if="value.user.vipRights && value.user.vipRights.redVipAnnualCount == -1"
            /> ：
            <span class="vcon">{{value.content}}</span>
          </span>
        </div>
        <div
          class="beReplied"
          v-if="!(value.beReplied == false || value.beReplied[0].content == null)"
        >
          <span>
            <span class="nickname">{{value.beReplied[0].user.nickname}}</span> ：
            <span>{{value.beReplied[0].content}}</span>
          </span>
        </div>

        <div class="time">
          <div>{{commentTime(value.time)}}</div>
          <div>
            <img src="../../assets/banner/like.png" :style="value.likedCount?'':'marginRight: 10px'">
            <span class="like" v-if="value.likedCount">({{value.likedCount}})</span>
            <span> | </span>
            <span class="reply" style="color: #666">回复</span>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>
<script>
import { detailDateFormat } from "../../utils/detailDateFormat";
export default {
  name: "CommentContent",
  props: {
    commentsArr: {
      type: Array,
      default: () => {
        return [];
      },
    },
    commentTitle: {
      type: String,
      default: "",
    },
  },
  computed: {
    offsetNum(){
      return this.$store.state.offsetNum
    }
  },
  methods: {
    commentTime(time) {
      return detailDateFormat(time);
    },
  },
};
</script>
<style scoped>
.reply {
  color: #666;
  cursor: pointer;
}
.reply:hover {
  border-bottom: solid 1px;
}
.like {
  cursor: pointer;
  color: #333;
  margin-left: 5px;
}
.like:hover {
  border-bottom: solid 1px;
}
.time>div:last-of-type > span:nth-of-type(2){
  margin-left: 5px;
  margin-right: 5px;
  color: #ccc;
}
.time>div:last-of-type>img{
  width: 18px;
  position: relative;
  top: 4px;
  cursor: pointer;
}
.time {
  color: #999999;
  font-size: 12px;
  margin-left: 12px;
  margin-top: 17px;
  display: flex;
  justify-content: space-between;
  position: relative;
}

.beReplied {
  margin-left: 10px;
  background-color: #f4f4f4;
  padding: 8px 19px;
  margin-top: 10px;
  border: solid 1px #dedede;
}

.con {
  display: flex;
  flex-direction: column;
}

.vcon {
  color: #333333;
}

.vip {
  width: 26px;
  height: 12px;
}

.cvip {
  width: 39px;
  height: 12px;
}

.r1 {
  display: flex;
  margin-top: 15px;
  margin-bottom: 20px;
  font-size: 12px;
  border-bottom: 1px dotted #ccc;
  padding-bottom: 15px;
  color: #333;
}

.r1:last-of-type {
  border-bottom: none;
}

.t1 {
  width: 580px;
  padding-left: 10px;
  color: #333333;
}

.nickname {
  color: #6facdb;
}
.nickname > span:first-of-type {
  cursor: pointer;
  margin-right: 5px;
}
.nickname:hover > span:first-of-type {
  border-bottom: solid 1px;
}

.r1 > img {
  height: 50px;
  width: 50px;
  cursor: pointer;
}

.title {
  width: 640px;
  height: 35px;
  font-size: 12px;
  border-bottom: solid 1px #cfcfcf;
  line-height: 35px;
  font-weight: bold;
  color: #333;
}
</style>