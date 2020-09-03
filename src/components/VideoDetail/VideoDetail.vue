<template>
  <div class="videomain">
    <div class="left">
      <div class="info">
        <div v-if="videoType === 'mv'">MV</div>
        <div v-else style="display: none"></div>

        <div v-if="videoType === 'mv'">{{videoDetail.data.name}}</div>
        <div v-else>{{videoDetail.data.title}}</div>

        <div>
          <span v-if="videoType === 'mv'">{{videoDetail.data.artists[0].name}}</span>
          <span v-else>
            <span class="by">by</span>
            {{videoDetail.data.creator.nickname}}
          </span>
        </div>
      </div>

      <video :src="videoUrl" controls width="640px" height="360px"></video>

      <div class="op">
        <div class="like">
          <img src="../../assets/banner/like_black.png" />
          <span
            v-if="videoType === 'mv'"
          >({{videoDetail.data.subCount + videoDetail.data.shareCount}})</span>
          <span v-else>({{videoDetail.data.praisedCount}})</span>
        </div>

        <div class="collect">
          <img src="../../assets/search/rescollect.png" />
          <span v-if="videoType === 'mv'">({{videoDetail.data.subCount}})</span>
          <span v-else>({{videoDetail.data.subscribeCount}})</span>
        </div>

        <div class="share">
          <img src="../../assets/search/resshare.png" />
          <span v-if="videoType === 'mv'">({{videoDetail.data.shareCount}})</span>
          <span v-else>({{videoDetail.data.shareCount}})</span>
        </div>
      </div>
      <comment class="comment" :commentTotal="VideoComment.total" :comments="VideoComment" />
      <offset-change :musicOffset="20" :musicTotal="VideoComment.total" />
    </div>
    <div class="right">
      <music-minor
        :musicVideoPublish="videoDetail.data.publishTime"
        :musicVideoPlay="videoDetail.data.playCount"
        :musicVideoDesc="videoDetail.data.desc"
        :musicVideoRelated="videoRelated.data"
        :musicMV="true"
        :musicWX="true"
        v-if="videoType === 'mv'"
      >
        <span slot="related">视频简介</span>
        <span slot="videohead"></span>
        <span slot="wx">网易云音乐公众号</span>
      </music-minor>

      <music-minor
        :musicVideoTime="videoDetail.data.publishTime"
        :musicVideoPlay="videoDetail.data.playTime"
        :musicVideoDesc="videoDetail.data.description"
        :musicVideoRelated="videoRelated.data"
        :musicWX="true"
        v-else
      >
        <span slot="related">视频简介</span>
        <span slot="videohead">相关推荐</span>
        <span slot="wx">网易云音乐公众号</span>
      </music-minor>
    </div>
  </div>
</template>
<script>
import { request } from "../../network/request";
import Comment from "../Comment/Comment";
import OffsetChange from "../OffsetChange/OffsetChange";
import MusicMinor from "../Operate/MusicMinor";
export default {
  name: "VideoDetail",
  components: {
    Comment,
    OffsetChange,
    MusicMinor,
  },
  data() {
    return {
      videoDetail: {},
      videoUrl: "",
      videoType: "video",
      VideoComment: {},
      videoRelated: {},
    };
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
    offsetNum() {
      return this.$store.state.offsetNum;
    },
  },
  watch: {
    offsetNum(newVal) {
      this.judgeVideoType();
      if (Number(this.id)) {
        this.getMVComment(this.id, newVal);
      } else {
        this.getVideoComment(this.id, newVal);
      }
    },
    id(newVal) {
      this.judgeVideoType();
      if (Number(newVal)) {
        this.getMV(newVal);
      } else {
        this.getVideo(newVal);
      }
    },
  },
  created() {
    this.judgeVideoType();
    if (Number(this.id)) {
      this.getMV(this.id);
    } else {
      this.getVideo(this.id);
    }
  },
  methods: {
    getVideoUrl(id) {
      return request({
        url: `/video/url?id=${id}`,
      }).then((response) => {
        this.videoUrl = response.urls[0].url;
      });
    },
    getVideoDetail(id) {
      return request({
        url: `/video/detail?id=${id}`,
      }).then((response) => {
        this.videoDetail = response;
      });
    },
    getMVUrl(id) {
      return request({
        url: `/mv/url?id=${id}`,
      }).then((response) => {
        this.videoUrl = response.data.url;
      });
    },
    getMVDetail(id) {
      return request({
        url: `/mv/detail?mvid=${id}`,
      }).then((response) => {
        this.videoDetail = response;
      });
    },
    getVideoComment(id, offset = 0) {
      return request({
        url: `/comment/video?id=${id}&offset=${offset}`,
      }).then((response) => {
        this.VideoComment = response;
      });
    },
    getMVComment(id, offset = 0) {
      return request({
        url: `/comment/mv?id=${id}&offset=${offset}`,
      }).then((response) => {
        this.VideoComment = response;
      });
    },
    getVideoRelated(id) {
      return request({
        url: `/related/allvideo?id=${id}`,
      }).then((response) => {
        this.videoRelated = response;
        console.log(response);
      });
    },
    getSimiMV(id) {
      return request({
        url: `/simi/mv?mvid=${id}`,
      }).then((response) => {
        this.videoRelated = response;
      });
    },
    getVideo(id) {
      this.getVideoUrl(id);
      this.getVideoDetail(id);
      this.getVideoComment(id);
      this.getVideoRelated(id);
    },
    getMV(id) {
      this.getMVDetail(id);
      this.getMVUrl(id);
      this.getMVComment(id);
      this.getSimiMV(id);
    },
    judgeVideoType() {
      if (Number(this.id)) {
        this.videoType = "mv";
      } else {
        this.videoType = "video";
      }
    },
  },
};
</script>
<style scoped>
.left {
  width: 720px;
  border-right: #e1e1e1 solid 1px;
  /* background-color: #333; */
}
.comment {
  margin-left: 40px;
  margin-top: 40px;
}
.by {
  margin-right: 5px;
  color: #333;
}
.op {
  display: flex;
  font-size: 12px;
  color: #333;
  position: relative;
  margin-top: 10px;
  height: 31px;
}
.op > div {
  padding: 0px 10px;
  background: linear-gradient(0deg, #f1f1f1, #fff);
  border: solid 1px #c3c3c3;
  border-radius: 5px;
  margin-right: 10px;
  cursor: pointer;
}
.like:hover,
.collect:hover,
.share:hover {
  background: linear-gradient(0deg, #f8f8f8, #fff);
  border: solid 1px #c6c6c6;
}
.op > div > span {
  line-height: 31px;
}
.collect > span {
  position: relative;
  top: -3px;
}
.like {
  margin-left: 40px;
}
.share > img {
  width: 18px;
  height: 18px;
  position: relative;
  top: 4px;
  margin-right: 5px;
}
.like > img {
  width: 16px;
  height: 16px;
  position: relative;
  top: 3px;
  margin-right: 5px;
}
.collect > img {
  width: 22px;
  height: 22px;
  position: relative;
  top: 5px;
  margin-right: 5px;
}
.info > div:nth-of-type(3):hover > span {
  border-bottom: solid 1px;
}
.info > div:nth-of-type(3) {
  font-size: 12px;
  color: #0c73c2;
  margin-left: 10px;
  padding-top: 10px;
  cursor: pointer;
}
.info > div:nth-of-type(2) {
  font-size: 24px;
  margin-left: 5px;
  max-width: 640px;
    overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.info > div:nth-of-type(1) {
  border: solid 1px #e77077;
  width: 29px;
  height: 18px;
  color: #e77077;
  line-height: 18px;
  padding: 1px;
  padding-left: 1px;
  font-size: 12px;
  text-align: center;
  font-weight: bold;
}
.info {
  display: flex;
  margin-left: 40px;
  margin-bottom: 10px;
  align-items: center;
  flex-wrap: wrap;
}

.videomain {
  width: 980px;
  background-color: #fff;
  display: flex;
  margin-left: 25%;
  padding-top: 20px;
  padding-bottom: 60px;
  border: solid 1px #d3d3d3;
}
video {
  margin-left: 40px;
}
</style>